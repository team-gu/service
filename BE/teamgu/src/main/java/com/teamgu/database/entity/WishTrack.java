package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import com.teamgu.database.entity.pk.WishTrackPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(WishTrackPK.class)
public class WishTrack {
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	private Mapping mapping;
}
