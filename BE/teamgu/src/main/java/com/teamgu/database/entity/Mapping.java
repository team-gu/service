package com.teamgu.database.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Mapping extends BaseEntity {
	@NotNull
	int stageCode;
	@NotNull
	int projectCode;
	@NotNull
	int trackCode;
	
	@OneToMany(mappedBy="mapping")
	private List<Team> teams = new ArrayList<>();
	
}
