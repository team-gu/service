package com.teamgu.database.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Chat extends BaseEntity{	
	@Column(length = 60)
	String message;
	
	
	/**
	 * type에 대한 정의
	 * NORMAL		그냥 일반 메세지다
     * TEAM_INVITE_12_WAITING       요청을 보냈으나 아직 응답을 안 한 상태, _ 뒤엔 반드시 팀 코드가 포함되어야한다.
     * TEAM_INVITE_12_ACCEPTED        요청을 보냈고 수락한 상태
     * TEAM_INVITE_12_REJECTED        요청을 보냈고 거절한 상태
     * TEAM_INVITE_12_EXPIRED	요청을 보냈으나 만료된 상태
     * RTC_INVITE	방 번호를 같이 보낸다
	 */
	String type;

	@ManyToOne
	@JoinColumn(name = "senderId")
	User user;

	@ManyToOne
	@JoinColumn(name = "receiveRoomId")
	ChatRoom chatRoom;
	
	@CreatedDate
	@Column(updatable = false)
	LocalDateTime sendDateTime;

	@OneToMany(mappedBy = "chat")
	List<UserChatRoom> userChatRoom = new ArrayList<>();
	
	@Nullable
	long teamId;
}
