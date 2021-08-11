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
@ApiModel("채팅방 나가는 요청을 하는 모델")
public class ChatRoomLeaveReqDto {
	@ApiModelProperty(value = "나가고자 하는 채팅방의 id")	
	long room_id;
	@ApiModelProperty(value = "자신의 user id")	
	long user_id;
}
