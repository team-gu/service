package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(description = "인력풀 검색 Response 모델")
public class UserPoolResDto {
    @ApiModelProperty(name = "유저 id")
    private Long id;

    @ApiModelProperty(name = "유저 이름")
    private String name;

    @ApiModelProperty(name = "자기소개")
    private String introduce;

    @ApiModelProperty(name = "프로필 이미지 파일명")
    private String fileName;

    @ApiModelProperty(name = "프로필 이미지 확장자")
    private String extension;

    @ApiModelProperty(name = "원하는 트랙 리스트")
    private List<String> trackList;

    @ApiModelProperty(name = "유저의 스킬 리스트")
    private List<String> skillList;
}
