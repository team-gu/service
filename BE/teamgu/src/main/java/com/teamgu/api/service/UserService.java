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

    boolean save(User user);

    void setRefreshToken(String refreshToken, User user);

    LoginResDto login(LoginReqDto loginReq, User user);

    Optional<TokenResDto> reissue(TokenReqDto tokenReq);

    //비밀번호 변경
    boolean changePassword(PasswordReqDto passwordReq);

    //임시 비밀번호 발급
    short initPassword(String email);

    //임시 비밀번호로 로그인시 원본 비번은 폐기, 임시 -> 원본 비밀번호로 변경
    void modifyOriginPwd(User user, String tempPwd);

    // Email을 이용한 User Entity 조회
    Optional<User> getUserByEmail(String email);

    // Id를 이용한 User Entity 조회
    Optional<User> getUserById(Long id);

    // User 상세 정보 조회
    UserInfoResDto getUserDetailInfo(Long userId);

    // 교육생의 개인 세부 이력 수정
    UserInfoResDto updateUserDetailInfo(UserInfoReqDto userInfoReq);

    // 교육생의 개인 프로젝트 이력을 입력
    List<UserInfoProjectResDto> insertUserInfoProject(UserInfoProjectResDto userInfoProjectResDto);

    // 교육생의 개인 프로젝트 이력을 수정
    List<UserInfoProjectResDto> updateUserInfoProject(UserInfoProjectResDto userInfoProjectResDto);

    // 교육생의 개인 프로젝트 이력을 삭제
    void deleteUserInfoProject(Long id);

    // 교육생의 개인 수상내역 이력을 입력
    List<UserInfoAwardResDto> insertUserInfoAward(UserInfoAwardResDto userInfoAwardResDto);

    // void setProjectInfo(List<ProjectReqDto> projectInfoReq);

    // 교육생의 개인 수상내역 이력을 수정
    List<UserInfoAwardResDto> updateUserInfoAward(UserInfoAwardResDto userInfoAwardResDto);

    // void setAwardInfo(List<AwardReqDto> awardReqDto);

    // 교육생의 개인 프로젝트 이력을 삭제
    void deleteUserInfoAward(Long id);

    //토큰 기반으로 spa에서 초기화된 상태정보 재요청
    LoginResDto reqInfo(String token);

    //토큰 기반으로 로그아웃 요청한 사용자의 정보 분석
    String getInfoOfJwt(String auth);

    /**
     * N명의 유저를 한 번에 가입 시킨다
     * 이 기능은 관리자만 수행 가능하다
     * @param users
     * @return
     */
    boolean saveAll(List<User> users);
}
