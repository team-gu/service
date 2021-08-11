package com.teamgu.api.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.ChatInviteNUsersReqDto;
import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.req.ChatRoomLeaveReqDto;
import com.teamgu.api.dto.req.ChatRoomModifyReqDto;
import com.teamgu.api.dto.req.ChatRoomRegistReqDto;
import com.teamgu.api.dto.req.TeamInviteResponseReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.dto.req.UserInviteTeamReqDto;
import com.teamgu.api.dto.req.UserRoomCheckDto;
import com.teamgu.api.dto.req.UserRoomInviteReqDto;
import com.teamgu.api.dto.req.UserRoomOutCheckReqDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.api.dto.res.ChatTotalUnreadResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.TeamListResDto;
import com.teamgu.api.dto.res.UserChatSearchResDto;
import com.teamgu.api.service.ChatService;
import com.teamgu.api.service.ChatServiceImpl;
import com.teamgu.api.service.TeamServiceImpl;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.api.vo.MessageTemplate;
import com.teamgu.api.vo.MessageTypeVo;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.User;
import com.teamgu.database.repository.TeamRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;


@Api(value = "채팅", tags = { "Chat." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/chat")
@Log4j2
public class ChatController {		
	@Autowired
	ChatServiceImpl chatService;
	
	@Autowired
	UserServiceImpl userService;
	
	@Autowired 
	TeamRepositorySupport teamRepositorySupport;
	
	@Autowired
	MessageTemplate simpMessagingTemplate;
	
	@Autowired
	TeamServiceImpl teamService;
	
	@Autowired
	MessageTypeVo messageTypeVo;
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
		long roomid = chatService.roomCheck(users.getUser_id1(), users.getUser_id2());
		if(roomid==0) {//존재하지 않는 경우 방을 생성하고 방 번호를 반환한다.
			String name1 = userService.getUserById(users.getUser_id1()).get().getName();
			String name2 = userService.getUserById(users.getUser_id2()).get().getName();			
			ChatRoomResDto chatRoomResDto = chatService.createRoom(name1+", "+name2+"의 방");
			roomid = chatRoomResDto.getChat_room_id();
			
			log.info(roomid+"방이 생성되었습니다");
			chatService.inviteUser(users.getUser_id1(), roomid);//둘 다 초대
			chatService.inviteUser(users.getUser_id2(), roomid);
		}		
		return ResponseEntity.ok(new CommonResponse<ChatRoomResDto>(chatService.getChatRoomInfo(roomid)));		
	}
	
	@PostMapping("/room/invite")
	@ApiOperation(value = "이미 존재하는 채팅방에 특정 유저를 초대한다")
	public ResponseEntity<? extends BasicResponse> inviteUser(@RequestBody UserRoomInviteReqDto userReqDto){
		if(!chatService.inviteUser(userReqDto.getUser_id(), userReqDto.getRoom_id())) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("채팅방 초대에 실패했습니다."));
		}
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/room/out")
	@ApiOperation(value="특정 유저가 채팅방을 닫았을 때, 마지막 채팅 내역이 무엇인지 기록한다")
	public ResponseEntity<? extends BasicResponse> roomOutCheck(@RequestBody UserRoomOutCheckReqDto userRoomOutCheckReqDto){
		try {
			long room_id = userRoomOutCheckReqDto.getRoom_id();
			long user_id = userRoomOutCheckReqDto.getUser_id();
			long last_chat_id = chatService.findLastChatId(room_id);
			chatService.writeLastChatId(room_id, user_id, last_chat_id);
		}catch(Exception e) {
			log.error("마지막 채팅 내역 기록 에러(채팅방에 아무런 메세지가 없어서 나는 에러)");
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/unread/{userid}")
	@ApiOperation(value="특정 유저의 읽지 않은 메세지 총 갯수를 반환한다")
	public ResponseEntity<? extends BasicResponse> getUnreadMessageByUserId(@PathVariable("userid") @ApiParam(value ="조회하고자 하는 유저의 id 값",required=true) long user_id){
		long unreadCount = chatService.countTotalUnreadMessage(user_id);
		return ResponseEntity.ok(new CommonResponse<ChatTotalUnreadResDto>(ChatTotalUnreadResDto.builder().unreadcount(unreadCount).build()));		
	}
	
	@PostMapping("/room/regist")
	@ApiOperation(value="N명의 대화방을 생성한다")
	public ResponseEntity<? extends BasicResponse> registNRoom(@RequestBody ChatRoomRegistReqDto chatRoomRegistReqDto){
		List<Long> users = chatRoomRegistReqDto.getUserids();
		long room_id = 0; 
		try {
			room_id = chatService.checkNRoom(users);
			if(room_id==0) {//생성된 방이 없다면 새롭게 생성한다
				String title = "의 방";
				for(int i = 0;i<users.size();i++) {				
					long user_id = users.get(i);
					String name = userService.getUserById(user_id).get().getName();
					if(i!=0)name=", "+name;
					title = title.replace("의 방",name+"의 방");				
				}
				log.info("단톡명 :"+title);
				room_id = chatService.registNRoom(users, title);
			}	
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("단톡 만들기에 실패했습니다."));
		}
		if(room_id==0)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("단톡 만들기에 실패했습니다."));
		return ResponseEntity.ok(new CommonResponse<ChatRoomResDto>(chatService.getChatRoomInfo(room_id)));
	}
	
	@PostMapping("/room/invite/users")
	@ApiOperation(value="N명을 대화방에 초대합니다")
	public ResponseEntity<? extends BasicResponse> inviteNUsers(@RequestBody ChatInviteNUsersReqDto chatInviteNUsersReqDto){
		List<Long> users = chatInviteNUsersReqDto.getUserids();
		long room_id = chatInviteNUsersReqDto.getRoom_id();
		if(chatService.inviteNUsers(users, room_id)==false) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("채팅방 초대에 실패했습니다"));
		}
		return ResponseEntity.ok(new CommonResponse<Boolean>(true));
	}
	
	@PostMapping("/room/modify")
	@ApiOperation(value="방 이름을 수정합니다")
	public ResponseEntity<? extends BasicResponse> modifyRoomName(@RequestBody ChatRoomModifyReqDto chatRoomModifyReqDto){
		String title = chatRoomModifyReqDto.getTitle();
		long room_id = chatRoomModifyReqDto.getRoom_id();
		if(!chatService.modifyRoomName(title, room_id)) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("방 이름 수정에 실패했습니다"));
		}
		return ResponseEntity.ok(new CommonResponse<Boolean>(true));
	}
	
	@GetMapping("/room/show/{room_id}")
	@ApiOperation(value="특정 방의 유저 목록을 조회합니다")
	public ResponseEntity<? extends BasicResponse> getChatRoomUsers(@PathVariable("room_id") @ApiParam(value ="조회하고자 하는 방의 id 값",required=true) long room_id){
		List<Long> users = chatService.getRoomUserList(room_id);
		List<UserChatSearchResDto> result = new ArrayList<UserChatSearchResDto>();
		for(Long user_id:users) {
			User user = userService.getUserById(user_id).get();
			UserChatSearchResDto userChatSearchResDto = UserChatSearchResDto.builder()
														.email(user.getEmail())
														.name(user.getName())
														.user_id(user.getId()).build();
			result.add(userChatSearchResDto);
		}
		if(result.size()==0) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("유저 목록 가져오기에 실패했습니다"));			
		}
		return ResponseEntity.ok(new CommonResponse<List<UserChatSearchResDto>>(result));
	}
	
	@PostMapping("/room/leave")
	@ApiOperation(value="특정 유저가 채팅방을 나갑니다")
	public ResponseEntity<? extends BasicResponse> modifyRoomName(@RequestBody ChatRoomLeaveReqDto chatRoomLeaveReqDto){
		long user_id = chatRoomLeaveReqDto.getUser_id();
		long room_id = chatRoomLeaveReqDto.getRoom_id();
		
		if(!chatService.leaveRoom(room_id, user_id)) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) 
					.body(new ErrorResponse("방 나가기에 실패했습니다"));
		}
		return ResponseEntity.ok(new CommonResponse<Boolean>(true));
	}
	
	/**
	 * RESTAPI Controller에서도 convertandsend가 작동하는지 테스트하는 메서드입니다
	 * @param chatRoomLeaveReqDto
	 * @return
	 */
	@PostMapping("/team/invite/test") 
	public ResponseEntity<? extends BasicResponse> teamInviteTest(){
		log.info("invite 테스팅");
		simpMessagingTemplate.getTemplate().convertAndSend("/receive/chat/room/"+125,ChatMessageResDto.builder().message("test"));
		return ResponseEntity.ok(new CommonResponse<Boolean>(true));
	}

	/**
	 * 팀초대 메세지에 대한 수락 응답을 처리한다
	 * @param teamInviteResponseReqDto
	 * @return
	 */
	@PostMapping("/message/team/invite/accept")
	@ApiOperation(value="팀 초대 메세지를 수락한다")
	@ApiResponses({
		@ApiResponse(code = 200, message = "팀 가입 성공"),
		@ApiResponse(code = 400, message = "팀 가입 실패",response = BaseResDto.class)
	})
	public ResponseEntity<? extends BasicResponse> teamInviteAccept(@RequestBody TeamInviteResponseReqDto teamInviteResponseReqDto){
		long leader_id = teamInviteResponseReqDto.getLeader_id();
		long invitee_id = teamInviteResponseReqDto.getInvitee_id();
		long team_id = teamInviteResponseReqDto.getTeam_id();
		long message_id = teamInviteResponseReqDto.getMessage_id();
		TeamListResDto teamListResDto = teamService.getTeamInfobyTeamId(team_id);
		String trackName = teamListResDto.getTrack().getCodeName();
		
		//오류 대상
		//1. 팀에 들어갈 수 있는 상태인가? = 이미 존재하는 멤버를 검증할 필요가 없음 (이미존재하는 멤버 = 팀이 있음)
		boolean visibleTeam = teamService.checkTeamBuilding(invitee_id, trackName);
		if(!visibleTeam)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("팀에 들어갈 수 없는 상태입니다"));
		//2. 팀의 리더가 바뀐 후의 수락상태
		boolean visibleInvite = teamService.checkTeamBetweenLeader(leader_id, team_id);
		if(!visibleInvite) {//만료된 초대, 팀의 정보가 온전하지 않을 때
			//update expired로 변경
			chatService.changeType(message_id, messageTypeVo.getInviteExpired());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("팀 초대 상태가 만료되었습니다"));
		}
		//3. 문제 없다면 팀 초대
		TeamMemberReqDto teamMemberReqDto = TeamMemberReqDto.builder()
												.teamId(team_id)
												.userId(invitee_id)
												.build();
		teamService.addMember(teamMemberReqDto);
		TeamListResDto team = teamService.getTeamInfobyTeamId(team_id);
		chatService.changeType(message_id, messageTypeVo.getInviteAccepted());
		log.info(invitee_id+"유저는 "+team_id+"로 팀 초대가 이루어졌습니다.");
		return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));	
	}
	
	/**
	 * 팀초대 메세지에 대한 거절 응답을 처리한다
	 * @param teamInviteResponseReqDto
	 * @return
	 */
	@PostMapping("/message/team/invite/reject")
	@ApiOperation(value="팀 초대 메세지를 거절한다")
	public ResponseEntity<? extends BasicResponse> teamInviteReject(@RequestBody TeamInviteResponseReqDto teamInviteResponseReqDto){
		long invitee_id = teamInviteResponseReqDto.getInvitee_id();
		long team_id = teamInviteResponseReqDto.getTeam_id();
		long message_id = teamInviteResponseReqDto.getMessage_id();
		
		TeamMemberReqDto teamMemberReqDto = new TeamMemberReqDto();
		teamMemberReqDto.setTeamId(team_id);
		teamMemberReqDto.setUserId(invitee_id);
		TeamListResDto team = teamService.getTeamInfobyTeamId(team_id);
		
		chatService.changeType(message_id, messageTypeVo.getInviteRejected());
		log.info(invitee_id+"유저는 "+team_id+"의 초대를 거절했습니다");

		return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));	
	}
}
