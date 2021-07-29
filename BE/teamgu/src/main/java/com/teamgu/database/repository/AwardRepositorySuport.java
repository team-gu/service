package com.teamgu.database.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QUserAward;
import com.teamgu.database.entity.UserAward;
@Repository
public class AwardRepositorySuport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	
	QUserAward qAward = QUserAward.userAward;

	public void modAwards(UserAward award, String email) {
		jpaQueryFactory.update(qAward)
		.where(qAward.name.eq(award.getName()))
		.set(qAward.introduce, award.getIntroduce())
		.set(qAward.user, award.getUser())
		.set(qAward.agency, award.getAgency())
		.set(qAward.date, award.getDate())
		.execute();
	}
}
