package com.teamgu.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.UserInfoAward;

@Repository
public interface AwardRepository extends JpaRepository<UserInfoAward, Long> {

	Optional<UserInfoAward> findByName(String name);

}
