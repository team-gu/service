package com.teamgu.api.dto.res;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
/**
 * 특정 유저의 채팅 메세지 객체
 * 이 객체들이 모여 한 채팅방의 채팅 메세지 리스트를 구성한다
 * @author code
 *
 */
@Getter
@Builder
@ApiModel("ChatMessageResponse")
public class ChatMessageResDto {
	@ApiModelProperty(name="보내는 사람의 아이디")
	long sender_id;
	
	@ApiModelProperty(name="보내는 사람의 이름")
	String sender_name;
	
	@ApiModelProperty(name="채팅 메세지")
	String message;
	
	@ApiModelProperty(name="메세지 보낸 시각")
	LocalDateTime create_date_time;
	
	@ApiModelProperty(name="안읽은 사람의 수")
	int unread_user_count;
}
