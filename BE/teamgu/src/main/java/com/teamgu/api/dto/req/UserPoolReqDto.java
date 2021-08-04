package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(description = "인력풀 검색 Request 모델")
public class UserPoolReqDto {
    @ApiModelProperty(name = "검색 하는 사람의 프로젝트 코드(동일한 프로젝트 내에서만 검색되게 함)", example = "")
    private int project;

    @ApiModelProperty(name = "검색 대상의 지역 코드", example = "")
    private List<Integer> region;

    @ApiModelProperty(name = "검색 대상의 포지션 코드", example = "")
    private List<Integer> position;

    @ApiModelProperty(name = "검색 대상의 트랙 코드", example = "")
    private List<Integer> track;

    @ApiModelProperty(name = "검색 대상의 스킬 코드", example = "")
    private List<Integer> skills;

    @ApiModelProperty(name = "검색 대상의 전공 여부", example = "")
    private short isMajor;

    @ApiModelProperty(name = "검색 대상의 이름", example = "")
    private String name;
}
