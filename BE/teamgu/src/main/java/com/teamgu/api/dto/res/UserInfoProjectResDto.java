package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoProjectResDto {

	@ApiModelProperty(name = "프로젝트 고유 index")
	Long id;
	@ApiModelProperty(name = "프로젝트 이름")
	String name;
	@ApiModelProperty(name = "프로젝트 포지션")
	String position;
	@ApiModelProperty(name = "프로젝트 url")
	String url;
	@ApiModelProperty(name = "프로젝트 소개")
	String introduce;
	@ApiModelProperty(name = "User 고유 index")
	Long userId;

	public UserInfoProjectResDto() {
	}

	public UserInfoProjectResDto(Long id, String name, String position, String url, String introduce, Long userId) {
		this.id = id;
		this.name = name;
		this.position = position;
		this.url = url;
		this.introduce = introduce;
		this.userId = userId;
	}

}
