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
		try {
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
		}catch(Exception e) {
			et.rollback();
		}finally {
			em.close();
		}
	}
	
	/**
	 * 특정 채팅의 Type을 변경한다
	 */
	public boolean changeType(long chat_id,String type) {		
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		int res = 0;
		try {
			String jpql = "UPDATE chat SET type = :type WHERE id = :chat_id";
			et.begin();
			res = em.createNativeQuery(jpql).setParameter("type", type).setParameter("chat_id", chat_id).executeUpdate();					
			et.commit();
		}catch(Exception e) {
			et.rollback();
			log.error("타입 변경에 실패했습니다");
		}finally {
			em.close();
		}
		if(res>0)return true;
		return false;
	}
}
