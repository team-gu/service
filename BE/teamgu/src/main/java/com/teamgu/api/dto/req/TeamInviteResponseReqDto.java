package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "팀 초대 요청에 응답을 했을 때 사용되는 모델")
public class TeamInviteResponseReqDto {
	@ApiModelProperty(name="초대 될 팀의 id")
	long team_id;
	@ApiModelProperty(name="초대를 하는 팀장의 id")
	long leader_id;
	@ApiModelProperty(name="초대를 받는 유저의 id")
	long invitee_id;
	@ApiModelProperty(name="해당 요청의 메세지 id")
	long message_id;
}
