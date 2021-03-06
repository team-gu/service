package com.teamgu.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

}
