package com.teamgu.database.repository;

import com.teamgu.database.entity.NoticeFile;

/**
 * NoticeFile 엔티티의 커스텀 쿼리 인터페이스
 */
public interface NoticeFileRepositoryCustom {
    NoticeFile findByOriginName(String name);
    NoticeFile findByCheckSumName(String name);
}
