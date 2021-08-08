package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "Team Track Filter Request Model")
public class TrackReqDto {
	
	int code;
	String codeName;
	
	public TrackReqDto(int code, String codeName) {
		this.code = code;
		this.codeName = codeName;
	}
	
}
