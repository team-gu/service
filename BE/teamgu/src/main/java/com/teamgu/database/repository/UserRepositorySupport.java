package com.teamgu.database.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.req.TrackReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.SkillResDto;
import com.teamgu.api.dto.res.UserClassResDto;
import com.teamgu.api.dto.res.UserInfoAwardResDto;
import com.teamgu.api.dto.res.UserInfoProjectResDto;
import com.teamgu.database.entity.QCode;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QSkill;
import com.teamgu.database.entity.QStdClass;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QUserClass;
import com.teamgu.database.entity.QUserInfoAward;
import com.teamgu.database.entity.QUserInfoProject;
import com.teamgu.database.entity.QWishTrack;
import com.teamgu.database.entity.QUserProjectDetail;
import com.teamgu.database.entity.QProjectDetail;

@Repository
public class UserRepositorySupport {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@Autowired
	private CodeDetailRepositorySupport codeDetailRepositorySupport;

	QUser qUser = QUser.user;
	QSkill qSkill = QSkill.skill;
	QWishTrack qWishTrack = QWishTrack.wishTrack;
	QMapping qMapping = QMapping.mapping;
	QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;
	QCode qCode = QCode.code1;
	QUserClass qUserClass = QUserClass.userClass;
	QStdClass qStdClass = QStdClass.stdClass;
	QUserInfoAward qUserInfoAward = QUserInfoAward.userInfoAward;
	QUserInfoProject qUserInfoProject = QUserInfoProject.userInfoProject;
  QUserProjectDetail qUserProjectDetail = QUserProjectDetail.userProjectDetail;
  QProjectDetail qProjectDetail = QProjectDetail.projectDetail;
  
	// User Detail Info 수정
	@Transactional
	public Long updateUserDetailInfo(UserInfoReqDto userInfoReqDto) {

		int positionCode = codeDetailRepositorySupport.findPositionCode(userInfoReqDto.getWishPosition());

		return jpaQueryFactory.update(qUser).where(qUser.id.eq(userInfoReqDto.getId()))
				.set(qUser.introduce, userInfoReqDto.getIntroduce()).set(qUser.wishPositionCode, positionCode)
				.execute();

	}

	// User 기술 스택 조회
	public List<SkillResDto> selectUserSkillByUserId(Long userId) {
		return jpaQueryFactory
				.select(Projections.constructor(SkillResDto.class, qCodeDetail.codeDetail, qCodeDetail.Name))
				.from(qSkill)
				.join(qCodeDetail)
				.on(qCodeDetail.codeDetail.eq(qSkill.skillCode))
				.where(qSkill.user.id.eq(userId)
						.and(qCodeDetail.code.code.eq("SK")))
				.fetch();
	}
	
	// User 기술 스택 삭제
	@Transactional
	public Long deleteUserSkill(Long userId, int skillCode ) {
		return jpaQueryFactory
				.delete(qSkill)
				.where(qSkill.user.id.eq(userId)
						.and(qSkill.skillCode.eq(skillCode)))
				.execute();
	}
	
	// User 수상 경력 조회
	public List<UserInfoAwardResDto> selectUserAwardByUserId(Long userId) {
		return jpaQueryFactory
				.select(Projections.constructor(UserInfoAwardResDto.class, qUserInfoAward.id, qUserInfoAward.name,
						qUserInfoAward.agency, qUserInfoAward.date, qUserInfoAward.introduce, qUserInfoAward.user.id))
				.from(qUserInfoAward).where(qUserInfoAward.user.id.eq(userId)).fetch();
	}

//	// User Award 입력
//	public Long insertUserInfoAward(UserInfoAwardResDto userInfoAwardResDto) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	// User Award 수정
	@Transactional
	public Long updateUserInfoAward(UserInfoAwardResDto userInfoAwardResDto) {

		return jpaQueryFactory.update(qUserInfoAward).where(qUserInfoAward.id.eq(userInfoAwardResDto.getId()))
				.set(qUserInfoAward.name, userInfoAwardResDto.getName())
				.set(qUserInfoAward.agency, userInfoAwardResDto.getAgency())
				.set(qUserInfoAward.date, userInfoAwardResDto.getDate())
				.set(qUserInfoAward.introduce, userInfoAwardResDto.getIntroduce()).execute();
	}

	// User Award 삭제
	@Transactional
	public Long deleteUserInfoAward(Long id) {
		return jpaQueryFactory.delete(qUserInfoAward).where(qUserInfoAward.id.eq(id)).execute();
	}

