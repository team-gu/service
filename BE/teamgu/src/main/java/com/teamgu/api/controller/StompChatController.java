package com.teamgu.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.req.UserInviteTeamReqDto;
import com.teamgu.api.dto.req.UserRoomCheckDto;
import com.teamgu.api.dto.req.UserRoomInviteReqDto;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.service.ChatServiceImpl;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.api.vo.MessageTemplate;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@CrossOrigin("*")
public class StompChatController {
	@Autowired
	ChatServiceImpl chatService;
	
	@Autowired
	UserServiceImpl userService;
	
	@Autowired
	MessageTemplate simpMessagingTemplate;
	
	@MessageMapping(value="/chat/enter")//참여
	public void enter(ChatReqDto message) {
		message.setMessage(message.getSender_id()+"님이 채팅방에 참여하셨습니다.");
		simpMessagingTemplate.getTemplate().convertAndSend("/receive/chat/room/"+message.getRoom_id(),message);
	}
	
	/**
	 * 소켓을 통해 메세지 전송을 하면 message 메서드로 들어온다
	 * 즉, 여기서 DB에 대한 저장과 메세지 전송을 담당한다
	 * @param message
	 */
	@MessageMapping(value="/chat/message")
	public void message(@RequestBody ChatReqDto message) {
		log.info("in message...");
		Chat chatres = chatService.saveChat(message);
		log.info("chatRES test");
		log.info(message.getSender_id());
		User sender = userService.getUserById(message.getSender_id()).get();		
		log.info(sender.getName()); // 사용자의 이름을 가져옴
		log.info(chatres.getMessage());
		log.info(chatres.getSendDateTime());
		if (chatres!=null) {
			ChatMessageResDto chatMessageResDto = ChatMessageResDto.builder()
																	.chat_id(chatres.getId())
																	.sender_id(message.getSender_id())
																	.sender_name(sender.getName())
																	.type(chatres.getType())
																	.message(chatres.getMessage())
																	.create_date_time(chatres.getSendDateTime())
																	.unread_user_count(0)
																	.build();simpMessagingTemplate.getTemplate().convertAndSend("/receive/chat/room/"+message.getRoom_id(),chatMessageResDto);			
			log.info("message db saved done");
		}
		else
			log.error("message db save failed");
		
		// 종료 시점 기록 엔드포인트를 거치지 않고 나갈 수 있기 때문에 마지막 채팅 id를 갱신해준다
		long last_chat_id = chatService.findLastChatId(message.getRoom_id());
		chatService.writeLastChatId(message.getRoom_id(), message.getSender_id(), last_chat_id);		
	}
	
	/**
	 * 메세지를 동일하게 전송하지만 RTC 전용 메세지 처리부다
	 * @param message
	 */
	@MessageMapping(value="/chat/messageRTC")
	public void messageRTC(@RequestBody UserRoomInviteReqDto userReqDto) {
		log.info("in user-invite...");
		log.info(userReqDto.getUser_id()+"가 "+userReqDto.getRoom_id()+" 방에 메세지를 보냅니다.");
		long roomid = userReqDto.getRoom_id();
		String name = userService.getUserById(userReqDto.getUser_id()).get().getName();
		//1. 초대 메세지 보내기 전에 저장
		log.info("saving RTC invite message");
		ChatReqDto chatReqDto = ChatReqDto.builder()
											.room_id(roomid)
											.sender_id(userReqDto.getUser_id())
											.message("화상회의실이 개설되었습니다")
											.type("RTC_INVITE")
											.build();
		Chat chatres = chatService.saveChat(chatReqDto);
		log.info("broadcasting RTC invite message");
		//2. 메세지 구독룸으로 브로드캐스팅
		ChatMessageResDto chatMessageResDto = ChatMessageResDto.builder()
												.create_date_time(chatres.getSendDateTime())
												.message(chatres.getMessage())
												.sender_id(userReqDto.getUser_id())
												.sender_name(name)
												.type(chatres.getType())
												.unread_user_count(0)
												.build();												
		log.info("브로드캐스팅 방 번호 : "+roomid);
		simpMessagingTemplate.getTemplate().convertAndSend("/receive/chat/room/"+roomid,chatMessageResDto);
		log.info("bradcasting done");	
	}
	
	/**
	 * 팀 초대를 보내는 메세지 처리부다
	 * @param message
	 */
	@MessageMapping(value="/chat/inviteTeam")
	public void inviteTeamMessage(@RequestBody UserInviteTeamReqDto userInviteTeamReqDto) {
		log.info("in Team user-invite...");
		long team_id = userInviteTeamReqDto.getTeam_id();
		long leader_id = userInviteTeamReqDto.getLeader_id();
		long invitee_id = userInviteTeamReqDto.getInvitee_id();
		String name = userService.getUserById(leader_id).get().getName();
		log.info(leader_id+"가 "+invitee_id+"를"+team_id+" 팀으로 초대합니다");
		
		//1. 해당 유저와 채팅방이 생성되어 있는지 체크하고 없다면 생성한다
		long chat_room_id = chatService.roomCheckOneToOne(leader_id, invitee_id);
		
		if(chat_room_id==0) {//존재하지 않는 경우 방을 생성하고 방 번호를 반환한다.
//			String name1 = userService.getUserById(leader_id).get().getName(); //name변수와 동일한 처리이므로 주석처리
			String name2 = userService.getUserById(invitee_id).get().getName();			
			String init_title = name+", "+name2+"의 방";	//초기 채팅방 이름
			ChatRoomResDto chatRoomResDto = chatService.createRoom(init_title);
			chat_room_id = chatRoomResDto.getChat_room_id();
			
			log.info(chat_room_id+"방이 생성되었습니다");
			chatService.inviteUser(leader_id, chat_room_id);//둘 다 초대
			chatService.inviteUser(invitee_id, chat_room_id);
		}		
		
		//2. 초대 메세지 보내기 전에 저장
		log.info("saving Team invite message...");
		ChatReqDto chatReqDto = ChatReqDto.builder()
				.room_id(chat_room_id)
				.sender_id(leader_id)
				.message("팀에 초대되었습니다")
				.type("TEAM_INVITE_WAITING")//팀 초대후 기다리는 상태
				.team_id(team_id)
				.build();
		Chat chatres = chatService.saveChat(chatReqDto);
		log.info("broadcasting RTC invite message");
		
		//3. 메세지 구독룸으로 브로드캐스팅
		ChatMessageResDto chatMessageResDto = ChatMessageResDto.builder()
				.create_date_time(chatres.getSendDateTime())
				.message(chatres.getMessage())
				.sender_id(leader_id)
				.sender_name(name)
				.type(chatres.getType())
				.team_id(team_id)
				.unread_user_count(0)
				.build();												
		log.info("브로드캐스팅 방 번호 : "+chat_room_id);
		simpMessagingTemplate.getTemplate().convertAndSend("/receive/chat/room/"+chat_room_id,chatMessageResDto);
		log.info("bradcasting done");	
	}
}
