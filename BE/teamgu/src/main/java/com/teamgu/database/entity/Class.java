package com.teamgu.database.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Class {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "classId")
	int id;
	int name;
	int stageCode;
	int projectCode;
	
	@OneToMany(mappedBy = "classInfo", cascade = CascadeType.ALL)
	private List<UserClass> userClass;
}
