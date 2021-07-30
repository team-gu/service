package com.teamgu.api.dto.res;

import java.util.List;

import com.teamgu.database.entity.UserAward;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "사용자 정보 응답 모델")
public class UserInfoResDto {
	@ApiModelProperty(name = "user email", example = "idea@naver.com")
	String email;
	@ApiModelProperty(name = "password", example = "새로운 비밀번호")
	String password;
	@ApiModelProperty(name = "studentNumber", example = "0546419")
	String studentNumber;
	@ApiModelProperty(name = "wishPositionCode", example = "101")
	String wishPositionCode;
	@ApiModelProperty(name = "wishTrack")
	List<String> wishTrack;
	@ApiModelProperty(name = "introduce", example = "안녕하세요! 할말이 없어요!")
	String introduce;
	@ApiModelProperty(name = "skill")
	List<String> skill;
	@ApiModelProperty(name = "project")
	List<UserProjectDto> projects;
	@ApiModelProperty(name = "awards")
	List<UserAward> awards;
	
}
