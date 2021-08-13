package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "관리자 DashBoard Status Response Model")
public class DashBoardDetailInfoResDto {

	@ApiModelProperty(name = "총 인원")
	int total;

	@ApiModelProperty(name = "팀 구성중이지 않은 사람")
	int before;
	
	@ApiModelProperty(name = "팀을 구성하고 있는 사람")
	int doing;
	
	@ApiModelProperty(name = "팀을 구성한 사람")
	int after;
	
	@ApiModelProperty(name = "구성중인 팀")
	int doingTeam;
	
	@ApiModelProperty(name = "구성된 팀")
	int afterTeam;

}
