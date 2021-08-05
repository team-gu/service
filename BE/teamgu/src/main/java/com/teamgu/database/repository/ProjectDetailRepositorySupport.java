package com.teamgu.database.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.UserChatSearchResDto;
import com.teamgu.database.entity.ProjectDetail;
import com.teamgu.database.entity.User;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Repository
public class ProjectDetailRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@PersistenceUnit
	EntityManagerFactory emf;

	/**
	 * 기수와 프로젝트 코드를 입력받고 project_detail의 id값을 얻어내,
	 * 해당하는 유저들의 id를 얻어낸 후
	 * 유저들의 id, 이름, 이메일을 반환한다.
	 * @param stageCode
	 * @param projectCode
	 * @return
	 */
	public List<UserChatSearchResDto> findByStageCodeAndProjectCode(long myid,int stage, int projectCode) {		
		EntityManager em = emf.createEntityManager();
		String jpql = "SELECT id,email,name "
				+ "FROM user "
				+ "WHERE id!= :myid AND id in "
					+ "(SELECT user_id "
					+ "FROM user_project_detail "
					+ "WHERE project_detail_id = ("
												+ "SELECT pd.id "
												+ "FROM project_detail pd "
												+ "WHERE pd.project_code=:projectCode AND pd.stage_code=("
														+ "SELECT cd.code_detail "
														+ "FROM code_detail cd "
														+ "WHERE cd.code_id='ST' AND cd.name LIKE '"+stage+"%')))";
		String sStage = Integer.toString(stage);
		log.info(myid+", "+stage+", "+projectCode);
		List<Object[]> users = em.createNativeQuery(jpql)
				.setParameter("myid", myid)
				.setParameter("projectCode", projectCode)
				.getResultList();
		log.info("users 갯수 : "+users.size());
		List<UserChatSearchResDto> res = new ArrayList<UserChatSearchResDto>();
		for(Object[]ouser : users) {
			UserChatSearchResDto ucsr = UserChatSearchResDto.builder().build();
			
			ucsr.setUser_id(Long.parseLong(ouser[0].toString()));
			ucsr.setEmail(ouser[1].toString());
			ucsr.setName(ouser[2].toString());
			
			res.add(ucsr);
		}
		em.close();
		return res;
	}
	
	
}
