package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@ApiModel(description = "인력풀 이름 자동완성 Response 모델")
public class UserPoolNameResDto {
    @ApiModelProperty(name = "유저 id")
    private Long id;

    @ApiModelProperty(name = "유저 프로필 이미지 링크")
    private String profileSrc;

    @ApiModelProperty(name = "유저 이름")
    private String name;

    @ApiModelProperty(name = "유저 email")
    private String email;

//    public UserPoolNameResDto(Long id, String profileSrc, String name, String email) {
//        this.id = id;
//        this.profileSrc = "https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/" + profileSrc;
//        this.name = name;
//        this.email = email;
//    }
}
