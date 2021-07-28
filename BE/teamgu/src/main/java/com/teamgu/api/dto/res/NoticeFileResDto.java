package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeFileResponse")
public class NoticeFileResDto extends BaseResDto {
    @ApiModelProperty(name = "파일 원본명", example = "")
    String originalName;

    @ApiModelProperty(name = "암호화된 파일명", example = "")
    String name;

    @ApiModelProperty(name = "파일 화장자", example = "")
    String extension;

    @ApiModelProperty(name = "파일 등록일", example = "")
    String date;
}
