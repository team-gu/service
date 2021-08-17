package com.teamgu.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.AdminManagementReqDto;
import com.teamgu.api.dto.req.AdminUserAddReqDto;
import com.teamgu.api.dto.req.AdminUserManagementReqDto;
import com.teamgu.api.dto.req.AdminUserProjectManagementReqDto;
import com.teamgu.api.dto.req.ProjectCodeReqDto;
import com.teamgu.api.dto.req.StdClassReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.res.AdminTeamManagementResDto;
import com.teamgu.api.dto.res.AdminUserManagementResDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.DashBoardResDto;
import com.teamgu.api.dto.res.AdminUserProjectManagementResDto;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.api.service.AdminServiceImpl;
import com.teamgu.api.service.TeamServiceImpl;
import com.teamgu.database.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "관리자 API", tags = { "Admin." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	AdminServiceImpl adminService;
	
	@Autowired
	TeamServiceImpl teamService;
	
	@ApiOperation(value = "프로젝트 조회")
	@GetMapping("/project")
	public ResponseEntity<? extends BasicResponse> getProjectInfo(){
		List<ProjectInfoResDto> list = adminService.getProjectInfo();
		return ResponseEntity.ok(new CommonResponse<List<ProjectInfoResDto>>(list));
	}
	
	@ApiOperation(value = "프로젝트 추가")
	@PostMapping("/project")
	public ResponseEntity<? extends BasicResponse> createProject(@RequestBody ProjectInfoResDto projectInfoResDto){
		
		int stageCode = projectInfoResDto.getStage().getCode();
		int projectCode = projectInfoResDto.getProject().getCode();
		if(adminService.checkProjectDuplication(stageCode, projectCode)) {
			adminService.createProject(projectInfoResDto);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CommonResponse<String>("프로젝트 추가가 완료되었습니다."));	
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("이미 존재하는 프로젝트입니다."));
	}
	
	@ApiOperation(value = "프로젝트 수정")
	@PutMapping("/project/{projectId}")
	public ResponseEntity<? extends BasicResponse> updateProject(@RequestBody ProjectInfoResDto projectInfoResDto){

		int stageCode = projectInfoResDto.getStage().getCode();
		int projectCode = projectInfoResDto.getProject().getCode();
		
		if(!adminService.checkProjectDuplication(stageCode, projectCode)) {

			adminService.updateProject(projectInfoResDto);

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CommonResponse<String>("수정이 완료되었습니다."));	

		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("존재하지 않는 프로젝트입니다."));
	}

	@ApiOperation(value = "프로젝트 삭제")
	@DeleteMapping("/project/{projectId}")
	public ResponseEntity<? extends BasicResponse> deleteProject(@PathVariable Long projectId){
		
		if(adminService.checkProjectDeletion(projectId)) {
			adminService.deleteProject(projectId);
			return ResponseEntity.status(HttpStatus.OK).build();
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("삭제할 수 없는 프로젝트입니다. 참여하고 있는 교육생이 있는지 확인 바랍니다."));
	
	}
	
	@ApiOperation(value = "Select Box Code 조회")
	@PostMapping("/project/code")
	public ResponseEntity<? extends BasicResponse> getCodeList(@RequestBody ProjectCodeReqDto projectCodeReqDto) {

		List<CodeResDto> list = adminService.selectCode(projectCodeReqDto.getCodeId());
		return ResponseEntity.ok(new CommonResponse<List<CodeResDto>>(list));
	}

	@ApiOperation(value = "Select Box Code 입력")
	@PostMapping("/project/code/insert")
	public ResponseEntity<? extends BasicResponse> insertCode(@RequestBody ProjectCodeReqDto projectCodeReqDto) {

		String codeId = projectCodeReqDto.getCodeId();
		String codeName = projectCodeReqDto.getCodeName().trim();
		
		if(codeName == null || codeName.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		if (adminService.checkCodeDuplication(codeId, codeName)) {

			adminService.insertCode(codeId, codeName);
			List<CodeResDto> list = adminService.selectCode(codeId);
			return ResponseEntity.ok(new CommonResponse<List<CodeResDto>>(list));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("이미 존재하는 코드입니다"));

		}

	}

	@ApiOperation(value = "Select Box Code 삭제")
	@PostMapping("/project/code/delete")
	public ResponseEntity<? extends BasicResponse> deleteCode(@RequestBody ProjectCodeReqDto projectCodeReqDto) {

		String codeId = projectCodeReqDto.getCodeId();
		int code = projectCodeReqDto.getCode();
		
		if (adminService.checkCodeDeletion(codeId, code)) {
			adminService.deleteCode(codeId, code);
			List<CodeResDto> list = adminService.selectCode(codeId);
			return ResponseEntity.ok(new CommonResponse<List<CodeResDto>>(list));

		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("존재하지 않는 코드입니다"));
		}

	}
	
	@ApiOperation(value = "DashBoard 조회")
	@GetMapping("/dashboard/{projectId}")
	public ResponseEntity<? extends BasicResponse> getTeamBuildingStatus(@PathVariable Long projectId) {

		if(adminService.checkProjectValidation(projectId)) { // 존재하는 프로젝트일 경우

			DashBoardResDto dashBoard = adminService.getTeamBuildingStatus(projectId);
			
			return ResponseEntity.ok(new CommonResponse<DashBoardResDto>(dashBoard));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("존재하지 않는 프로젝트입니다"));
	}
	
	@ApiOperation(value = "Project에 참여중인 교육생 조회")
	@GetMapping("/project/{projectId}")
	public ResponseEntity<? extends BasicResponse> getUserInProjectManagementData(@PathVariable Long projectId) {

		if(adminService.checkProjectValidation(projectId)) { // 존재하는 프로젝트일 경우

			List<AdminUserProjectManagementResDto> userListInProject = adminService.getUserInProjectManagementData(projectId);
			
			return ResponseEntity.ok(new CommonResponse<List<AdminUserProjectManagementResDto>>(userListInProject));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("존재하지 않는 프로젝트입니다"));
	}
	
	@ApiOperation(value = "팀 구성 현황 조회")
	@PostMapping("/team")
	public ResponseEntity<? extends BasicResponse> getTeamManagementData(@RequestBody AdminManagementReqDto adminTeamManagementReqDto){
		
		Long projectId = adminTeamManagementReqDto.getProjectId();
		int regionCode = adminTeamManagementReqDto.getRegionCode();
		
		if(adminService.checkProjectValidation(projectId)) { // 존재하는 프로젝트일 경우
			List<AdminTeamManagementResDto> list = adminService.getTeamManagementData(projectId, regionCode);
			
			return ResponseEntity.ok(new CommonResponse<List<AdminTeamManagementResDto>>(list));

		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("존재하지 않는 프로젝트입니다"));
		
	}
	
	@ApiOperation(value = "회원 관리 조회")
	@PostMapping("/user")
	public ResponseEntity<? extends BasicResponse> getUserManagamentData(@RequestBody AdminManagementReqDto adminUserManagementReqDto){

		Long projectId = adminUserManagementReqDto.getProjectId();
		int regionCode = adminUserManagementReqDto.getRegionCode();
		
		if(adminService.checkProjectValidation(projectId)) { // 존재하는 프로젝트일 경우
			
			List<AdminUserManagementResDto> userList = adminService.getUserManagamentData(projectId, regionCode);
			return ResponseEntity.ok(new CommonResponse<List<AdminUserManagementResDto>>(userList));

		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("존재하지 않는 프로젝트입니다"));
		
	}
	
	@ApiOperation(value = "Stdent Class 추가")
	@PostMapping("/user/class/add")
	public ResponseEntity<? extends BasicResponse> insertStud(@RequestBody StdClassReqDto studentClass){

		Long projectId = studentClass.getProjectId();
		String className = studentClass.getClassName();

		// 1. [지역] [반] 형식은 맞는지 체크
		
		String[] split = className.replace("반", " ").trim().split(" ");
		
		if(split.length != 2) {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("형식에 맞지 않습니다")); 
		}
		
		String region = split[0];
		String classNumber = split[1];
		int name = 0;
		
		try {
			
			name = Integer.parseInt(classNumber);

		} catch (NumberFormatException e) {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("형식에 맞지 않습니다")); 
		}
		
		// 2. 이름이 공통테이블에 존재하는 지역인지 체크
		
		int regionCode = adminService.checkRegionCode(region);
		if(regionCode == 0) {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("옳지 않은 지역입니다")); 
		}
		
		// 3. 해당 프로젝트의 [지역] [반]이 중복이지 않은지 체크 후 추가
		
		if(adminService.checkStudentClassDuplication(projectId, regionCode, name)) {
			
			List<CodeResDto> list = adminService.insertStudentClass(projectId, regionCode, name);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CommonResponse<List<CodeResDto>>(list));	

		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("입력된 데이터가 중복입니다"));

	}
		
	@ApiOperation(value = "Stdent Class 조회")
	@PostMapping("/user/class")
	public ResponseEntity<? extends BasicResponse> selectStudentClass(@RequestBody AdminManagementReqDto adminUserManagementReqDto){

		Long projectId = adminUserManagementReqDto.getProjectId();
		int regionCode = adminUserManagementReqDto.getRegionCode();

		if(adminService.checkProjectValidation(projectId)) { // 존재하는 프로젝트일 경우

			List<CodeResDto> list = adminService.selectStudentClass(projectId, regionCode);
			return ResponseEntity.ok(new CommonResponse<List<CodeResDto>>(list));

		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("존재하지 않는 프로젝트입니다"));

	}
	
	@ApiOperation(value = "Stdent Class 삭제")
	@DeleteMapping("/user/class/{classId}")
	public ResponseEntity<? extends BasicResponse> deleteStudentClass(@PathVariable Long classId){
		
		if(adminService.checkStudentClassDeletion(classId)) { // 해당 클래스 검사
			List<CodeResDto> list = adminService.deleteStudentClass(classId);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CommonResponse<List<CodeResDto>>(list));
			
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("삭제할 수 없는 항목입니다. 데이터를 확인하기 바랍니다.")); 
		
	}
	
	@ApiOperation(value = "Student Information 수정")
	@PutMapping("/user/{userId}")
	public ResponseEntity<? extends BasicResponse> updateStudentInformation(@RequestBody AdminUserManagementReqDto adminUserManagementReqDto){
		
		try {
			adminService.updateStudentInformation(adminUserManagementReqDto);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("수정 중 오류가 발생하였습니다")); 
		} finally {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CommonResponse<String>("수정이 완료 되었습니다"));
		}
		
	}

	@ApiOperation(value = "Project에 Student 추가")
	@PostMapping("/project/add")
	public ResponseEntity<? extends BasicResponse> addStudentToProject(@RequestBody AdminUserProjectManagementReqDto adminUserProjectManagementReqDto){
		
		Long userId = adminUserProjectManagementReqDto.getUserId();
		Long projectId = adminUserProjectManagementReqDto.getProjectId();
		
		if(adminService.checkUserProjectDetail(userId, projectId)) { // User가 이 프로젝트에 존재하지 않으면
			adminService.addStudentToProject(userId, projectId);
			
			List<AdminUserProjectManagementResDto> userListInProject = adminService.getUserInProjectManagementData(projectId);
			
			return ResponseEntity.ok(new CommonResponse<List<AdminUserProjectManagementResDto>>(userListInProject));
			
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ErrorResponse("이미 프로젝트에 존재하는 교육생입니다")); 
		
	}

	@ApiOperation(value = "Project에 Student 제외")
	@PostMapping("/project/exclude")
	public ResponseEntity<? extends BasicResponse> excludeStudentFromProject(@RequestBody AdminUserProjectManagementReqDto adminUserProjectManagementReqDto){
		
		Long userId = adminUserProjectManagementReqDto.getUserId();
		Long projectId = adminUserProjectManagementReqDto.getProjectId();
		
		String result = adminService.excludeStudentFromProject(userId, projectId);

		return ResponseEntity.status(HttpStatus.OK)
				.body(new CommonResponse<String>(result));
	}
	
	@ApiOperation(value = "개별 User 추가")
	@PostMapping("/user/add")
	public ResponseEntity<? extends BasicResponse> addUserToTeamguByIndividual(@RequestBody AdminUserAddReqDto adminUserAddReqDto){

		String result = adminService.addUserToTeamguByIndividual(adminUserAddReqDto);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(new CommonResponse<String>(result));
	}
	
}
