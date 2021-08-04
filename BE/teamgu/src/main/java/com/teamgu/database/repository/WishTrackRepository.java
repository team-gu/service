package com.teamgu.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.WishTrack;
import com.teamgu.database.entity.pk.WishTrackPK;

@Repository
public interface WishTrackRepository extends JpaRepository<WishTrack,WishTrackPK> {

}
