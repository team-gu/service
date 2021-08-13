package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(description = "인력풀 검색 Response 페이지")
public class UserPoolPageResDto {

    @ApiModelProperty(name = "필터링된 유저의 정보들")
    private List<UserPoolResDto> dataList;

    @ApiModelProperty(name = "전체 페이지 개수")
    private int totPageCnt;
}
