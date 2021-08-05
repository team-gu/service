package com.teamgu.api.service;

import com.teamgu.api.dto.req.UserPoolReqDto;
import com.teamgu.api.dto.res.UserPoolResDto;

import java.util.List;

public interface UserPoolService {
    List<UserPoolResDto> findUsersByFilter(UserPoolReqDto userPoolReqDto);
}
