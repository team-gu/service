package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@ApiModel(description = "비밀번호 변경 요청 모델")
public class PasswordReqDto {

	@ApiModelProperty(name = "user email", example = "idea@naver.com")
	String email;

	@ApiModelProperty(name = "original password")
	String oriPassword;

	@ApiModelProperty(name = "modified password")
	String modPassword;
}
