package com.teamgu.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.UserChatRoomDto;
import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.ChatRoom;
import com.teamgu.database.entity.User;
import com.teamgu.database.entity.UserChatRoom;
import com.teamgu.database.repository.ChatRepository;
import com.teamgu.database.repository.ChatRepositorySupport;
import com.teamgu.database.repository.ChatRoomRepository;
import com.teamgu.database.repository.ChatRoomRepositorySupport;
import com.teamgu.database.repository.UserChatRoomRepository;
import com.teamgu.database.repository.UserChatRoomRepositorySupport;
import com.teamgu.database.repository.UserRepository;
import com.teamgu.mapper.ChatMapper;

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
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserChatRoomRepositorySupport userChatRoomRepositorySupport;
	
	@Autowired
	ChatRoomRepositorySupport chatRoomRepositorySupport;
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
		log.debug("userChatRoomList 갯수 : "+userChatRoomList.size());
		List<ChatRoomResDto> chatRoomResDtoList = new ArrayList<ChatRoomResDto>();
		for(UserChatRoom userChatRoom:userChatRoomList) {
			long chatroomid = userChatRoom.getChatRoom().getId();
			
			//해당 목록에서 필요한 정보를 DtoList에 저장한다.
			ChatRoomResDto crrd = new ChatRoomResDto();
			crrd.setChat_room_id(chatroomid);
			crrd.setRoom_name(chatRoomRepository.findById(chatroomid).get().getTitle());//채팅방 이름을 가져온다
			Chat lastchat = chatRoomRepositorySupport.getLastMessage(chatroomid);
			crrd.setLast_chat_message(lastchat.getMessage());//해당 채팅방의 마지막 메세지를 가져온다.
			crrd.setSend_date_time(lastchat.getSendDateTime());//해당 채팅방의 마지막 전송 시간을 가져온다.			
			chatRoomResDtoList.add(crrd);
		}
		log.debug("반환하는 chatRoomResDtoList 갯수 : "+chatRoomResDtoList.size());
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
													.unread_user_count(0)//읽지 않은 유저를 관리해야한다
													.build();
			chatMessageResDtoList.add(chatMessageResDto);
		}
		log.info("반환하는 chatMessageResDtoList 갯수 : "+chatMessageResDtoList.size());
		return chatMessageResDtoList;
	}
	
	@Override
	public Chat saveChat(ChatReqDto chatReqDto) {
		log.info("in saveChat method...");
		log.info("roomid : "+chatReqDto.getRoom_id()+" sender_id : "+chatReqDto.getSender_id());
		LocalDateTime created_time = LocalDateTime.now();
		//Mapper 오류로 인한 주석처리. Setter로 대체한다
//		Chat chat = ChatMapper.INSTANCE.reqDtoToEntity(ChatReqDto.builder()
//														.message(chatReqDto.getMessage())
//														.type(chatReqDto.getType())
//														.build());
		Chat chat = new Chat();
		chat.setMessage(chatReqDto.getMessage());
//		chat.setType(chatReqDto.getType());
		chat.setType("NORMAL");//save로 요청되는 채팅은 모두 NORMAL type 채팅이다
		chat.setUser(userRepository.getOne(chatReqDto.getSender_id()));//set sender_id
		chat.setChatRoom(chatRoomRepository.getOne(chatReqDto.getRoom_id()));//set room_id		
		chat.setSendDateTime(created_time);
		
		return chatRepository.save(chat);
	}
	
	@Override
	public long createRoom(String title) {
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.setTitle(title);
		LocalDateTime localDateTime = LocalDateTime.now();
		chatRoom.setCreatedDate(localDateTime);
		return chatRoomRepository.save(chatRoom).getId();
	}
	
	@Override
	public long roomCheck(long my_user_id, long you_user_id) {
		return userChatRoomRepositorySupport.findCommonRoom(my_user_id, you_user_id);
	}
	
	@Override
	public boolean inviteUser(long user_id, long room_id) {
		log.info(user_id+" 유저를 "+room_id+" 방으로 초대합니다");	
		userChatRoomRepositorySupport.insertUser(user_id, room_id);
		return true;
	}
}
