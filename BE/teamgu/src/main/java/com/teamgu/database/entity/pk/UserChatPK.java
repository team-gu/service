package com.teamgu.database.entity.pk;

import java.io.Serializable;

import com.teamgu.database.entity.ChatRoom;
import com.teamgu.database.entity.User;

public class UserChatPK implements Serializable {
	User user;
	ChatRoom chatRoom;
}
