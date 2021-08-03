package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import com.teamgu.database.entity.pk.QuizPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(QuizPK.class)
public class Quiz implements Serializable{
	@Column(length = 80)
	String question;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
}
