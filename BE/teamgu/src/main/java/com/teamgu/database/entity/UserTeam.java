package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserTeam extends BaseEntity{
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	private Team team;
}
