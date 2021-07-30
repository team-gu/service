package com.teamgu.api.service;

import java.util.List;
import java.util.Optional;

import com.teamgu.api.dto.req.AwardReqDto;
import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.PasswordReqDto;
import com.teamgu.api.dto.req.ProjectReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.TokenResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.database.entity.User;

/**
 * 사용자 관련 비즈니스 로직
 */
public interface UserService {
	Optional<User> getUserByEmail(String email);

	boolean save(User user);

	void setRefreshToken(String refreshToken, User user);

	LoginResDto login(LoginReqDto loginReq, User user);

	TokenResDto reissue(TokenReqDto tokenReq);

	void setUserDetailInfo(UserInfoReqDto userInfoReq);

	void setProjectInfo(List<ProjectReqDto> projectInfoReq);

	void setAwardInfo(List<AwardReqDto> awardReqDto);
	
	void setPassward(PasswordReqDto passwordReq);
	
	UserInfoResDto getUserDetailInfo(String email);
	 
}
