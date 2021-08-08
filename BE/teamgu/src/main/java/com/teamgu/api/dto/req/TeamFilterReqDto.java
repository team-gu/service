package com.teamgu.api.dto.req;

import java.util.List;

import com.teamgu.api.dto.res.SkillResDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "Team Filter Request Model")
public class TeamFilterReqDto {
	
	@ApiModelProperty(name = "Filtered Skills")
	List<SkillResDto> filteredSkills;
	
	@ApiModelProperty(name = "Filtered Tracks")
	List<TrackReqDto> filteredTracks;
	
}
