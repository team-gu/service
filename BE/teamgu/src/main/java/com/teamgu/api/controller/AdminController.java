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

import com.teamgu.api.dto.req.ProjectCodeReqDto;
import com.teamgu.api.dto.req.ProjectReqDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.api.service.AdminServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "관리자 API", tags = { "Admin." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	AdminServiceImpl adminService;
	
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
			return ResponseEntity.status(HttpStatus.OK).build();	
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
	
	@ApiOperation(value = "프로젝트 수정")
	@PutMapping("/project/{projectId}")
	public ResponseEntity<? extends BasicResponse> updateProject(@RequestBody ProjectInfoResDto projectInfoResDto){

		int stageCode = projectInfoResDto.getStage().getCode();
		int projectCode = projectInfoResDto.getProject().getCode();
		
		if(!adminService.checkProjectDuplication(stageCode, projectCode)) {

			adminService.updateProject(projectInfoResDto);

			return ResponseEntity.status(HttpStatus.OK).build();	

		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}

	@ApiOperation(value = "프로젝트 삭제")
	@DeleteMapping("/project/{projectId}")
	public ResponseEntity<? extends BasicResponse> deleteProject(@PathVariable Long projectId){
		
		if(adminService.checkProjectDeletion(projectId)) {
			adminService.deleteProject(projectId);
			return ResponseEntity.status(HttpStatus.OK).build();
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	
	}
	
	@ApiOperation(value = "코드 조회")
	@PostMapping("/project/code")
	public ResponseEntity<? extends BasicResponse> getCodeList(@RequestBody ProjectCodeReqDto projectCodeReqDto) {

		List<CodeResDto> list = adminService.selectCode(projectCodeReqDto.getCodeId());
		return ResponseEntity.ok(new CommonResponse<List<CodeResDto>>(list));
	}

	@ApiOperation(value = "코드 입력")
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
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

		}

	}

	@ApiOperation(value = "코드 삭제")
	@PostMapping("/project/code/delete")
	public ResponseEntity<? extends BasicResponse> deleteCode(@RequestBody ProjectCodeReqDto projectCodeReqDto) {

		String codeId = projectCodeReqDto.getCodeId();
		int code = projectCodeReqDto.getCode();
		
		if (adminService.checkCodeDeletion(codeId, code)) {
			adminService.deleteCode(codeId, code);
			List<CodeResDto> list = adminService.selectCode(codeId);
			return ResponseEntity.ok(new CommonResponse<List<CodeResDto>>(list));

		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

	}

}
