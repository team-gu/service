package com.teamgu.database.repository;

import com.teamgu.api.dto.req.UserPoolNameReqDto;
import com.teamgu.api.dto.req.UserPoolPageReqDto;
import com.teamgu.api.dto.res.UserPoolNameResDto;

import java.util.List;

/**
 * UserPool 커스텀 쿼리 인터페이스
 */
public interface UserPoolRepositoryCustom {
    List<Object[]> findUsersByFilter(UserPoolPageReqDto userPoolPageReqDto);
    List<Object[]> findUsersBySimName(UserPoolNameReqDto userPoolNameReqDto);
    long getUserClassId();
}
