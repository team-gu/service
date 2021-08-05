package com.teamgu.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamgu.database.entity.ChatRoom;
/**
 * 
 * @author code
 *
 */
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
	
}
