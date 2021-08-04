package com.teamgu.database.repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class UserSkillRepositorySupport {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@PersistenceUnit
	EntityManagerFactory emf;
	
	// User 기술스택 추가
	public void insertSkiil(Long userId, int skillCode) {
		
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO skill Values(?1, ?2)";

		em.createNativeQuery(jpql)
				.setParameter(1, skillCode)
				.setParameter(2, userId)
				.executeUpdate();

		et.commit();
	}

}
