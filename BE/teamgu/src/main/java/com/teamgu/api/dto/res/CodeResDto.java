package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@ApiModel(description = "사용자 Code 응답 모델")
public class CodeResDto {

	@ApiModelProperty(name = "codeName")
	String codeName;
	
	@ApiModelProperty(name = "code")
	int code;

	public CodeResDto(int code, String codeName) {
		this.codeName = codeName;
		this.code = code;
	}
	
}
