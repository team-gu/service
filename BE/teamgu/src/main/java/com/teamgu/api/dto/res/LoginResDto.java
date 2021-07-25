package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginResponse")
public class LoginResDto extends BaseResDto {
	@ApiModelProperty(name="access 토큰", example = "")
	String accessToken;
	@ApiModelProperty(name="refresh 토큰", example = "")
	String refreshToken;
	public LoginResDto() {}
	
	public LoginResDto(int statusCode, String message, String accessToken,String refreshToken) {
		super(statusCode, message);
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
	
	
}
