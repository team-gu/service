package com.teamgu.mapper;

import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.database.entity.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = NoticeFileMapper.class) //Notice안에 있는 NoticeFile도 매퍼로 처리해야함
public interface NoticeDetailMapper {
    NoticeDetailMapper INSTANCE = Mappers.getMapper(NoticeDetailMapper.class);

    NoticeDetailResDto noticeToDto(Notice notice);
}
