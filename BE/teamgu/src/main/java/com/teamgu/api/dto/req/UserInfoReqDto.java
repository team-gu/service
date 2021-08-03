package com.teamgu.api.dto.req;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "사용자 정보 요청 모델")
public class UserInfoReqDto {
	@ApiModelProperty(name = "user email", example = "idea@naver.com")
	String email;

	@ApiModelProperty(name = "studentNumber", example = "0546419")
	String studentNumber;
	@ApiModelProperty(name = "wishPosition", example = "101")
	int wishPosition;
	@ApiModelProperty(name = "wishTrack")
	List<String> wishTrack;
	@ApiModelProperty(name = "introduce", example = "안녕하세요! 할말이 없어요!")
	String introduce;
	@ApiModelProperty(name = "skill")
	List<String> skill;
	
}
