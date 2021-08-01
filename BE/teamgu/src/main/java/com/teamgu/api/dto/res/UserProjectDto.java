package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProjectDto {
	
	@ApiModelProperty(name = "프로젝트 이름")
	String name;
	@ApiModelProperty(name = "프로젝트 포지션")
	String position;
	@ApiModelProperty(name = "프로젝트 url")
	String url;
	@ApiModelProperty(name = "프로젝트 소개")
	String introduce;
	
}
