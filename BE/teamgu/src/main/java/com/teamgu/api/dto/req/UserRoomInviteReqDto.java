package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "유저를 이미 존재하는 채팅방에 초대할 때의 모델")
public class UserRoomInviteReqDto {
	long user_id;
	long room_id;
}
