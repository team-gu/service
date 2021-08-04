package com.teamgu.database.repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QWishTrack;

@Repository
public class WishTrackRepositorySupport {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@PersistenceUnit
	EntityManagerFactory emf;

	QUser qUser = QUser.user;
	QWishTrack qWishTrack = QWishTrack.wishTrack;
	QMapping qMapping = QMapping.mapping;

	// User Wish Track 추가
	public void insertWishTrack(Long userId, Long mappingId) {

//		jpaQueryFactory
//		.insert(qWishTrack)
//		.values(wishTrack.getUser().getId(), wishTrack.getMapping().getId())
//		.execute();

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO wish_track Values(?1, ?2)";

		em.createNativeQuery(jpql)
				.setParameter(1, userId)
				.setParameter(2, mappingId)
				.executeUpdate();

		et.commit();

	}

}
