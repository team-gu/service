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
	
	int trackCode;
	String trackName;
	
	public TrackReqDto(int trackCode, String trackName) {
		this.trackCode = trackCode;
		this.trackName = trackName;
	}
	
}
