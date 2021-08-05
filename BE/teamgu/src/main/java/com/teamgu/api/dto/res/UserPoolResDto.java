package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
@ApiModel(description = "인력풀 검색 Response 모델")
public class UserPoolResDto {
    @ApiModelProperty(name = "유저 이름", example = "")
    private String name;

    @ApiModelProperty(name = "자기소개", example = "")
    private String introduce;

    @ApiModelProperty(name = "프로필 이미지 파일명", example = "")
    private String fileName;

    @ApiModelProperty(name = "프로필 이미지 확장자", example = "")
    private String extension;

    @ApiModelProperty(name = "원하는 트랙 리스트", example = "")
    private Set<String> trackList;

    @ApiModelProperty(name = "유저의 스킬 리스트", example = "")
    private Set<String> skillList;
}
