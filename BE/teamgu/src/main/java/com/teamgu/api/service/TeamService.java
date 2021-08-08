package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.res.TeamListResDto;

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
	
}
