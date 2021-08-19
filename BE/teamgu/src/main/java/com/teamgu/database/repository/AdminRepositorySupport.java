package com.teamgu.database.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.teamgu.api.dto.req.AdminUserAutoCorrectReqDto;
import com.teamgu.api.dto.res.AdminTeamManagementHumanResDto;
import com.teamgu.api.dto.res.AdminTeamManagementResDto;
import com.teamgu.api.dto.res.AdminUserAutoCorrectResDto;
import com.teamgu.api.dto.res.AdminUserManagementResDto;
import com.teamgu.api.dto.res.CodeResDto;
import com.teamgu.api.dto.res.AdminUserProjectManagementResDto;
import com.teamgu.api.dto.res.ProjectInfoResDto;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QProjectDetail;
import com.teamgu.database.entity.QStdClass;
import com.teamgu.database.entity.QTeam;
import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QUserClass;
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
	QStdClass qStdClass = QStdClass.stdClass;
	QUserClass qUserClass = QUserClass.userClass;
	
	
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
		
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		
		try {

			et.begin();

			String jpql = "INSERT INTO code_detail values(?1, ?2, ?3)";

			em.createNativeQuery(jpql)
			.setParameter(1, codeId)
			.setParameter(2, lastCode +1)
			.setParameter(3, codeName)
			.executeUpdate();

			et.commit();
			
		} catch (Exception e) {
			
			et.rollback();
			e.printStackTrace();
			
		} finally {

			em.close();
			
		}
		
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
		
		try {
			
			et.begin();

			String jpql = "INSERT INTO project_detail(project_code, stage_code, active_date, start_date, end_date) "
					+ "values(:projectCode, :stageCode, :activeDate, :startDate, :endDate)";

			em.createNativeQuery(jpql)
			.setParameter("projectCode", projectInfoResDto.getProject().getCode())
			.setParameter("stageCode", projectInfoResDto.getStage().getCode())
			.setParameter("activeDate", projectInfoResDto.getActiveDate())
			.setParameter("startDate", projectInfoResDto.getStartDate())
			.setParameter("endDate", projectInfoResDto.getEndDate())
			.executeUpdate();

			et.commit();
			
		} catch (Exception e) {
			
			et.rollback();
			e.printStackTrace();

		} finally {
			
			em.close();
			
		}
		
	}
	
	// Update Project
	@Transactional
	public void updateProject(ProjectInfoResDto projectInfoResDto) {
		
		jpaQueryFactory
		.update(qProjectDetail)
		.set(qProjectDetail.activeDate, projectInfoResDto.getActiveDate())
		.set(qProjectDetail.startDate, projectInfoResDto.getStartDate())
		.set(qProjectDetail.endDate, projectInfoResDto.getEndDate())
		.where(qProjectDetail.id.eq(projectInfoResDto.getId()))
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
	
	// Project 별 교육생 조회
	
	public List<AdminUserProjectManagementResDto> getUserInProjectManagementData(Long projectId){
		List<AdminUserProjectManagementResDto> dashBoardTable = new ArrayList<>();
		EntityManager em = emf.createEntityManager();
		
		try {
			String jpql = "select u.id, u.student_number, u.name, u.email, (select code_detail.name\r\n" + 
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
					"	right outer join (select * \r\n" + 
					"		from std_class\r\n" + 
					"		where project_code = \r\n" + 
					"			(select project_code from project_detail where id = ?1)\r\n" + 
					"		and stage_code =\r\n" + 
					"			(select stage_code from project_detail where id = ?1)) std\r\n" + 
					"on user_class.class_id = std.id) s\r\n" + 
					"on u.id = s.user_id\r\n" + 
					"order by u.id";
			List<Object[]> datas = em.createNativeQuery(jpql)
					.setParameter(1, projectId)
					.getResultList();
			
			for(Object[] data : datas)
			{

				dashBoardTable.add(AdminUserProjectManagementResDto.builder()
						.userId(Long.parseLong(data[0].toString()))
						.studentNumber(data[1].toString())
						.name(data[2].toString())
						.email(data[3].toString())
						.region(data[4].toString())
						.studentClass(data[5].toString())
						.teamYn(data[6].toString())
						.teamId(Long.parseLong(data[7].toString()))
						.leaderYn(data[8].toString())
						.major(data[9].toString())
						.position(data[10].toString())
						.build());
			}

		} catch (Exception e) {
			
			e.printStackTrace();
	
		} finally {
		
			em.close();
		
		}
		
		return dashBoardTable;
	}
	
	// 팀 구성 현황 조회
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
					"select project_code from project_detail where id = :projectId)\r\n" + 
					"and stage_code = (\r\n" + 
					"select stage_code from project_detail where id = :projectId))\r\n" + sb.toString() + 
					"\r\n order by team.complete_yn, team.id";
			
			
			List<Object[]> datas = em.createNativeQuery(jpql)
					.setParameter("projectId", projectId)
					.getResultList();
			
			String jpql2 = "select user_team.user_id, user.name, if(user.id = (select leader_id from team where team.id = 58), \"팀장\", \"팀원\") as role\r\n" + 
					"from user_team \r\n" + 
					"left outer join user\r\n" + 
					"on user_team.user_id = user.id\r\n" + 
					"where team_id = :teamId";
			
			for(Object[] data : datas)
			{
				Long teamId = Long.parseLong(data[0].toString());
				
				List<AdminTeamManagementHumanResDto> members = new ArrayList<>();
				
				List<Object[]> people = em.createNativeQuery(jpql2)
						.setParameter("teamId", teamId)
						.getResultList();
				
				for(Object[] person : people) {
					
					members.add(AdminTeamManagementHumanResDto.builder()
							.userId(Long.parseLong(person[0].toString()))
							.name(person[1].toString())
							.role(person[2].toString())
							.build());
			
				}

				list.add(AdminTeamManagementResDto.builder()
						.teamId(teamId)
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
	
	// 교육생 관리 현황 조회
	public List<AdminUserManagementResDto> getUserManagamentData(Long projectId, int regionCode){
		List<AdminUserManagementResDto> adminList = new ArrayList<>();
		EntityManager em = emf.createEntityManager();
		StringBuilder sb = new StringBuilder();
		
		// 지역 필터 (0이면 전국, 그 외엔 지역 필터)
		if(regionCode != 0) {
			sb.append("where substr(u.student_number, 3, 1) + 100 = ").append(regionCode);
		}
		try {
			
			String jpql = "select u.id, u.student_number\r\n" + 
					"	, u.name, u.email\r\n" + 
					"    , if(uc.name is null, \"반이 없음\", concat((select code_detail.name from code_detail where code_detail.code_detail = uc.region_code and code_detail.code_id = \"RE\"), \" \", uc.name, \"반\")) as class \r\n" + 
					"    , ifnull((select code_detail.name from code_detail where code_detail = (substr(u.student_number, 3, 1) + 100) and code_detail.code_id = \"RE\"), \"지역 없음\") as region\r\n" + 
					"    , if(u.role = 1, \"교육생\", if(u.role = 2, \"퇴소생\",if(u.role = 3,\"부관리자\" , \"관리자\"))) as role\r\n" + 
					"     , if(u.major = 1, \"전공\", if(u.major = 2, \"비전공\", \"분류 안됨\")) as major\r\n" + 
					"    , if(isnull(upd.project_detail_id), \"비활성\", \"활성\") as project\r\n" + 
					"    , ut.complete_yn\r\n" + 
					"    , ut.id as teamId\r\n" + 
					"    , ut.name  as teamName\r\n" + 
					"    , (select code_detail.name from code_detail where code_detail.code_detail =\r\n" + 
					"        (select track_code from mapping where mapping.id = ut.mapping_id)\r\n" + 
					"        and code_detail.code_id = \"TR\") as track\r\n" + 
					"from (select * from user where (substr(user.student_number, 1, 2) + 100) = (select project_detail.stage_code from project_detail where project_detail.id = :projectId)) u\r\n" + 
					"left outer join (select * from user_project_detail where user_project_detail.project_detail_id = :projectId ) upd\r\n" + 
					"on u.id = upd.user_id\r\n" + 
					"left outer join (select user_class.user_id, std_class.name, std_class.region_code\r\n" + 
					"	from user_class\r\n" + 
					"	left outer join std_class\r\n" + 
					"	on user_class.class_id = std_class.id\r\n" + 
					"	where project_code = (select project_code from project_detail where project_detail.id =:projectId )\r\n" + 
					"		and stage_code = (select stage_code from project_detail where project_detail.id = :projectId )) uc\r\n" + 
					"on u.id = uc.user_id\r\n" + 
					"left outer join (select t.id, user_team.user_id, t.name, t.complete_yn, t.mapping_id\r\n" + 
					"	from user_team\r\n" + 
					"	right outer join (select team.id, team.name, team.complete_yn, team.mapping_id\r\n" + 
					"		from team\r\n" + 
					"		where team.mapping_id in (select mapping.id from mapping\r\n" + 
					"		where mapping.project_code = (select project_detail.project_code from project_detail where project_detail.id = :projectId)\r\n" + 
					"			and mapping.stage_code = (select project_detail.stage_code from project_detail where project_detail.id = :projectId ))) t\r\n" + 
					"	on t.id = user_team.team_id) ut\r\n" + 
					"on u.id = ut.user_id\r\n" + sb.toString() + 
					"\r\n order by u.role desc, u.id";

			List<Object[]> datas = em.createNativeQuery(jpql)
					.setParameter("projectId", projectId)
					.getResultList();
			
			if (datas != null) {

				for (Object[] data : datas) {

					if (data[9] == null) {
						adminList.add(AdminUserManagementResDto.builder()
								.userId(Long.parseLong(data[0].toString())) // 교육생 고유 ID
								.studentNumber(data[1].toString()) // 학번
								.name(data[2].toString()) // 이름
								.email(data[3].toString())
								.studentClass(data[4].toString()) // 반
								.region(data[5].toString()) // 지역
								.role(data[6].toString()) // 역할 (교육생 / 퇴소생)
								.major(data[7].toString()) // 전공 / 비전공
								.regist(data[8].toString()) // 프로젝트 참여 / 제외 (활성 / 비활성)
								.build());
					} else {
						adminList.add(AdminUserManagementResDto.builder()
								.userId(Long.parseLong(data[0].toString())) // 교육생
								.studentNumber(data[1].toString()) // 학번
								.name(data[2].toString()) // 이름
								.email(data[3].toString())
								.studentClass(data[4].toString()) // 반
								.region(data[5].toString()) // 지역
								.role(data[6].toString()) // 역할 (교육생 / 퇴소생)
								.major(data[7].toString()) // 전공 / 비전공
								.regist(data[8].toString()) // 프로젝트 참여 / 제외 (활성 / 비활성)
								.completeYn(data[9].toString()) // 팀 완성 여부
								.teamId(data[10].toString()) // 팀 고유 번호
								.teamName(data[11].toString()) // 팀 이름
								.trackName(data[12].toString()) // 팀 트랙
								.build());
					}

				}
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
		} finally {
			
			em.close();
			
		}
		
		return adminList;
	}
	
	// Class Select Box 정보 조회
	public List<CodeResDto> selectStudentClass(Long projectId, int regionCode){
	    BooleanBuilder builder = new BooleanBuilder();
		if(regionCode != 0)
		{
			builder.and(qStdClass.regionCode.eq(regionCode));
		}
		
		List<CodeResDto> list = jpaQueryFactory
		.select(Projections.constructor(CodeResDto.class, qStdClass.id.intValue(), (JPAExpressions.select(qCodeDetail.Name.concat(" ").concat(qStdClass.name.stringValue().concat("반")))
				.from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("RE")
						.and(qCodeDetail.codeDetail.eq(qStdClass.regionCode))))
				))
		.from(qStdClass)
		.where(qStdClass.projectCode.eq(JPAExpressions.select(qProjectDetail.projectCode)
				.from(qProjectDetail)
				.where(qProjectDetail.id.eq(projectId)))
				.and(qStdClass.stageCode.eq(JPAExpressions.select(qProjectDetail.stageCode)
						.from(qProjectDetail)
						.where(qProjectDetail.id.eq(projectId))))
				.and(builder))
		.fetch();
		
		
		return list;
	}
	
	// Check Region Code
	public int checkRegionCode(String region) {
		
		Integer result = jpaQueryFactory
		.select(qCodeDetail.codeDetail)
		.from(qCodeDetail)
		.where(qCodeDetail.code.code.eq("RE")
				.and(qCodeDetail.Name.eq(region)))
		.fetchOne();
		if(result == null) {
			return 0;
		}
		else {
			return result;
		}
	}
	
	// Project별 Student Class Duplication Check
	public boolean checkStudentClassDuplication(Long projectId, int regionCode, int name) {
		List<Long> list = 
				jpaQueryFactory
				.select(qStdClass.id)
				.from(qStdClass)
				.where(qStdClass.projectCode.eq(JPAExpressions.select(qProjectDetail.projectCode)
						.from(qProjectDetail)
						.where(qProjectDetail.id.eq(projectId)))
						.and(qStdClass.stageCode.eq(JPAExpressions.select(qProjectDetail.stageCode)
								.from(qProjectDetail)
								.where(qProjectDetail.id.eq(projectId))))
						.and(qStdClass.regionCode.eq(regionCode))
						.and(qStdClass.name.eq(name)))
				.fetch();
		
		if(list.size() == 0) {
			return true;						
		}
		else {
			return false;
		}		
	}
	
	// Insert Student Class
	public List<CodeResDto> insertStudentClass(Long projectId, int regionCode, int name) {

		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		
		try {
			et.begin();

			String jpql = "insert into std_class(name, project_code, region_code, stage_code)\r\n" + 
					"value(:name\r\n" + 
					"	, (select project_code from project_detail where project_detail.id = :projectId)\r\n" + 
					"    , :regionCode\r\n" + 
					"    , (select stage_code from project_detail where project_detail.id = :projectId));";

			em.createNativeQuery(jpql)
			.setParameter("name", name)
			.setParameter("projectId", projectId)
			.setParameter("regionCode", regionCode)
			.executeUpdate();

			et.commit();
			
		} catch (Exception e) {
			
			et.rollback();
			e.printStackTrace();
		
		} finally {

			em.close();
			
		}
		
		return selectStudentClass(projectId, 0);
		
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
	
	// 프로젝트 유효 체크
	public boolean checkProjectValidation(Long projectId) {
		List<Long> list =
				jpaQueryFactory
				.select(qProjectDetail.id)
				.from(qProjectDetail)
				.where(qProjectDetail.id.eq(projectId))
				.fetch();
		
		if(list.size() > 0) {
			return true;
		}
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
		.distinct()
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
	
	
	// 교육생의 프로젝트 반 삭제 가능 여부 체크
	public boolean checkStudentClassDeletion(Long classId) {
		List<Long> list = 
				jpaQueryFactory
				.select(qUserClass.stdClass.id)
				.from(qUserClass)
				.where(qUserClass.stdClass.id.eq(classId))
				.fetch();
		
		if(list.size() == 0)
			return true;
		else
			return false;
		
	}
	
	// 프로젝트 반 삭제
	@Transactional
	public List<CodeResDto>  deleteStudentClass(Long classId) {
		
		int regionCode = 0;
		
		Long projectId = 
				jpaQueryFactory
				.select(qProjectDetail.id)
				.from(qProjectDetail)
				.where(qProjectDetail.stageCode.eq(JPAExpressions
						.select(qStdClass.stageCode)
						.from(qStdClass)
						.where(qStdClass.id.eq(classId)))
						.and(qProjectDetail.projectCode.eq(JPAExpressions
								.select(qStdClass.projectCode)
								.from(qStdClass)
								.where(qStdClass.id.eq(classId)))))
				.fetchOne();

		jpaQueryFactory
		.delete(qStdClass)
		.where(qStdClass.id.eq(classId))
		.execute();
		

		return selectStudentClass(projectId, regionCode);
		
	}
	
	// Project에 User가 존재하는지 체크
	public boolean checkUserProjectDetail(Long userId, Long projectId) {
		
		List<Long> list = 
				jpaQueryFactory
				.select(qUserProjectDetail.user.id)
				.from(qUserProjectDetail)
				.where(qUserProjectDetail.user.id.eq(userId)
						.and(qUserProjectDetail.projectDetail.id.eq(projectId)))
				.fetch();
		
		
		if(list.size() == 0) {
			return true;
		}
		else {
			return false;
		}
		
	}
	
	// Project에 User를 추가
	public void addStudentToProject(Long userId, Long projectId) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		
		try {

			et.begin();

			String jpql = "insert into user_project_detail\r\n" + 
					"value(:userId\r\n" + 
					"	, :projectId\r\n" + 
					"    ,(select project_detail.project_code from project_detail where project_detail.id = :projectId)\r\n" + 
					"    , (select project_detail.stage_code from project_detail where project_detail.id = :projectId)\r\n" + 
					")";

			em.createNativeQuery(jpql)
			.setParameter("userId", userId)
			.setParameter("projectId", projectId)
			.executeUpdate();

			et.commit();
			
		} catch (Exception e) {
			
			et.rollback();
			e.printStackTrace();
			
		} finally {

			em.close();
			
		}
		
	}
	
	// Project에서 User를 삭제
	@Transactional
	public void excludeStudentFromProject(Long userId, Long projectId) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		
		try {

			et.begin();

			String jpql = "delete from user_project_detail\r\n" + 
					"where user_id = :userId and project_detail_id = :projectId";

			em.createNativeQuery(jpql)
			.setParameter("userId", userId)
			.setParameter("projectId", projectId)
			.executeUpdate();

			et.commit();
			
		} catch (Exception e) {
			
			et.rollback();
			e.printStackTrace();
			
		} finally {

			em.close();
			
		}
	}
	
	// ProjectId와 userId로 팀 조회
	public AdminTeamManagementResDto getStudentProjectTeamInfo(Long userId, Long projectId) {
		
		EntityManager em = emf.createEntityManager();
		AdminTeamManagementResDto team = null;
		
		try {
			String jpql = "select t.id, t.name, t.now_member, t.complete_yn, t.leader_id\r\n" + 
					"from (select * \r\n" + 
					"from team\r\n" + 
					"where mapping_id in (\r\n" + 
					"	select mapping.id \r\n" + 
					"    from mapping\r\n" + 
					"    where mapping.stage_code = (\r\n" + 
					"		select project_detail.stage_code\r\n" + 
					"        from project_detail\r\n" + 
					"        where project_detail.id = :projectId\r\n" + 
					"    )\r\n" + 
					"		and mapping.project_code = (\r\n" + 
					"			select project_detail.project_code\r\n" + 
					"            from project_detail\r\n" + 
					"            where project_detail.id = :projectId\r\n" + 
					"        )\r\n" + 
					")) t\r\n" + 
					"left outer join user_team ut\r\n" + 
					"on ut.team_id = t.id\r\n" + 
					"where ut.user_id = :userId";
			
			List<Object[]> datas =  em.createNativeQuery(jpql)
					.setParameter("userId", userId)
					.setParameter("projectId", projectId)
					.getResultList();
			
			
			
			if(datas == null) {
				
			}
			else {
				for (Object[] data : datas) {
					team = AdminTeamManagementResDto.builder()
							.teamId(Long.parseLong(data[0].toString()))
							.teamName(data[1].toString())
							.memberCnt(Integer.parseInt(data[2].toString())).completeYn(data[3].toString())
							.leaderId(Long.parseLong(data[4].toString())).build();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
		
		return team;
		
	}
	
	// User Information 수정
	@Transactional
	public void updateStudentInformation(Long userId, short role, short major) {
		
		jpaQueryFactory
		.update(qUser)
		.set(qUser.role, role)
		.set(qUser.major, major)
		.where(qUser.id.eq(userId))
		.execute();
		
	}
	// User Class 조회
	public Long getUserClass(Long userId, Long projectId) {
		Long classId = jpaQueryFactory
		.select(qUserClass.stdClass.id)
		.from(qUserClass)
		.where(qUserClass.user.id.eq(userId)
				.and(qUserClass.stdClass.id.in(JPAExpressions
						.select(qStdClass.id)
						.from(qStdClass)
						.where(qStdClass.projectCode.eq(JPAExpressions.select(qProjectDetail.projectCode)
								.from(qProjectDetail)
								.where(qProjectDetail.id.eq(projectId)))
								.and(qStdClass.stageCode.eq(JPAExpressions.select(qProjectDetail.stageCode)
										.from(qProjectDetail)
										.where(qProjectDetail.id.eq(projectId))))))))
		.fetchOne();
		if(classId == null) classId = (long) 0;
		return classId;
	}
	
	// User Class 추가
	public void addStudentToClass(Long userId, Long classId) {
		EntityManager em = emf.createEntityManager();
		EntityTransaction et = em.getTransaction();
		
		try {

			et.begin();

			String jpql = "Insert into user_class(user_id, class_id)\r\n" + 
					"value(:userId, :classId)";

			em.createNativeQuery(jpql)
			.setParameter("userId", userId)
			.setParameter("classId", classId)
			.executeUpdate();

			et.commit();
			
		} catch (Exception e) {
			
			et.rollback();
			e.printStackTrace();
			
		} finally {

			em.close();
			
		}
		
	}
	
	// User Information 수정
	@Transactional
	public void excludeStudentFromClass(Long userId, Long projectId) {
		
		jpaQueryFactory
		.delete(qUserClass)
		.where(qUserClass.user.id.eq(userId)
				.and(qUserClass.stdClass.id.in(JPAExpressions
						.select(qStdClass.id)
						.from(qStdClass)
						.where(qStdClass.projectCode.eq(JPAExpressions.select(qProjectDetail.projectCode)
								.from(qProjectDetail)
								.where(qProjectDetail.id.eq(projectId)))
								.and(qStdClass.stageCode.eq(JPAExpressions.select(qProjectDetail.stageCode)
										.from(qProjectDetail)
										.where(qProjectDetail.id.eq(projectId))))))))
		.execute();
		
	}
	
	// Check User Information Duplication 유저 등록 시 중복 체크
	public boolean checkUserInformationDuplication(String condition, String result ) {
		
	    BooleanBuilder builder = new BooleanBuilder();
		if(condition.equals("studentNumber"))
		{
			builder.and(qUser.studentNumber.eq(result));
		}
		else if(condition.equals("email")) {
			builder.and(qUser.email.eq(result));
		}
		
		List<Long> list = jpaQueryFactory
		.select(qUser.id)
		.from(qUser)
		.where(builder)
		.fetch();
		
		if(list.size() == 0) {
			return true;
		}
		else {
			return false;
		}
		
	}
	
	// Admin User Auto Correct 관리자의 프로젝트에 포함되어 있지 않은 인원들의 자동 완성
	public List<AdminUserAutoCorrectResDto> getUserAutoCorrect(AdminUserAutoCorrectReqDto adminUserAutoCorrectReqDto){
		
		String search = adminUserAutoCorrectReqDto.getSearch();
		Long projectId = adminUserAutoCorrectReqDto.getProjectId();
		
		List<AdminUserAutoCorrectResDto> list = new ArrayList<>();
		

		EntityManager em = emf.createEntityManager();
		
		try {
			String jpql = "select *\r\n" + 
					"from (select user.id, user.email, user.name, user.student_number \r\n" + 
					"	from user \r\n" + 
					"    where user.id not in \r\n" + 
					"		(select user_project_detail.user_id \r\n" + 
					"        from user_project_detail \r\n" + 
					"        where user_project_detail.project_detail_id = :projectId)\r\n" + 
					"	and substr(user.student_number, 1, 2) + 100 = (\r\n" + 
					"		select project_detail.stage_code\r\n" + 
					"        from project_detail\r\n" + 
					"        where project_detail.id = :projectId)) u\r\n" + 
					"where u.name like :search or u.student_number like  :search or u.email like  :search";

			List<Object[]> datas = em.createNativeQuery(jpql)
					.setParameter("projectId", projectId)
					.setParameter("search", "%" + search + "%" )
					.getResultList();
			
			for (Object[] data : datas) {
				list.add(AdminUserAutoCorrectResDto.builder()
						.id(Long.parseLong(data[0].toString()))
						.email(data[1].toString())
						.name(data[2].toString())
						.studentNumber(data[3].toString())
						.build());
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
		} finally {
			
			em.close();
			
		}
		
		return list;
		
	}

}
