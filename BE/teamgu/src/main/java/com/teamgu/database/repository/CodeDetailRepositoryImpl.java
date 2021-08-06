package com.teamgu.database.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.database.entity.CodeDetail;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CodeDetailRepositoryImpl implements CodeDetailRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QMapping qMapping = QMapping.mapping;
    QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;

    @Override
    public List<CodeDetailResDto> getStgCodeDetail() { //기수 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("ST")).fetch();
    }

    @Override
    public List<CodeDetailResDto> getPrjCodeDetail() {  //프로젝트 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("PR")).fetch();
    }

    @Override
    public List<CodeDetailResDto> getTrkCodeDetail(String stage) { //트랙 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .innerJoin(qMapping)
                .on(qCodeDetail.codeDetail.eq(qMapping.trackCode))
                .where(qMapping.stageCode.like("%" + stage).and(qCodeDetail.code.code.eq("TR"))).fetch();
    }

    @Override
    public List<CodeDetailResDto> getSklCodeDetail() { //스킬 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("SK")).fetch();
    }

    @Override
    public List<CodeDetailResDto> getPosCodeDetail() { //포지션 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("PO")).fetch();
    }

    @Override
    public List<CodeDetailResDto> getRegCodeDetail() { //지역 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("RE")).fetch();
    }
}
