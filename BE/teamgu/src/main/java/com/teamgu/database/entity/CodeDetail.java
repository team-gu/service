package com.teamgu.database.entity;

import java.io.Serializable;

import javax.persistence.Column;
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
public class CodeDetail implements Serializable{
	@Id
	int codeDetail;
	@Column(length = 45)
	String Name;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "code_id")
	private Code code;
	
}
