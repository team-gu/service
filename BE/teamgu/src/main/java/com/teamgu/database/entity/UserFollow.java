package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserFollow implements Serializable{
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "from_user_id")
	private User user;
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "to_user_id")
	private User userT;
}
