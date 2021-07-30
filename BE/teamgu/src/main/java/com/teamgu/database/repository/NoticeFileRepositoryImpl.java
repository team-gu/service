package com.teamgu.database.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.database.entity.NoticeFile;
import org.springframework.beans.factory.annotation.Autowired;
import com.teamgu.database.entity.QNoticeFile;

public class NoticeFileRepositoryImpl implements NoticeFileRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QNoticeFile qNoticeFile = QNoticeFile.noticeFile;

    @Override
    public NoticeFile findByName(String name) {
        NoticeFile noticeFile = jpaQueryFactory.selectFrom(qNoticeFile)
                .where(qNoticeFile.originalName.eq(name)).fetchOne();

        return noticeFile;
    }
}
