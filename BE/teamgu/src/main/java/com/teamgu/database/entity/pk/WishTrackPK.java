package com.teamgu.database.entity.pk;

import java.io.Serializable;

import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.User;

public class WishTrackPK implements Serializable {
	User user;
	Mapping mapping;
}
