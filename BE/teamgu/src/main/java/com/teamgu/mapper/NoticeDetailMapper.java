package com.teamgu.mapper;

import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.database.entity.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = NoticeFileMapper.class) //Notice안에 있는 NoticeFile도 매퍼로 처리해야함
public interface NoticeDetailMapper {
    NoticeDetailMapper INSTANCE = Mappers.getMapper(NoticeDetailMapper.class);

    //매핑 무시 조건 추가
    @Mapping(target = "message", ignore = true)
    @Mapping(target = "statusCode", ignore = true)
    @Mapping(source = "createDate", target = "createDate", dateFormat = "yyyy.mm.dd")
    @Mapping(source = "modifyDate", target = "modifyDate", dateFormat = "yyyy.mm.dd")
    NoticeDetailResDto noticeToDto(Notice notice);
}
