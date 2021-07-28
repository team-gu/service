package com.teamgu.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.database.entity.User;

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
	@ApiOperation(value = "사용자 상세정보 입력", notes = "초기 로그인시 사용자 상세정보를 입력한다.") 
	public ResponseEntity<BaseResDto> setUserDetailInfo(@RequestBody @ApiParam(value = "마이페이지 정보", required = true) UserInfoReqDto userInfoReq) {
		userService.setUserDetailInfo(userInfoReq);
		return  ResponseEntity.ok(new BaseResDto(200,"Success"));
	}
	
	@GetMapping("/userInfo")
	@ApiOperation(value = "사용자 상세정보 조회", notes = "마이페이지에서 사용자 상세정보를 조회한다.") 
	public ResponseEntity<UserInfoResDto> getUserDetailInfo(@RequestParam @ApiParam(value = "이메일", required = true) String email) {
		return  ResponseEntity.ok(userService.getUserDetailInfo(email));
	}
	
}
