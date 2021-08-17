package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.req.TeamAutoCorrectReqDto;
import com.teamgu.api.dto.res.*;

public interface TeamService {

	// Select Team Info
	List<TeamListResDto> getTeamList();
	
	// Select Team Info by Filter
	TeamPageResDto getTeamListbyFilter(TeamFilterReqDto teamFilterReqDto);
	
	// Select  Team Info 
	TeamListResDto getTeamInfobyTeamId(Long teamId);
	
	// Select Team Member Index by teamId;
	List<Long> getTeamMemberIdbyTeamId(Long teamId);

	// Create New Team
	void createTeam(TeamListResDto teamListResDto);
	
	// Update Team Detail Information
	void updateTeamInfo(TeamListResDto teamListResDto);
	
	// Delete Team 
	void deleteTeam(Long teamId);
	
	// Add Member
	void addMember(TeamMemberReqDto teamMemberReqDto);
	
	// changeTeamLeader
	void changeTeamLeader(TeamMemberReqDto teamMemberReqDto);
	
	// exitTeam
	void exitTeam (TeamMemberReqDto teamMemberReqDto);
	
	// completeTeamBuilding
	void completeTeamBuilding(Long teamId);
	
	// Check Team Building
	boolean checkTeamBuilding(Long userId, String trackName);

	// Check Team Building
	TeamIsCreateResDto checkTeamBuilding(Long userId, int projectCode);
	
	// Check Team Leader
	Boolean checkTeamLeader(Long userId, int projectCode);	
	// Auto complete
	List<TeamAutoCorrectResDto> getUserAutoCorrect(TeamAutoCorrectReqDto teamSearchReqDto);
	
	/**
	 * 리더id와 팀id를 대조하여 유효한 팀 초대인지 확인한다
	 * @param leader_id
	 * @param team_id
	 * @return
	 */
	boolean checkTeamBetweenLeader(long leader_id, long team_id);
	
	/**
	 * 특정 기수, 프로젝트 도메인 코드를 입력하면
	 * 해당 조건에 맞는 모든 팀과 그 팀에 속한 인원의 정보를
	 * 엑셀 데이터 출력에 맞게 반환한다.
	 * @param project_code
	 * @param stage_code
	 * @return
	 */
	List<HorizontalByTeamResDto> getHorizontalByTeamInfo(int project_code, int stage_code);
	
	/**
	 * 특정 기수, 프로젝트 도메인 코드를 입력하면
	 * 해당 조건에 맞는 모든 유저와 해당 유저가 속한 팀의 정보를
	 * 엑셀 데이터 출력에 맞게 반환한다.
	 * @param project_code
	 * @param stage_code
	 * @return
	 */
	List<VerticalByUserResDto> getVerticalByUserInfo(int project_code,int stage_code);
}
