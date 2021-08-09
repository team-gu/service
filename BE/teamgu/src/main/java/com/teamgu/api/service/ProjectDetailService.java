package com.teamgu.api.service;

import java.util.List;

import com.teamgu.api.dto.req.UserChatSearchReqDto;
import com.teamgu.api.dto.res.UserChatSearchResDto;

public interface ProjectDetailService {
	
	// 검색 : 자신과 같은 기수, 프로젝트 도메인인 학생의 리스트를 반환
	List<UserChatSearchResDto> autoUserChatSearch(UserChatSearchReqDto userChatSearchReqDto);

}
