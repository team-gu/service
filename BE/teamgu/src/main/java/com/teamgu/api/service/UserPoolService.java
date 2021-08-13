package com.teamgu.api.service;

import com.teamgu.api.dto.req.UserPoolNameReqDto;
import com.teamgu.api.dto.req.UserPoolPageReqDto;
import com.teamgu.api.dto.res.UserPoolNameResDto;
import com.teamgu.api.dto.res.UserPoolPageResDto;

import java.util.List;

/**
 * UserPool service layer
 */
public interface UserPoolService {
    /**
     * Request로 들어오는 필터 조건들을 기반으로 하여 유저 목록을 필터링해 Response해주는 Service
     * 
     * @param userPoolPageReqDto
     * @return
     */
    UserPoolPageResDto findUsersByFilter(UserPoolPageReqDto userPoolPageReqDto);

    /**
     * Request로 들어오는 유저 이름 or 유저 이메일을 기반으로 해당하는 유저목록을 보내주는 Service
     * 이를 통해 FE 측에서 자동완성 가능
     *
     * @param userPoolNameReqDto
     * @return
     */
    List<UserPoolNameResDto> findUsersBySimName(UserPoolNameReqDto userPoolNameReqDto);
}
