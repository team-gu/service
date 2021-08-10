package com.teamgu.api.dto.res;

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
@ApiModel("ChatUnreadTotal")
public class ChatTotalUnreadResDto {
	@ApiModelProperty(name="읽지 않은 메세지 갯수")
	long unreadcount;
}
