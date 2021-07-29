package com.teamgu.database.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Notice extends BaseEntity {

	Date createDate;
	Date modifyDate;
	@Column(length = 80)
	String title;
	@Column(length = 2000)
	String content;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "writer_id")
	private User user;
	

	@OneToMany(mappedBy="notice")
	private List<NoticeFile> noticeFiles = new ArrayList<>();
	
}
