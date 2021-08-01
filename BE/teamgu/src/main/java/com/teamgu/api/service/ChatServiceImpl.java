package com.teamgu.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.UserChatRoomDto;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.UserChatRoom;
import com.teamgu.database.repository.ChatRepository;
import com.teamgu.database.repository.ChatRepositorySupport;
import com.teamgu.database.repository.ChatRoomRepository;
import com.teamgu.database.repository.UserChatRoomRepository;

import lombok.extern.log4j.Log4j2;

@Service("chatService")
@Log4j2
public class ChatServiceImpl implements ChatService{
	@Autowired
	ChatRoomRepository chatRoomRepository;
	
	@Autowired
	UserChatRoomRepository userChatRoomRepository;
	
	@Autowired
	ChatRepository chatRepository;
	
	@Autowired
	ChatRepositorySupport chatRepositorySupport;
	
	/**
	 * 특정 유저의 채팅 목록을 가져온다
	 */
	@Override
	public List<ChatRoomResDto> getChatRoomList(long userid) {
		/**
		 *	유저가 속한 채팅방의 목록을 가져온다.
		 *	{ id, user_id, chat_room_id } 
		 */
		List<UserChatRoom> userChatRoomList = userChatRoomRepository.findByUserId(userid); //JPAQueryFactory 이용
		log.info("userChatRoomList 갯수 : "+userChatRoomList.size());
		List<ChatRoomResDto> chatRoomResDtoList = new ArrayList<ChatRoomResDto>();
		for(UserChatRoom userChatRoom:userChatRoomList) {
			long chatroomid = userChatRoom.getChatRoom().getId();
			
			//해당 목록에서 필요한 정보를 DtoList에 저장한다.
			ChatRoomResDto crrd = new ChatRoomResDto();
			crrd.setChat_room_id(chatroomid);
			crrd.setRoom_name(chatRoomRepository.findById(chatroomid).get().getTitle());//채팅방 이름을 가져온다
			chatRoomResDtoList.add(crrd);
		}
		log.info("반환하는 chatRoomResDtoList 갯수 : "+chatRoomResDtoList.size());
		return chatRoomResDtoList;
	}
	
	/**
	 * 채팅방 메시지 목록을 가져온다
	 */
	@Override
	public List<ChatMessageResDto> getChatMessageList(long chatRoomId) {
		List<ChatMessageResDto> chatMessageResDtoList = new ArrayList<ChatMessageResDto>();
		for(Chat chat:chatRepositorySupport.findByReceiveRoomId(chatRoomId)) {			
			ChatMessageResDto chatMessageResDto = ChatMessageResDto.builder()
													.message(chat.getMessage())
													.sender_id(chat.getUser().getId())
													.sender_name(chat.getUser().getName())
													.create_date_time(chat.getSendDateTime())
													.unread_user_count(0)
													.build();
			chatMessageResDtoList.add(chatMessageResDto);
		}
		log.info("반환하는 chatMessageResDtoList 갯수 : "+chatMessageResDtoList.size());
		return chatMessageResDtoList;
	}

}
