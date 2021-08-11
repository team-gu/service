package com.teamgu.database.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import com.teamgu.database.entity.pk.ProjectDetailPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(ProjectDetailPK.class)
public class ProjectDetail extends BaseEntity {
	@Id
	int stageCode;
	@Id
	int projectCode;
	
	Date activeDate;
	Date startDate;
	Date endDate;
	
}
