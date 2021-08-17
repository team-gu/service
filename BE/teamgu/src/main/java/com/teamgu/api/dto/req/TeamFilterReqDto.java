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
	
	@ApiModelProperty(name = "Search by User", example = "1")
	Long userId;
	
	@ApiModelProperty(name = "projectCode", example = "101")
	int project;
	
	@ApiModelProperty(name = "sort column", example = "id")
	String sortBy;
	
	@ApiModelProperty(name = "student Number", example = "0540001")
	String studentNumber;
	
	@ApiModelProperty(name = "sort type", example = "true")
	boolean sortAsc;

	@ApiModelProperty(name = "원하는 페이지 번호", example = "0")
	private int pageNum;

	@ApiModelProperty(name = "한 페이지에 들어갈 데이터 개수", example = "10")
	private int pageSize;
}
