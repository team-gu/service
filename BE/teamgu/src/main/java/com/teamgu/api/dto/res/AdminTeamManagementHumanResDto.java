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
@ApiModel(description = "Admin Team Building Status Management Human Resource Response Model ")
public class AdminTeamManagementHumanResDto {

	@ApiModelProperty(name = "팀원 index", example = "1")
	Long userId;
	
	@ApiModelProperty(name = "팀원 이름", example = "김싸피")
	String name;
	
	@ApiModelProperty(name = "팀장 / 팀원", example = "팀원")
	String role;
	
}
