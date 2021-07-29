package com.teamgu.mapper;

import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.database.entity.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = NoticeFileMapper.class) //Notice안에 있는 NoticeFile도 매퍼로 처리해야함
public interface NoticeDetailMapper {
    NoticeDetailMapper INSTANCE = Mappers.getMapper(NoticeDetailMapper.class);

    @Mapping(source = "createDate", target = "createDate", dateFormat = "yyyy.MM.dd")
    @Mapping(source = "modifyDate", target = "modifyDate", dateFormat = "yyyy.MM.dd")
    NoticeDetailResDto noticeToDto(Notice notice);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(source = "createDate", target = "createDate", qualifiedByName = "stringToDate")
    @Mapping(source = "modifyDate", target = "modifyDate", qualifiedByName = "stringToDate")
    Notice dtoToNotice(NoticeDetailResDto noticeDetailResDto);

}
