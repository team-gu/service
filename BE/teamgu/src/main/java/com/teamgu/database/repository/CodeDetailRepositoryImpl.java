package com.teamgu.database.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.database.entity.CodeDetail;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class CodeDetailRepositoryImpl implements CodeDetailRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QMapping qMapping = QMapping.mapping;
    QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;

    @Override
    public List<CodeDetail> getStgCodeDetail() {
        return jpaQueryFactory.selectFrom(qCodeDetail)
                .where(qCodeDetail.code.code.eq("ST")).fetch();
    }

    @Override
    public List<CodeDetail> getPrjCodeDetail() {
        return jpaQueryFactory.selectFrom(qCodeDetail)
                .where(qCodeDetail.code.code.eq("PR")).fetch();
    }

    @Override
    public List<CodeDetailResDto> getTrkCodeDetail(String stage) {
        return jpaQueryFactory.select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .innerJoin(qMapping)
                .on(qCodeDetail.codeDetail.eq(qMapping.trackCode))
                .where(qMapping.stageCode.like("%" + stage).and(qCodeDetail.code.code.eq("TR"))).fetch();
    }

    @Override
    public List<CodeDetail> getSklCodeDetail() {
        return jpaQueryFactory.selectFrom(qCodeDetail)
                .where(qCodeDetail.code.code.eq("SK")).fetch();
    }

    @Override
    public List<CodeDetail> getPosCodeDetail() {
        return jpaQueryFactory.selectFrom(qCodeDetail)
                .where(qCodeDetail.code.code.eq("PO")).fetch();
    }

    @Override
    public List<CodeDetail> getRegCodeDetail() {
        return jpaQueryFactory.selectFrom(qCodeDetail)
                .where(qCodeDetail.code.code.eq("RE")).fetch();
    }
}
