package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "팀 구성 가능 여부 요청 모델")
public class TeamIsCreateReqDto {
	
	@ApiModelProperty(name = "user Index", example = "1")
	Long userId;
	
	@ApiModelProperty(name = "project code and name")
	TrackReqDto project;

}
