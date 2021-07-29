package com.teamgu.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.AwardReqDto;
import com.teamgu.api.dto.req.PasswordReqDto;
import com.teamgu.api.dto.req.ProjectReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.api.service.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "마이페이지 정보 입력", tags = { "User." })
@RestController
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
	UserServiceImpl userService;

	@PostMapping("/userInfo")
	@ApiOperation(value = "사용자 상세정보 입력/ 수정", notes = "사용자 상세정보를 입력, 수정한다.")
	public ResponseEntity<BaseResDto> setUserDetailInfo(
			@RequestBody @ApiParam(value = "마이페이지 정보", required = true) UserInfoReqDto userInfoReq) {
		userService.setUserDetailInfo(userInfoReq);
		return ResponseEntity.ok(new BaseResDto(200, "Success"));
	}

	@PostMapping("/project")
	@ApiOperation(value = "프로젝트 정보 입력/ 수정", notes = "프로젝트 정보를 입력, 수정한다.")
	public ResponseEntity<BaseResDto> setProjectInfo(
			@RequestBody @ApiParam(value = "프로젝트정보", required = true) List<ProjectReqDto> projectInfoReq) {
		userService.setProjectInfo(projectInfoReq);
		return ResponseEntity.ok(new BaseResDto(200, "Success"));
	}

	@PostMapping("/award")
	@ApiOperation(value = "수상내역 정보 입력/ 수정", notes = "수상내역 정보를 입력, 수정한다.")
	public ResponseEntity<BaseResDto> setAwardInfo(
			@RequestBody @ApiParam(value = "프로젝트정보", required = true) List<AwardReqDto> awardReq) {
		userService.setAwardInfo(awardReq);
		return ResponseEntity.ok(new BaseResDto(200, "Success"));
	}

	@GetMapping("/userInfo")
	@ApiOperation(value = "사용자 상세정보 조회", notes = "마이페이지에서 사용자 상세정보를 조회한다.")
	public ResponseEntity<UserInfoResDto> getUserDetailInfo(
			@RequestParam @ApiParam(value = "이메일", required = true) String email) {
		return ResponseEntity.ok(userService.getUserDetailInfo(email));
	}

	@PostMapping("/password")
	@ApiOperation(value = "비밀번호 변경", notes = "비밀번호를 변경한다.")
	public ResponseEntity<BaseResDto> setPassword(
			@RequestBody @ApiParam(value = "비밀번호", required = true) PasswordReqDto password) {
		userService.setPassward(password);
		return ResponseEntity.ok(new BaseResDto(200, "Success"));
	}
}
