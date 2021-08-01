package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.teamgu.database.entity.pk.UserConferencePK;

import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@IdClass(UserConferencePK.class)
public class UserConference{
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	private User user;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	private Conference conference;
}
