package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "팀 구성 가능 여부 응답 모델")
public class TeamIsCreateResDto {
		
	@ApiModelProperty(name = "팀 보유 여부", example="False")
	boolean hasTeam;
	
	@ApiModelProperty(name = "팀 보유 시 해당 팀 정보")
	TeamListResDto team;

	public TeamIsCreateResDto(boolean hasTeam, TeamListResDto team) {
		this.hasTeam = hasTeam;
		this.team = team;
	}
	
}
