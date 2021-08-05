package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(description = "팀 구성원들의 간단한 정보")
public class TeamMemberInfoResDto {

	@ApiModelProperty(name = "교육생 고유 index", example = "5")
	Long id;

	@ApiModelProperty(name = "교육생 이름", example = "난싸피")
	String name;

	@ApiModelProperty(name = "교육생 이미지", example = "default.img")
	String img;

	@ApiModelProperty(name = "교육생 email", example = "ssafy@ssafy.com")
	String email;

	public TeamMemberInfoResDto(Long id, String name, String img, String email) {
		this.id = id;
		this.name = name;
		this.img = img;
		this.email = email;
	}

}
