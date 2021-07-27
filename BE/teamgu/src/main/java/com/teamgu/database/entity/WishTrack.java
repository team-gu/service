package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class WishTrack extends BaseEntity {
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	
	int wishTrackCode;
}
