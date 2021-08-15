package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "교육생 프로젝트 반 추가 요청 모델")
public class StdClassReqDto {

	@ApiModelProperty(name = "project id")
	Long projectId;
	
	@ApiModelProperty(name = "project student class name")
	String className;
}
