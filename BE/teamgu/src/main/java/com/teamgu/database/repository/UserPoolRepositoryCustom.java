package com.teamgu.database.repository;

import com.teamgu.api.dto.req.UserPoolReqDto;

import java.util.List;

/**
 * UserPool 커스텀 쿼리 인터페이스
 */
public interface UserPoolRepositoryCustom {
    List<Object[]> findUsersByFilter(UserPoolReqDto userPoolReqDto);
}
