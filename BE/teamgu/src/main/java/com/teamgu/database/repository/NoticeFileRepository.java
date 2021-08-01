package com.teamgu.database.repository;

import com.teamgu.database.entity.NoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeFileRepository extends JpaRepository<NoticeFile, Long>, NoticeFileRepositoryCustom {
}
