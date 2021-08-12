package com.teamgu.api.dto.res;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "관리자 DashBoard Status Response Model")
public class DashBoardDetailResDto {
	

	@ApiModelProperty(name = "data 이름", example = "서울")
	String title;
	
	@ApiModelProperty(name = "data")
	DashBoardDetailInfoResDto data;

	public DashBoardDetailResDto(String title, DashBoardDetailInfoResDto data) {
		this.title = title;
		this.data = data;
	}
	
}
