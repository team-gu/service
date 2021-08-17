package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(description = "Admin User Add Request Model")
public class AdminUserAddReqDto {
	
	@ApiModelProperty(name = "User Email", example = "ssafy@ssafy.com")
	String email;
	
	@ApiModelProperty(name = "User Name", example = "김싸피")
	String name;
	
	@ApiModelProperty(name = "User Student Number", example = "0540001")
	String studentNumber;
	
	@ApiModelProperty(name = "User Major", example = "전공")
	String major;
	
	@ApiModelProperty(name = "User Role", example = "교육생")
	String role;
	
}
