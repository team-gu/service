package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.teamgu.database.entity.pk.UserChatRoomPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(UserChatRoomPK.class)
@DynamicInsert
public class UserChatRoom{	
	String title;
	
	@Column(columnDefinition = "short default 1")// 방이 최초 생성된다면 default 값은 항상 1이다
	@ColumnDefault("1")
	short visible; //0숨김(방나가기) 1보임
	
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
