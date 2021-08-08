package com.teamgu.database.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TrackReqDto;
import com.teamgu.api.dto.res.SkillResDto;
import com.teamgu.api.dto.res.TeamListResDto;
import com.teamgu.api.dto.res.TeamMemberInfoResDto;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QTeam;
import com.teamgu.database.entity.QTeamSkill;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QUserTeam;
import com.teamgu.database.entity.Team;

@Repository
public class TeamRepositorySupport {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@PersistenceUnit
	EntityManagerFactory emf;

	QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;
	QTeamSkill qTeamSkill = QTeamSkill.teamSkill;
	QUser qUser = QUser.user;
	QUserTeam qUserTeam = QUserTeam.userTeam;
	QTeam qTeam = QTeam.team;

	// Team Skill 조회
	public List<SkillResDto> getTeamSkillsByTeamId(Long teamId) {
		return jpaQueryFactory
				.select(Projections.constructor(SkillResDto.class, qCodeDetail.codeDetail, qCodeDetail.Name))
				.from(qTeamSkill).join(qCodeDetail).on(qCodeDetail.codeDetail.eq(qTeamSkill.skillCode))
				.where(qTeamSkill.team.id.eq(teamId).and(qCodeDetail.code.code.eq("SK"))).fetch();
	}

	// Team Skill 추가
	public void addSkill(Long teamId, int skillCode) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO team_skill Values(?1, ?2)";

		em.createNativeQuery(jpql).setParameter(1, skillCode).setParameter(2, teamId).executeUpdate();

