package com.teamgu.api.dto.req;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "단체톡 생성을 위한 요청 모델")
public class ChatRoomRegistReqDto {	
	@ApiModelProperty(name="채팅방을 생성 할 유저들의 id")
	List<Long> userids;
}
