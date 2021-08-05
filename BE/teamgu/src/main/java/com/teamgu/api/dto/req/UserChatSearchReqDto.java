package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("채팅 리스트에서 유저 검색 시 요청 객체")
public class UserChatSearchReqDto {
	@ApiModelProperty(name="검색자의 id")
	long myid;
	
	@ApiModelProperty(name="검색자의 학번")
	String studentNumber;
	
	@ApiModelProperty(name="검색자의 현재 프로젝트 도메인 코드")
	int project_code;
}
