package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.DashBoardResDto;
import com.teamgu.api.dto.res.DashBoardTableResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;

public interface AdminService {
	
	/**
	 * Select Project Infomation
	 * 현재 생성된 프로젝트에 대한 정보를 반환한다
	 * @return
	 */
	public List<ProjectInfoResDto> getProjectInfo();
	
	/**
	 * Create Project
	 * 프로젝트를 생성한다
	 * @param projectInfoResDto
	 */
	public void createProject(ProjectInfoResDto projectInfoResDto);
	
	/**
	 * Update Project
	 * 프로젝트를 수정한다
	 * @param projectInfoResDto
	 */
	public void updateProject(ProjectInfoResDto projectInfoResDto);

	/**
	 * Delete Project
	 * 프로젝트를 삭제 한다
	 * @param projectId
	 */
	public void deleteProject(Long projectId);
	
	/**
	 * Select Code
	 * Select Box에서 보여줄 Code들을 반환한다.
	 * @param codeId (code 테이블의 id, "TR", "ST", "PR")
	 * @return
	 */
	public List<CodeResDto> selectCode(String codeId);

	// 
	
	/**
	 * Insert Code
	 * 코드 추가
	 * @param codeId (code 테이블의 id, "TR", "ST", "PR")
	 * @param code (code_detail 테이블의 code_detail, "101", "102")
	 */
	public void insertCode(String codeId, String codeName);
	
	/**
	 * Delete Code
	 * 코드 삭제
	 * @param codeId (code 테이블의 id, "TR", "ST", "PR")
	 * @param code (code_detail 테이블의 code_detail, "101", "102")
	 */
	public void deleteCode(String codeId, int code);

	/**
	 * Check creatable
	 * 프로젝트 중복성 체크
	 * project_detail에서 기수와 프로젝트로 이미 생성된 프로젝트인지 아닌지 체크
	 * @param stageCode (기수 parameter)
	 * @param projectCode (프로젝트 parameter)
	 * @return
	 */
	public boolean checkProjectDuplication(int stageCode, int projectCode);
	
	/**
	 * Check Insertable
	 * 코드 중복성 체크
	 * @param codeId (code 테이블의 id, "TR", "ST", "PR")
	 * @param codeName (code_detail 테이블의 name, "공통", "5기", "웹 기술")
	 * @return
	 */
	public boolean checkCodeDuplication(String codeId, String codeName);
	
	/**
	 * Check Deleteable 
	 * Project 코드를 삭제할 수 있는지 체크한다.
	 * 사용되고 있는 project code, track code, stage code가 있다면 삭제하지 못하도록 한다.
	 * @param codeId (code 테이블의 id, "TR", "ST", "PR")
	 * @param code (code_detail 테이블의 code_detail, "101", "102")
	 * @return
	 */
	public boolean checkCodeDeletion(String codeId, int code);
	
	/**
	 * Check Deleteable
	 * Project를 삭제할 수 있는지 체크한다.
	 * 참여하고 있는 교육생이 있는 프로젝트는 삭제하지 못하도록 한다.
	 * @param projectId
	 * @return
	 */
	public boolean checkProjectDeletion(Long projectId);
	
	/**
	 * Select DashBoard Data
	 * Project Id로 dash board 차트 데이터를 조회한다.
	 * @param projectId
	 * @return
	 */
	public DashBoardResDto getTeamBuildingStatus(Long projectId);

	/**
	 * Select Dashboard Table Data
	 * Project Id를 통해 Dash Board 하단 테이블 데이터를 조회한다
	 * @param projectId
	 * @return
	 */
	public List<DashBoardTableResDto> getDashBoardTableInfo(Long projectId);
	
}
