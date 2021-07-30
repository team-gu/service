package com.teamgu.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.UserAward;

@Repository
public interface AwardRepository extends JpaRepository<UserAward, Long> {

	Optional<UserAward> findByName(String name);

}
