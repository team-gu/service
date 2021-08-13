package com.teamgu.api.dto.res;

import java.util.List;

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
@ApiModel(description = "Admin Team Building Status Management Response Model ")
public class AdminTeamManagementResDto {

	@ApiModelProperty(name = "팀 index", example = "1")
	Long teamId;

	@ApiModelProperty(name = "팀 지역", example = "인천")
	String region;

	@ApiModelProperty(name = "팀 이름", example = "팀구")
	String teamName;
	
	@ApiModelProperty(name = "팀 트랙", example = "웹 기술")
	String track;
	
	@ApiModelProperty(name = "팀 구성 인원", example = "5")
	int memberCnt;

	@ApiModelProperty(name = "팀 구성 완료 여부", example = "O")
	String completeYn;

	@ApiModelProperty(name = "팀 리더 id", example = "1")
	Long leaderId;

	@ApiModelProperty(name = "팀 구성 인원 리스트")
	List<AdminTeamManagementHumanResDto> members;
	
}
