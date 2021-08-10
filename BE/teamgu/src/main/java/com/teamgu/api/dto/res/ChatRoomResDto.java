package com.teamgu.api.dto.res;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 특정 유저의 채팅 객체
 * 이 객체들이 모여 한 유저의 채팅 리스트를 구성한다
 * @author code
 *
 */

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ChatResponse")
public class ChatRoomResDto{
	@ApiModelProperty(name="채팅방 고유 ID")
	long chat_room_id;
//	String chat_room_id; //id로 테스트후 랜덤uuid로 변경 예정
	
	@ApiModelProperty(name="화면에 표시되는 채팅방 이름")
	String room_name;
	
	@ApiModelProperty(name="마지막 채팅 메세지") 
	String last_chat_message;
	
	@ApiModelProperty(name="사용자가 마지막으로 읽은 메세지 id")
	long out_check_chat_id;
	
	@ApiModelProperty(name="안읽은 메세지 갯수")
	long unread_message_count;
	
	@ApiModelProperty(name="마지막 채팅 메세지 보낸 시간")
	LocalDateTime send_date_time;
}
