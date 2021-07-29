package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel("NoticeListResponse")
public class NoticeListResDto { //초기 공지사항 리스트를 보내줄때 필요한 최소한의 정보만 리턴
    @ApiModelProperty(name = "공지사항 번호", example = "")
    long id;

    @ApiModelProperty(name = "공지사항 제목", example = "")
    String title;

    @ApiModelProperty(name = "공지사항 생성일", example = "")
    String date;
}
