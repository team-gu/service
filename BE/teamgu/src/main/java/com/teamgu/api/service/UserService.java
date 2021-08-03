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
import com.teamgu.api.dto.res.UserInfoAwardResDto;
import com.teamgu.api.dto.res.UserInfoProjectResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.database.entity.User;

/**
 * 사용자 관련 비즈니스 로직
 */
public interface UserService {
	Optional<User> getUserByEmail(String email);

	Optional<User> getUserById(Long id);

	boolean save(User user);

	void setRefreshToken(String refreshToken, User user);

	LoginResDto login(LoginReqDto loginReq, User user);

	TokenResDto reissue(TokenReqDto tokenReq);

	void setUserDetailInfo(UserInfoReqDto userInfoReq);

	void setPassward(PasswordReqDto passwordReq);

	UserInfoResDto getUserDetailInfo(String email);

	// 교육생의 개인 프로젝트 이력을 입력
	Long insertUserInfoProject(UserInfoProjectResDto userInfoProjectResDto);

	// 교육생의 개인 프로젝트 이력을 수정
	Long updateUserInfoProject(UserInfoProjectResDto userInfoProjectResDto);

	// 교육생의 개인 프로젝트 이력을 삭제
	Long deleteUserInfoProject(Long id);

	// 교육생의 개인 수상내역 이력을 입력
	Long insertUserInfoAward(UserInfoAwardResDto userInfoAwardResDto);

	// void setProjectInfo(List<ProjectReqDto> projectInfoReq);

	// 교육생의 개인 수상내역 이력을 수정
	Long updateUserInfoAward(UserInfoAwardResDto userInfoAwardResDto);

	// void setAwardInfo(List<AwardReqDto> awardReqDto);

	// 교육생의 개인 프로젝트 이력을 삭제
	Long deleteUserInfoAward(Long id);

}
