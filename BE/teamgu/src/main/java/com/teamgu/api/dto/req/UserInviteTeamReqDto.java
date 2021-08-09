package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "팀장이 사용자에게 팀원 초대 요청 모델")
public class UserInviteTeamReqDto {
	@ApiModelProperty(name="초대를 하는 팀장의 id")
	long leader_id;
	@ApiModelProperty(name="초대를 받는 유저의 id")
	long invitee_id;
}


