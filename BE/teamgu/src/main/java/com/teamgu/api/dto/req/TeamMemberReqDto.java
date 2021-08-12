package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "팀 구성시 멤버 정보 요청 모델")
public class TeamMemberReqDto {

	@ApiModelProperty(name = "team index", example = "1")
	Long teamId;
	
	@ApiModelProperty(name = "user index", example = "1")
	Long userId;
}
