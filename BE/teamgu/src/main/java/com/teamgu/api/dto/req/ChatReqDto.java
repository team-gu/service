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
	 * NORMAL		그냥 일반 메세지다
     * TEAM_INVITE_12_WAITING       요청을 보냈으나 아직 응답을 안 한 상태, _ 뒤엔 반드시 팀 코드가 포함되어야한다.
     * TEAM_INVITE_12_ACCEPTED        요청을 보냈고 수락한 상태
     * TEAM_INVITE_12_REJECTED        요청을 보냈고 거절한 상태
     * TEAM_INVITE_12_EXPIRED	요청을 보냈으나 만료된 상태
     * RTC_INVITE_12	방 번호를 같이 보낸다
	 */
	@JsonProperty("type")
	String type;
}