		et.commit();
		em.close();

	}

	// Team Skill 삭제
	@Transactional
	public void deleteSkill(Long teamId, int skillCode) {
		jpaQueryFactory.delete(qTeamSkill).where(qTeamSkill.team.id.eq(teamId).and(qTeamSkill.skillCode.eq(skillCode)))
				.execute();
	}

	// Team Member 조회
	public List<TeamMemberInfoResDto> getTeamMemberInfo(Long teamId) {

		return jpaQueryFactory
				.select(Projections.constructor(TeamMemberInfoResDto.class, qUser.id, qUser.name,
						qUser.profileServerName, qUser.email))
				.from(qUser).join(qUserTeam).on(qUser.id.eq(qUserTeam.user.id)).where(qUserTeam.team.id.eq(teamId))
				.fetch();
	}
	
	// TeamId를 이용한 Team 멤버 idx 조회
	public List<Long> getTeamMemberIdbyTeamId(Long teamId) {
		return jpaQueryFactory
				.select(qUser.id)
				.from(qUser).join(qUserTeam).on(qUser.id.eq(qUserTeam.user.id)).where(qUserTeam.team.id.eq(teamId))
				.fetch();
	}

	// Team Member 추가
	public void addMember(Long teamId, Long userId) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO user_team (team_id, user_id) Values(?1, ?2)";

		em.createNativeQuery(jpql).setParameter(1, teamId).setParameter(2, userId).executeUpdate();

		et.commit();
		em.close();

	}

	// Team Member 삭제
	public void deleteMember(Long teamId, Long userId) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "DELETE FROM user_team where team_id = ?1 and user_id = ?2";

		em.createNativeQuery(jpql).setParameter(1, teamId).setParameter(2, userId).executeUpdate();

		et.commit();
		em.close();
	}

	// Team의 teamId 조회
	public Long getTeamId(Team team) {

		return jpaQueryFactory.select(qTeam.id).from(qTeam)
				.where(qTeam.name.eq(team.getName()).and(qTeam.mapping.id.eq(team.getMapping().getId()))
						.and(qTeam.user.id.eq(team.getUser().getId())).and(qTeam.introduce.eq(team.getIntroduce())))
				.fetchOne();
	}

	// Team Leader 변경
	public void changeTeamLeader(Long teamId, Long userId) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "UPDATE team SET leader_id = ?1 WHERE id = ?2";

		em.createNativeQuery(jpql)
			.setParameter(1, userId)
			.setParameter(2, teamId)
			.executeUpdate();
		et.commit();
		em.close();
	}
	
	// Team 구성 완료 여부
	@Transactional
	public void completeTeamBuilding(Long teamId) {
		short value = jpaQueryFactory
				.select(qTeam.completeYn)
				.from(qTeam)
				.where(qTeam.id.eq(teamId))
				.fetchOne();
		
		value = (short) ((value == 0)?1:0);
		
		jpaQueryFactory
		.update(qTeam)
		.set(qTeam.completeYn, value)
		.where(qTeam.id.eq(teamId))
		.execute();
				
	}
	
	
	/*
	 * TEAM 구성 취소
	 */

	// Team 구성 취소시 모든 기술 스택 삭제
	@Transactional
	public void deleteAllTeamSkillbyTeamId(Long teamId) {

		jpaQueryFactory.delete(qTeamSkill).where(qTeamSkill.team.id.eq(teamId)).execute();

	}

	// Team 구성 취소 시 모든 유저 삭제
	public void deleteAllTeamMemberbyUserId(Long teamId) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "DELETE FROM user_team where team_id = ?1 ";

		em.createNativeQuery(jpql).setParameter(1, teamId).executeUpdate();
		et.commit();
		em.close();

	}

	// Team 구성 취소 시 Team 자료 삭제
	@Transactional
	public void deleteTeamInfobyTeamId(Long teamId) {

		jpaQueryFactory.delete(qTeam).where(qTeam.id.eq(teamId)).execute();
	}
	
	// Team 생성 가능 여부 체크
	public boolean checkTeamBuilding(Long userId, String trackName) {
		EntityManager em = emf.createEntityManager();
		
		String jpql = "select user_id from user_team where team_id in " 
				+ "(select id from team where mapping_id in "
				+		"(select id from mapping where project_code in "
				+			"(select distinct project_code from mapping where track_code = (select code_detail from code_detail where name = ?2))"
				+		"and stage_code in "
				+			"(select distinct stage_code from mapping where track_code = (select code_detail from code_detail where name = ?2))))"
				+	"and user_id = ?1";
		Query query = em.createNativeQuery(jpql)
		.setParameter(1, userId)
		.setParameter(2, trackName)
		;
		List<Long> chk = query.getResultList();
		int size = chk.size();
		em.close();
		if(size == 0) {
			return true;
		}
		else {
			return false;
		}

	}
	
	// Team Id Filter
	public List<Long> getTeamIdbyFilter(TeamFilterReqDto teamFilterReqDto) {
		
		EntityManager em = emf.createEntityManager();
		
		StringBuilder skillFilter = new StringBuilder();
		StringBuilder trackFilter = new StringBuilder();
		
		// skillsFilter
		List<SkillResDto> skills = teamFilterReqDto.getFilteredSkills();
		int skillsSize =skills.size();
		
		List<TrackReqDto> tracks = teamFilterReqDto.getFilteredTracks();
		int tracksSize = tracks.size();
		
		for(int i = 0; i<skillsSize; i++) {
			if(i == 0) {
				skillFilter.append("in (");
			}
			skillFilter.append(skills.get(i).getCode());
			if(i == (skillsSize -1)) {
				skillFilter.append(")\n");
			}
			else {
				skillFilter.append(", ");
			}
		}
		System.out.println(skillFilter.toString());
		
		//tracks Filter
		for(int i = 0; i<tracksSize; i++) {
			if(i == 0) {
				trackFilter.append("in (\"");
			}
			trackFilter.append(tracks.get(i).getCodeName());
			if(i == (tracksSize -1)) {
				trackFilter.append("\")\n");
			}
			else {
				trackFilter.append("\", \"");
			}
		}
		System.out.println(trackFilter.toString());
		
		String jqpl = 
				"select distinct team.id\r\n" + 
				"from team left outer join team_skill\r\n" + 
				"on team.id = team_skill.team_id\r\n" + 
				"left outer join mapping\r\n" + 
				"on team.mapping_id = mapping.id\r\n" + 
				"where team_skill.skill_code " + skillFilter.toString() + "\r\n" + 
				"and mapping_id in\r\n" + 
				"(select id from mapping where stage_code = 105 and track_code in \r\n" + 
				"(select code_detail from code_detail where name " + trackFilter.toString()  +"))\r\n" + 
				"order by team.id asc";
		List<Long> list = em.createNativeQuery(jqpl).getResultList();
		em.close();

		return list;
	}

//	public void createTeam(TeamListResDto teamListResDto) {
//	
//		
//	}

//	QTeam qTeam = QTeam.team;
//	QMapping qMapping = QMapping.mapping;
//	QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;
//	
//	public List<TeamListResDto> selectTeam(){
//		
//		return jpaQueryFactory
//				.select(qTeam.id, qTeam.completeYn, qTeam.maxMember, qTeam.user.id, qCodeDetail.Name, qTeam.name)
//				.from(qTeam)
//				.leftJoin(qMapping)
//				.join(qMapping, qCodeDetail)
//				.on(qMapping.trackCode.eq(qCodeDetail.codeDetail))
//				.where(qCodeDetail.Name.eq("TR"))
//				.fetch();
//		
//	}
}
