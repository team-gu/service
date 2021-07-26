package com.teamgu.database.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Conference extends BaseEntity {
	
	Date callStartTime;
	Date callEndTime;
	short isActive;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "owner_id")
	private User user;
	
}