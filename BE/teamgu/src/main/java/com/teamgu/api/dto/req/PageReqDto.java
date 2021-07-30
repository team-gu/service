package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel
/**
 * Swagger에서 사용된 Pageable 클래스와 매핑되는 커스텀 DTO
 */
public class PageReqDto {
    @ApiModelProperty(value = "페이지 번호(0 ... N)")
    private Integer page;

    @ApiModelProperty(value = "페이지 크기(0 ... 100)", allowableValues = "range[0, 100]")
    private Integer size;

    @ApiModelProperty(value = "정렬(사용법: 컬럼명,ASC|DESC)")
    private List<String> sort;
}
