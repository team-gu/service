package com.teamgu.database.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Team extends BaseEntity {
	@Column(length = 45)
	String name;
	short completeYn;
	int maxMember;
	
	@OneToMany(mappedBy="team")
	private List<UserTeam> userTeams = new ArrayList<>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Mapping mapping;
}
