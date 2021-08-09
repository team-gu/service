package com.teamgu.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.ProjectDetail;

@Repository
public interface ProjectDetailRepository extends JpaRepository<ProjectDetail, Long>  {
}
