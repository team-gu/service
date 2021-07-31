package com.teamgu.database.repository;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QUserProject;
import com.teamgu.database.entity.UserInfoProject;

@Repository
public class ProjectRepositorySuport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QUserProject qProject = QUserProject.userProject;
	
	@Transactional
	public void modProjects(UserInfoProject project, String email) {
		jpaQueryFactory.update(qProject)
		.where(qProject.name.eq(project.getName()))
		.set(qProject.introduce, project.getIntroduce())
		.set(qProject.url,project.getUrl())
		.set(qProject.name, project.getName())
		.set(qProject.user, project.getUser())
		.execute();
	}
}
