package com.teamgu.database.repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.QChat;
import com.teamgu.database.entity.QUser;

import lombok.extern.log4j.Log4j2;

@Repository
@Log4j2
public class ChatRoomRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QChat qchat = QChat.chat;
	QUser quser = QUser.user; 
	
	@PersistenceUnit
	EntityManagerFactory emf;	
	
	public Chat getLastMessage(long room_id) {
		log.info("조회하는 채팅방 번호 : "+room_id);
		//querydsl
		Chat chat = jpaQueryFactory.select(qchat)
									.from(qchat)
									.leftJoin(quser)
									.on(quser.id.eq(qchat.user.id))
									.where(qchat.chatRoom.id.eq(room_id))
									.orderBy(qchat.id.desc())
									.fetchFirst();		
//		JPQL
//		EntityManager em = emf.createEntityManager();
//		String jpql = "SELECT c.message "
//					+ "FROM chat c "
//					+ "LEFT JOIN user u "
//					+ "ON u.id = c.sender_id "
//					+ "WHERE c.receive_room_id=:room_id "
//					+ "ORDER BY c.id DESC LIMIT 1";
//		List<String> lastMessage = em.createNativeQuery(jpql)
//								.setParameter("room_id", room_id)
//								.getResultList();
//		
		if(chat == null) {//아직 방에 메세지가 없다면
			log.error("lastMessage is null!!");
			Chat nullchat = new Chat();
			nullchat.setMessage("아직 메세지가 없습니다");
			nullchat.setSendDateTime(LocalDateTime.now());
			return nullchat;
		}		
		return chat;
	}
}
