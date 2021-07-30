package com.teamgu.database.entity.pk;

import java.io.Serializable;

import com.teamgu.database.entity.Conference;
import com.teamgu.database.entity.User;

public class UserConferencePK implements Serializable{
	User user;
	Conference conference;
}
