package com.teamgu.database.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QProjectDetail;

@Repository
public class ProjectDetailRepositorySuport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QProjectDetail qProjectDetail = QProjectDetail.projectDetail;
	
	public int findProjectCode() {
		int projectCode = jpaQueryFactory.select(qProjectDetail.projectCode).from(qProjectDetail)
				.where(Expressions.currentTimestamp().between(qProjectDetail.startDate, qProjectDetail.endDate))
				.fetchOne();
		return projectCode;
	}

}
