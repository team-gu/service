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
	int skillCode;
	String skillName;
	
	public SkillResDto(int skillCode, String skillName) {
		this.skillCode = skillCode;
		this.skillName = skillName;
	}
	
}
