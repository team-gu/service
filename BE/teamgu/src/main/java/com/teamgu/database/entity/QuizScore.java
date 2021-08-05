package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.teamgu.database.entity.pk.QuizPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(QuizPK.class)
public class QuizScore implements Serializable {
	int score;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "author_id")
	private User user;
}
