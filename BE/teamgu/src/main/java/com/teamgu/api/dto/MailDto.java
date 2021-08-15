package com.teamgu.api.dto;

import lombok.Builder;
import lombok.Data;

/**
 * 메일 전송에 사용될 dto
 */
@Data
@Builder
public class MailDto {

    //받는 사람의 메일주소
    private String address;

    //메일의 제목
    private String title;

    //메일의 내용
    private String message;

    //첨부할 첨부파일
    //private MultipartFile multipartFile;
}
