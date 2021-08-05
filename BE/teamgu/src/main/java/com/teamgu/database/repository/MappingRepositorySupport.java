package com.teamgu.database.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.QMapping;

@Repository
public class MappingRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	
	QMapping qMapping = QMapping.mapping;
	
	//
	public Mapping selectMapping(int trackCode) {
		
		
		return (Mapping) jpaQueryFactory
				.from(qMapping)
				.where(qMapping.trackCode.eq(trackCode))
				.fetchOne();
		
	}
	
	
}
