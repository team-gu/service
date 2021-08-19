package com.teamgu.database.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.database.entity.QCodeDetail;
import com.teamgu.database.entity.QMapping;
import com.teamgu.database.entity.QProjectDetail;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class CodeDetailRepositoryImpl implements CodeDetailRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QMapping qMapping = QMapping.mapping;
    QCodeDetail qCodeDetail = QCodeDetail.codeDetail1;
    QProjectDetail qProjectDetail = QProjectDetail.projectDetail;

    @Override
    public List<CodeDetailResDto> getStgCodeDetail() { //기수 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("ST"))
                .fetch();
    }

    @Override
    public List<CodeDetailResDto> getPrjCodeDetail(String stage) { //프로젝트 코드 정보 반환
        Date now = new Date(); //해당 프로젝트의 활성화 날짜가 오늘 이전인지 체크하기 위함

        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qProjectDetail)
                .innerJoin(qCodeDetail)
                    .on(qProjectDetail.projectCode.eq(qCodeDetail.codeDetail))
                .where(qProjectDetail.stageCode.like("%" + stage)
                        .and(qCodeDetail.code.code.eq("PR")
                                .and(qProjectDetail.activeDate.before(now))))
                .fetch();
    }

    @Override
    public List<CodeDetailResDto> getFilteredTrkDetail(String stage, int prjCode) { //선택된 프로젝트 코드에 따른 트랙리스트 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .innerJoin(qMapping)
                .on(qCodeDetail.codeDetail.eq(qMapping.trackCode))
                .where(qMapping.stageCode.like("%" + stage)
                        .and(qCodeDetail.code.code.eq("TR")
                                .and(qMapping.projectCode.eq(prjCode))))
                .fetch();
    }

    @Override
    public List<CodeDetailResDto> getTrkCodeDetail(String stage) { //트랙 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .innerJoin(qMapping)
                    .on(qCodeDetail.codeDetail.eq(qMapping.trackCode))
                .where(qMapping.stageCode.like("%" + stage)
                        .and(qCodeDetail.code.code.eq("TR")))
                .fetch();
    }

    @Override
    public List<CodeDetailResDto> getSklCodeDetail() { //스킬 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("SK"))
                .fetch();
    }

    @Override
    public List<CodeDetailResDto> getPosCodeDetail() { //포지션 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("PO"))
                .fetch();
    }

    @Override
    public List<CodeDetailResDto> getRegCodeDetail() { //지역 코드 정보 반환
        return jpaQueryFactory
                .select(Projections.constructor(CodeDetailResDto.class, qCodeDetail.Name, qCodeDetail.codeDetail))
                .from(qCodeDetail)
                .where(qCodeDetail.code.code.eq("RE"))
                .fetch();
    }
}
