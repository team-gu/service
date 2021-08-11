package com.teamgu.database.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class AdminRepositorySupport {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@PersistenceUnit
	EntityManagerFactory emf;
	
	QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;
	QMapping qMapping = QMapping.mapping;
	
	// Select Project Track
	public List<CodeResDto> getTrackList(int stageCode, int projectCode){
		
		List<CodeResDto> list = jpaQueryFactory
		.select(Projections.constructor(CodeResDto.class, qMapping.trackCode, qCodeDetail.Name ))
		.from(qMapping)
		.leftJoin(qCodeDetail)
		.on(qMapping.trackCode.eq(qCodeDetail.codeDetail))
		.where(qCodeDetail.code.code.eq("TR")
				.and(qMapping.stageCode.eq(stageCode))
				.and(qMapping.projectCode.eq(projectCode)))
		.fetch();
		
		
		return list;
	}
	
	// Select Code
	public List<CodeResDto> selectCode(String codeId){
		
		return jpaQueryFactory
				.select(Projections.constructor(CodeResDto.class, qCodeDetail.codeDetail, qCodeDetail.Name))
				.from(qCodeDetail).where(qCodeDetail.code.code.eq(codeId)).fetch();

	}
	
	// Insert Code
	public void insertCode(String codeId, String codeName) {
		int lastCode =
				jpaQueryFactory
				.select(qCodeDetail.codeDetail.max())
				.from(qCodeDetail)
				.where(qCodeDetail.code.code.eq(codeId))
				.fetchOne().intValue();
		

		log.info("insertStageCode codeId : " + codeId);
		log.info("insertStageCode lastCode : " + lastCode);
		log.info("insertStageCode codeName : " + codeName);
		
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO code_detail values(?1, ?2, ?3)";

		em.createNativeQuery(jpql)
		.setParameter(1, codeId)
		.setParameter(2, lastCode +1)
		.setParameter(3, codeName)
		.executeUpdate();

		et.commit();
		em.close();
		
	}
	
	// Delete Code
	@Transactional
	public void deleteCode(String codeId, int code) {

		jpaQueryFactory
		.delete(qCodeDetail)
		.where(qCodeDetail.codeDetail.eq(code)
				.and(qCodeDetail.code.code.eq(codeId)))
		.execute();
		
	}

	// Check Insertable
	
	public boolean checkInsertable(String codeId, String codeName) {
		
		BooleanBuilder builder = new BooleanBuilder();

		builder.and(qCodeDetail.code.code.eq(codeId));
		builder.and(qCodeDetail.Name.eq(codeName));
		
		List<Integer> list = 
				jpaQueryFactory
				.select(qCodeDetail.codeDetail)
				.from(qCodeDetail)
				.where(builder)
				.fetch();
		
		log.info("checkInsertable : " + list.size());
		
		if(list.size() == 0)
			return true;
		else
			return false;
		
	}
	
	// Check Deleteable 
	public boolean checkDeleteable(String codeName, int code) {

		BooleanBuilder builder = new BooleanBuilder();
		
		if(codeName.equals("PR")) {
			builder.and(qMapping.projectCode.eq(code));
		}
		else if(codeName.equals("TR")) {
			builder.and(qMapping.trackCode.eq(code));
		}
		else if(codeName.equals("ST")) {
			builder.and(qMapping.stageCode.eq(code));
		}
		
		List<Long> list = jpaQueryFactory
		.select(qMapping.id)
		.from(qMapping)
		.where(builder)
		.fetch();
		
		if(list.size() == 0)
			return true;
		else
			return false;
		
	}
}
