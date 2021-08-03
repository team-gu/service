package com.teamgu.database.entity;

import java.util.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom extends BaseEntity{
	@Column(length = 45)
	String title;
	
	@CreatedDate
	LocalDateTime createdDate;
	
	//채팅방이 사라지면 해당 채팅방의 채팅내역도 사라져야 한다
	@OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.ALL}, orphanRemoval=true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Chat> chat = new ArrayList<>();	
	
	//채팅방이 사라지면 해당 채팅방에 속해있는 유저 목록도 사라져야 한다
	@OneToMany(mappedBy = "chatRoom", cascade = {CascadeType.ALL}, orphanRemoval=true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserChatRoom> userChatRoom = new ArrayList<>();
}
