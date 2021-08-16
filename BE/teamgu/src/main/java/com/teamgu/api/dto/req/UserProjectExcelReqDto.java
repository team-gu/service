package com.teamgu.api.dto.req;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("유저를 특정 프로젝트에 추가 요청하는 객체")
public class UserProjectExcelReqDto {
	Long project_id;
	MultipartFile file;
}
