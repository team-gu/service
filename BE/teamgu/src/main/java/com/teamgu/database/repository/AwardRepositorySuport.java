package com.teamgu.database.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QUserInfoAward;
import com.teamgu.database.entity.UserInfoAward;
@Repository
public class AwardRepositorySuport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	
	QUserInfoAward qAward = QUserInfoAward.userInfoAward;

	public void modAwards(UserInfoAward award, String email) {
		jpaQueryFactory.update(qAward)
		.where(qAward.name.eq(award.getName()))
		.set(qAward.introduce, award.getIntroduce())
		.set(qAward.user, award.getUser())
		.set(qAward.agency, award.getAgency())
		.set(qAward.date, award.getDate())
		.execute();
	}
}
