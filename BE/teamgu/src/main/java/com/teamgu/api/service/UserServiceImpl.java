package com.teamgu.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.TokenResDto;
import com.teamgu.common.auth.JwtUserDetailsService;
import com.teamgu.common.util.JwtTokenUtil;
import com.teamgu.database.entity.User;
import com.teamgu.database.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtUserDetailsService userDetailsService;

	@Override
	public Optional<User> getUserByEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public boolean save(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		if (userRepository.save(user) == null)
			return false;
		return true;
	}

	/**
	 * refresh 토큰 저장 함수
	 */
	@Override
	public void setRefreshToken(String refreshToken, User user) {
		user.setRefreshToken(refreshToken);
		userRepository.save(user);
	}
	
	/**
	 * login 함수
	 */
	@Override
	public LoginResDto login(LoginReqDto loginReq, User user) {
		// 1) accessToken 생성
		String accessToken = jwtTokenUtil.getAccessToken(user);
		// 2) refreshToken 생성, 저장
		String refreshToken = jwtTokenUtil.getRefreshToken();
		setRefreshToken(refreshToken, user);
		// 3) user정보
		LoginResDto loginRes = new LoginResDto();
		loginRes.setStatusCode(200);
		loginRes.setMessage("Success");
		loginRes.setRefreshToken(refreshToken);
		loginRes.setAccessToken(accessToken);
		loginRes.setUserInfo(user);
		return loginRes;
	}
	
	/**
	 * 토큰 재생성 함수
	 */
	@Override
	public TokenResDto reissue(TokenReqDto tokenReq) {

		// 1) refresh toekn 검증
		if (!jwtTokenUtil.validateToken(tokenReq.getRefreshToken())) {
			throw new RuntimeException("Refresh Token이 만료되었습니다.");
		}

		// 2) 권한(member id)가져오기
		Authentication authentication = jwtTokenUtil.getAuthentication(tokenReq.getAccessToken());

		// 3.Member ID 로 Refresh Token 값 가져오기 
		User user = userRepository.findByEmail(authentication.getName()).get();
		String refreshToken = user.getRefreshToken(); 
		if(refreshToken == null) new RuntimeException("로그아웃 된 사용자입니다.");
		
		// 4. Refresh Token 일치하는지 검사
		if (!refreshToken.equals(tokenReq.getRefreshToken())) {
			throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
		}
		// 5. 새로운 토큰 생성
		TokenResDto tokenDto = new TokenResDto();
		tokenDto.setAccessToken(jwtTokenUtil.getAccessToken(user));
		String newRefreshToken = jwtTokenUtil.getRefreshToken();
		tokenDto.setRefreshToken(newRefreshToken);
		// 6. 저장소 정보 업데이트
		setRefreshToken(newRefreshToken, user);

		// 토큰 발급
		return tokenDto;
	}
	
	
	
	

}
