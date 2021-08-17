package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "관리자 유저 자동 완성 검색 요청 모델")
public class AdminUserAutoCorrectReqDto {

	@ApiModelProperty(name = "검색 내용", example = "싸피")
	String search;
	
	@ApiModelProperty(name = "프로젝트 index", example = "1")
	Long projectId;

}
