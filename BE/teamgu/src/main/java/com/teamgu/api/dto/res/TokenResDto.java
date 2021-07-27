package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "토큰 재생성 요청 모델")
public class TokenResDto {
	@ApiModelProperty(name="access 토큰", example = "")
	String accessToken;
	@ApiModelProperty(name="refresh 토큰", example = "")
	String refreshToken;
}
