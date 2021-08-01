package com.teamgu.mapper;

import com.teamgu.api.dto.res.NoticeListResDto;
import com.teamgu.database.entity.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NoticeListMapper {
    NoticeListMapper INSTANCE = Mappers.getMapper(NoticeListMapper.class);

    @Mapping(source = "createDate", target = "date", dateFormat = "yyyy.MM.dd")
    NoticeListResDto noticeToDto(Notice notice);
}
