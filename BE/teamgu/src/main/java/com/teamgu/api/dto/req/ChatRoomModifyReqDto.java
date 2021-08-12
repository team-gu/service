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
@ApiModel(description = "채팅방 이름을 수정하기 위한 요청 모델")
public class ChatRoomModifyReqDto {
	@ApiModelProperty(name = "변경될 채팅방 이름")
	String title;
	@ApiModelProperty(name = "변경하고 싶은 채팅방의 id")
	long room_id;
	@ApiModelProperty(name = "변경을 요청한 유저의 id")
	long user_id;
}
