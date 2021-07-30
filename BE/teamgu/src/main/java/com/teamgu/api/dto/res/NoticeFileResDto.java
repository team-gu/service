package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("NoticeFileResponse")
/**
 * NoticeFile 엔티티에 대응되는 DTO
 * File관련 I/O 조작에 사용된다
 */
public class NoticeFileResDto {

    @ApiModelProperty(name = "파일 원본명", example = "")
    String originalName;

    @ApiModelProperty(name = "암호화된 파일명", example = "")
    String name;

    @ApiModelProperty(name = "파일 화장자", example = "")
    String extension;

    @ApiModelProperty(name = "파일 등록일", example = "")
    String registDate;
}
