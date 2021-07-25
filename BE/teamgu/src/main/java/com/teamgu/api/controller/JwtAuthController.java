package com.teamgu.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.common.auth.JwtUserDetailsService;
import com.teamgu.common.auth.TeamguUserDetails;
import com.teamgu.common.util.JwtTokenUtil;
import com.teamgu.database.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.models.responses.ApiResponse;

@Api(value = "인증(로그인, 로그아웃) API", tags = { "Auth." })
@RestController
@RequestMapping("/api/auth")
public class JwtAuthController {

	@Autowired
	UserServiceImpl userService;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@PostMapping("/signIn")
	public ResponseEntity<ApiResponse> signIn(
			@RequestBody @ApiParam(value = "회원가입 정보(email,pw)", required = true) LoginReqDto loginReq) {
		String email = loginReq.getEmail();
		String password = loginReq.getPassword();
		User user = User.builder().email(email).password(password).build();
		userService.save(user);

		return new ResponseEntity<>(new ApiResponse(), HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResDto>  login(@RequestBody @ApiParam(value = "로그인 정보(email,pw)", required = true) LoginReqDto loginReq) {
		String email = loginReq.getEmail();
		String password = loginReq.getPassword();
		
		User user = userService.getUserByEmail(email).get();
		
		if(passwordEncoder.matches(password, user.getPassword())) {
		
			String accessToken = jwtTokenUtil.getAccessToken(email);
			String refreshToken = jwtTokenUtil.getRefreshToken(email);
			
			return ResponseEntity.ok(new LoginResDto(200, "Success", accessToken, refreshToken));
		}
		return ResponseEntity.status(401).body(new LoginResDto(401,"Invalid Password",null,null));
	}

	private void authenticate(String email, String password) {
		System.out.println("authemticate method");
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			System.out.println("done");
		} catch (DisabledException ex) {
			System.out.println("disable");
			throw new DisabledException("USER_DISABLED", ex);
		} catch (BadCredentialsException ex) {
			System.out.println("bad");
			throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
		}
	}

}
