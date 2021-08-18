package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "자동 검색 요청 모델")
public class TeamAutoCorrectReqDto {
	
	@ApiModelProperty(name = "검색 내용", example = "안석현")
	String search;
	
	@ApiModelProperty(name = "학번", example = "0540001")
	String studentNumber;
	
	@ApiModelProperty(name = "프로젝트 코드", example = "101")
	int projectCode;
	
}
