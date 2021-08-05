package com.teamgu.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.UserInfoProject;

@Repository
public interface UserInfoProjectRepository extends JpaRepository<UserInfoProject, Long>  {

	Optional<UserInfoProject> findByName(String name);
}
