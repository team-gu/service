package com.teamgu.api.dto.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "1:1 채팅방 존재 확인 요청 모델")
public class UserRoomCheckDto {
	@ApiModelProperty(name = "사용자 본인")
	long user_id1;	
	@ApiModelProperty(name = "초대당하거나 생성을 당하는 사람")
	long user_id2;
}
