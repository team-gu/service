package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel("NoticeListResponse")
/**
 * 공지사항 목록 응답시 사용되는 DTO
 * 목적에 맞게 최소 필요 정보만 보낸다
 */
public class NoticeListResDto {
    @ApiModelProperty(name = "공지사항 번호", example = "")
    long id;

    @ApiModelProperty(name = "공지사항 제목", example = "")
    String title;

    @ApiModelProperty(name = "공지사항 생성일", example = "")
    String date;
}
