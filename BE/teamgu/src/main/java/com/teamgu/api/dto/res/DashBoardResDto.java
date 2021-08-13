package com.teamgu.api.dto.res;

import java.util.List;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "사용자 정보 응답 모델")
public class DashBoardResDto {

	List<DashBoardDetailResDto> region;
	
	List<DashBoardDetailResDto> track;
	
}
