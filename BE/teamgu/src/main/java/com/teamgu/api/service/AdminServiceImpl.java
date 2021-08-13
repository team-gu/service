package com.teamgu.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.res.AdminTeamManagementResDto;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.DashBoardDetailInfoResDto;
import com.teamgu.api.dto.res.DashBoardDetailResDto;
import com.teamgu.api.dto.res.DashBoardResDto;
import com.teamgu.api.dto.res.DashBoardTableResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.ProjectDetail;
import com.teamgu.database.repository.AdminRepositorySupport;
import com.teamgu.database.repository.CodeDetailRepositorySupport;
import com.teamgu.database.repository.MappingRepository;
import com.teamgu.database.repository.ProjectDetailRepository;

@Service("adminService")
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminRepositorySupport adminRepositorySupport;

	@Autowired
	ProjectDetailRepository projectDetailRepository;

	@Autowired
	CodeDetailRepositorySupport codeDetailRepositorySupport;

	@Autowired
	MappingRepository mappingRepository;
	/*
	 * Select Project Infomation (프로젝트 정보 조회)
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
			
			// 총 인원
			int totalMember = adminRepositorySupport.getTotalMemberCountByRegion(projectId, code);
			totalCount += totalMember;
			
			// 팀 구성 중 인원
			complete = 0;
			int doingCount = adminRepositorySupport.getTeamBuildingMemberCountByRegion(projectId, code, complete);
			doingTotalCount += doingCount;
			
			// 팀 구성 후 인원
			complete = 1;
			int afterCount = adminRepositorySupport.getTeamBuildingMemberCountByRegion(projectId, code, complete);
			afterTotalCount += afterCount;

			// 팀 구성 전 인원			
			int beforeCount = totalMember - doingCount - afterCount;
			beforeTotalCount += beforeCount;
			
			if(title.equals("서울")) {
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
				.title("전국")
				.build());
		
		List<CodeResDto> tracks = adminRepositorySupport.getTrackList(projectId);
		
		for(int i = 0, size = tracks.size(); i<size; i++) {

			int trackCode = tracks.get(i).getCode();
			// 구성중인 팀의 갯수
			complete = 0;
			int doingTeam = adminRepositorySupport.getTeamCountByTrack(projectId, trackCode, complete);

			// 구성중인 교육생
			int doingCount = adminRepositorySupport.getMemberCountByTrack(projectId, trackCode, complete);
			
			// 구성된 팀의 갯수
			complete = 1;
			int afterTeam = adminRepositorySupport.getTeamCountByTrack(projectId, trackCode, complete);
			
			// 구성된 교육생
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

	@Override
	public List<DashBoardTableResDto> getDashBoardTableInfo(Long projectId) {
		return adminRepositorySupport.getDashBoardTableInfo(projectId);
	}

}
