package com.teamgu.database.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.QCodeDetail;

@Repository
public class CodeDetailRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;

	/*
	 * Name to Code
	 */
	public int findProjectCode(String name) {
		int projectCode = jpaQueryFactory.select(qCodeDetail.codeDetail).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("PR"), qCodeDetail.Name.eq(name)).fetchOne();
		return projectCode;
	}

	public int finStageCode(String name) {
		int projectCode = jpaQueryFactory.select(qCodeDetail.codeDetail).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("ST"), qCodeDetail.Name.eq(name)).fetchOne();
		return projectCode;
	}

	public int findTtrackCode(String name) {
		int projectCode = jpaQueryFactory.select(qCodeDetail.codeDetail).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("TR"), qCodeDetail.Name.eq(name)).fetchOne();
		return projectCode;
	}

	public int findSkillCode(String name) {
		int projectCode = jpaQueryFactory.select(qCodeDetail.codeDetail).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("SK"), qCodeDetail.Name.eq(name)).fetchOne();
		return projectCode;
	}

	public int findPositionCode(String name) {
		int projectCode = jpaQueryFactory.select(qCodeDetail.codeDetail).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("PO"), qCodeDetail.Name.eq(name)).fetchOne();
		return projectCode;
	}

	/*
	 * Code to Name
	 */
	public String findProjectName(int code) {
		String projectName = jpaQueryFactory.select(qCodeDetail.Name).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("PR"), qCodeDetail.codeDetail.eq(code)).fetchOne();
		return projectName;
	}

	public String findStageName(int code) {
		String projectName = jpaQueryFactory.select(qCodeDetail.Name).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("ST"), qCodeDetail.codeDetail.eq(code)).fetchOne();
		return projectName;
	}

	public String findTtrackName(int code) {
		String projectName = jpaQueryFactory.select(qCodeDetail.Name).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("TR"), qCodeDetail.codeDetail.eq(code)).fetchOne();
		return projectName;
	}

	public String findSkillName(int code) {
		String projectName = jpaQueryFactory.select(qCodeDetail.Name).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("SK"), qCodeDetail.codeDetail.eq(code)).fetchOne();
		return projectName;
	}

	public String findPositionName(int code) {
		String projectName = jpaQueryFactory.select(qCodeDetail.Name).from(qCodeDetail)
				.where(qCodeDetail.code.code.eq("PO"), qCodeDetail.codeDetail.eq(code)).fetchOne();
		return projectName;
	}
}
