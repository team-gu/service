package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel
public class PageReqDto { //Pageable 커스텀 클래스
    @ApiModelProperty(value = "페이지 번호(0 ... N)")
    private Integer page;

    @ApiModelProperty(value = "페이지 크기(0 ... 100)", allowableValues = "range[0, 100]")
    private Integer size;

    @ApiModelProperty(value = "정렬(사용법: 컬럼명,ASC|DESC)")
    private List<String> sort;
}
