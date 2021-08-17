package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(description = "팀 검색 Response 페이지")
public class TeamPageResDto {

    @ApiModelProperty(name = "필터링된 팀의 정보들")
    private List<TeamListResDto> dataList;

    @ApiModelProperty(name = "전체 페이지 개수")
    private int totPageCnt;
}
