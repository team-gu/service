package com.teamgu.api.dto.res;

import java.util.List;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("유저별 세로비 정렬 응답 객체")
public class VerticalByUserResDto {
	String student_number;
	String email;
	String name;
	String team_code;
	String team_role;
	String team_name;
	String track_name;
}
