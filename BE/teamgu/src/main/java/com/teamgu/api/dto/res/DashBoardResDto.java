package com.teamgu.api.dto.res;

import java.util.List;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(description = "사용자 정보 응답 모델")
public class DashBoardResDto {

	List<DashBoardDetailResDto> region;
	
	List<DashBoardDetailResDto> track;
	
}
