package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.res.TeamListResDto;

public interface TeamService {

	// Select Team Info
	List<TeamListResDto> getTeamList();

	// Create New Team
	void createTeam(TeamListResDto teamListResDto);
	
	// Update Team Detail Information
	void updateTeamInfo(TeamListResDto teamListResDto);
	
	// Delete Team 
	void deleteTeam(Long teamId);
	
}
