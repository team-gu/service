package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class WishTrack implements Serializable {
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	private Mapping mapping;
}
