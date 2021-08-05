package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel("채팅 리스트에서 유저 검색 시 응답 객체") 
public class UserChatSearchResDto {
	@ApiModelProperty(name="유저의 id")
	long user_id;
	
	@ApiModelProperty(name="유저의 이름")
	String name;
	
	@ApiModelProperty(name="유저의 이메일")
	String email;
}
