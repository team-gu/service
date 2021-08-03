package com.teamgu.api.dto.res;

import java.util.Date;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoAwardResDto {

	@ApiModelProperty(name = "수상 이름")
	String name;
	@ApiModelProperty(name = "수상 기관")
	String agency;
	@ApiModelProperty(name = "수상일")
	Date date;
	@ApiModelProperty(name = "수상 내용")
	String introduce;

	public UserInfoAwardResDto() {
	}

	public UserInfoAwardResDto(String name, String agency, Date date, String introduce) {
		this.name = name;
		this.agency = agency;
		this.date = date;
		this.introduce = introduce;
	}

}
