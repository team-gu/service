package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "교육생 프로젝트 관리 요청 모델")
public class AdminUserProjectManagementReqDto {
	
	@ApiModelProperty(name = "교육생 Id", example = "1")
	Long userId;
	
	@ApiModelProperty(name = "프로젝트 Id", example = "1")
	Long projectId;
}
