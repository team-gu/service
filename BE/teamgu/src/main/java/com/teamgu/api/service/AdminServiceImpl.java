package com.teamgu.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.req.AdminUserAddReqDto;
import com.teamgu.api.dto.req.AdminUserAutoCorrectReqDto;
import com.teamgu.api.dto.req.AdminUserManagementReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.res.AdminTeamManagementResDto;
import com.teamgu.api.dto.res.AdminUserAutoCorrectResDto;
import com.teamgu.api.dto.res.AdminUserManagementResDto;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.DashBoardDetailInfoResDto;
import com.teamgu.api.dto.res.DashBoardDetailResDto;
import com.teamgu.api.dto.res.DashBoardResDto;
import com.teamgu.api.dto.res.AdminUserProjectManagementResDto;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.ProjectDetail;
import com.teamgu.database.entity.User;
import com.teamgu.database.repository.AdminRepositorySupport;
import com.teamgu.database.repository.CodeDetailRepositorySupport;
import com.teamgu.database.repository.MappingRepository;
import com.teamgu.database.repository.ProjectDetailRepository;
import com.teamgu.database.repository.UserRepository;

@Service("adminService")
public class AdminServiceImpl implements AdminService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AdminRepositorySupport adminRepositorySupport;

	@Autowired
	ProjectDetailRepository projectDetailRepository;

	@Autowired
	CodeDetailRepositorySupport codeDetailRepositorySupport;
	
	@Autowired
	TeamServiceImpl	teamService;

	@Autowired
	MappingRepository mappingRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
	/*
	 * Select Project Infomation (???????????? ?????? ??????)
	 */

	@Override
	public List<ProjectInfoResDto> getProjectInfo() {
		List<ProjectDetail> projectDetailList = projectDetailRepository.findAll(Sort.by(Sort.Direction.DESC, "activeDate"));
		List<ProjectInfoResDto> list = new ArrayList<>();
		for (int i = 0, size = projectDetailList.size(); i < size; i++) {

			ProjectInfoResDto projectInfomation = new ProjectInfoResDto();

			projectInfomation.setId(projectDetailList.get(i).getId());
			projectInfomation.setActiveDate(projectDetailList.get(i).getActiveDate());
			projectInfomation.setStartDate(projectDetailList.get(i).getStartDate());
			projectInfomation.setEndDate(projectDetailList.get(i).getEndDate());

			CodeResDto project = new CodeResDto();
			int projectCode = projectDetailList.get(i).getProjectCode();
			project.setCode(projectCode);
			project.setCodeName(codeDetailRepositorySupport.findProjectName(projectCode));

			CodeResDto stage = new CodeResDto();
			int stageCode = projectDetailList.get(i).getStageCode();
			stage.setCode(stageCode);
			stage.setCodeName(codeDetailRepositorySupport.findStageName(stageCode));

			List<CodeResDto> track = adminRepositorySupport.getTrackList(stageCode, projectCode);

			projectInfomation.setStage(stage);
			projectInfomation.setProject(project);
			projectInfomation.setTrack(track);

			list.add(projectInfomation);

		}

		return list;
	}

	/*
	 * Create Project
	 */

	@Override
	public void createProject(ProjectInfoResDto projectInfoResDto) {

		adminRepositorySupport.createProject(projectInfoResDto);

		int stageCode = projectInfoResDto.getStage().getCode();
		int projectCode = projectInfoResDto.getProject().getCode();

		List<CodeResDto> tracks = projectInfoResDto.getTrack();
		
		for (CodeResDto track : tracks) {

			Mapping mapping = new Mapping();
			int trackCode = track.getCode();
			mapping.setProjectCode(projectCode);
			mapping.setStageCode(stageCode);
			mapping.setTrackCode(trackCode);
			if (adminRepositorySupport.checkMappingDuplication(stageCode, projectCode, trackCode))
				mappingRepository.save(mapping);

		}

	}

	/*
	 * Update Project
	 */

	@Override
	public void updateProject(ProjectInfoResDto projectInfoResDto) {
		
		adminRepositorySupport.updateProject(projectInfoResDto);

		int stageCode = projectInfoResDto.getStage().getCode();
		int projectCode = projectInfoResDto.getProject().getCode();

		List<CodeResDto> updateTracks = projectInfoResDto.getTrack();
		List<CodeResDto> originTracks = adminRepositorySupport.getTrackList(stageCode, projectCode);
		
		int updateTrackSize = updateTracks.size();
		int originTrackSize = originTracks.size();
		
		boolean updateTrack[] = new boolean[updateTrackSize];
		boolean originTrack[] = new boolean[originTrackSize];
		
		for(int i = 0; i<originTrackSize; i++) {
			
			int originTrackCode = originTracks.get(i).getCode();

			for(int j = 0; j<updateTrackSize; j++) {
			
				int updateTrackCode = updateTracks.get(j).getCode();
				
				if(originTrackCode == updateTrackCode) {

					updateTrack[i] = true;
					originTrack[j] = true;
				
				}
				
			}
			
			if(!originTrack[i]) {
				
				adminRepositorySupport.deleteMappingCode(stageCode, projectCode, originTrackCode);
			
			}
			
		}
		
		for(int i = 0; i<updateTrackSize; i++) {
	
			if(updateTrack[i]) continue;
			
			int trackCode = updateTracks.get(i).getCode();
			
			Mapping mapping = new Mapping();
			
			mapping.setProjectCode(projectCode);
			mapping.setStageCode(stageCode);
			mapping.setTrackCode(trackCode);
			
			if (adminRepositorySupport.checkMappingDuplication(stageCode, projectCode, trackCode))
				mappingRepository.save(mapping);
			
		}
		
	}

	@Override
	public void deleteProject(Long projectId) {
		
		Optional<ProjectDetail> projectDetail = projectDetailRepository.findById(projectId);

		if(!projectDetail.isPresent()) return;
		
		ProjectDetail project = projectDetail.get();

		int stageCode = project.getStageCode();
		int projectCode = project.getProjectCode();
		
		List<CodeResDto> tracks = adminRepositorySupport.getTrackList(stageCode, projectCode);
		
		for(CodeResDto track : tracks) {
			
			int trackCode = track.getCode();
			
			adminRepositorySupport.deleteMappingCode(stageCode, projectCode, trackCode);
			
		}
		
		adminRepositorySupport.deleteProject(projectId);
	}
	

	@Override
	public DashBoardResDto getTeamBuildingStatus(Long projectId) {
		
		DashBoardResDto dashBoard = new DashBoardResDto();
		
		List<DashBoardDetailResDto> region = new ArrayList<>();
		List<DashBoardDetailResDto> track = new ArrayList<>();
		
		List<CodeResDto> regionCode = adminRepositorySupport.getRegionList();
		
		int totalCount = 0;
		int beforeTotalCount = 0;
		int doingTotalCount = 0;
		int afterTotalCount = 0;
		short complete = 0;
		
		for(int i = 0, size = regionCode.size(); i<size;  i++) {
			
			String code = Integer.toString( regionCode.get(i).getCode()-100);
			String title =  regionCode.get(i).getCodeName();
			
			// ??? ??????
			int totalMember = adminRepositorySupport.getTotalMemberCountByRegion(projectId, code);
			totalCount += totalMember;
			
			// ??? ?????? ??? ??????
			complete = 0;
			int doingCount = adminRepositorySupport.getTeamBuildingMemberCountByRegion(projectId, code, complete);
			doingTotalCount += doingCount;
			
			// ??? ?????? ??? ??????
			complete = 1;
			int afterCount = adminRepositorySupport.getTeamBuildingMemberCountByRegion(projectId, code, complete);
			afterTotalCount += afterCount;

			// ??? ?????? ??? ??????			
			int beforeCount = totalMember - doingCount - afterCount;
			beforeTotalCount += beforeCount;
			
			if(title.equals("??????")) {
				region.add(0, DashBoardDetailResDto.builder()
						.data(DashBoardDetailInfoResDto.builder()
								.total(totalMember)
								.doing(doingCount)
								.after(afterCount)
								.before(beforeCount)
								.build())
						.title(title)
						.build());
			}
			else {

				region.add(DashBoardDetailResDto.builder()
						.data(DashBoardDetailInfoResDto.builder()
								.total(totalMember)
								.doing(doingCount)
								.after(afterCount)
								.before(beforeCount)
								.build())
						.title(title)
						.build());
			}
		}

		region.add(0, DashBoardDetailResDto.builder()
				.data(DashBoardDetailInfoResDto.builder()
						.after(afterTotalCount)
						.total(totalCount)
						.before(beforeTotalCount)
						.doing(doingTotalCount)
						.build())
				.title("??????")
				.build());
		
		List<CodeResDto> tracks = adminRepositorySupport.getTrackList(projectId);
		
		for(int i = 0, size = tracks.size(); i<size; i++) {

			int trackCode = tracks.get(i).getCode();
			// ???????????? ?????? ??????
			complete = 0;
			int doingTeam = adminRepositorySupport.getTeamCountByTrack(projectId, trackCode, complete);

			// ???????????? ?????????
			int doingCount = adminRepositorySupport.getMemberCountByTrack(projectId, trackCode, complete);
			
			// ????????? ?????? ??????
			complete = 1;
			int afterTeam = adminRepositorySupport.getTeamCountByTrack(projectId, trackCode, complete);
			
			// ????????? ?????????
			int afterCount = adminRepositorySupport.getMemberCountByTrack(projectId, trackCode, complete);
			
			track.add(DashBoardDetailResDto.builder()
					.data(DashBoardDetailInfoResDto.builder()
							.doingTeam(doingTeam)
							.doing(doingCount)
							.afterTeam(afterTeam)
							.after(afterCount)
							.build())
					.title(tracks.get(i).getCodeName())
					.build());
			
		}
		dashBoard = DashBoardResDto.builder()
		.track(track)
		.region(region)
		.build();
		
		return dashBoard;
	}
	

	// Select Team Building Status to manage and to export
	@Override
	public List<AdminTeamManagementResDto> getTeamManagementData(Long projectId, int regionCode) {
		// TODO Auto-generated method stub
		return adminRepositorySupport.getTeamManagementData(projectId, regionCode);
	}
	
	// Select Dash Board Info
	@Override
	public List<AdminUserProjectManagementResDto> getUserInProjectManagementData(Long projectId) {
		return adminRepositorySupport.getUserInProjectManagementData(projectId);
	}

	// Select User Status to manage
	@Override
	public List<AdminUserManagementResDto> getUserManagamentData(Long projectId, int regionCode) {
		return adminRepositorySupport.getUserManagamentData(projectId, regionCode);
	}

	/*
	 * Select Code
	 */

	@Override
	public List<CodeResDto> selectCode(String codeId) {
		return adminRepositorySupport.selectCode(codeId);
	}

	/*
	 * Insert Code
	 */

	@Override
	public void insertCode(String codeId, String codeName) {
		adminRepositorySupport.insertCode(codeId, codeName);
	}

	/*
	 * Delete Code
	 */

	@Override
	public void deleteCode(String codeId, int code) {
		adminRepositorySupport.deleteCode(codeId, code);
	}

	/*
	 * Check Methods
	 */

	// Check Insertable
	@Override
	public boolean checkCodeDuplication(String codeId, String codeName) {
		return adminRepositorySupport.checkCodeDuplication(codeId, codeName);
	}

	// Check Deleteable
	@Override
	public boolean checkCodeDeletion(String codeId, int code) {
		return adminRepositorySupport.checkCodeDeletion(codeId, code);
	}

	// Check creatable
	@Override
	public boolean checkProjectDuplication(int stageCode, int projectCode) {
		return adminRepositorySupport.checkProjectDuplication(stageCode, projectCode);
	}

	// Check Project Deletion
	@Override
	public boolean checkProjectDeletion(Long projectCode) {
		return adminRepositorySupport.checkProjectDeletion(projectCode);
	}

	// Check Project Validation
	@Override
	public boolean checkProjectValidation(Long projectId) {
		return adminRepositorySupport.checkProjectValidation(projectId);
	}

	// Class Select Box
	@Override
	public List<CodeResDto> selectStudentClass(Long projectId, int regionCode) {
		
		return adminRepositorySupport.selectStudentClass(projectId, regionCode);
	}
	// Check Student Class Deletion
	@Override
	public boolean checkStudentClassDeletion(Long classId) {
		return adminRepositorySupport.checkStudentClassDeletion(classId);
	}

	//Delete Student Class
	@Override
	public List<CodeResDto> deleteStudentClass(Long classId) {
		return adminRepositorySupport.deleteStudentClass(classId);
	}
	
	// Check Region Code
	@Override
	public int checkRegionCode(String region) {
		return adminRepositorySupport.checkRegionCode(region);
	}

	// Project??? Student Class Duplication Check
	@Override
	public boolean checkStudentClassDuplication(Long projectId, int regionCode, int name) {
		return adminRepositorySupport.checkStudentClassDuplication(projectId, regionCode, name);
	}

	// Insert Student Class
	@Override
	public List<CodeResDto> insertStudentClass(Long projectId, int regionCode, int name) {
		return adminRepositorySupport.insertStudentClass(projectId, regionCode, name);
	}

	// Check User in Project
	@Override
	public boolean checkUserProjectDetail(Long userId, Long projectId) {
		return adminRepositorySupport.checkUserProjectDetail(userId, projectId);
	}

	// add Student to project
	@Override
	public void addStudentToProject(Long userId, Long projectId) {
		adminRepositorySupport.addStudentToProject(userId, projectId);
	}

	// exclude student to project
	@Override
	public String excludeStudentFromProject(Long userId, Long projectId) {

		AdminTeamManagementResDto team = getStudentProjectTeamInfo(userId, projectId);
	
		adminRepositorySupport.excludeStudentFromProject(userId, projectId);

		if(team == null) {
			return "?????????????????? ????????? ?????????????????????";
		}
		else {
			
			Long teamId = team.getTeamId();
			Long leaderId = team.getLeaderId();
		
			List<Long> ids = teamService.getTeamMemberIdbyTeamId(teamId);
			int teamMebmerCount = ids.size();

			if(teamMebmerCount == 1) {
				teamService.deleteTeam(teamId);
				
				return "?????? ???????????? ?????????????????? ????????? ?????????????????????";

			}else {
				for(Long id : ids) {
					if(id == leaderId) continue;
					
					TeamMemberReqDto newLeader = TeamMemberReqDto.builder()
							.teamId(teamId)
							.userId(id)
							.build()
							;
					TeamMemberReqDto exitTeam = TeamMemberReqDto.builder()
							.teamId(teamId)
							.userId(userId)
							.build();
					
					teamService.changeTeamLeader(newLeader);
					teamService.exitTeam(exitTeam);
					
					return "????????? ???????????? ?????????????????? ????????? ?????????????????????";
					
				}
				
			}
		}
		return "?????? ?????????????????? ?????????????????????";
		
	}

	// get Team Information student belongs to
	// ???????????? ?????? ?????? ????????? ????????????. ????????? NULL
	@Override
	public AdminTeamManagementResDto getStudentProjectTeamInfo(Long userId, Long projectId) {
		return adminRepositorySupport.getStudentProjectTeamInfo(userId, projectId);
	}

	// Update Student Information
	// ???????????? ???, ??????/?????????, ?????? ????????? ????????????.
	@Override
	public void updateStudentInformation(AdminUserManagementReqDto adminUserManagementReqDto) {
		Long userId = adminUserManagementReqDto.getUserId();
		Long projectId = adminUserManagementReqDto.getProjectId();
		Long classId = adminUserManagementReqDto.getClassId();
		short role = changeRoleFromStringToShort(adminUserManagementReqDto.getRole());
		short major = changeMajorFromStringToShort(adminUserManagementReqDto.getMajor());
		
		// ?????? ?????? ??????
		adminRepositorySupport.updateStudentInformation(userId, role, major);

		// ??? ?????? ??????
		if(classId == null) classId = (long) 0; // ?????? ????????? ?????? ?????? ?????? null????????? 0?????? ?????????
		
		Long originClassId = adminRepositorySupport.getUserClass(userId, projectId);
		
		if(originClassId != classId) {
			if(originClassId != 0) adminRepositorySupport.excludeStudentFromClass(userId, projectId);
			if(classId != 0) adminRepositorySupport.addStudentToClass(userId, classId);
		}
		
		// ????????? ?????????????????? ??????
		if(role == 2) {
			excludeStudentFromProject(userId, projectId);
		}
	}

	// Add User
	// ???????????? ???????????? (?????????, ??????, ??????, ???????????????, ??????)
	@Override
	public String addUserToTeamguByIndividual(AdminUserAddReqDto adminUserAddReqDto) {
		
		String email = adminUserAddReqDto.getEmail();
		
		if(!adminRepositorySupport.checkUserInformationDuplication("email", email)) {
			return "???????????? ???????????????";
		}
		
		String name = adminUserAddReqDto.getName();
		String studentNumber = adminUserAddReqDto.getStudentNumber();
		
		if(!adminRepositorySupport.checkUserInformationDuplication("studentNumber", studentNumber)) {
			return "????????? ???????????????";
		}
		
		String major = adminUserAddReqDto.getMajor();
		String role = adminUserAddReqDto.getRole();
		String password = studentNumber;
		
		
		User user = User.builder()
				.email(email)
				.password(password)
				.name(name)
				.role(changeRoleFromStringToShort(role))
				.major(changeMajorFromStringToShort(major))
				.profileExtension("png")
				.profileServerName("c21f969b5f03d33d43e04f8f136e7682")
				.profileOriginName("default")
				.studentNumber(studentNumber)
				.build();
		
		user.setPassword(passwordEncoder.encode(password));
		
		userRepository.save(user);
		
		return "????????? ?????? ???????????????.";
	}

	// Change Role String To Role Short 
	// ???????????? ????????? ????????? ????????? ??????
	@Override
	public short changeRoleFromStringToShort(String role) {
		if(role.equals("?????????")) {
			return 1;
		}
		else if(role.equals("?????????")) {
			return 2;
		}
		else if(role.equals("????????????")) {
			return 3;
		}
		else if(role.equals("?????????")) {
			return 4;
		}
		return 0;
	}

	// Change Major String To Major Short 
	// ???????????? ????????? ?????? ????????? ????????? ??????
	@Override
	public short changeMajorFromStringToShort(String major) {
		if(major.equals("??????")) {
			return 1;
		}
		else if(major.equals("?????????")) {
			return 2;
		}
		else
			return 0;
	}

	@Override
	public List<AdminUserAutoCorrectResDto> getUserAutoCorrect(AdminUserAutoCorrectReqDto adminUserAutoCorrectReqDto) {
		return adminRepositorySupport.getUserAutoCorrect(adminUserAutoCorrectReqDto);
	}

}
