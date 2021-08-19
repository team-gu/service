package com.teamgu.database.repository;

import com.teamgu.database.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findByTitleContaining(String title, Pageable pageable);
}
