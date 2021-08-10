package com.teamgu.database.repository;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.ChatRoomResDto;
import com.teamgu.database.entity.Chat;
import com.teamgu.database.entity.ChatRoom;
import com.teamgu.database.entity.QChat;
import com.teamgu.database.entity.QChatRoom;
import com.teamgu.database.entity.QUser;

import lombok.extern.log4j.Log4j2;

@Repository
@Log4j2
public class ChatRoomRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QChat qchat = QChat.chat;
	QUser quser = QUser.user; 
	QChatRoom qChatRoom = QChatRoom.chatRoom;
	@PersistenceUnit
	EntityManagerFactory emf;	
	/**
	 * 방 번호가 입력되면 채팅방에 관한 정보가 반환된다
	 * @param room_id
	 * @return
	 */
	public ChatRoomResDto getRoomInfo(long room_id) {
		ChatRoom chatRoom = jpaQueryFactory.select(qChatRoom)
											.from(qChatRoom)
											.where(qChatRoom.id.eq(room_id))
											.fetchOne();
		ChatRoomResDto chatRoomResDto = new ChatRoomResDto();
		//방 번호와 방 이름만 반환한다.
		//한번에 채팅방에 들어갔을 때를 위함이다.
		chatRoomResDto.setChat_room_id(room_id);
		chatRoomResDto.setRoom_name(chatRoom.getTitle());
		return chatRoomResDto;
	}
	
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
	
	/**
	 * N 명이 동시에 존재하는 채팅방이 존재하는지 확인하고 방 번호를 반환한다
	 * 방이 존재하지 않으면 0을 반환한다
	 * @param users
	 * @return
	 */
	public long checkNRoom(List<Long> users) {
		EntityManager em = emf.createEntityManager();
		List<BigInteger> res = null;
		try {
			int alpha = 65;
			String jpql = "SELECT IFNULL(A.chat_room_id,0)\r\n"
						+ "FROM user_chat_room as A";
			for(int i =0;i<users.size();i++) {
				long user_id = users.get(i);
				String body = "\r\nINNER JOIN (SELECT ucr.chat_room_id\r\n"
							+ "FROM user_chat_room ucr\r\n"
							+ "WHERE ucr.user_id = "+user_id+") AS "+Character.toString((char)(++alpha))+"\r\n"
							+ "ON "+Character.toString((char)(alpha-1))+".chat_room_id = "+Character.toString((char)alpha)+".chat_room_id";
				jpql+=body;
			}
			String tail = "\r\nGROUP BY A.chat_room_id\r\n"
						+ "HAVING COUNT(*)="+users.size()+"\r\n"
						+ "UNION ALL\r\n"
						+ "SELECT 0 FROM dual LIMIT 1";
			jpql+=tail;
			log.debug(jpql);
			res = em.createNativeQuery(jpql).getResultList();			
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			em.close();
		}
		return res.get(0).longValue();
	}
	
	/**
	 * 초대하려는 유저들의 id와 방 제목을 입력하면 채팅방 생성이 된다.
	 * @param users
	 * @param title
	 */
	public long registNRoom(List<Long> users, String title) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		log.debug("트랜잭션 시작 완료");
		long room_id = 0;
		try {
			et.begin();
			//1. 채팅방 생성
			String jpql = "INSERT INTO chat_room(created_date,title)\r\n"
						+ "VALUES(current_timestamp(), :title)";
			log.debug(jpql);
			em.createNativeQuery(jpql).setParameter("title", title).executeUpdate();
			//2. 방금 생성한 채팅방 id값 반환
			jpql = "SELECT id FROM chat_room WHERE title=:title";
			log.debug(jpql);
			List<BigInteger> res = em.createNativeQuery(jpql).setParameter("title", title).getResultList();
			room_id = res.get(0).longValue();
			
			//3. 채팅방에 인원 초대
			jpql = "INSERT INTO user_chat_room(chat_room_id,user_id,last_chat_id)";
			for(int i = 0; i<users.size();i++) {
				long user_id = users.get(i);
				if(i==0) jpql+="\r\nVALUES";			
				if(i>0) jpql+=",";
				jpql+="\r\n("+room_id+","+user_id+",null)";
			}			
			log.debug(jpql);
			em.createNativeQuery(jpql).executeUpdate();
			et.commit();
		}catch(Exception e) {
			log.error("N명 방 생성에 실패");
//			e.printStackTrace();
			et.rollback();
			return 0;
		}finally {
			em.close();
		}
		return room_id;
	}
	
	/**
	 * 특정 방에 N명의 유저를 초대한다
	 * @param users
	 * @param room_id
	 * @return
	 */
	public boolean inviteNUsers(List<Long> users, long room_id) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		log.debug("트랜잭션 시작 완료");
		try {
			et.begin();
			//1. 채팅방에 인원 초대
			String jpql = "INSERT INTO user_chat_room(chat_room_id,user_id,last_chat_id)";
			for(int i = 0; i<users.size();i++) {
				long user_id = users.get(i);
				if(i==0) jpql+="\r\nVALUES";			
				if(i>0) jpql+=",";
				jpql+="\r\n("+room_id+","+user_id+",null)";
			}			
			log.debug(jpql);
			em.createNativeQuery(jpql).executeUpdate();
			et.commit();
		}catch(Exception e) {
			log.error("N명 대화방 초대에 실패했습니다");
			et.rollback();
			return false;
		}finally {
			em.close();
		}
		return true;		
	}
	
	/**
	 * 채팅방 내에서 방 이름을 변경하는 경우
	 */
	public boolean modifyRoomName(String title, long room_id) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		try {
			et.begin();
			String jpql = "UPDATE chat_room SET title = :title WHERE id=:room_id";
			em.createNativeQuery(jpql).setParameter("title", title)
										.setParameter("room_id", room_id)
										.executeUpdate();
			et.commit();
		}catch(Exception e) {
			log.error("채팅방 이름 변경에 실패했습니다");			
			et.rollback();
			return false;
		}finally {
			em.close();
		}
		return true;		
	}
	
	/**
	 * 개인이 특정 채팅방을 나가는 경우
	 */
	public boolean leaveRoom(long room_id, long user_id) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		try {
			et.begin();
			String jpql = "DELETE FROM user_chat_room\r\n"
						+ "WHERE user_id = :user_id AND chat_room_id = :room_id";
			em.createNativeQuery(jpql).setParameter("user_id", user_id)
										.setParameter("room_id", room_id)
										.executeUpdate();
			et.commit();
		}catch(Exception e) {
			log.error("방 나가기에 실패했습니다");
			et.rollback();
			return false;
		}finally {
			em.close();
		}
		return true;		
	}
}
