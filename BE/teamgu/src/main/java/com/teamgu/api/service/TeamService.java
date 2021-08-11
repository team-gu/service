package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.req.TeamAutoCorrectReqDto;
import com.teamgu.api.dto.res.TeamIsCreateResDto;
import com.teamgu.api.dto.res.TeamListResDto;
import com.teamgu.api.dto.res.TeamAutoCorrectResDto;

public interface TeamService {

	// Select Team Info
	List<TeamListResDto> getTeamList();
	
	// Select Team Info by Filter
	List<TeamListResDto> getTeamListbyFilter(TeamFilterReqDto teamFilterReqDto);
	
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
	
}
