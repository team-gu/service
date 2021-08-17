package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.req.AdminUserAddReqDto;
import com.teamgu.api.dto.req.AdminUserManagementReqDto;
import com.teamgu.api.dto.req.AdminUserProjectManagementReqDto;
import com.teamgu.api.dto.res.AdminTeamManagementResDto;
import com.teamgu.api.dto.res.AdminUserManagementResDto;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.DashBoardResDto;
import com.teamgu.api.dto.res.AdminUserProjectManagementResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.User;

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
	 * Check Project Validation
	 * 프로젝트의 유효성을 체크한다. 존재하는 프로젝트이면 true를 없으면 false를 반환한다.
	 * project Id기반 관리자의 데이터 조회시 유효한 프로젝트임을 검증할 때 쓰인다.
	 * @param projectId
	 * @return
	 */
	public boolean checkProjectValidation(Long projectId);
	
	/**
	 * Select DashBoard Data
	 * Project Id로 dash board 차트 데이터를 조회한다.
	 * @param projectId
	 * @return
	 */
	public DashBoardResDto getTeamBuildingStatus(Long projectId);

	/**
	 * Select User Information In Project to manage
	 * Project Id를 통해 프로젝트별 참여중인 교육생을 조회한다.
	 * @param projectId
	 * @return
	 */
	public List<AdminUserProjectManagementResDto> getUserInProjectManagementData(Long projectId);
	
	
	/**
	 * Select Team Building Status to manage and to export
	 * project Id와 regionCode를 통해 팀 구성 현황을 조회하게 한다
	 * region code가 0일 경우 전국을 의미하며 나머지 숫자들은 각각 공통 테이블에 정의된 지역으로 필터링 된다.
	 * @param projectId
	 * @param regionCode
	 * @return
	 */
	public List<AdminTeamManagementResDto> getTeamManagementData(Long projectId, int regionCode);
	
	/**
	 * Select User Status to manage , import, regist
	 * Project Id와 region code를 통해 회원 현황을 조회하여 관리한다
	 * @param projectId
	 * @param regionCode
	 * @return
	 */
	public List<AdminUserManagementResDto> getUserManagamentData(Long projectId, int regionCode);

	/**
	 * Get Class Select Box
	 * 프로젝트별 회원 정보 관리 탭의 반 메뉴를 구성한다. 
	 * region code가 0이 아니라면 지역별로도 필터 할수 있도록 한다.
	 * @param projectId
	 * @param regionCode
	 * @return
	 */
	public List<CodeResDto> selectStudentClass(Long projectId, int regionCode);
	
	/**
	 * Check Student Class Deletion
	 * 추가한 교육생 반을 삭제할 수 있는지 체크한다.
	 * user_class에 해당하는 반의 데이터가 존재하면 삭제하지 못하도록 처리한다.
	 * @param classId
	 * @return
	 */
	public boolean checkStudentClassDeletion(Long classId) ;
	
	/**
	 * Delete Student Class
	 * 교육생 반을 삭제한다.
	 * @param classId
	 */
	public List<CodeResDto> deleteStudentClass(Long classId);

	/**
	 * Check Region Code
	 * 반을 추가할 때 등록되어 있는 지역인지 먼저 체크한다.
	 * 등록되어 있는 지역이면 지역 코드를 반환한다.
	 * @param region
	 * @return
	 */
	public int checkRegionCode(String region);
	
	/**
	 * Check Student Class Duplication
	 * 반을 추가할 때 이미 존재하는 반인지 체크한다
	 * 존재하지 않으면 true, 존재하면 false를 반환한다
	 * @param projectId
	 * @param regionCode
	 * @param name
	 * @return
	 */
	public boolean checkStudentClassDuplication(Long projectId, int regionCode, int name);

	/**
	 * Insert Student Class
	 * 반을 추가한다.
	 * @param projectId
	 * @param regionCode
	 * @param name
	 */
	public List<CodeResDto> insertStudentClass(Long projectId, int regionCode, int name);

	/**
	 * Check User in Project
	 * Project에 User가 존재하는지 체크
	 * 존재하지 않으면 true, 존재하면 false를 반환한다.
	 * @param userId
	 * @param projectId
	 * @return
	 */
	public boolean checkUserProjectDetail(Long userId, Long projectId);
	
	/**
	 * add Student to project
	 * Project에 User를 추가
	 * @param userId
	 * @param projectId
	 */
	public void addStudentToProject(Long userId, Long projectId);
	
	/**
	 * exclude student to project
	 * Project에서 User를 삭제
	 * @param userId
	 * @param projectId
	 */
	public String excludeStudentFromProject(Long userId, Long projectId);

	/**
	 * get Team Information student belongs to
	 * 교육생이 속한 팀의 정보를 가져온다. 없으면 NULL
	 * @param userId
	 * @param projectId
	 * @return
	 */
	public AdminTeamManagementResDto getStudentProjectTeamInfo(Long userId, Long projectId);
	
	/**
	 * Update Student Information
	 * 교육생의 반, 전공/비전공, 퇴소 여부를 수정한다.
	 * @param adminUserProjectManagementReqDto
	 */
	public void updateStudentInformation(AdminUserManagementReqDto adminUserManagementReqDto);
	
	/**
	 * Add User
	 * 사용자를 추가한다 (이메일, 이름, 학번, 교육생여부, 전공)
	 * @param adminUserAddReqDto
	 * @return
	 */
	public String addUserToTeamguByIndividual(AdminUserAddReqDto adminUserAddReqDto);
	
	/**
	 * Change Role String To Role Short 
	 * 문자열로 들어온 역할을 숫자로 변환
	 * @param role
	 * @return
	 */
	public short changeRoleFromStringToShort(String role);
	
	/**
	 * Change Major String To Major Short 
	 * 문자열로 들어온 전공 여부를 숫자로 변환
	 * @param major
	 * @return
	 */
	public short changeMajorFromStringToShort(String major);
	
}
