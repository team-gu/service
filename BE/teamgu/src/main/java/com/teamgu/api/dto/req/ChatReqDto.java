package com.teamgu.api.dto.req;

import com.fasterxml.jackson.annotation.JsonProperty;

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
@ApiModel(description="메세지 요청 모델")
public class ChatReqDto {
	@JsonProperty("room_id")
	long room_id;
	@JsonProperty("sender_id")
	long sender_id;
	@JsonProperty("message")
	String message;
	/**
	 * type에 대한 정의
	 * {% NORMAL %}
	 * {% INVITE_12_NONE %}   	요청을 보냈으나 아직 응답을 안 한 상태, _ 뒤엔 반드시 팀 코드가 포함되어야한다.
	 * {% INVITE_12_ACCEPT %}		요청을 보냈고 수락한 상태
	 * {% INVITE_12_REJECT %}		요청을 보냈고 거절한 상태
	 */
	@JsonProperty("type")
	String type;
}
