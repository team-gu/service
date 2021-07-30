package com.teamgu.database.entity;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserAward extends BaseEntity{
	
	@Column(length = 45)
	String name;
	@Column(length = 45)
	String agency;
	Date date;
	@Column(length = 1000)
	String introduce;
	
	@ManyToOne
	@JoinColumn(name = "userId")
	@JsonIgnore
	User user;
}
