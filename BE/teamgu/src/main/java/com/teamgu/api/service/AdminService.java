package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;

public interface AdminService {
	
	// Select Project Infomation
	public List<ProjectInfoResDto> getProjectInfo();
	
	// Create Project
	public void createProject(ProjectInfoResDto projectInfoResDto);
	
	// Update Project
	public void updateProject(ProjectInfoResDto projectInfoResDto);
	
	// Delete Project
	public void deleteProject(Long projectId);
	
	// Select Code
	public List<CodeResDto> selectCode(String codeId);

	// Insert Code
	public void insertCode(String codeId, String codeName);
	
	// Delete Code
	public void deleteCode(String codeId, int code);
	
	// Check creatable
	public boolean checkProjectDuplication(int stageCode, int projectCode);
	
	// Check Insertable
	public boolean checkCodeDuplication(String codeId, String codeName);
	
	// Check Deleteable 
	public boolean checkCodeDeletion(String codeId, int code);
	
	// Check Deleteable
	public boolean checkProjectDeletion(Long projectId);
	
}
