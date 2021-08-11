package com.teamgu.api.dto.res;

import java.util.Date;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@ApiModel(description = "관리자 프로젝트 요청 응답 모델")
public class ProjectInfoResDto {
	
	@ApiModelProperty(name = "project index", example = "1")
	Long id;

	@ApiModelProperty(name = "active date", example = "2021-08-11")
	Date activeDate;
	
	@ApiModelProperty(name = "start date", example = "2021-08-11")
	Date startDate;
	
	@ApiModelProperty(name = "end date", example = "2021-08-11")
	Date endDate;
	
	@ApiModelProperty(name = "project code / name")
	CodeResDto project;

	@ApiModelProperty(name = "stage code / name")
	CodeResDto stage;

	@ApiModelProperty(name = "track code list / name")
	List<CodeResDto> track;

	public ProjectInfoResDto(Date activeDate, Date startDate, Date endDate, CodeResDto project, CodeResDto stage,
			List<CodeResDto> track) {
		this.activeDate = activeDate;
		this.startDate = startDate;
		this.endDate = endDate;
		this.project = project;
		this.stage = stage;
		this.track = track;
	}
	
}
