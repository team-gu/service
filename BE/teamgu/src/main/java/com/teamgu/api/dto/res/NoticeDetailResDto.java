package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("NoticeDetailResponse")
public class NoticeDetailResDto extends BaseResDto {
    @ApiModelProperty(name = "공지사항 생성일", example = "")
    String createDate;

    @ApiModelProperty(name = "공지사항 수정일", example = "")
    String modifyDate;

    @ApiModelProperty(name = "공지사항 제목", example = "")
    String title;

    @ApiModelProperty(name = "공지사항 내용", example = "")
    String content;

    @ApiModelProperty(name = "공지사항 첨부파일 목록", example = "")
    private List<NoticeFileResDto> noticeFiles = new ArrayList<>();
}
