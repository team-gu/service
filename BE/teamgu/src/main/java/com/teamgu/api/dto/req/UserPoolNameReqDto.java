package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserPoolNameReqDto {

    @ApiModelProperty(name = "검색 하는 사람의 프로젝트 코드(동일한 프로젝트 내에서만 검색되게 함)", example = "")
    private int project;

    @ApiModelProperty(name = "검색 대상의 지역 코드")
    private List<Integer> region;

    @ApiModelProperty(name = "검색 대상의 포지션 코드")
    private List<Integer> position;

    @ApiModelProperty(name = "검색 대상의 트랙 코드")
    private List<Integer> track;

    @ApiModelProperty(name = "검색 대상의 스킬 코드")
    private List<Integer> skills;

    @ApiModelProperty(name = "검색 대상의 전공 여부")
    private short isMajor;

    @ApiModelProperty(name = "검색 대상의 이메일 or 이름") //프론트 측에서는 이름처럼 보이게 하고 실제 들어오는 데이터는 이메일
    private String target;

    @ApiModelProperty(name = "검색하는 사람의 학번", example = "0503050")
    private String studentNumber;

}
