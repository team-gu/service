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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.UserInfoAwardResDto;
import com.teamgu.api.dto.res.UserInfoProjectResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.api.service.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "마이페이지 정보 입력", tags = { "User." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
	UserServiceImpl userService;

//	@PostMapping("/password")
//	@ApiOperation(value = "비밀번호 변경", notes = "비밀번호를 변경한다.")
//	public ResponseEntity<BaseResDto> setPassword(
//			@RequestBody @ApiParam(value = "비밀번호", required = true) PasswordReqDto password) {
//		userService.setPassward(password);
//		return ResponseEntity.ok(new BaseResDto(200, "Success"));
//	}

	@ApiOperation(value = "사용자 상세정보 조회", notes = "마이페이지에서 사용자 상세정보를 조회한다.")
	@GetMapping("/userInfo")
	public ResponseEntity<UserInfoResDto> getUserDetailInfo(
			@RequestParam @ApiParam(value = "이메일", required = true) String email) {
		return ResponseEntity.ok(userService.getUserDetailInfo(email));
	}

	@ApiOperation(value = "사용자 상세정보 입력/ 수정", notes = "사용자 상세정보를 입력, 수정한다.")
	@PutMapping("/userInfo")
	public ResponseEntity<String> updateUserDetailInfo(
			@ApiParam(value = "마이페이지 정보", required = true) UserInfoReqDto userInfoReq) {
		userService.updateUserDetailInfo(userInfoReq);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@ApiOperation(value = "유저 프로젝트 입력", notes = "사용자 프로젝트를 입력", response = String.class)
	@PostMapping("/project")
	public ResponseEntity<List<UserInfoProjectResDto>> insertUserInfoProject(
			@RequestBody UserInfoProjectResDto userInfoProjectResDto) {

		return new ResponseEntity<List<UserInfoProjectResDto>>(userService.insertUserInfoProject(userInfoProjectResDto),
				HttpStatus.OK);
	}

	@ApiOperation(value = "유저 프로젝트 수정", notes = "사용자 프로젝트를 수정한다", response = String.class)
	@PutMapping("/project")
	public ResponseEntity<List<UserInfoProjectResDto>> updateUserInfoProject(
			@RequestBody UserInfoProjectResDto userInfoProjectResDto) {

		return new ResponseEntity<List<UserInfoProjectResDto>>(userService.updateUserInfoProject(userInfoProjectResDto),
				HttpStatus.OK);

	}

	@ApiOperation(value = "유저 프로젝트 삭제", notes = "사용자 프로젝트를 삭제한다.", response = String.class)
	@DeleteMapping("/project/{id}")
	public ResponseEntity<String> deleteUserInfoProject(@PathVariable Long id) {

		userService.deleteUserInfoProject(id);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@ApiOperation(value = "유저 수상내역 입력", notes = "사용자 수상 이력을 입력한다", response = String.class)
	@PostMapping("/award")
	public ResponseEntity<List<UserInfoAwardResDto>> insertUserInfoAward(
			@RequestBody UserInfoAwardResDto userInfoAwardResDto) {

		return new ResponseEntity<List<UserInfoAwardResDto>>(userService.insertUserInfoAward(userInfoAwardResDto),
				HttpStatus.OK);
	}

	@ApiOperation(value = "유저 수상내역 수정", notes = "사용자 수상 이력을 수정한다.", response = String.class)
	@PutMapping("/award")
	public ResponseEntity<List<UserInfoAwardResDto>> updateUserInfoAward(
			@RequestBody UserInfoAwardResDto userInfoAwardResDto) {

		return new ResponseEntity<List<UserInfoAwardResDto>>(userService.updateUserInfoAward(userInfoAwardResDto),
				HttpStatus.OK);
	}

	@ApiOperation(value = "유저 수상내역 삭제", notes = "사용자 수상 이력을 삭제한다.", response = String.class)
	@DeleteMapping("/award/{id}")
	public ResponseEntity<String> deleteUserInfoAward(@PathVariable Long id) {

		userService.deleteUserInfoAward(id);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

}
