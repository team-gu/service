package com.teamgu.database.repository;

import com.teamgu.database.entity.NoticeFile;

public interface NoticeFileRepositoryCustom {
    NoticeFile findByName(String name);
}
