package com.teamgu.api.dto.res;

import com.teamgu.database.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "로그인 응답 모델")
public class LoginResDto extends BaseResDto {
	@ApiModelProperty(name="access 토큰", example = "")
	String accessToken;
	@ApiModelProperty(name="refresh 토큰", example = "")
	String refreshToken;
	@ApiModelProperty(name="유저 정보", example = "")
	User userInfo;
	
	public LoginResDto() {}
	
	public LoginResDto(int statusCode, String message, String accessToken,String refreshToken, User userInfo) {
		super(statusCode, message);
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.userInfo = userInfo;
	}
	
	
}
