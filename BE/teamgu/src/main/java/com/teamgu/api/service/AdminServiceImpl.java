package com.teamgu.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.ProjectDetail;
import com.teamgu.database.repository.AdminRepositorySupport;
import com.teamgu.database.repository.CodeDetailRepositorySupport;
import com.teamgu.database.repository.ProjectDetailRepository;

@Service("adminService")
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	AdminRepositorySupport adminRepositorySupport;
	
	@Autowired
	ProjectDetailRepository projectDetailRepository;
	
	@Autowired
	CodeDetailRepositorySupport codeDetailRepositorySupport;

	/*
	 * Select Project Infomation (프로젝트 정보 조회)
	 */
	
	@Override
	public List<ProjectInfoResDto> getProjectInfo() {
		List<ProjectDetail> projectDetailList = projectDetailRepository.findAll();
		List<ProjectInfoResDto> list = new ArrayList<>();
		for(int i = 0, size = projectDetailList.size(); i<size; i++) {
			
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

	// Check Insertable
	@Override
	public boolean checkInsertable(String codeId, String codeName) {
		return adminRepositorySupport.checkInsertable(codeId, codeName);
	}

	// Check Deleteable 
	@Override
	public boolean checkDeleteable(String codeId, int code) {
		return adminRepositorySupport.checkDeleteable(codeId, code);
	}


}
