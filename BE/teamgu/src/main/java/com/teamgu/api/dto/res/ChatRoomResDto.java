package com.teamgu.api.dto.res;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 특정 유저의 채팅 객체
 * 이 객체들이 모여 한 유저의 채팅 리스트를 구성한다
 * @author code
 *
 */

@Getter
@Setter
//@Builder
@ApiModel("ChatResponse")
public class ChatRoomResDto extends BaseResDto{
	public ChatRoomResDto() {
		// TODO Auto-generated constructor stub
	}

	@ApiModelProperty(name="채팅방 고유 ID")
	long chat_room_id;
//	String chat_room_id; //id로 테스트후 랜덤uuid로 변경 예정
	
	@ApiModelProperty(name="화면에 표시되는 채팅방 이름")
	String room_name;

//  마지막 채팅 메세지를 보낸 사람의 이름

//	@ApiModelProperty(name="마지막 채팅 메세지") 
//	String last_chat_message;
	
//	@ApiModelProperty(name="안읽은 메세지 갯수")
//	int unread_message_count;
	
//	@ApiModelProperty(name="마지막 채팅 메세지 보낸 시간")
//	LocalDateTime create_date_time;
}
