package com.teamgu.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.Mapping;

@Repository
public interface MappingRepository extends JpaRepository<Mapping, Long> {
	Optional<Mapping> findByTrackCode(int trackCode);
}
