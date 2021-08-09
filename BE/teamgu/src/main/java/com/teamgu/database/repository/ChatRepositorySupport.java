package com.teamgu.database.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

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

	@PersistenceUnit
	EntityManagerFactory emf;
	
	public List<Chat> findByReceiveRoomId(long id){
		log.info("Support의 findByReceiveRoomID 진입");
		List<Chat> chatList = jpaQueryFactory.select(qChat)
											.from(qChat)
											.where(qChat.chatRoom.id.eq(id))
											.fetch();
		log.info(id+"룸의 메세지 갯수 : "+chatList.size());
		return chatList;
	}
	
	/**
	 * 특정 채팅방의 마지막 메세지 id를 반환한다
	 * @param room_id
	 * @return
	 */
	public long findLastChatId(long room_id) {
		Chat lastChat = jpaQueryFactory.select(qChat)
				.from(qChat)
				.where(qChat.chatRoom.id.eq(room_id))
				.orderBy(qChat.id.desc())
				.fetchFirst();		
		return lastChat.getId();		
	}
	
	/**
	 * 특정 채팅방에 특정 유저의 마지막 챗id를 기록한다
	 * @param room_id
	 * @param user_id
	 * @param chat_id
	 */
	public void writeLastChatId(long room_id, long user_id,long chat_id) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		String jpql = "UPDATE user_chat_room\r\n"
					+ "SET last_chat_id = :chat_id\r\n"
					+ "WHERE chat_room_id = :room_id\r\n"
					+ "AND user_id = :user_id";
		em.createNativeQuery(jpql)
							.setParameter("chat_id", chat_id)
							.setParameter("room_id", room_id)
							.setParameter("user_id", user_id)
							.executeUpdate();
		et.commit();
		em.close();
	}
}
