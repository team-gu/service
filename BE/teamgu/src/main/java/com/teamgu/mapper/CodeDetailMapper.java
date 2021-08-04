package com.teamgu.mapper;

import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.database.entity.CodeDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CodeDetailMapper {
    CodeDetailMapper INSTANCE = Mappers.getMapper(CodeDetailMapper.class);

    @Mapping(source = "codeDetail", target = "code")
    @Mapping(source = "name", target = "codeName")
    CodeDetailResDto codeDetailToDto(CodeDetail codeDetail);
}
