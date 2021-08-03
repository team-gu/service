package com.teamgu.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.teamgu.api.dto.req.ChatReqDto;
import com.teamgu.api.dto.res.ChatMessageResDto;
import com.teamgu.database.entity.Chat;

@Mapper
public interface ChatMapper {
		ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);
		
		//매핑 무시 조건 추가
		/**
		 * reqDto :: Entity
		 * 없음 -> id
		 * room_id -> receiveRoomId
		 * sender_id -> senderId
		 * message = message
		 * type = type
		 * 없음 -> sendDateTime 
		 * @param chatReqDto
		 * @return
		 */
		@Mapping(target="id",ignore=true)//id는 auto increment니까		
		@Mapping(target="chatRoom.id",ignore=true)
//		@Mapping(source="room_id",target="chatRoom.id")
		@Mapping(target="user.id",ignore=true)
//		@Mapping(source="sender_id",target="user.id")
		@Mapping(source="message",target="message")
		@Mapping(source="type",target="type")
		@Mapping(target="sendDateTime",ignore=true)	//date 생성 필요
		@Mapping(target="userChatRoom",ignore=true)	//date 생성 필요
		Chat reqDtoToEntity(ChatReqDto chatReqDto);
		
}
