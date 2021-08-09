package com.teamgu.api.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.req.TeamAutoCorrectReqDto;
import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.req.TrackReqDto;
import com.teamgu.api.dto.res.SkillResDto;
import com.teamgu.api.dto.res.TeamAutoCorrectResDto;
import com.teamgu.api.dto.res.TeamIsCreateResDto;
import com.teamgu.api.dto.res.TeamListResDto;
import com.teamgu.api.dto.res.TeamMemberInfoResDto;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.Team;
import com.teamgu.database.entity.User;
import com.teamgu.database.repository.CodeDetailRepositorySupport;
import com.teamgu.database.repository.MappingRepository;
import com.teamgu.database.repository.MappingRepositorySupport;
import com.teamgu.database.repository.TeamRepository;
import com.teamgu.database.repository.TeamRepositorySupport;
import com.teamgu.database.repository.UserRepository;

@Service("teamService")
public class TeamServiceImpl implements TeamService {

	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	MappingRepository mappingRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TeamRepositorySupport teamRepositorySupport;
	
	@Autowired
	CodeDetailRepositorySupport codeDetailRepositorySupport;
	
	@Autowired
	MappingRepositorySupport mappingRepositorySupport;
	
	/**
	 * TeamList 조회
	 */
	@Override
	public List<TeamListResDto> getTeamList() {
		
		List<TeamListResDto> list = new ArrayList<>();
		List<Team> teamList = teamRepository.findAll();
		for(int i = 0, size=teamList.size(); i<size; i++) {

			Long teamId = teamList.get(i).getId();
			TeamListResDto team = getTeamInfobyTeamId(teamId);
			
			list.add(team);
		}
		return list;
	}
	
	/*
	 * Team List Filter 조회 
	 */	
	
	@Override
	public List<TeamListResDto> getTeamListbyFilter(TeamFilterReqDto teamFilterReqDto) {
	
		List<TeamListResDto> list = new ArrayList<>();
		List<Long> teamIdList = teamRepositorySupport.getTeamIdbyFilter(teamFilterReqDto);
		
		if(teamIdList == null) return null;
		System.out.println("TeamServiceImpl : " +  teamIdList.size());
		
		for(int i = 0, size=teamIdList.size(); i<size; i++) {
			
			Long teamId = Long.parseLong(String.valueOf(teamIdList.get(i)));
			System.out.println("TeamServiceImpl (array) : " + teamId);
			TeamListResDto team = getTeamInfobyTeamId(teamId);
			
			list.add(team);
		}
		
		return list;
	}
	
