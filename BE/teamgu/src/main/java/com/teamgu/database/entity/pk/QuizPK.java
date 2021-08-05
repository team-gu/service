package com.teamgu.database.entity.pk;

import java.io.Serializable;

import com.teamgu.database.entity.User;

import lombok.Data;

@Data
public class QuizPK implements Serializable{
	private User user;
}
