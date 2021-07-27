package com.teamgu.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.Skill;
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

}
