package com.teamgu.database.entity.pk;

import java.io.Serializable;

import com.teamgu.database.entity.ChatRoom;
import com.teamgu.database.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChatRoomPK implements Serializable {
	User user;
	ChatRoom chatRoom;
}