	/*
	 * Team 생성
	 */		
	@Override
	public void createTeam(TeamListResDto teamListResDto) {
		User user = userRepository.getOne(teamListResDto.getLeaderId());
		int trackCode = codeDetailRepositorySupport.findTtrackCode(teamListResDto.getTrack().getCodeName());
		int stageCode = ((user.getStudentNumber().charAt(0) - '0') * 10 + user.getStudentNumber().charAt(1) - '0') + 100;

		Mapping mapping = mappingRepositorySupport.selectMapping(trackCode, stageCode);

		Team team = new Team();
		team.setUser(user);
		team.setMapping(mapping);
		team.setCompleteYn(teamListResDto.getCompleteYn());
		team.setIntroduce(teamListResDto.getIntroduce());
		team.setName(teamListResDto.getName());
		teamRepository.save(team);
		
		Long teamId = teamRepositorySupport.getTeamId(team);
		
		// ADD Team Skill
		List<SkillResDto> teamSkills = teamListResDto.getSkills();
		
		for(SkillResDto skill : teamSkills) {
			int skillCode = skill.getCode();
			teamRepositorySupport.addSkill(teamId, skillCode);
		}
		
		// ADD Team Member Insert
		List<TeamMemberInfoResDto> teamMembers = teamListResDto.getTeamMembers();
		
		for(TeamMemberInfoResDto member : teamMembers) {
			Long userId = member.getId();
			teamRepositorySupport.addMember(teamId, userId);
		}
		
		teamRepositorySupport.updateTeamBuildMemberCount(teamId);
		
	}
	/*
	 * Team 수정
	 */		
	@Override
	public void updateTeamInfo(TeamListResDto teamListResDto) {
		// TODO Auto-generated method stub
		
		User user = userRepository.getOne(teamListResDto.getLeaderId());
		int trackCode = codeDetailRepositorySupport.findTtrackCode(teamListResDto.getTrack().getCodeName());
		int stageCode = ((user.getStudentNumber().charAt(0) - '0') * 10 + user.getStudentNumber().charAt(1) - '0') + 100;
		Mapping mapping = mappingRepositorySupport.selectMapping(trackCode, stageCode);
		Team team = teamRepository.getOne(teamListResDto.getId());
		
		Long teamId = team.getId();
		team.setIntroduce(teamListResDto.getIntroduce());
		team.setName(teamListResDto.getName());
		team.setCompleteYn(teamListResDto.getCompleteYn());
		team.setUser(user);
		team.setMapping(mapping);
		teamRepository.save(team);
		
		/*
		 * Team Skill 수정
		 */		
		List<SkillResDto> updateSkills = teamListResDto.getSkills();
		List<SkillResDto> originSkills = teamRepositorySupport.getTeamSkillsByTeamId(teamId);
		
		int updateSkiilsSize = updateSkills.size();
		int originSkillsSize = originSkills.size();
		
		boolean updateSkillsCheck[] = new boolean[updateSkiilsSize];
		//boolean originSkillsCheck[] = new boolean[originSkillsSize];
		int skillCode;
		for(int i = 0 ;i<originSkillsSize; i++) {
			int flag = 0;
			String originSkillName = originSkills.get(i).getCodeName();
			for(int j = 0; j<updateSkiilsSize; j++) {
				String updateSkillName = updateSkills.get(j).getCodeName();
				if(originSkillName.equals(updateSkillName)) {
					updateSkillsCheck[j] = true;
					//originSkillsCheck[i] = true;
					flag = 1;
				}
			}
			if(flag == 0) {
				skillCode = originSkills.get(i).getCode();
				teamRepositorySupport.deleteSkill(teamId, skillCode);
			}
		}
		
		for(int i = 0; i<updateSkiilsSize; i++) {
			if(updateSkillsCheck[i]) continue;
			skillCode = updateSkills.get(i).getCode();
			teamRepositorySupport.addSkill(teamId, skillCode);
		}
		/*
		 * Team Member 수정
		 */		
		List<TeamMemberInfoResDto> updateMembers = teamListResDto.getTeamMembers();
		List<TeamMemberInfoResDto> originMembers = teamRepositorySupport.getTeamMemberInfo(teamId);
		
		int updateMembersSize = updateMembers.size();
		int originMembersSize = originMembers.size();
		
		boolean updateMembersCheck[] = new boolean[updateMembersSize];
		
		for(int i = 0; i<originMembersSize; i++) {
			int flag = 0 ;
			Long originMemberId = originMembers.get(i).getId();
			for(int j = 0; j<updateMembersSize; j++) {
				Long updateMemberId = updateMembers.get(j).getId();
				if(originMemberId == updateMemberId) {
					updateMembersCheck[j] = true;
					flag = 1;
				}
			}
			if(flag == 0) {
				teamRepositorySupport.deleteMember(teamId, originMemberId);
			}
		}
		
		for(int i = 0; i<updateMembersSize; i++) {
			if(updateMembersCheck[i]) continue;
			Long userId = updateMembers.get(i).getId();
			teamRepositorySupport.addMember(teamId, userId);
		}
		
		
	}
	/*
	 * Team 삭제
	 */		
	@Override
	public void deleteTeam(Long teamId) {
		teamRepositorySupport.deleteAllTeamSkillbyTeamId(teamId);
		teamRepositorySupport.deleteAllTeamMemberbyUserId(teamId);
		teamRepositorySupport.deleteTeamInfobyTeamId(teamId);
		//teamRepository.deleteById(teamId);
	}
	
	/*
	 * Team Id를 이용한 팀 정보
	 */	
	
