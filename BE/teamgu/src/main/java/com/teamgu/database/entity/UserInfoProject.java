package com.teamgu.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserInfoProject extends BaseEntity {

	@NotNull
	@Column(length = 45)
	String name;
	int positionCode;
	@Column(length = 1000)
	String introduce;
	@Column(length = 200)
	String url;
	
	@ManyToOne
	@JoinColumn(name = "userId")
	User user;
}
