package com.teamgu.database.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Conference extends BaseEntity {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "ownerId")
	private User user;
	
	Date callStartTime;
	Date callEndTime;
	short isActive;
	
	@OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval=true)	
	@OnDelete(action = OnDeleteAction.CASCADE)
	List<UserConference> userConferences = new ArrayList<>();
	
}