package com.teamgu.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.req.UserRoomCheckDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.service.ChatService;
import com.teamgu.api.service.ChatServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;


@Api(value = "채팅", tags = { "Chat." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/chat")
@Log4j2
public class ChatController {
	@Autowired
	ChatServiceImpl chatService;
	
	/**
	 * 특정 유저의 채팅방 목록을 가져온다
	 */
	@GetMapping("/{id}")
	@ApiOperation(value="특정 유저의 채팅방 목록 가져오기",notes="채팅방 목록을 반환한다")
	public ResponseEntity<? extends BasicResponse> getChatRoomList(@PathVariable("id") @ApiParam(value = "유저의 id 값", required=true) long user_id){
		log.info(user_id+" <<<");
		List<ChatRoomResDto> chatRoomResDtoList = chatService.getChatRoomList(user_id);
		
		if(chatRoomResDtoList==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ErrorResponse("아직 개설된 채팅방이 없습니다"));
		}
		log.info("개설된 방의 갯수 : "+chatRoomResDtoList.size());
		return ResponseEntity.ok(new CommonResponse<List<ChatRoomResDto>>(chatRoomResDtoList));		
	}
	
	/**
	 * 특정 채팅방의 목록을 가져온다
	 */
	@GetMapping("/room/{id}")
	@ApiOperation(value="특정 채팅방의 채팅 메세지 가져오기")
	public ResponseEntity<? extends BasicResponse> getChatMessageList(@PathVariable("id") @ApiParam(value ="채팅방의 id 값",required=true) long id){
		log.info("chatroomid : "+id);
		List<ChatMessageResDto> chatMessageResDtoList = chatService.getChatMessageList(id);
		if(chatMessageResDtoList == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ErrorResponse("아직 채팅 내용이 없습니다"));
		}
		log.info("채팅 메세지 갯수 : "+chatMessageResDtoList.size());
		return ResponseEntity.ok(new CommonResponse<List<ChatMessageResDto>>(chatMessageResDtoList));		
	}
	
	/**
	 * socket으로 들어온 메세지를 DB에 저장한다.
	 */
	@PostMapping("/message/save")
	@ApiOperation(value="socket으로 주고받은 메세지를 저장한다.")
	public ResponseEntity<? extends BasicResponse> saveMessage(@RequestBody ChatReqDto message){
		log.info("in saveMessage method...");
		if (chatService.saveChat(message)!=null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("채팅 메세지 저장에 실패했습니다."));
		}
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/room/check")
	@ApiOperation(value="유저1과 유저2의 1:1 채팅방이 존재하는지 확인하고 없다면 새로 생성해서 채팅방을 추가한다")
	public ResponseEntity<? extends BasicResponse> checkRoom(@RequestBody UserRoomCheckDto users){
		long result = chatService.roomCheck(users.getUser_id1(), users.getUser_id2());
		if(result==0) {//존재하지 않는 경우 방을 생성하고 방 번호를 반환한다.
			result = chatService.createRoom("방번호 없어서 새로 생성된 방");
			log.info(result+"방이 생성되었습니다");
			chatService.inviteUser(users.getUser_id1(), result);//둘 다 초대
			chatService.inviteUser(users.getUser_id2(), result);
		}
		return ResponseEntity.ok(new CommonResponse<Long>(result));		
	}
}