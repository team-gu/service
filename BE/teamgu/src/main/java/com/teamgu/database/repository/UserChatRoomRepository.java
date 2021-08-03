package com.teamgu.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamgu.api.dto.UserChatRoomDto;
import com.teamgu.database.entity.ChatRoom;
import com.teamgu.database.entity.UserChatRoom;
import com.teamgu.database.entity.pk.UserChatRoomPK;
public interface UserChatRoomRepository extends JpaRepository<UserChatRoom, UserChatRoomPK>{
	/**
	 * 유저 id로 채팅방 id를 알아내는 로직
	 * @author code
	 * 복합키라 JpaRepository를 이용한 검색을 쓰지 않고 Support.class에서 처리한다
	 */
	List<UserChatRoom> findByUserId(long user_id);//user_id로 채팅방 id를 조회
}