package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "기수코드, 프로젝트 코드로 엑셀 데이터를 요청하는 객체")
public class TeamWithUserToExcelReqDto {
	@ApiModelProperty(name = "기수 코드",example="105")
	int stage_code;
	@ApiModelProperty(name = "프로젝트 도메인 코드(공통,특화,자율)",example="101")
	int project_code;
}
