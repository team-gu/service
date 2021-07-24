package com.teamgu.database.entity;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ChatRoom extends BaseEntity{

//	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "chatRoomId")
//	int id;
	
	@Column(length = 45)
	String title;
	
	Date createdDate;
	
	@OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.ALL})
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Chat> chat;
	
	@OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.ALL})
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserChat> userChat;
}
