package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "로그인 요청 모델")
public class LoginReqDto {

    @ApiModelProperty(name = "user email", example = "idea@naver.com")
    String email;

    @ApiModelProperty(name = "user password", example = "your password")
    String password;

}
