package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel("NoticeListResponse")
public class NoticeListResDto extends BaseResDto {
    @ApiModelProperty(name = "공지사항 번호", example = "")
    int id;

    @ApiModelProperty(name = "공지사항 제목", example = "")
    String title;

    @ApiModelProperty(name = "공지사항 생성일", example = "")
    String date;
}
