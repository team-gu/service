package com.teamgu.api.dto.res;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
/**
 * 특정 유저의 채팅 메세지 객체
 * 이 객체들이 모여 한 채팅방의 채팅 메세지 리스트를 구성한다
 * @author code
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("ChatMessageResponse")
public class ChatMessageResDto {
	@ApiModelProperty(name="채팅의 고유 id")
	long chat_id;
	
	@ApiModelProperty(name="보내는 사람의 아이디")
	long sender_id;
	
	@ApiModelProperty(name="보내는 사람의 이름")
	String sender_name;
	
	@ApiModelProperty(name="채팅 타입")
	String type;
	
	@ApiModelProperty(name="채팅 메세지")
	String message;
	
	@ApiModelProperty(name="메세지 보낸 시각")
	LocalDateTime create_date_time;
	
	@ApiModelProperty(name="안읽은 사람의 수")
	int unread_user_count;
}
