package com.teamgu.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.ProjectDetail;
import com.teamgu.database.entity.pk.ProjectDetailPK;

@Repository
public interface ProjectDetailRepository extends JpaRepository<ProjectDetail, ProjectDetailPK>  {

	Optional<ProjectDetail> findById(Long id);
}
