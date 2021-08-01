package com.teamgu.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamgu.database.entity.Chat;
/**
 * 채팅룸 id에 해당하는 채팅 내역을 가져온다.
 * @author code
 *
 */
public interface ChatRepository extends JpaRepository<Chat, Long> {
//	List<Chat> findByReceiveRoomId(long receive_room_id);
}