package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "Student Information Update Request Model")
public class AdminUserManagementReqDto {
	
	@ApiModelProperty(name = "교육생 ID", example = "1")
	Long userId;
	
	@ApiModelProperty(name = "프로젝트 ID", example = "1")
	Long projectId;
	
	@ApiModelProperty(name = "교육생 반", example = "1")	
	Long classId;
	
	@ApiModelProperty(name = "교육생 전공", example = "1")
	String major;
	
	@ApiModelProperty(name = "교육생 / 퇴소생", example = "1")
	String role;

}
