package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserClassResDto {
	@ApiModelProperty(name = "교육생 반")
	int stdClassNumber;
	@ApiModelProperty(name = "교육생 지역")
	String region;

}
