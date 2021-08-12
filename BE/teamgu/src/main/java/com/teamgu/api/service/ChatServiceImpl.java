package com.teamgu.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
			
			Chat lastchat = chatRoomRepositorySupport.getLastMessage(chatroomid);
			long last_chat_id = 0;
			try {
				last_chat_id = userChatRoom.getChat().getId();
			}
			catch(Exception e) {
				log.error("userChatRoom.getChat().getId()가 null입니다");
			}
			
			long unreadCount = userChatRoomRepositorySupport.countUnreadMessageByUserIdAndRoomId(userid, chatroomid);
			
			//해당 목록에서 필요한 정보를 DtoList에 저장한다.
			ChatRoomResDto crrd = ChatRoomResDto.builder()
												.chat_room_id(chatroomid)
												.room_name(userChatRoom.getTitle())//개인이 설정한 채팅방명을 가져온다
												.last_chat_message(lastchat.getMessage())//해당 채팅방의 마지막 메세지를 가져온다.
												.send_date_time(lastchat.getSendDateTime())//해당 채팅방의 마지막 전송 시간을 가져온다.
												.out_check_chat_id(last_chat_id)//마지막 채팅 id
												.unread_message_count(unreadCount)//아직 읽지 않은 메세지도 기록
												.build();
			chatRoomResDtoList.add(crrd);
		}
		//최신메세지가 와있는 채팅방이 가장 위로 향한다
		Collections.sort(chatRoomResDtoList,new Comparator<ChatRoomResDto>() {
			@Override
			public int compare(ChatRoomResDto o1, ChatRoomResDto o2) {				
				boolean exist1 = o1.getUnread_message_count()>0;
				boolean exist2 = o2.getUnread_message_count()>0;
				if((exist1&&exist2) || (!exist1&&!exist2))
					return o2.getSend_date_time().compareTo(o1.getSend_date_time());
				else
					return Long.compare(o2.getUnread_message_count(),o1.getUnread_message_count());
				 
			}
		});
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
			long team_id = 0;
			if(!chat.getType().contains("TEAM_INVITE"))//팀초대 관련 메세지만 team_id를 가져온다
				team_id = chat.getTeamId();
			ChatMessageResDto chatMessageResDto = ChatMessageResDto.builder()
													.chat_id(chat.getId())
													.message(chat.getMessage())
													.sender_id(chat.getUser().getId())
													.sender_name(chat.getUser().getName())
													.type(chat.getType())
													.team_id(team_id)
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
		Chat chat = new Chat();
		chat.setMessage(chatReqDto.getMessage());
		if(chatReqDto.getType()==null || chatReqDto.getType().equals(""))
			chatReqDto.setType("NORMAL");
		else if(chatReqDto.getType().contains("TEAM_INVITE")) {//팀에 관한 type이라면
			chat.setTeamId(chatReqDto.getTeam_id());//team id를 설정해준다
		}
		chat.setType(chatReqDto.getType());
		chat.setUser(userRepository.getOne(chatReqDto.getSender_id()));//set sender_id
		chat.setChatRoom(chatRoomRepository.getOne(chatReqDto.getRoom_id()));//set room_id		
		chat.setSendDateTime(created_time);
		
		return chatRepository.save(chat);
	}
	
	@Override
	public ChatRoomResDto createRoom(String title) {
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.setTitle(title);
		LocalDateTime localDateTime = LocalDateTime.now();
		chatRoom.setCreatedDate(localDateTime);
		ChatRoom res = chatRoomRepository.save(chatRoom);//방 생성을 위한 저장
		
		long chatroomid = chatRoom.getId();
		Chat lastchat = chatRoomRepositorySupport.getLastMessage(chatroomid);
		log.info("새롭게 생성된 자동 채팅방명 : "+title);
		ChatRoomResDto crrd = ChatRoomResDto.builder()
								.chat_room_id(chatroomid)
								.room_name(title)
								.last_chat_message(lastchat.getMessage())
								.unread_message_count(0)
								.send_date_time(lastchat.getSendDateTime()).build();			
		return crrd;
	}
	
	@Override
	public long roomCheckOneToOne(long my_user_id, long you_user_id) {
		return userChatRoomRepositorySupport.findCommonRoom(my_user_id, you_user_id);
	}
	
	@Override
	public boolean inviteUser(long user_id, long room_id) {
		log.info(user_id+" 유저를 "+room_id+" 방으로 초대합니다");	
		ChatRoom chatRoom = chatRoomRepository.findById(room_id).get();
		String room_name = chatRoom.getTitle();
		return userChatRoomRepositorySupport.insertUser(user_id, room_id,room_name);
	}
	
	@Override
	public ChatRoomResDto getChatRoomInfo(long room_id) {		
		return chatRoomRepositorySupport.getRoomInfo(room_id);
	}
	
	@Override
	public long findLastChatId(long room_id) {
		return chatRepositorySupport.findLastChatId(room_id);
	}
	
	@Override
	public void writeLastChatId(long room_id, long user_id, long chat_id) {
		chatRepositorySupport.writeLastChatId(room_id, user_id, chat_id);
	}
	
	@Override
	public long countTotalUnreadMessage(long user_id) {
		return userChatRoomRepositorySupport.countUnreadMessageByUserId(user_id);
	}
	
	@Override
	public long checkNRoom(List<Long> users) { 		
		return chatRoomRepositorySupport.checkNRoom(users);
	}
	
	@Override
	public long registNRoom(List<Long> users, String title) {
		log.info("ChatService registNRoom 진입");
		return chatRoomRepositorySupport.registNRoom(users, title);
	}
	
	@Override
	public List<Long> getRoomUserList(long room_id) {		
		return userChatRoomRepositorySupport.getRoomUserList(room_id);
	}
	
	@Override
	public boolean inviteNUsers(List<Long> users, long room_id, String title) {
		return chatRoomRepositorySupport.inviteNUsers(users, room_id,title);
	}
	
	@Override
	public boolean leaveRoom(long room_id, long user_id) {
		return chatRoomRepositorySupport.leaveRoom(room_id, user_id);
	}
	
	@Override
	public boolean modifyRoomName(String title, long room_id, long user_id) {		
		return chatRoomRepositorySupport.modifyPersonalRoomName(title, room_id,user_id);
	}	
	
	@Override
	public boolean changeType(long chat_id, String type) {
		return chatRepositorySupport.changeType(chat_id, type);
	}
	
	@Override
	public boolean inviteUserPersonalRoom(long user_id, long room_id, String title) {
		log.info(user_id+" 유저를 "+room_id+" 개인 톡방으로 초대합니다");	
		return userChatRoomRepositorySupport.insertUser(user_id, room_id, title);
	}
}
