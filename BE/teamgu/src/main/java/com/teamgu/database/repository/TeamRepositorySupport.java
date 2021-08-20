package com.teamgu.database.repository;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.req.TeamAutoCorrectReqDto;
import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TrackReqDto;
import com.teamgu.api.dto.res.HorizontalByTeamResDto;
import com.teamgu.api.dto.res.SkillResDto;
import com.teamgu.api.dto.res.TeamAutoCorrectResDto;
import com.teamgu.api.dto.res.TeamMemberInfoResDto;
import com.teamgu.api.dto.res.UserInfoByTeam;
import com.teamgu.api.dto.res.VerticalByUserResDto;
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
		try {
			et.begin();
	
			String jpql = "INSERT INTO team_skill Values(?1, ?2)";
	
			em.createNativeQuery(jpql)
			.setParameter(1, skillCode)
			.setParameter(2, teamId)
			.executeUpdate();
	
			et.commit();
		}catch(Exception e) {
			et.rollback();
			e.printStackTrace();
		}finally {
			em.close();
		}

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
						qUser.profileServerName, qUser.profileExtension, qUser.email))
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
		try {
			et.begin();
	
			String jpql = "INSERT INTO user_team (team_id, user_id) Values(?1, ?2)";
	
			em.createNativeQuery(jpql).setParameter(1, teamId).setParameter(2, userId).executeUpdate();
	
			et.commit();
		}catch(Exception e) {
			et.rollback();
			e.printStackTrace();
		}finally {
			em.close();
		}

	}

	// Team Member 삭제
	public void deleteMember(Long teamId, Long userId) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		try {
			et.begin();
	
			String jpql = "DELETE FROM user_team where team_id = ?1 and user_id = ?2";
	
			em.createNativeQuery(jpql).setParameter(1, teamId).setParameter(2, userId).executeUpdate();
	
			et.commit();
		}catch(Exception e) {
			et.rollback();
			e.printStackTrace();
		}finally {
			em.close();
		}
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
		try {
			et.begin();
	
			String jpql = "UPDATE team SET leader_id = ?1 WHERE id = ?2";
	
			em.createNativeQuery(jpql)
				.setParameter(1, userId)
				.setParameter(2, teamId)
				.executeUpdate();
			et.commit();
		}catch(Exception e) {
			et.rollback();
			e.printStackTrace();
		}finally {			
			em.close();
		}
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
		try {
			et.begin();
	
			String jpql = "DELETE FROM user_team where team_id = ?1 ";
	
			em.createNativeQuery(jpql).setParameter(1, teamId).executeUpdate();
			et.commit();
		}catch(Exception e) {
			et.rollback();
			e.printStackTrace();
		}finally {			
			em.close();
		}

	}

	// Team 구성 취소 시 Team 자료 삭제
	@Transactional
	public void deleteTeamInfobyTeamId(Long teamId) {

		jpaQueryFactory.delete(qTeam).where(qTeam.id.eq(teamId)).execute();
	}
	
	// Team 생성 가능 여부 체크
	public boolean checkTeamBuilding(Long userId, String trackName) {
		
		EntityManager em = emf.createEntityManager();
		List<Long> chk = new ArrayList<>();
		try {
			
			String jpql = "select user_id from user_team where team_id in " 
					+ "(select id from team where mapping_id in "
					+		"(select id from mapping where project_code in "
					+			"(select distinct project_code from mapping where track_code = (select code_detail from code_detail where name = :trackName))"
					+		"and stage_code in "
					+			"(select distinct stage_code from mapping where track_code = (select code_detail from code_detail where name = :trackName))))"
					+	"and user_id = :userId";
			
			Query query = em.createNativeQuery(jpql)
			.setParameter("userId", userId)
			.setParameter("trackName", trackName);
			
			chk = query.getResultList();
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
		} finally {

			em.close();
		}
		
		int size = chk.size();
		
		
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
		List<BigInteger> result = null;
		try {
			String jpql = "select team_id from user_team where team_id in \r\n" + 
					"(select id from team where team.mapping_id in \r\n" + 
					"(select mapping.id from mapping where mapping.project_code = ?1))" +
					" and user_id = ?2";	
			result = em.createNativeQuery(jpql)
						.setParameter(1, projectCode)
						.setParameter(2, userId).getResultList();		
		}catch(Exception e) {
			e.printStackTrace();		
		}finally {
			em.close();
		}
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
		String jpql = null;
		
		// Serach User Id
		Long userId = teamFilterReqDto.getUserId();
		int stageCode = ((teamFilterReqDto.getStudentNumber().charAt(0) - '0') * 10 + teamFilterReqDto.getStudentNumber().charAt(1) - '0') + 100;
		int projectCode = teamFilterReqDto.getProject();
		int regionCode = teamFilterReqDto.getStudentNumber().charAt(2) - '0' + 100;
		
		if(userId == 0) { // filter 인경우
			
			StringBuilder skillFilter = new StringBuilder();
			StringBuilder trackFilter = new StringBuilder();	
			StringBuilder classJoinFilter = new StringBuilder();
			StringBuilder classFilter = new StringBuilder();
			String asc = (teamFilterReqDto.isSortAsc())? "asc" : "desc";
			String sortType = teamFilterReqDto.getSortBy();
			String sort = "id";
			String stdNumber = teamFilterReqDto.getStudentNumber();
			if(sortType.equals("numberOfMembers")) {
				sort = "now_member";
			}
			else if(sortType.equals("teamName")) {
				sort = "name";
			}
			String orderBy = " team." + sort + " " + asc;
			
			if(projectCode == 101) {
				
				classJoinFilter.append("left outer join user_class uc\r\n");
				classJoinFilter.append("on user.id =  uc.user_id\r\n");
				
				classFilter.append("and uc.class_id = (\r\n");
				classFilter.append("	select user_class.class_id\r\n");
				classFilter.append("    from user_class\r\n");
				classFilter.append("    where user_class.user_id = (\r\n");
				classFilter.append("        select user.id from user where user.student_number = "+ stdNumber + " )\r\n");
				classFilter.append("    and user_class.class_id in (\r\n");
				classFilter.append("		select id\r\n");
				classFilter.append("		from std_class\r\n");
				classFilter.append("			where project_code = " + projectCode + "\r\n");
				classFilter.append("				and region_code = " + regionCode + "\r\n");
				classFilter.append("				and stage_code = " + stageCode + "))\r\n");
				
			}

			// skillsFilter
			List<SkillResDto> skills = teamFilterReqDto.getFilteredSkills();
			int skillsSize =skills.size();
			
			for(int i = 0; i<skillsSize; i++) {
				skillFilter.append("and ts.sc like '%");
				skillFilter.append(skills.get(i).getCode());
				skillFilter.append("%'\n");
		
			}
			
			// trackFilter
			List<TrackReqDto> tracks = teamFilterReqDto.getFilteredTracks();
			int tracksSize = tracks.size();

			for(int i = 0; i<tracksSize; i++) {
				if(i == 0) {
					trackFilter.append(" and track_code in (");
				}
				trackFilter.append(tracks.get(i).getCode());
				if(i == (tracksSize -1)) {
					trackFilter.append(")\n");
				}
				else {
					trackFilter.append(", ");
				}
			}
			
			jpql =  "select distinct team.id\r\n" + 
					"from team\r\n" + 
					"left outer join user\r\n" + 
					"on team.leader_id = user.id\r\n" + 
					"left outer join (select team_id, group_concat(skill_code)as sc from team_skill group by team_id) ts\r\n" + 
					"on team.id = ts.team_id\r\n" + classJoinFilter.toString() + 
					"where mapping_id in ( select mapping.id from mapping where mapping.project_code = "+ projectCode + " and mapping.stage_code = " + stageCode + trackFilter.toString() + ")\r\n" + 
					"and (substr(user.student_number, 3, 1) + 100 ) = " + regionCode +"\r\n" + 
					classFilter.toString() + 
					skillFilter.toString() + 
					"order by team.complete_yn,"+ orderBy;
		}
		else { // 검색 인 경우
			
			jpql = 
					"select team_id from user_team where team_id in \r\n" +
					"(select id from team where team.mapping_id in \r\n" +
					"(select mapping.id from mapping where mapping.project_code = " + projectCode + " and stage_code = " + stageCode +")) and user_id = " + userId;
		}
		try {
			list = em.createNativeQuery(jpql).getResultList();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			em.close();
		}
		return list;
	}
	
	// Team Auto Correct
	public List<TeamAutoCorrectResDto> getUserAutoCorrect(TeamAutoCorrectReqDto teamAutoCorrectReqDto){
		
		String search = teamAutoCorrectReqDto.getSearch();
		int stageCode = Integer.parseInt(teamAutoCorrectReqDto.getStudentNumber().substring(0, 2)) + 100;
		int projectCode = teamAutoCorrectReqDto.getProjectCode();
		
		EntityManager em = emf.createEntityManager();
		List<TeamAutoCorrectResDto> list = new ArrayList<>();
		
		try {
			String jpql = "select u.id, u.name, u.email\r\n" + 
					"from (select user.id, user.name, user.email, user.student_number from user where user.id in \r\n" + 
					"		(select user_team.user_id from user_team where user_team.team_id in \r\n" + 
					"			(select team.id from team where mapping_id in \r\n" + 
					"				(select mapping.id from mapping where project_code = :projectCode and stage_code = :stageCode)\r\n" + 
					"			)\r\n" + 
					"		)\r\n" + 
					"	) u \r\n" + 
					"where u.name like :search or u.email like :search or u.student_number like :search \r\n" + 
					"order by u.id";
			
			List<Object[]> datas = em.createNativeQuery(jpql)
					.setParameter("search", "%" + search + "%")
					.setParameter("projectCode", projectCode)
					.setParameter("stageCode", stageCode)
					.getResultList();
			
			for (Object[] data : datas) {
				list.add(TeamAutoCorrectResDto.builder()
						.id(Long.parseLong(data[0].toString()))
						.name(data[1].toString())
						.email(data[2].toString())
						.build());
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			em.close();
		}

		return list;
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
	
	/**
	 * 특정 기수, 프로젝트 도메인에 존재하는 팀 목록 반환
	 * 단, 코드 반환이 아닌 엑셀에 출력 될 이름으로 반환한다
	 * @param project_code
	 * @param stage_code
	 * @return
	 */
	public List<HorizontalByTeamResDto> getTeamList(int project_code, int stage_code){
		List<HorizontalByTeamResDto> horizontalByTeamResDto = new ArrayList<HorizontalByTeamResDto>();
		EntityManager em = emf.createEntityManager();
		try {
			String jpql = "select t.id, t.name, cd.name stage, cd2.name track, cd3.name project\r\n" + 
							"from mapping m\r\n" + 
							"right join team t\r\n" + 
							"on m.id = t.mapping_id\r\n" + 
							"left join code_detail cd\r\n" + 
							"on cd.code_id='ST' and cd.code_detail=m.stage_code\r\n" + 
							"left join code_detail cd2\r\n" + 
							"on cd2.code_id='TR' and cd2.code_detail=m.track_code\r\n" + 
							"left join code_detail cd3\r\n" + 
							"on cd3.code_id='PR' and cd3.code_detail=m.project_code\r\n" + 
							"where m.project_code=:project_code and m.stage_code= :stage_code";
			List<Object[]> results = em.createNativeQuery(jpql)
									.setParameter("project_code", project_code)
									.setParameter("stage_code", stage_code)
									.getResultList();
			/**
			 * 0: team_id
			 * 1: team_name
			 * 2: stage_name
			 * 3: track_name
			 * 4: proejct_name
			 */
			for(int i =0;i<results.size();i++) {
				Object[] o = results.get(i);
				long team_id = Long.parseLong(o[0].toString());
				String team_name = o[1].toString();
				String stage_name = o[2].toString();
				String track_name = o[3].toString();
				String project_name = o[4].toString();
				
				//변환 즉시 반환 객체에 추가
				horizontalByTeamResDto.add(HorizontalByTeamResDto.builder()
												.team_id(team_id)
												.name(team_name)
												.stage_name(stage_name)
												.track_name(track_name)
												//다음 단계에서 추가될 예정이므로 미리 설정해준다
												.members(new ArrayList<UserInfoByTeam>())
												.project_name(project_name)
												.build());
			}
		}catch(Exception e) {
			log.error("Excel) 팀 가져오기 실패");
			e.printStackTrace();
		}finally {
			em.close();
		}
		return horizontalByTeamResDto;
	}
	
	/**
	 * 멤버를 제외한 리스트형 팀 DTO를 받고
	 * 해당 객체에 있는 team_id에 속한 유저들의 값을 채워
	 * 완성된 DTO를 반환한다
	 * @param teamsInfo
	 * @return
	 */
	public List<HorizontalByTeamResDto> getUserListByTeam(List<HorizontalByTeamResDto> teamsInfo){
		EntityManager em = emf.createEntityManager();
		try {
			for(int i =0;i<teamsInfo.size();i++) {
				long team_id = teamsInfo.get(i).getTeam_id();
				String jpql = "select ut.team_id, u.id ,u.name, u.email, u.student_number, if(t.leader_id=u.id,'팀장','팀원') role\r\n" + 
								"from user_team ut\r\n" + 
								"left join user u\r\n" + 
								"on ut.user_id = u.id\r\n" + 
								"left join team t\r\n" + 
								"on t.id = ut.team_id\r\n" + 
								"where ut.team_id=:team_id";
				List<Object[]> o = em.createNativeQuery(jpql).setParameter("team_id", team_id).getResultList();
				for(int j = 0;j<o.size();j++) {
					Object[] el = o.get(j);
					/**
					 * 0:team_id
					 * 1:user_id
					 * 2:user_name
					 * 3:email
					 * 4:student_number
					 * 5:role (팀장, 팀원)
					 */
					UserInfoByTeam userInfoByTeam = UserInfoByTeam.builder()															
															.name(el[2].toString())
															.email(el[3].toString())
															.studentNumber(el[4].toString())
															.role(el[5].toString())
															.build();
					teamsInfo.get(i).getMembers().add(userInfoByTeam);		
				}
				
			}
		}catch(Exception e) {
			log.error("팀 객체에 유저 정보를 채우는 것에 실패했습니다");
			e.printStackTrace();
		}finally {
			em.close();
		}
		return teamsInfo;
	}
	
	/**
	 * 기수, 프로젝트코드를 입력 받으면 해당하는 유저들의 현재 팀 정보와 유저 정보를 반환
	 * @param stage_code
	 * @param project_code
	 * @return
	 */
	public List<VerticalByUserResDto> getUserListByTeamVertical(int stage_code, int project_code){
		EntityManager em = emf.createEntityManager();
		List<VerticalByUserResDto> results = new ArrayList<VerticalByUserResDto>();
		try {
			String jpql = "SELECT u.id, u.student_number, u.name, u.email, ifnull(t.id,'팀 없음') team_code, ifnull(t.team_name, '팀 없음') team_name,\r\n" + 
					"		(CASE\r\n" + 
					"            WHEN t.leader_id = u.id\r\n" + 
					"            THEN '팀장'\r\n" + 
					"            WHEN t.leader_id != u.id\r\n" + 
					"            THEN '팀원'\r\n" + 
					"            ELSE '팀 없음'\r\n" + 
					"		END) role, ifnull(t.track_name,\"트랙 없음\") track_name\r\n" + 
					"FROM user_project_detail upd\r\n" + 
					"LEFT JOIN user u\r\n" + 
					"ON u.id = upd.user_id\r\n" + 
					"LEFT JOIN (select t.id, t.name as team_name, t.leader_id, ut.team_id, ut.user_id, cd.name as track_name\r\n" + 
					"			from team t\r\n" + 
					"			left join user_team ut\r\n" + 
					"			on ut.team_id = t.id\r\n" + 
					"			left join mapping m\r\n" + 
					"			on m.id = t.mapping_id\r\n" + 
					"			left join (select * from code_detail\r\n" + 
					"						where code_id = 'TR') cd\r\n" + 
					"			on cd.code_detail = m.track_code\r\n" + 
					"			where m.stage_code=:stage_code and m.project_code=:project_code) t\r\n" + 
					"ON t.user_id = upd.user_id\r\n" + 
					"WHERE upd.project_detail_project_code=:project_code AND upd.project_detail_stage_code=:stage_code";
			List<Object[]> ol = em.createNativeQuery(jpql)
									.setParameter("stage_code", stage_code)
									.setParameter("project_code", project_code)
									.getResultList();
			/**
			 * 0:user_id
			 * 1:student_number
			 * 2:user_name
			 * 3:email
			 * 4:team_code(team_id)
			 * 5:team_name
			 * 6:role (팀장, 팀원, 팀 없음)
			 * 7:trcak_name (트랙명, 트랙 없음)
			 */					
			for(int i = 0;i<ol.size();i++) {
				Object[] o = ol.get(i);
				VerticalByUserResDto userinfo = VerticalByUserResDto.builder()
													.student_number(o[1].toString())
													.name(o[2].toString())
													.email(o[3].toString())
													.team_code(o[4].toString())
													.team_name(o[5].toString())
													.team_role(o[6].toString())
													.track_name(o[7].toString())
													.build();
				results.add(userinfo);
			}
		}catch(Exception e) {
			log.error("유저 세로비 쿼리 에러 발생");
			e.printStackTrace();
		}finally {
			em.close();
		}
		return results;
	}
}
