package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "자동 검색 응답 모델")
public class TeamAutoCorrectResDto {
	
	@ApiModelProperty(name = "사용자 index", example ="1")
	Long id;
	
	@ApiModelProperty(name = "사용자 이름", example = "안석현")
	String name;
	
	@ApiModelProperty(name = "사용자 email", example = "naannaan@naver.com")
	String email;
	
}
