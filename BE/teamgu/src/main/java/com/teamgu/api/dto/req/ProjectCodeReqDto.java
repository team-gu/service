package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "관리자 Code 요청 모델")
public class ProjectCodeReqDto {

	@ApiModelProperty(name = "codeId")
	String codeId;

	@ApiModelProperty(name = "code")
	int code;
	
	@ApiModelProperty(name = "codeName")
	String codeName;

}
