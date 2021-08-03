package com.teamgu.database.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
	 * {% INVITE_NONE %}   	요청을 보냈으나 아직 응답을 안 한 상태
	 * {% INVITE_YES %}		요청을 보냈고 수락한 상태
	 * {% INVITE_NO %}		요청을 보냈고 거절한 상태
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
}
