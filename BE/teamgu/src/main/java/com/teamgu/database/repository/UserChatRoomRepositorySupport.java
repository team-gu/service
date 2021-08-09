package com.teamgu.database.repository;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import javax.persistence.TypedQuery;

import org.hibernate.query.criteria.internal.expression.function.AggregationFunction.COUNT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QUserChatRoom;
import com.teamgu.database.entity.UserChatRoom;

import lombok.extern.log4j.Log4j2;

@Repository
@Log4j2
public class UserChatRoomRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QUserChatRoom qUserChatRoom = QUserChatRoom.userChatRoom;
	
	@PersistenceUnit
	EntityManagerFactory emf;
	/**
	 * 유저1과 유저2가 속한 방이 있는지 확인한다
	 * @param user1
	 * @param user2
	 * @return 방번호(long) 0인 경우 방 없음.
	 */
	public long findCommonRoom(long user1, long user2) {
		EntityManager em = emf.createEntityManager();
		String jpql = "SELECT ucrA.chat_room_id "
				+ "FROM user_chat_room ucrA "
				+ "INNER JOIN (SELECT ucr.chat_room_id FROM user_chat_room ucr WHERE ucr.user_id = "+new Long(user1)+") AS ucrB "
				+ "ON ucrA.chat_room_id = ucrB.chat_room_id "
				+ "INNER JOIN (SELECT ucr.chat_room_id FROM user_chat_room ucr WHERE ucr.user_id = "+new Long(user2)+") AS ucrC "
				+ "ON ucrB.chat_room_id = ucrC.chat_room_id "
				+ "GROUP BY ucrA.chat_room_id "
				+ "HAVING COUNT(*) = 2";
		List<Number> ucrList = em.createNativeQuery(jpql).getResultList();
		em.close();
		log.debug(ucrList.size());		
		for(int i =0; i<ucrList.size();i++) {
			log.debug("roomId : "+ucrList.get(i).toString());
		}
		
		if(ucrList.size()==0) {
			return 0L;
		}
		return ucrList.get(0).longValue();
	}
	
	public void insertUser(long user_id,long room_id) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		String jpql = "INSERT INTO user_chat_room(chat_room_id,user_id) "
					+ "VALUES(?1,?2)";
		em.createNativeQuery(jpql)
			.setParameter(1, room_id)
			.setParameter(2, user_id)
			.executeUpdate();
		et.commit();
		em.close();
	}
	
	/**
	 * 특정 채팅 방의 unread 메세지를 반환한다
	 * @param user_id
	 * @param room_id
	 * @return
	 */
	public long countUnreadMessageByUserIdAndRoomId(long user_id,long room_id) {
		EntityManager em = emf.createEntityManager();
		String jpql = 	"select ifnull(count(*),0) unread_message\r\n" + 
						"from chat c \r\n" + 
						"where c.receive_room_id= :room_id and c.id > (select ifnull(ucr.last_chat_id,0) \r\n" + 
																"from user_chat_room ucr \r\n" + 
																"where ucr.user_id=:user_id and ucr.chat_room_id=:room_id)\r\n" + 
						"group by c.receive_room_id\r\n" + 
						"union all\r\n" + 
						"select 0 as unread_message\r\n" + 
						"from dual\r\n" + 
						"limit 1";
		List<Long> res = em.createNativeQuery(jpql)
							.setParameter("user_id", user_id)
							.setParameter("room_id", room_id)
							.getResultList();
		em.close();
		return res.get(0).longValue();
	}
	
	/**
	 * 특정 유저의 전체 메세지 목록 중 unread 메세지를 반환한다
	 * @param user_id
	 * @return
	 */
	public long countUnreadMessageByUserId(long user_id) {
		EntityManager em = emf.createEntityManager();
		String jpql = 	"SELECT count(*) res\r\n" + 
				"FROM chat c\r\n" + 
				"LEFT JOIN (SELECT chat_room_id , IFNULL(last_chat_id,0) last_chat_id\r\n" + 
							"FROM user_chat_room\r\n" + 
							"WHERE user_id=:user_id) ucr\r\n" + 
				"ON ucr.chat_room_id=c.receive_room_id\r\n" + 
				"WHERE c.id > ucr.last_chat_id";
		List<BigInteger> res = em.createNativeQuery(jpql)
				.setParameter("user_id", user_id)
				.getResultList();
		log.info(user_id+" 조회된 unread total : "+res.get(0).longValue());
		em.close();
		return res.get(0).longValue();
		
	}
}
