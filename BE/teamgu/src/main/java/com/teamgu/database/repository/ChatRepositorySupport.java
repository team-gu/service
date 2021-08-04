package com.teamgu.database.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.QChat;

import lombok.extern.log4j.Log4j2;

@Repository
@Log4j2
public class ChatRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QChat qChat = QChat.chat;
	
	public List<Chat> findByReceiveRoomId(long id){
		log.info("Support의 findByReceiveRoomID 진입");
		List<Chat> chatList = jpaQueryFactory.select(qChat)
											.from(qChat)
											.where(qChat.chatRoom.id.eq(id))
											.fetch();
		log.info(id+"룸의 메세지 갯수 : "+chatList.size());
		return chatList;
	}
}
