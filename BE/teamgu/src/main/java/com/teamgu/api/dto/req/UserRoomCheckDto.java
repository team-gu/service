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
@ApiModel(description = "1:1 채팅방 존재 확인 요청 모델")
public class UserRoomCheckDto {
	long user_id1;
	long user_id2;
}
