package com.teamgu.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.service.ChatServiceImpl;
import com.teamgu.database.entity.Chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
public class StompChatController {
	@Autowired
	ChatServiceImpl chatService;
	
	
	private final SimpMessagingTemplate template;
	@MessageMapping(value="/chat/enter")//참여
	public void enter(ChatReqDto message) {
		message.setMessage(message.getSender_id()+"님이 채팅방에 참여하셨습니다.");
		template.convertAndSend("/receive/chat/room/"+message.getRoom_id(),message);
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
		if (chatres!=null) {
			ChatMessageResDto chatMessageResDto = new ChatMessageResDto(chatres.getUser().getId(), 
					chatres.getUser().getName(),
					chatres.getMessage(), 
					chatres.getSendDateTime(), 
					0);
			template.convertAndSend("/receive/chat/room/"+message.getRoom_id(),chatMessageResDto);			
			log.info("message db saved done");
		}
		else
			log.error("message db save failed");
	}
}
