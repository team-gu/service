package com.teamgu.api.service;
/**
 * 채팅 관련 비즈니스 로직
 * 이 곳에서 채팅방 목록, 채팅을 모두 다룬다
 * @author code 
 */

import java.util.List;

import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;

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
}
