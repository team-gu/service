package com.teamgu.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.DummyReqDto;
import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.TokenResDto;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.database.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "인증(로그인, 로그아웃) API", tags = { "Auth." })
@RestController
@RequestMapping("/api/auth")
public class JwtAuthController {

	@Autowired
	UserServiceImpl userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/dummyData")
	@ApiOperation(value = "더미 데이터 추가", notes = "사용자 초기정보(email/pwd/name/role)를 추가 한다") 
	public ResponseEntity<BaseResDto> signIn(
			@RequestBody @ApiParam(value = "더미 데이터 추가 (email,pw)", required = true) DummyReqDto dummyReq) {
		String email = dummyReq.getEmail();
		String password = dummyReq.getPassword();
		String name = dummyReq.getName();
		short role = dummyReq.getRole();
		User user = User.builder()
				.email(email)
				.password(password)
				.name(name)
				.role(role)
				.build();
		if(userService.save(user))
			return ResponseEntity.ok(new BaseResDto(200,"Success"));
		else 
			return ResponseEntity.status(500).body(new BaseResDto(500,"Fail Insert"));
		
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "이메일과 패스워드를 입력해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = LoginResDto.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResDto.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResDto.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResDto.class)
    })
	public ResponseEntity<LoginResDto> login(@RequestBody @ApiParam(value = "로그인 정보(email,pw)", required = true) LoginReqDto loginReq) {
		String email = loginReq.getEmail();
		String password = loginReq.getPassword();
		User user = userService.getUserByEmail(email).get();
		if(passwordEncoder.matches(password, user.getPassword())) {
			return ResponseEntity.ok(userService.login(loginReq, user));
		}
		return ResponseEntity.status(404).body(new LoginResDto(404,"Invalid Password",null,null,null)); 
	}
	
	@GetMapping("/reissue")
	@ApiOperation(value = "토큰 재발급", notes = "token을 재발급 받는다.") 
	public ResponseEntity<TokenResDto> reissue(@RequestBody @ApiParam(value = "토큰 재발급 요청", required = true) TokenReqDto tokenReq){
		return  ResponseEntity.ok(userService.reissue(tokenReq));
	}
	

}
