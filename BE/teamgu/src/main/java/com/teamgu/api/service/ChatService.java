package com.teamgu.api.service;
/**
 * 채팅 관련 비즈니스 로직
 * 이 곳에서 채팅방 목록, 채팅을 모두 다룬다
 * @author code 
 */

import java.util.List;

import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.database.entity.Chat;

public interface ChatService {
	/**
	 * 특정 유저가 참여중인 채팅방 리스트를 반환한다 
	 * @param userId(로그인된 사용자의 id)
	 * @return
	 */
	List<ChatRoomResDto> getChatRoomList(long userId);
	
	/**
	 * 특정 유저의 특정 채팅방의 내용을 반환한다
	 * @param id(채팅방 id 값)
	 * @return
	 */
	List<ChatMessageResDto> getChatMessageList(long chatRoomId);
	
	/**
	 * 해당 유저와 생성된 채팅방이 있는지 확인한다.
	 * 있다면 양의정수를, 그렇지 않다면 0을 반환한다
	 * 1:1 대화 전용
	 */
	long roomCheck(long my_user_id, long you_user_id);
	
	/**
	 * 새로운 채팅방을 생성하고 새롭게 생성된 채팅방 ID를 반환한다.
	 */
	ChatRoomResDto createRoom(String title);
	
	/**
	 * 특정 채팅방에 인원을 초대한다
	 */
	boolean inviteUser(long user_id,long room_id);
	
	/**
	 * N명(본인포함)의 인원으로 채팅방을 개설한다.
	 * 즉, 인원의 이름을 creatRoom에 넘겨주고 방을 생성한다.
	 * 이후 user_chat_room에 해당 인원을 추가한다.
	 */
	
	
	/**
	 * 채팅 메세지를 DB에 저장한다
	 * @param chatReqDto
	 * @return
	 */
	Chat saveChat(ChatReqDto chatReqDto);
	
	/**
	 * 특정 채팅방의 정보를 반환한다
	 * @param room_id
	 * @return
	 */
	ChatRoomResDto getChatRoomInfo(long room_id);
	
	/**
	 * 특정 채팅방의 마지막 채팅 id를 기록한다
	 * @param room_id
	 * @return
	 */
	long findLastChatId(long room_id);
	
	/**
	 * 특정 채팅방에서 나갔을 때, 나간 유저의 마지막 채팅id가 무엇이었는지 기록한다
	 * @param room_id
	 * @param user_id
	 * @param chat_id
	 */
	void writeLastChatId(long room_id, long user_id, long chat_id);
	
	/**
	 * 특정 유저의 읽지 않은 메세지 갯수를 가져온다
	 * @param user_id
	 * @return
	 */
	long countTotalUnreadMessage(long user_id);
}
