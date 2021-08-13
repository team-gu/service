package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "관리자 DashBoard Status Response Model")
public class DashBoardDetailResDto {
	

	@ApiModelProperty(name = "data 이름", example = "서울")
	String title;
	
	@ApiModelProperty(name = "data")
	DashBoardDetailInfoResDto data;
	
}
