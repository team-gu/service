package com.teamgu.api.dto.res;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

/**
 * 특정 유저의 채팅 객체
 * 이 객체들이 모여 한 유저의 채팅 리스트를 구성한다
 * @author code
 *
 */

@Getter
@Builder
@ApiModel("ChatResponse")
public class ChatResDto extends BaseResDto{
	@ApiModelProperty(name="상대방 유저 아이디")
	long id;
	
	@ApiModelProperty(name="채팅방 고유 번호")
	long chatRoomId;
	
	@ApiModelProperty(name="마지막 채팅 메세지")
	String lastChatMessage;
	
	@ApiModelProperty(name="안읽은 메세지 갯수")
	int messageCount;
	
	@ApiModelProperty(name="마지막 채팅 메세지 보낸 시간")
	LocalDateTime createDateTime;
}
