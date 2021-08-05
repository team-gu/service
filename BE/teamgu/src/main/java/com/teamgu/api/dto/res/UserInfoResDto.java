package com.teamgu.api.dto.res;

import java.util.List;

import com.teamgu.database.entity.UserInfoAward;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "사용자 정보 응답 모델")
public class UserInfoResDto {
	@ApiModelProperty(name = "user index number")
	Long id;
	@ApiModelProperty(name = "user name")
	String name;
	@ApiModelProperty(name = "user profile image path", example =  " ~.jpg / ~.png")
	String img;
	@ApiModelProperty(name = "user email", example = "idea@naver.com")
	String email;
	@ApiModelProperty(name = "studentNumber", example = "0546419")
	String studentNumber;
	@ApiModelProperty(name = "studentMajor", example = "0 : default, 1 : 전공자, 2: 비전공자")
	short major;
	@ApiModelProperty(name = "role", example = "0:퇴소자, 1:교육생, 2:관리자, 3:총관리자")
	short role;
	@ApiModelProperty(name = "wishPositionCode", example = "101")
	String wishPositionCode;
	@ApiModelProperty(name = "wishTrack")
	List<String> wishTrack;
	@ApiModelProperty(name = "introduce", example = "안녕하세요! 할말이 없어요!")
	String introduce;
	@ApiModelProperty(name = "skill")
	List<String> skills;
	@ApiModelProperty(name = "project")
	List<UserInfoProjectResDto> projects;
	@ApiModelProperty(name = "awards")
	List<UserInfoAwardResDto> awards;
	@ApiModelProperty(name = "userClass", example = "name = 2반, regionName = 서울")
	UserClassResDto userClass;
	@ApiModelProperty(name = "userProjectCodes", example = "[101, 102, 103]")
	List<Integer> projectCodes;
}
