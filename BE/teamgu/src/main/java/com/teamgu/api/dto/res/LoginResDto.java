package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "로그인 응답 모델")
public class LoginResDto extends BaseResDto {

    @ApiModelProperty(name = "access 토큰", example = "")
    String accessToken;

    @ApiModelProperty(name = "유저 정보", example = "")
    UserInfoResDto userInfo;

    public LoginResDto(int statusCode, String message, String accessToken, UserInfoResDto userInfo) {
        super(statusCode, message);
        this.accessToken = accessToken;
        this.userInfo = userInfo;
    }
}
