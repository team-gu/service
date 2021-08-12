package com.teamgu.database.repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.hibernate.sql.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.req.TeamAutoCorrectReqDto;
import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TrackReqDto;
import com.teamgu.api.dto.res.SkillResDto;
import com.teamgu.api.dto.res.TeamAutoCorrectResDto;
import com.teamgu.api.dto.res.TeamListResDto;
import com.teamgu.api.dto.res.TeamMemberInfoResDto;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QTeam;
import com.teamgu.database.entity.QTeamSkill;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QUserTeam;
import com.teamgu.database.entity.Team;

import lombok.extern.log4j.Log4j2;

@Log4j2
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
	QMapping qMapping = QMapping.mapping;

	// Team Skill 조회
	public List<SkillResDto> getTeamSkillsByTeamId(Long teamId) {
		return jpaQueryFactory
				.select(Projections.constructor
						(SkillResDto.class, qCodeDetail.codeDetail, qCodeDetail.Name))
				.from(qTeamSkill)
				.join(qCodeDetail)
				.on(qCodeDetail.codeDetail.eq(qTeamSkill.skillCode))
				.where(qTeamSkill.team.id.eq(teamId)
						.and(qCodeDetail.code.code.eq("SK")))
				.fetch();
	}

	// Team Skill 추가
	public void addSkill(Long teamId, int skillCode) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO team_skill Values(?1, ?2)";

		em.createNativeQuery(jpql)
		.setParameter(1, skillCode)
		.setParameter(2, teamId)
		.executeUpdate();

		et.commit();
		em.close();

	}

	// Team Skill 삭제
	@Transactional
	public void deleteSkill(Long teamId, int skillCode) {
		jpaQueryFactory
		.delete(qTeamSkill)
		.where(qTeamSkill.team.id
				.eq(teamId)
				.and(qTeamSkill.skillCode.eq(skillCode)))
				.execute();
	}

	// Team Member 조회
	public List<TeamMemberInfoResDto> getTeamMemberInfo(Long teamId) {

		return jpaQueryFactory
				.select(Projections.constructor
						(TeamMemberInfoResDto.class, qUser.id, qUser.name,
						qUser.profileServerName, qUser.email))
				.from(qUser)
				.join(qUserTeam)
				.on(qUser.id.eq(qUserTeam.user.id))
				.where(qUserTeam.team.id.eq(teamId))
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
		.setParameter(2, trackName);
		
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
	
	// Team 생성 가능 여부 체크
	public List<BigInteger> checkTeamBuilding(Long userId, int projectCode) {
		
		EntityManager em = emf.createEntityManager();
		
		String jpql = "select team_id from user_team where team_id in \r\n" + 
				"(select id from team where team.mapping_id in \r\n" + 
				"(select mapping.id from mapping where mapping.project_code = ?1))" +
				" and user_id = ?2";
		
		Query query = em.createNativeQuery(jpql)
		.setParameter(1, projectCode)
		.setParameter(2, userId);
		
		List<BigInteger> result = query.getResultList();
		
		return result;

	}
	
	// Team Id Now Member 업데이트
	@Transactional
	public void updateTeamBuildMemberCount(Long teamId){

		jpaQueryFactory
		.update(qTeam)
		.set(qTeam.nowMember,  (JPAExpressions
				.select(qUser.id.count().intValue())
				.from(qUserTeam)
				.where(qUserTeam.team.id.eq(teamId)))
				)
		.where(qTeam.id.eq(teamId))
		.execute();
		
	}
	
	// Team Id Filter
	public List<Long> getTeamIdbyFilter(TeamFilterReqDto teamFilterReqDto) {
		
		EntityManager em = emf.createEntityManager();
		List<Long> list = null;
		String jqpl = null;
		
		// Serach User Id
		Long userId = teamFilterReqDto.getUserId();
		int stageCode = ((teamFilterReqDto.getStudentNumber().charAt(0) - '0') * 10 + teamFilterReqDto.getStudentNumber().charAt(1) - '0') + 100;
		int projectCode = teamFilterReqDto.getProject();
		
		if(userId == 0) { // filter 인경우
			
			StringBuilder skillFilter = new StringBuilder();
			StringBuilder trackFilter = new StringBuilder();
			
			String asc = (teamFilterReqDto.isSortAsc())? "asc" : "desc";
			String sortType = teamFilterReqDto.getSortBy();
			String sort = "id";
			
			if(sortType.equals("numberOfMembers")) {
				sort = "now_member";
			}
			else if(sortType.equals("teamName")) {
				sort = "name";
			}
			String orderBy = " team." + sort + " " + asc;
			

			// skillsFilter
			List<SkillResDto> skills = teamFilterReqDto.getFilteredSkills();
			int skillsSize =skills.size();
			
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
			
			// trackFilter
			List<TrackReqDto> tracks = teamFilterReqDto.getFilteredTracks();
			int tracksSize = tracks.size();

			for(int i = 0; i<tracksSize; i++) {
				if(i == 0) {
					trackFilter.append("in (");
				}
				trackFilter.append(tracks.get(i).getCode());
				if(i == (tracksSize -1)) {
					trackFilter.append(")\n");
				}
				else {
					trackFilter.append(", ");
				}
			}
			
			jqpl = 
					"select distinct team.id\r\n" + 
					"from team left outer join team_skill\r\n" + 
					"on team.id = team_skill.team_id\r\n" + 
					"left outer join mapping\r\n" + 
					"on team.mapping_id = mapping.id\r\n" + 
					"where team_skill.skill_code " + skillFilter.toString() + "\r\n" + 
					"and mapping_id in\r\n" + 
					"(select id from mapping where project_code = " + projectCode + " and stage_code = "+stageCode+" and track_code " + trackFilter.toString()  +")\r\n" + 
					"order by team.complete_yn, " + orderBy;
		}
		else { // 검색 인 경우
			
			jqpl = 
					"select team_id from user_team where team_id in \r\n" +
					"(select id from team where team.mapping_id in \r\n" +
					"(select mapping.id from mapping where mapping.project_code = " + projectCode + " and stage_code = " + stageCode +")) and user_id = " + userId;
		}
		
		list = em.createNativeQuery(jqpl).getResultList();
		
		em.close();

		return list;
	}
	
	// Team Auto Correct
	public List<TeamAutoCorrectResDto> getUserAutoCorrect(TeamAutoCorrectReqDto teamAutoCorrectReqDto){
		
		String search = teamAutoCorrectReqDto.getSearch();
		String stage = teamAutoCorrectReqDto.getStudentNumber().substring(0, 2) + "%";

		return jpaQueryFactory
				.select(Projections.constructor(TeamAutoCorrectResDto.class, qUser.id, qUser.name, qUser.email))
				.from(qUser)
				.where((qUser.email.contains(search)
						.or(qUser.name.contains(search)))
						.and(qUser.studentNumber.like(stage)))
				.fetch();
	}
	
	// Check Team Leader
	public Boolean checkTeamLeader(Long userId, int projectCode) {

		String studentNumber = jpaQueryFactory
		.select(qUser.studentNumber)
		.from(qUser)
		.where(qUser.id.eq(userId))
		.fetchOne();
		
		if(studentNumber == null) return false;
		int stageCode = ((studentNumber.charAt(0) - '0') * 10 + studentNumber.charAt(1) - '0') + 100;
		
		Long leaderId = 
		jpaQueryFactory
		.select(qTeam.user.id)
		.from(qTeam)
		.where(qTeam.mapping.id.in(JPAExpressions
				.select(qMapping.id)
				.from(qMapping)
				.where(qMapping.projectCode.eq(projectCode)
						.and(qMapping.stageCode.eq(stageCode))))
				.and(qTeam.id.in(JPAExpressions
						.select(qUserTeam.team.id)
						.from(qUserTeam)
						.where(qUserTeam.user.id.eq(userId)))))
		.fetchOne().longValue();
		
		if(leaderId == userId)
			return true;
		else 
			return false;
	}
	/**
	 * 리더id와 팀id를 대조하여 유효한 초대인지 확인한다	
	 * 유효하면 양의 정수, 아니라면 0을 반환 
	 * @param leader_id
	 * @return
	 */
	public boolean checkTeamBetweenLeader(long leader_id,long team_id) {
		EntityManager em = emf.createEntityManager();
		try {
			String jpql = "SELECT IFNULL(id,0) FROM team WHERE id=:team_id AND leader_id=:leader_id\r\n"
						+ "UNION ALL\r\n"
						+ "SELECT 0 FROM dual LIMIT 1";
			List<BigInteger> res = em.createNativeQuery(jpql).setParameter("team_id", team_id).setParameter("leader_id", leader_id).getResultList();
			long id = res.get(0).longValue();
			if(id>0)return true;
		}catch(Exception e) {
			log.error("팀과 팀장 확인에 실패했습니다");
			return false;
		}finally {
			em.close();
		}
		return false;
	}
}
