package com.teamgu.database.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class NoticeFile extends BaseEntity {
	
	@Column(length = 120)
	String originalName;
	@Column(length = 45)
	String name;
	@Column(length = 45)
	String extension;
	Date registDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Notice notice;
}
