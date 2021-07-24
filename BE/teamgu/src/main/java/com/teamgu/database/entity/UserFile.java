package com.teamgu.database.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserFile implements Serializable {
	
	@Id
	@OneToOne
	@JoinColumn(name = "userId")
	User user;
	
	@Column(length = 120)
	String originalName;
	@Column(length = 45)
	String name;
	@Column(length = 45)
	String extension;
	Date registDate;
	
}
