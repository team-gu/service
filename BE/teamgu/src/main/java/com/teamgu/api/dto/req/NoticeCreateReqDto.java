package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data //Data 어노테이션을 통해 아래 어노테이션 추가됨
// @Getter, @Setter, @ToString, @RequiredArgsConstructor, @EqualsAndHashCode
@ApiModel(description = "공지사항 요청 요청 모델")
public class NoticeCreateReqDto {
    @ApiModelProperty(name = "유저의 id값", example = "")
    private Long userId;

    @ApiModelProperty(name = "공지사항 제목", example = "")
    private String title;

    @ApiModelProperty(name = "공지사항 내용", example = "")
    private String content;

    @ApiModelProperty(name = "첨부파일들", example = "")
    private List<MultipartFile> noticeFiles;
}
