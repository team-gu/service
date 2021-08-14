package com.teamgu.api.dto;

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
@ApiModel(description = "관리자가 Excel을 사용해 유저를 추가할 때 사용하는 모델")
public class UserRegistDto {
	@ApiModelProperty(name = "이메일")
	String email;
	@ApiModelProperty(name = "이름")
	String name;
	@ApiModelProperty(name = "학번")
	String studentNumber;	
	@ApiModelProperty(name = "전공 여부(전공1,비전공2,그 외 0)")
	Long major;
}
