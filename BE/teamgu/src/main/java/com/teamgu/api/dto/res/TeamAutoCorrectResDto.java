package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "자동 검색 응답 모델")
public class TeamAutoCorrectResDto {
	
	@ApiModelProperty(name = "사용자 index", example ="1")
	Long id;
	
	@ApiModelProperty(name = "사용자 이름", example = "안석현")
	String name;
	
	@ApiModelProperty(name = "사용자 email", example = "naannaan@naver.com")
	String email;

	public TeamAutoCorrectResDto(Long id, String name, String email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
	
}
