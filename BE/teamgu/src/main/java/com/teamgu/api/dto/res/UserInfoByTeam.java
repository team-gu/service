package com.teamgu.api.dto.res;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("팀별 정보 조회 시, 함께 조회되는 유저의 정보")
public class UserInfoByTeam {
	String name;//유저의 이름
	String email;//유저의 이메일
	String studentNumber;//유저의 학번
	String role;//유저의 역할(팀장,팀원)
}
