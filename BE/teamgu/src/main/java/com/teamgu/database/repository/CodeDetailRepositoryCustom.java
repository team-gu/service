package com.teamgu.database.repository;

import com.teamgu.database.entity.CodeDetail;

import java.util.List;

/**
 * CodeDetail 커스텀 쿼리 인터페이스
 */
public interface CodeDetailRepositoryCustom {
    List<CodeDetail> getStgCodeDetail();
    List<CodeDetail> getPrjCodeDetail();
    List<CodeDetail> getTrkCodeDetail();
    List<CodeDetail> getSklCodeDetail();
    List<CodeDetail> getPosCodeDetail();
    List<CodeDetail> getRegCodeDetail();
}
