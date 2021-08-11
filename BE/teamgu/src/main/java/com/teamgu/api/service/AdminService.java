package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;

public interface AdminService {
	
	// Select Project Infomation
	public List<ProjectInfoResDto> getProjectInfo();
	
	// Select Code
	public List<CodeResDto> selectCode(String codeId);
	
//	// Select Stage Code
//	public List<CodeResDto> selectStageCode();
//
//	// Select Project Code
//	public List<CodeResDto> selectProjectCode();
//	
//	// Select Track Code
//	public List<CodeResDto> selectTrackCode();

	// Insert Code
	public void insertCode(String codeId, String codeName);
	
//	// Insert Stage Code
//	public void insertStageCode(String stage);
//
//	// Insert Project Code
//	public void insertProjectCode(String project);
//	
//	// Insert Track Code
//	public void insertTrackCode(String track);

	// Delete Code
	public void deleteCode(String codeId, int code);
	
//	// Delete Stage Code
//	public void deleteStageCode(int stageCode);
//
//	// Delete Project Code
//	public void deleteProjectCode(int projectCode);
//	
//	// Delete Track Code
//	public void deleteTrackCode(int trackCode);
	
	// Check Insertable
	public boolean checkInsertable(String codeId, String codeName);
	
	// Check Deleteable 
	public boolean checkDeleteable(String codeId, int code);
	
}
