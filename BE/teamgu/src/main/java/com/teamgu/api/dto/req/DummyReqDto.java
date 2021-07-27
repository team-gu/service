package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@ApiModel(description = "Dummy 데이터 요청 모델")
public class DummyReqDto {
	@ApiModelProperty(name = "user email", example = "idea@naver.com")
	String email;
	@ApiModelProperty(name = "user password", example = "your password")
	String password;
	@ApiModelProperty(name = "name", example = "팀구")
	String name;
	@ApiModelProperty(name = "role", example = "1 : student")
	short role;
}
