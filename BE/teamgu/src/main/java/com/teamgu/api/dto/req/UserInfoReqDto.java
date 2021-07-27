package com.teamgu.api.dto.req;

import java.util.ArrayList;

import com.teamgu.database.entity.UserAward;
import com.teamgu.database.entity.UserProject;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "사용자 정보 요청 모델")
public class UserInfoReqDto {
	@ApiModelProperty(name = "password", example = "새로운 비밀번호")
	String password;
	@ApiModelProperty(name = "studentNumber", example = "0546419")
	String studentNumber;
	@ApiModelProperty(name = "wishPosition", example = "front-end")
	String wishPosition;
	@ApiModelProperty(name = "wishTrack", example = "{101, 102}")
	ArrayList<String> wishTrack;
	@ApiModelProperty(name = "introduce", example = "안녕하세요! 할말이 없어요!")
	ArrayList<String> introduce;
	@ApiModelProperty(name = "skillCode", example = "{101, 102}")
	ArrayList<String> skillCode;
	@ApiModelProperty(name = "project", example = "프로젝트 내역")
	ArrayList<UserProject> projects;
	@ApiModelProperty(name = "awards", example = "수상 내역")
	ArrayList<UserAward> awards;
	
}
