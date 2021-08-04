package com.teamgu.api.dto;

import java.time.LocalDateTime;

import com.teamgu.api.dto.res.ChatMessageResDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

/**
 * 응답이나 요청에 쓰이진 않지만,
 * ChatRoom이나 Chat으로 가기 위한 통로 역할을 한다
 * @author code
 *
 */
@Getter
@Builder
@ApiModel("UserChatRoom")
public class UserChatRoomDto {
	@ApiModelProperty(name="유저-채팅방 서포트 테이블의 ID")
	long id;
	
	@ApiModelProperty(name="유저의 ID")
	long userId;
	
	@ApiModelProperty(name="채팅방의 ID")
	long chatRoomId;
	
}
