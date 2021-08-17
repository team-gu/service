package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "Admin User Status Response Model")
public class AdminUserManagementResDto {

	@ApiModelProperty(name = "교육생 ID", example = "")
	Long userId;
	
	@ApiModelProperty(name = "학번", example = "0540000")
	String studentNumber;

	@ApiModelProperty(name = "이름", example = "김싸피")
	String name;

	@ApiModelProperty(name = "교육생 이메일", example = "ssafy@ssafy.com")
	String email;

	@ApiModelProperty(name = "지역", example = "서울")
	String region;

	@ApiModelProperty(name = "반", example = "서울 2반")
	String studentClass;

	@ApiModelProperty(name = "교육생/퇴소생", example = "교육생")
	String role;

	@ApiModelProperty(name = "전공/비전공", example = "전공")
	String major;

	@ApiModelProperty(name = "프로젝트 참여/제외", example = "등록")
	String regist;
	
	@ApiModelProperty(name = "팀 구성 여부", example = "O")
	String completeYn;

	@ApiModelProperty(name = "팀 고유 번호", example = "1")
	String teamId;

	@ApiModelProperty(name = "팀 이름", example = "teamgu")
	String teamName;

	@ApiModelProperty(name = "트랙 이름", example = "웹 기술")
	String trackName;

}
