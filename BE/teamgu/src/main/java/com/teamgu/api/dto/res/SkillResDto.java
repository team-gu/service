package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel
public class SkillResDto {
	int code;
	String codeName;
	
	public SkillResDto(int code, String codeName) {
		this.code = code;
		this.codeName = codeName;
	}
	
}
