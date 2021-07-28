package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import com.teamgu.database.entity.pk.SkillPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(SkillPK.class)
public class Skill {
	@Id
	int skillCode;
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
}
