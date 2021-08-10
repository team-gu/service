package com.teamgu.api.dto.req;

import java.util.List;

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
@ApiModel(description="채팅방에 초대하고자 하는 유저들 id를 담은 요청 모델")
public class ChatInviteNUsersReqDto {
	@ApiModelProperty(name = "방 id")
	long room_id;
	@ApiModelProperty(name = "초대할 유저들의 id 목록")
	List<Long> users;
}
