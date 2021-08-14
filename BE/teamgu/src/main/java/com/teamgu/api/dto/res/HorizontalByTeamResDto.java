package com.teamgu.api.dto.res;

import java.util.List;

import com.teamgu.api.dto.req.TrackReqDto;

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
@ApiModel("팀별 가로비 정렬 응답 객체")
public class HorizontalByTeamResDto {
	Long team_id;//팀별 고유 id (조회를 위해 사용되고 엑셀엔 없다)
	
	@ApiModelProperty(name="팀별 코드",example = "A201")
	String team_code;
	
	List<UserInfoByTeam> members;//팀 구성원
	
	String name;//팀명

	String stage_name;//기수
	
	String track_name;//트랙명
	
	String project_name;//프로젝트 도메인 이름
}
