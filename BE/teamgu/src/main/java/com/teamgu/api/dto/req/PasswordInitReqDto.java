package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "비밀번호 변경 요청 Dto")
public class PasswordInitReqDto {

    @ApiModelProperty(name = "email")
    String email;
}
