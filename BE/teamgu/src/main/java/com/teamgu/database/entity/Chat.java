package com.teamgu.database.entity;

import java.sql.Date;
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
public class Chat {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chatId")
	int id;
	@Column(length = 60)
	String message;
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
	private List<UserChat> userChat;

}
