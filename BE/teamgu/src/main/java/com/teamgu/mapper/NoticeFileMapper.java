package com.teamgu.mapper;

import com.teamgu.api.dto.res.NoticeFileResDto;
import com.teamgu.database.entity.NoticeFile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Mapper
/**
 * NoticeFile와 NoticeFileResDto를 매핑해주는 Mapper
 */
public interface NoticeFileMapper {

    NoticeFileMapper INSTANCE = Mappers.getMapper(NoticeFileMapper.class);

    //Date -> String 컬럼 변환
    @Mapping(source = "registDate", target = "registDate", dateFormat = "yyyy.MM.dd")
    NoticeFileResDto noticeFileToDto(NoticeFile noticeFile);

    //String -> Date로 변환
    //위 방식으로는 사용 불가능해서 사용자 정의 함수 사용 => 아래의 asDate
    //매핑 무시 조건 추가
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "notice", ignore = true)
    @Mapping(source = "registDate", target = "registDate", qualifiedByName = "stringToDate")
    NoticeFile dtoToNoticeFile(NoticeFileResDto noticeFileResDto);

    @Named("stringToDate")
    static Date asDate(String date) {
        try {
            return date != null ? new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                    .parse(date) : null;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }
}
