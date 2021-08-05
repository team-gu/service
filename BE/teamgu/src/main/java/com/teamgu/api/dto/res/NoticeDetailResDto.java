package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@ApiModel("NoticeDetailResponse")
/**
 * 공지사항의 세부 내용을 담기 위한 DTO 클래스
 */
public class NoticeDetailResDto {
    @ApiModelProperty(name = "공지사항 생성일")
    String createDate;

    @ApiModelProperty(name = "공지사항 수정일")
    String modifyDate;

    @ApiModelProperty(name = "공지사항 제목")
    String title;

    @ApiModelProperty(name = "공지사항 내용")
    String content;

    @ApiModelProperty(name = "공지사항 첨부파일 목록")
    private List<NoticeFileResDto> noticeFiles;
}