	@Override
	public TeamListResDto getTeamInfobyTeamId(Long teamId){
		TeamListResDto team = new TeamListResDto();
		Team teamList = teamRepository.getOne(teamId);
		
		team.setId(teamId);
		
		// Team 이름
		team.setName(teamList.getName());
		
		// Team 소개
		team.setIntroduce(teamList.getIntroduce());
		
		// Team 구성 완료 여부
		team.setCompleteYn(teamList.getCompleteYn());
		
		// Team 현재 리더
		team.setLeaderId(teamList.getUser().getId());
		
		// Team 트랙
		Mapping mapping = mappingRepository.getOne(teamList.getMapping().getId());
		String trackName = codeDetailRepositorySupport.findTtrackName(mapping.getTrackCode());
		int trackCode = codeDetailRepositorySupport.findTtrackCode(trackName);
		TrackReqDto track = new TrackReqDto(trackCode, trackName);
		team.setTrack(track);

		// Team 구성 멤버 간단 정보 조회
		List<TeamMemberInfoResDto> teamMembers = teamRepositorySupport.getTeamMemberInfo(teamId);
		team.setTeamMembers(teamMembers);
		
		// Team 기술 스택
		List<SkillResDto> teamSkills = teamRepositorySupport.getTeamSkillsByTeamId(teamId);
		team.setSkills(teamSkills);
		
		return team;
	}

	/*
	 * TeamId와 UserId를 이용한 멤버 추가
	 */	
	
	@Override
	public void addMember(TeamMemberReqDto teamMemberReqDto) {
		
		Long teamId = teamMemberReqDto.getTeamId();
		Long userId = teamMemberReqDto.getUserId();
		
		teamRepositorySupport.addMember(teamId, userId);
		teamRepositorySupport.updateTeamBuildMemberCount(teamId);
	}

	/*
	 * TeamId와 UserId를 이용한 팀장 변경
	 */	
		
	@Override
	public void changeTeamLeader(TeamMemberReqDto teamMemberReqDto) {
		
		Long teamId = teamMemberReqDto.getTeamId();
		Long userId = teamMemberReqDto.getUserId();
		
		teamRepositorySupport.changeTeamLeader(teamId, userId);
		
	}

	/*
	 * TeamId와 UserId를 이용한 팀 나가기
	 */	
		
	@Override
	public void exitTeam(TeamMemberReqDto teamMemberReqDto) {

		Long teamId = teamMemberReqDto.getTeamId();
		Long userId = teamMemberReqDto.getUserId();
		
		teamRepositorySupport.deleteMember(teamId, userId);
		teamRepositorySupport.updateTeamBuildMemberCount(teamId);
		
	}

	/*
	 * TeamId를 이용한 팀 구성 완료 여부 변경
	 */	
	
	@Override
	public void completeTeamBuilding(Long teamId) {
		
		teamRepositorySupport.completeTeamBuilding(teamId);
		
	}
	

	/*
	 * TeamId를 이용한 팀 멤버 id 조회
	 */	
	
	@Override
	public List<Long> getTeamMemberIdbyTeamId(Long teamId) {
		
		return teamRepositorySupport.getTeamMemberIdbyTeamId(teamId);
	}
	
	/*
	 * userId와 trackName을 이용한 팀빌딩 체크
	 */	
	
	@Override
	public boolean checkTeamBuilding(Long userId, String trackName) {
		// TODO Auto-generated method stub
		return teamRepositorySupport.checkTeamBuilding(userId, trackName);
	}

	/*
	 * userId와 projectCode을 이용한 팀빌딩 체크
	 */	
	
	@Override
	public TeamIsCreateResDto checkTeamBuilding(Long userId, int projectCode) {
		// TODO Auto-generated method stub
		
		List<BigInteger> teamIds = teamRepositorySupport.checkTeamBuilding(userId, projectCode);
		int size = teamIds.size();
		
		TeamIsCreateResDto teamIsCreateResDto = new TeamIsCreateResDto();
		if(size == 0) {
			
			teamIsCreateResDto.setHasTeam(false);
			return teamIsCreateResDto;
			
		}
		else {
			Long teamId = teamIds.get(0).longValue();
			System.out.println(teamId + " / " + teamId.getClass());
			System.out.println("TeamServiceImple : 팀이 있음");
			teamIsCreateResDto.setHasTeam(true);
			teamIsCreateResDto.setTeam(getTeamInfobyTeamId(teamId));
			return teamIsCreateResDto;
		}
		
	}

	/*
	 * Team User Auto Correct
	 */	
	
	@Override
	public List<TeamAutoCorrectResDto> getUserAutoCorrect(TeamAutoCorrectReqDto teamAutoCorrectReqDto) {
		// TODO Auto-generated method stub
		return teamRepositorySupport.getUserAutoCorrect(teamAutoCorrectReqDto);
	}

	
	
}
