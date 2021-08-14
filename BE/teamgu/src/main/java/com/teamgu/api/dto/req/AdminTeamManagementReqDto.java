package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "Admin Team Building Status Management Reqeust Model ")
public class AdminTeamManagementReqDto {
	
	@ApiModelProperty(name = "project_detail Id", example = "1")
	Long projectId;

	@ApiModelProperty(name = "지역 코드", example = "104")
	int regionCode;

}
