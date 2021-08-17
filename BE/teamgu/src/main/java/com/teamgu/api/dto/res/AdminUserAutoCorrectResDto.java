package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "관리자 유저 검색 자동 완성 응답 모델")
public class AdminUserAutoCorrectResDto {
	
	@ApiModelProperty(name = "사용자 index", example ="1")
	Long id;
	
	@ApiModelProperty(name = "사용자 학번", example ="0540001")
	String studentNumber;
	
	@ApiModelProperty(name = "사용자 이름", example = "김싸피")
	String name;
	
	@ApiModelProperty(name = "사용자 email", example = "ssafy@ssafy.com")
	String email;

}
