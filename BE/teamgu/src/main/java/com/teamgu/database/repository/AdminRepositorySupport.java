package com.teamgu.database.repository;

import java.util.ArrayList;
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
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.AdminTeamManagementHumanResDto;
import com.teamgu.api.dto.res.AdminTeamManagementResDto;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.DashBoardTableResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QProjectDetail;
import com.teamgu.database.entity.QTeam;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QUserProjectDetail;
import com.teamgu.database.entity.QUserTeam;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class AdminRepositorySupport {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@PersistenceUnit
	EntityManagerFactory emf;
	
	QUser qUser = QUser.user;
	QTeam qTeam = QTeam.team;
	QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;
	QProjectDetail qProjectDetail = QProjectDetail.projectDetail;
	QUserProjectDetail qUserProjectDetail = QUserProjectDetail.userProjectDetail;
	QMapping qMapping = QMapping.mapping;
	QUserTeam qUserTeam = QUserTeam.userTeam;
	
	
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
	
	// Create Project
	public void createProject(ProjectInfoResDto projectInfoResDto) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();

		et.begin();

		String jpql = "INSERT INTO project_detail(project_code, stage_code, active_date, start_date, end_date) values(?1, ?2, ?3, ?4, ?5)";

		em.createNativeQuery(jpql)
		.setParameter(1, projectInfoResDto.getProject().getCode())
		.setParameter(2, projectInfoResDto.getStage().getCode())
		.setParameter(3, projectInfoResDto.getActiveDate())
		.setParameter(4, projectInfoResDto.getStartDate())
		.setParameter(5, projectInfoResDto.getEndDate())
		.executeUpdate();

		et.commit();
		em.close();
		
	}
	
	// Update Project
	@Transactional
	public void updateProject(ProjectInfoResDto projectInfoResDto) {
		
		jpaQueryFactory
		.update(qProjectDetail)
		.set(qProjectDetail.activeDate, projectInfoResDto.getActiveDate())
		.set(qProjectDetail.startDate, projectInfoResDto.getStartDate())
		.set(qProjectDetail.endDate, projectInfoResDto.getEndDate())
		.execute();
		
	}
	
	// Project 삭제
	@Transactional
	public void deleteProject(Long projectId) {

		jpaQueryFactory
		.delete(qProjectDetail)
		.where(qProjectDetail.id.eq(projectId))
		.execute();
		
	}

	// Project의 Track 가져오기
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
	
	// Region Code 가져오기
	public List<CodeResDto> getRegionList(){
		
		return 
				jpaQueryFactory
				.select(Projections.constructor(CodeResDto.class, qCodeDetail.codeDetail, qCodeDetail.Name))
				.from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("RE"))
				.fetch();

	}
	
	// Track 가져오기
	public List<CodeResDto> getTrackList(Long projectId){
		return
				jpaQueryFactory
				.select(Projections.constructor(CodeResDto.class, qCodeDetail.codeDetail, qCodeDetail.Name))
				.from(qCodeDetail)
				.where(qCodeDetail.codeDetail.in(JPAExpressions
						.select(qMapping.trackCode)
						.from(qMapping)
						.where(qMapping.projectCode.eq(JPAExpressions
								.select(qProjectDetail.projectCode)
								.from(qProjectDetail)
								.where(qProjectDetail.id.eq(projectId)))
								.and(qMapping.stageCode.eq(JPAExpressions
										.select(qProjectDetail.stageCode)
										.from(qProjectDetail)
										.where(qProjectDetail.id.eq(projectId))))))
						.and(qCodeDetail.code.code.eq("TR")))
				.fetch();
	}
	
	// 지역별 프로젝트 전체 인원 수
	public Integer getTotalMemberCountByRegion(Long projectId, String code) {
		Integer count =
				(int) jpaQueryFactory
					.select(qUser.id)
					.from(qUser)
					.where(qUser.id.in(JPAExpressions
							.select(qUserProjectDetail.user.id)
							.from(qUserProjectDetail)
							.where(qUserProjectDetail.projectDetail.id.eq(projectId)))
							.and(qUser.studentNumber.substring(2, 3).eq(code)))
					.fetchCount()
				;

		return count;
	}
	
	// 지역별 프로젝트 진행 구성 인원 현황
	public Integer getTeamBuildingMemberCountByRegion(Long projectId, String code, short complete) {
		Integer count =
				(int) jpaQueryFactory
					.select(qUser.id)
					.from(qUser)
					.leftJoin(qUserTeam)
					.on(qUser.id.eq(qUserTeam.user.id))
					.leftJoin(qTeam)
					.on(qUserTeam.team.id.eq(qTeam.id))
					.where(qUser.id.in(JPAExpressions
							.select(qUserProjectDetail.user.id)
							.from(qUserProjectDetail)
							.where(qUserProjectDetail.projectDetail.id.eq(projectId)))

						.and(qTeam.mapping.id.in(JPAExpressions
								.select(qMapping.id)
								.from(qMapping)
								.where(qMapping.projectCode.eq(JPAExpressions
										.select(qProjectDetail.projectCode)
										.from(qProjectDetail)
										.where(qProjectDetail.id.eq(projectId)))
										.and(qMapping.stageCode.eq(JPAExpressions
												.select(qProjectDetail.stageCode)
												.from(qProjectDetail)
												.where(qProjectDetail.id.eq(projectId)))))))
						.and(qTeam.completeYn.eq(complete))
						.and(qUser.studentNumber.substring(2, 3).eq(code)))
					.fetchCount();
				;

		return count;
	}
	
	// 트랙별 전체 팀 현황
	public Integer getTeamCountByTrack(Long projectId, int trackCode, short complete) {
		Integer count =
				(int) jpaQueryFactory
					.select(qTeam.id)
					.from(qTeam)
					.where(qTeam.mapping.id.in(JPAExpressions
							.select(qMapping.id)
							.from(qMapping)
							.where(qMapping.projectCode.eq(JPAExpressions
									.select(qProjectDetail.projectCode)
									.from(qProjectDetail)
									.where(qProjectDetail.id.eq(projectId)))
									.and(qMapping.stageCode.eq(JPAExpressions
											.select(qProjectDetail.stageCode)
											.from(qProjectDetail)
											.where(qProjectDetail.id.eq(projectId))))
									.and(qMapping.trackCode.eq(trackCode))))
							.and(qTeam.completeYn.eq(complete)))
		.fetchCount();
		
		
		return count;

	}
	
	// 트랙별 교육생 현황
	public Integer getMemberCountByTrack(Long projectId, int trackCode, short complete) {
		Integer count =
				(int) jpaQueryFactory
					.select(qTeam.id)
					.from(qTeam)
					.leftJoin(qUserTeam)
					.on(qUserTeam.team.id.eq(qTeam.id))
					.where(qTeam.mapping.id.in(JPAExpressions
							.select(qMapping.id)
							.from(qMapping)
							.where(qMapping.projectCode.eq(JPAExpressions
									.select(qProjectDetail.projectCode)
									.from(qProjectDetail)
									.where(qProjectDetail.id.eq(projectId)))
									.and(qMapping.stageCode.eq(JPAExpressions
											.select(qProjectDetail.stageCode)
											.from(qProjectDetail)
											.where(qProjectDetail.id.eq(projectId))))
									.and(qMapping.trackCode.eq(trackCode))))
							.and(qTeam.completeYn.eq(complete)))
		.fetchCount();
		
		return count;

	}
	
	// Dash Board Table Infomation
	
	public List<DashBoardTableResDto> getDashBoardTableInfo(Long projectId){
		List<DashBoardTableResDto> dashBoardTable = new ArrayList<>();
		EntityManager em = emf.createEntityManager();
		
		try {
			String jpql = "select u.student_number, u.name, u.email, (select code_detail.name\r\n" + 
					"		from code_detail \r\n" + 
					"        where code_detail.code_detail = (substr(u.student_number, 3, 1) + 100)\r\n" + 
					"        and code_detail.code_id = \"RE\") as region,\r\n" + 
					"	ifnull(concat((select code_detail.name\r\n" + 
					"		from code_detail \r\n" + 
					"        where code_detail.code_detail = s.region_code\r\n" + 
					"        and code_detail.code_id = \"RE\"), \" \" ,s.name ,\"반\"), concat((select code_detail.name\r\n" + 
					"		from code_detail \r\n" + 
					"        where code_detail.code_detail = (substr(u.student_number, 3, 1) + 100)\r\n" + 
					"        and code_detail.code_id = \"RE\"), \" 0반\")) as studentClass,\r\n" + 
					"    if(isnull(t.team_id),\"X\",\"O\") as team,\r\n" + 
					"    ifnull(t.team_id, 0) as teamId,\r\n" + 
					"    if(t.leader_id = u.id, \"O\", \"X\") as leader,\r\n" + 
					"    if(u.major = 1, \"전공\", if(u.major = 2, \"비전공\", \"전공 선택 안됨\")) as major,\r\n" + 
					"    ifnull((select code_detail.name\r\n" + 
					"		from code_detail \r\n" + 
					"        where code_detail.code_detail = u.wish_position_code\r\n" + 
					"        and code_detail.code_id = \"PO\"), \"포지션 선택 안함\") as wish_position\r\n" + 
					"from (select *\r\n" + 
					"from user\r\n" + 
					"where user.id in (select user_project_detail.user_id\r\n" + 
					"	from user_project_detail\r\n" + 
					"    where user_project_detail.project_detail_id in (?1))) u\r\n" + 
					"left outer join (select user_team.team_id, user_team.user_id, team.complete_yn, team.leader_id\r\n" + 
					"from user_team\r\n" + 
					"left outer join team\r\n" + 
					"on user_team.team_id = team.id\r\n" + 
					"where mapping_id in \r\n" + 
					"	(select id\r\n" + 
					"	from mapping\r\n" + 
					"	where project_code = \r\n" + 
					"		(select project_code from project_detail where id = ?1)\r\n" + 
					"		and stage_code =\r\n" + 
					"			(select stage_code from project_detail where id = ?1))) t\r\n" + 
					"on u.id = t.user_id\r\n" + 
					"left Outer Join (select user_class.user_id , std.name, std.region_code\r\n" + 
					"	from user_class\r\n" + 
					"	left outer join (select * \r\n" + 
					"		from std_class\r\n" + 
					"		where project_code = \r\n" + 
					"			(select project_code from project_detail where id = ?1)\r\n" + 
					"		and stage_code =\r\n" + 
					"			(select stage_code from project_detail where id = ?1)) std\r\n" + 
					"on user_class.class_id = std.id) s\r\n" + 
					"on u.id = s.user_id";
			List<Object[]> datas = em.createNativeQuery(jpql)
					.setParameter(1, projectId)
					.getResultList();
			
			for(Object[] data : datas)
			{

				dashBoardTable.add(DashBoardTableResDto.builder()
						.studentNumber(data[0].toString())
						.name(data[1].toString())
						.email(data[2].toString())
						.region(data[3].toString())
						.studentClass(data[4].toString())
						.teamYn(data[5].toString())
						.teamId(Long.parseLong(data[6].toString()))
						.leaderYn(data[7].toString())
						.major(data[8].toString())
						.position(data[9].toString())
						.build());
			}

		} catch (Exception e) {
			
			e.printStackTrace();
	
		} finally {
		
			em.close();
		
		}
		
		return dashBoardTable;
	}
	
	// getProjectInfo
	public List<AdminTeamManagementResDto> getTeamManagementData(Long projectId, int regionCode)
	{
		List<AdminTeamManagementResDto> list = new ArrayList<>();
		EntityManager em = emf.createEntityManager();
		StringBuilder sb = new StringBuilder();
		
		// 지역 필터 (0이면 전국, 그 외엔 지역 필터)
		if(regionCode != 0) {
			sb.append("and (select code_detail.code_detail from code_detail where code_detail = "
				+ "(substr(user.student_number, 3, 1) + 100) and code_id = \"RE\") = ").append(regionCode);
			}
		try {
			String jpql = "select team.id, (select code_detail.name from code_detail where code_detail = (substr(user.student_number, 3, 1) + 100) and code_id = \"RE\") as region\r\n" + 
					", team.name\r\n" + 
					", (select code_detail.name from code_detail where code_detail.code_detail = (select mapping.track_code from mapping where mapping.id = team.mapping_id) and code_id=\"TR\") as track\r\n" + 
					", ut.number\r\n" + 
					", if(team.complete_yn = 1, \"O\", \"X\") as complete\r\n" + 
					", team.leader_id\r\n" + 
					"from team\r\n" + 
					"left outer join user\r\n" + 
					"on team.leader_id = user.id\r\n" + 
					"left outer join (select team_id, count(team_id) as number from user_team group by team_id) ut\r\n" + 
					"on team.id = ut.team_id\r\n" + 
					"where mapping_id in (select id \r\n" + 
					"from mapping\r\n" + 
					"where project_code = (\r\n" + 
					"select project_code from project_detail where id = 2)\r\n" + 
					"and stage_code = (\r\n" + 
					"select stage_code from project_detail where id = 2))\r\n" + sb.toString();
			
			
			List<Object[]> datas = em.createNativeQuery(jpql)
					.getResultList();
			
			String jpql2 = "select user_team.user_id, user.name, if(user.id = (select leader_id from team where team.id = 58), \"팀장\", \"팀원\") as role\r\n" + 
					"from user_team \r\n" + 
					"left outer join user\r\n" + 
					"on user_team.user_id = user.id\r\n" + 
					"where team_id = ?1";
			
			for(Object[] data : datas)
			{
				Long index = Long.parseLong(data[0].toString());
				
				List<AdminTeamManagementHumanResDto> members = new ArrayList<>();
				
				List<Object[]> people = em.createNativeQuery(jpql2)
						.setParameter(1, index)
						.getResultList();
				
				for(Object[] person : people) {
					
					members.add(AdminTeamManagementHumanResDto.builder()
							.userId(Long.parseLong(person[0].toString()))
							.name(person[1].toString())
							.role(person[2].toString())
							.build());
			
				}

				list.add(AdminTeamManagementResDto.builder()
						.teamId(index)
						.region(data[1].toString())
						.teamName(data[2].toString())
						.track(data[3].toString())
						.memberCnt(Integer.parseInt(data[4].toString()))
						.completeYn(data[5].toString())
						.leaderId(Long.parseLong(data[6].toString()))
						.members(members)
						.build()
						)
						;
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
		
		} finally {
			
			em.close();
		
		}
		
		return list;
	}
	// Mapping Table Code 삭제
	@Transactional
	public void deleteMappingCode(int stageCode, int projectCode, int trackCode) {
		
		jpaQueryFactory
		.delete(qMapping)
		.where(qMapping.stageCode.eq(stageCode)
				.and(qMapping.projectCode.eq(projectCode))
				.and(qMapping.trackCode.eq(trackCode)))
		.execute();
		
	}

	// Mapping Table 중복 체크
	public boolean checkMappingDuplication(int stageCode, int projectCode, int trackCode) {
		
		List<Long> list = 
				jpaQueryFactory
				.select(qMapping.id)
				.from(qMapping)
				.where(qMapping.stageCode.eq(stageCode)
						.and(qMapping.projectCode.eq(projectCode))
						.and(qMapping.trackCode.eq(trackCode)))
				.fetch();

		if(list.size() == 0)
			return true;
		else
			return false;
		
	}
	
	// 프로젝트 중복 체크
	public boolean checkProjectDuplication(int stageCode, int projectCode){
		
		List<Long> list =
				jpaQueryFactory
				.select(qProjectDetail.id)
				.from(qProjectDetail)
				.where(qProjectDetail.stageCode.eq(stageCode)
						.and(qProjectDetail.projectCode.eq(projectCode)))
				.fetch();

		if(list.size() == 0)
			return true;
		else
			return false;
		
	}

	// 코드 중복 체크
	
	public boolean checkCodeDuplication(String codeId, String codeName) {
		
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
	
	// 프로젝트 삭제 가능 여부 체크
	public boolean checkProjectDeletion(Long projectCode) {
		List<Long> list = jpaQueryFactory
		.select(qUserProjectDetail.user.id)
		.from(qUserProjectDetail)
		.where(qUserProjectDetail.projectDetail.id.eq(projectCode))
		.fetch();

		if(list.size() == 0)
			return true;
		else
			return false;
		
	}
	
	// 코드 삭제 가능 여부 체크
	public boolean checkCodeDeletion(String codeName, int code) {

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
