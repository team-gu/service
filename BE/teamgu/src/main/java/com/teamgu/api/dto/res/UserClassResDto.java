package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserClassResDto {
	@ApiModelProperty(name = "교육생 반")
	int stdClassNumber;
	@ApiModelProperty(name = "교육생 지역")
	String region;

	public UserClassResDto() {
	}

	public UserClassResDto(int stdClassNumber, String region) {
		this.stdClassNumber = stdClassNumber;
		this.region = region;
	}

}
