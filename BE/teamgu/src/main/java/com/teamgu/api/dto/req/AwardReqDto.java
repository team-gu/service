package com.teamgu.api.dto.req;

import java.sql.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "수상내역 등록, 수정 요청 모델")
public class AwardReqDto {
	@ApiModelProperty(name = "email", example = "teamgu@naver.com")
	String email;
	@ApiModelProperty(name = "수상명", example = "최우수상")
	String name;
	@ApiModelProperty(name = "기관", example = "삼성청년소프트웨어아카데미")
	String agency;
	@ApiModelProperty(name = "일자", example = "20200721")
	Date date;
	@ApiModelProperty(name = "설명", example = "공통프로젝트에서 팀빌딩프로젝트를 개발해 수상하였습니다.")
	String introduce;
}
