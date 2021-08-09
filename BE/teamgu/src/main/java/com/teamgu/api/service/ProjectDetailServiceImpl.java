package com.teamgu.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.req.UserChatSearchReqDto;
import com.teamgu.api.dto.res.UserChatSearchResDto;
import com.teamgu.database.repository.ProjectDetailRepository;
import com.teamgu.database.repository.ProjectDetailRepositorySupport;

@Service("projectDetailService")
public class ProjectDetailServiceImpl implements ProjectDetailService{
	@Autowired
	ProjectDetailRepositorySupport projectDetailRepositorySupport;
	
	@Override
	public List<UserChatSearchResDto> autoUserChatSearch(UserChatSearchReqDto userChatSearchReqDto) {
		String studentNumber = userChatSearchReqDto.getStudentNumber(); //학번
		int projectCode = userChatSearchReqDto.getProject_code();		//프로젝트코드
		int stage = Integer.parseInt(studentNumber.substring(0,2));		//기수
		long myid = userChatSearchReqDto.getMyid();
		// 1. 현재 기수 + 프로젝트 코드 = 현재 진행중인 프로젝트 도메인에 해당 -> project_detail id값을 도출
		// 2. user_project_detail에서 소속된 유저들의 id를 가져옴		
		// 3. 해당 유저들의 id, name, email값을 가져옴. **단, 자기 자신은 제외함**
		List<UserChatSearchResDto> res = projectDetailRepositorySupport.findByStageCodeAndProjectCode(myid, stage, projectCode);
		return res;
	}
}
