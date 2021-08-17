package com.teamgu.database.repository;

import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.database.entity.CodeDetail;

import java.util.List;

/**
 * CodeDetail 커스텀 쿼리 인터페이스
 */
public interface CodeDetailRepositoryCustom {
    List<CodeDetailResDto> getStgCodeDetail();
    List<CodeDetailResDto> getPrjCodeDetail(String stage);
    List<CodeDetailResDto> getFilteredTrkDetail(String stage, int prjCode);
    List<CodeDetailResDto> getTrkCodeDetail(String stage);
    List<CodeDetailResDto> getSklCodeDetail();
    List<CodeDetailResDto> getPosCodeDetail();
    List<CodeDetailResDto> getRegCodeDetail();
}
