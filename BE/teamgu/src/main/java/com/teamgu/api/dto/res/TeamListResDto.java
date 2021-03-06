package com.teamgu.api.dto.res;


import java.util.List;

import com.teamgu.api.dto.req.TrackReqDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "팀 조회 응답 모델")
public class TeamListResDto {

	@ApiModelProperty(name = "프로젝트 고유 번호")
	Long id;	
	
	@ApiModelProperty(name = "프로젝트 팀 명", example="웹 디자인")
	String name;
		
	@ApiModelProperty(name = "프로젝트 팀 소개", example="안녕하세요! 웹 디자인을 하려고 하는 팀입니다!")
	String introduce;
		
	@ApiModelProperty(name = "프로젝트 구성 완료 여부", example="0" )
	short completeYn;
	
	@ApiModelProperty(name = "팀장 유저의 고유 번호", example = "5")
	Long leaderId;
	
	@ApiModelProperty(name = "트랙명", example = "웹 디자인")
	TrackReqDto track;

	@ApiModelProperty(name = "프로젝트 구성원 정보")
	List<TeamMemberInfoResDto> teamMembers;
	
	@ApiModelProperty(name = "팀 기술스택 정보")
	List<SkillResDto> skills;
	
}
