package com.teamgu.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.UserChatSearchReqDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.UserChatSearchResDto;
import com.teamgu.api.service.ProjectDetailService;
import com.teamgu.api.service.ProjectDetailServiceImpl;
import com.teamgu.api.service.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;

@Api(value = "유저 자동 검색 기능")
@RestController
@CrossOrigin("*")
@RequestMapping("/api/auto")
@Log4j2
public class SearchController {
	@Autowired
	ProjectDetailServiceImpl projectDetailService;
	
	@PostMapping("/chat")
	@ApiOperation(value="채팅창에서 나와 동일한 기수, 프로젝트 도메인인 유저들을 조회한다")
	public ResponseEntity<? extends BasicResponse> getChatUserList(@RequestBody UserChatSearchReqDto userChatSearchReqDto){
		List<UserChatSearchResDto> res = projectDetailService.autoUserChatSearch(userChatSearchReqDto);
		return ResponseEntity.ok(new CommonResponse<List<UserChatSearchResDto>>(res));
	}
}
