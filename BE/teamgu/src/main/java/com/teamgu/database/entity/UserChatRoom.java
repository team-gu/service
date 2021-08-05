package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.teamgu.database.entity.pk.UserChatRoomPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(UserChatRoomPK.class)
public class UserChatRoom{	
	@Id
	@ManyToOne
	@JoinColumn(name = "userId")
	User user;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "chatRoomId")
	ChatRoom chatRoom;
	
	@ManyToOne
	@JoinColumn(name = "lastChatId")
	Chat chat;
}
