package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

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
	
	//리더의 여부를 나타낸다 {리더:1,일반:0}	
	@NotNull
	@ColumnDefault("0")//Default값으로 0을 부여한다
	private short leader_YN;
}
