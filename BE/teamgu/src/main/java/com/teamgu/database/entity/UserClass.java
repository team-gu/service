package com.teamgu.database.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserClass extends BaseEntity{
	
//	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//	int id;
	
	@ManyToOne
	@JoinColumn(name = "userId")
	User user;
	
	@ManyToOne
	@JoinColumn(name = "classId")
	StdClass classInfo;

}
