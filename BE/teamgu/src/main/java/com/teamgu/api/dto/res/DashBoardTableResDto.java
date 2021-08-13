package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "Dash Board Table Response Model")
public class DashBoardTableResDto {

	@ApiModelProperty(name = "학번", example = "0510000")
	String studentNumber;

	@ApiModelProperty(name = "이름", example = "김싸피")
	String name;
	
	@ApiModelProperty(name = "이메일", example = "ssafy@ssafy.com")
	String email;
	
	@ApiModelProperty(name = "지역", example = "서울")
	String region;
	
	@ApiModelProperty(name = "교육생 반", example = "서울 2반")
	String studentClass;
	
	@ApiModelProperty(name = "팀 구성 여부", example = "O")
	String teamYn;
	
	@ApiModelProperty(name = "팀 번호", example = "45")
	Long teamId;
	
	@ApiModelProperty(name = "팀장 여부", example = "O")
	String leaderYn;
	
	@ApiModelProperty(name = "전공/비전공", example = "전공")
	String major;
	
	@ApiModelProperty(name = "희망 포지션", example = "Front")
	String position;
}
