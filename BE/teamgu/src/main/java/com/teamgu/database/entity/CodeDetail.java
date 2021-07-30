package com.teamgu.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.teamgu.database.entity.pk.CodeDetailPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(CodeDetailPK.class)
public class CodeDetail {
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "code_id")
	private Code code;
	
	@Id
	int codeDetail;
	@Column(length = 45)
	String Name;	
}
