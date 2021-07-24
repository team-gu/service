package com.teamgu.database.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProjectDetail implements Serializable{
	@Id
	int stageCode;
	@Id
	int projectCode;
	
	Date activeDate;
	Date startDate;
	Date endDate;
	
}