	// User Project 조회
	public List<UserInfoProjectResDto> selectUserProjectByUserId(Long userId) {
		return jpaQueryFactory
				.select(Projections.constructor(UserInfoProjectResDto.class, qUserInfoProject.id, qUserInfoProject.name,
						qCodeDetail.Name, qUserInfoProject.url, qUserInfoProject.introduce, qUserInfoProject.user.id))
				.from(qUserInfoProject).join(qCodeDetail).on(qUserInfoProject.positionCode.eq(qCodeDetail.codeDetail))
				.where(qUserInfoProject.user.id.eq(userId).and(qCodeDetail.code.code.eq("PO"))).fetch();
	}

//	//User Project 입력
//	public Long insertUserInfoProject(UserInfoProjectResDto userInfoProjectResDto, User user) {
////		jpaQueryFactory
////		.insert(qUserInfoProject)
////		.columns(qUserInfoProject.name,
////				qUserInfoProject.introduce,
////				qUserInfoProject.url,
////				qUserInfoProject.user)
////		.values(userInfoProjectResDto.getName(),
////				userInfoProjectResDto.getIntroduce(),
////				userInfoProjectResDto.getUrl(),
////				user)
////		.execute();
//		jpaQueryFactory
//		.insert(qUserInfoProject)
//		.set(qUserInfoProject.name, userInfoProjectResDto.getName())
//		.set(qUserInfoProject.introduce, userInfoProjectResDto.getIntroduce())
//		.set(qUserInfoProject.url, userInfoProjectResDto.getUrl())
//		.set(qUserInfoProject.user, user)
//		.execute();
//
//		return 1L;
//	}

	// User Project 수정
	@Transactional
	public Long updateUserInfoProject(UserInfoProjectResDto userInfoProjectResDto, int positionCode) {
		return jpaQueryFactory.update(qUserInfoProject).where(qUserInfoProject.id.eq(userInfoProjectResDto.getId()))
				.set(qUserInfoProject.name, userInfoProjectResDto.getName())
				.set(qUserInfoProject.introduce, userInfoProjectResDto.getIntroduce())
				.set(qUserInfoProject.url, userInfoProjectResDto.getUrl())
				.set(qUserInfoProject.positionCode, positionCode).execute();
	}

	// User Project 삭제
	@Transactional
	public void deleteUserInfoProject(Long id) {

		jpaQueryFactory.delete(qUserInfoProject).where(qUserInfoProject.id.eq(id)).execute();
	}

	// User Wish Track 조회
	public List<TrackReqDto> selectUserWishTrackByUserId(Long userId) {
		return jpaQueryFactory.select(Projections.constructor(TrackReqDto.class, qCodeDetail.codeDetail, qCodeDetail.Name)).from(qWishTrack).leftJoin(qWishTrack.mapping, qMapping)
				.join(qCodeDetail).on(qMapping.trackCode.eq(qCodeDetail.codeDetail))
				.where(qWishTrack.user.id.eq(userId).and(qCodeDetail.code.code.eq("TR"))).fetch();
	}
	
	// User Wish Track 삭제
	@Transactional
	public void deleteUserWishTrack(Long userId, Long mappingId) {

		jpaQueryFactory
				.delete(qWishTrack)
				.where(qWishTrack.user.id.eq(userId)
						.and(qWishTrack.mapping.id.eq(mappingId)))
				.execute();
	}

	// User Class 조회
	public UserClassResDto selectUserClassByUserId(Long userId, int stage) {
		UserClassResDto userClassDto = (UserClassResDto) jpaQueryFactory
				.select(Projections.constructor(UserClassResDto.class, qStdClass.name, qCodeDetail.Name))
				.from(qUserClass).leftJoin(qUserClass.stdClass, qStdClass).join(qCodeDetail)
				.on(qStdClass.regionCode.eq(qCodeDetail.codeDetail)).where(qUserClass.user.id.eq(userId)
						.and(qStdClass.stageCode.eq(stage + 100)).and(qCodeDetail.code.code.eq("RE")))
				.fetchOne();
		return userClassDto;

	}

  // User의 ProjectCode List조회
  public List<Integer> selectUserProjectCodes(Long userId) {
      return jpaQueryFactory
              .select(Projections.constructor(Integer.class,
                      qProjectDetail.projectCode))
              .from(qUserProjectDetail)
              .innerJoin(qUserProjectDetail.projectDetail, qProjectDetail)
              .where(qUserProjectDetail.user.id.eq(userId))
              .fetch();
  }
  
}
