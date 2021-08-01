package com.teamgu.database.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.QSkill;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QUserAward;
import com.teamgu.database.entity.QUserProject;
import com.teamgu.database.entity.QWishTrack;
import com.teamgu.database.entity.Skill;
import com.teamgu.database.entity.UserAward;
import com.teamgu.database.entity.UserProject;
import com.teamgu.database.entity.WishTrack;

@Repository
public class UserQueryRepository {
	
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QUser qUser = QUser.user;
	QSkill qSkill = QSkill.skill;
	QUserAward qUserAward = QUserAward.userAward;
	QUserProject qUserProject = QUserProject.userProject;
	QWishTrack qWishTrack = QWishTrack.wishTrack;
	
	// User 기술 스택 조회
	public List<Integer> selectUserSkillByEmail(String email){
		return jpaQueryFactory
				.select(qSkill.skillCode)
				.from(qSkill)
				.leftJoin(qSkill.user, qUser)
				.where(qUser.email.eq(email))
				.fetch();
	}
	
	// User 수상 경력 조회
	public List<UserAward> selectUserAwardByEmail(String email){
		return (List<UserAward>) jpaQueryFactory
				.from(qUserAward)
				.leftJoin(qUserAward.user, qUser)
				.where(qUser.email.eq(email))
				.fetch();
	}
	
	// User Project 조회
	public List<UserProject> selectUserProjectByEmail(String email){
		return (List<UserProject>) jpaQueryFactory
				.from(qUserProject)
				.leftJoin(qUserProject.user, qUser)
				.where(qUser.email.eq(email))
				.fetch(); 
	}
	
	// User Wish Track 조회
	public List<WishTrack> selectUserWishTrackByEmail(String email){
		return  (List<WishTrack>) jpaQueryFactory
				.from(qWishTrack)
				.leftJoin(qWishTrack.user, qUser)
				.where(qUser.email.eq(email))
				.fetch(); 
	}
}
