package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@ApiModel(description = "프로젝트 정보 등록, 수정 모델")
public class ProjectReqDto {

	@ApiModelProperty(name = "email", example = "팀구")
	String email;
	@ApiModelProperty(name = "project name", example = "팀구")
	String name;
	@ApiModelProperty(name = "position", example = "Back")
	String position;
	@ApiModelProperty(name = "프로젝트 소개", example = "팀빌딩 싸비스")
	String introduce;
	@ApiModelProperty(name = "프로젝트 url", example = "teamgu.com")
	String url;
	
}
