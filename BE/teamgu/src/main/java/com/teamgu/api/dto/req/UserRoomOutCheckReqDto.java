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
@ApiModel(description = "유저의 채팅 체크아웃 모델")
public class UserRoomOutCheckReqDto {
	long user_id;
	long room_id;
}
