package com.teamgu.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.UserProject;

@Repository
public interface ProjectRepository extends JpaRepository<UserProject, Long>  {

	Optional<UserProject> findByName(String name);
}
