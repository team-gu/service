package com.teamgu.database.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Chat extends BaseEntity{
	@Column(length = 60)
	String message;
	
	/**
	 * type에 대한 정의
	 * msg : 일반 메시지
	 * request : 팀원 신청(내가 특정 팀의 팀원이 되고싶다)
	 * invite: 팀 초대(내가 우리 팀에 특정 유저를 초대하고싶다)
	 */
	@Column(length = 20)
	String type;

	Date sendDate;

	@ManyToOne
	@JoinColumn(name = "senderId")
	User user;

	@ManyToOne
	@JoinColumn(name = "receiveRoomId")
	ChatRoom chatRoom;

	@OneToMany(mappedBy = "chat")
	private List<UserChat> userChat = new ArrayList<>();
}
