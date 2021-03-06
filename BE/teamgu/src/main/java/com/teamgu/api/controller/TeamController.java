package com.teamgu.api.controller;

import java.util.List;

import com.teamgu.api.dto.res.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamgu.api.dto.req.TeamAutoCorrectReqDto;
import com.teamgu.api.dto.req.TeamFilterReqDto;
import com.teamgu.api.dto.req.TeamIsCreateReqDto;
import com.teamgu.api.dto.req.TeamMemberReqDto;
import com.teamgu.api.service.TeamServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@Api(value = "팀 관리 API", tags = { "Team." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/team")
public class TeamController {

	@Autowired
	TeamServiceImpl teamService;
	
	@ApiOperation(value = "유저 자동 완성 기능")
	@PostMapping("/search")
	public ResponseEntity<? extends BasicResponse> getUserAutoCorrect(@RequestBody TeamAutoCorrectReqDto teamAutoCorrectReqDto){

		List<TeamAutoCorrectResDto> list = teamService.getUserAutoCorrect(teamAutoCorrectReqDto);

		return ResponseEntity.ok(new CommonResponse<List<TeamAutoCorrectResDto>>(list));
	}
	
	
	@ApiOperation(value = "팀 생성 가능 여부 조회")
	@PostMapping("/{userId}")
	public ResponseEntity<? extends BasicResponse> getIsCreateTeam(@RequestBody TeamIsCreateReqDto teamIsCreateReqDto){
		
		Long userId = teamIsCreateReqDto.getUserId();
		int projectCode = teamIsCreateReqDto.getProject().getCode();
		
		TeamIsCreateResDto teamIsCreateResDto = teamService.checkTeamBuilding(userId, projectCode);

		return ResponseEntity.ok(new CommonResponse<TeamIsCreateResDto>(teamIsCreateResDto));
	}
	
	@ApiOperation(value = "팀장 여부 조회")
	@PostMapping("/leader")
	public ResponseEntity<? extends BasicResponse> checkTeamLeader(@RequestBody TeamIsCreateReqDto checkTeamLeader){
		
		Long userId = checkTeamLeader.getUserId();
		int projectCode = checkTeamLeader.getProject().getCode();
		
		return ResponseEntity.ok(new CommonResponse<Boolean>(teamService.checkTeamLeader(userId, projectCode)));
	}


	// 추후 필터 완성시 삭제될 메서드
	@ApiOperation(value = "팀 리스트 조회")
	@GetMapping
	public ResponseEntity<? extends BasicResponse> getTeamList() {

		List<TeamListResDto> teamListResDto = teamService.getTeamList();

		return ResponseEntity.ok(new CommonResponse<List<TeamListResDto>>(teamListResDto));
	}

	@ApiOperation(value = "필터 팀 리스트 조회")
	@PostMapping
	public ResponseEntity<? extends BasicResponse> getTeamListbyFilter(@RequestBody TeamFilterReqDto teamFilterReqDto) {

		TeamPageResDto teamPageResDto = teamService.getTeamListbyFilter(teamFilterReqDto);


		return ResponseEntity.ok(new CommonResponse<TeamPageResDto>(teamPageResDto));
	}
	
	@ApiOperation(value = "팀 추가하기")
	@PostMapping("/add")
	public ResponseEntity<? extends BasicResponse> createTeam(@RequestBody TeamListResDto teamListResDto) {
		
		String trackName = teamListResDto.getTrack().getCodeName();
		Long userId = teamListResDto.getLeaderId();

		if(teamService.checkTeamBuilding(userId, trackName)) {
		
			teamService.createTeam(teamListResDto);
			return ResponseEntity.ok(new CommonResponse<String>("팀 추가 완료"));
		}

		return ResponseEntity.badRequest().body(new ErrorResponse("팀이 이미 구성되어 있습니다"));
	}

	@ApiOperation(value = "팀 정보 수정하기")
	@PutMapping("{teamId}")
	public ResponseEntity<? extends BasicResponse> updateTeamInfo(@RequestBody TeamListResDto teamListResDto) {

		teamService.updateTeamInfo(teamListResDto);
		TeamListResDto team = teamService.getTeamInfobyTeamId(teamListResDto.getId());
		return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));
	}

	@ApiOperation(value = "팀 삭제하기")
	@DeleteMapping("{teamId}")
	public ResponseEntity<? extends BasicResponse> deleteTeam(@PathVariable Long teamId) {
		teamService.deleteTeam(teamId);
		return ResponseEntity.ok(new CommonResponse<String>("팀 삭제 완료"));
	}

	@ApiOperation(value = "멤버 추가하기")
	@PostMapping("/member")
	public ResponseEntity<? extends BasicResponse> addMember(@RequestBody TeamMemberReqDto teamMemberReqDto) {

		Long teamId = teamMemberReqDto.getTeamId();
		Long userId = teamMemberReqDto.getUserId();

		List<Long> ids = teamService.getTeamMemberIdbyTeamId(teamId);

		for (Long id : ids) {
			if (userId == id) { // 이미 존재하는 멤버일 경우
				return ResponseEntity.badRequest().build();
			}
		}

		teamService.addMember(teamMemberReqDto);
		TeamListResDto team = teamService.getTeamInfobyTeamId(teamId);
		return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));
	}

	@ApiOperation(value = "팀나가기")
	@PutMapping("/exitTeam")
	public ResponseEntity<? extends BasicResponse> exitTeam(@RequestBody TeamMemberReqDto teamMemberReqDto) {

		Long teamId = teamMemberReqDto.getTeamId();
		Long userId = teamMemberReqDto.getUserId();
		TeamListResDto team = teamService.getTeamInfobyTeamId(teamId);

		List<Long> ids = teamService.getTeamMemberIdbyTeamId(teamId);
		int teamMebmerCount = ids.size();
		Long leaderId = team.getLeaderId();

		for (Long id : ids) {
			if (userId == id) { // 존재하는 멤버일 경우
				if (leaderId == userId) { // 나가려는 멤버가 팀장일 경우
					if (teamMebmerCount == 1) { // 근데 팀에 한명밖에 없을 경우

						teamService.deleteTeam(teamId);
						return ResponseEntity.ok(new CommonResponse<String>("팀 삭제 완료"));

					} else { // id 빠른 사람을 일단 팀장으로 맡기고
						for (Long nextLeader : ids) {
							if (nextLeader == id) continue;
						
							TeamMemberReqDto newLeader = new TeamMemberReqDto();
							newLeader.setTeamId(teamId);
							newLeader.setUserId(nextLeader);

							teamService.changeTeamLeader(newLeader);
							teamService.exitTeam(teamMemberReqDto);
							
							team = teamService.getTeamInfobyTeamId(teamId);
							team.setLeaderId(nextLeader);
							
							return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));
						}
					}
				}
				
				teamService.exitTeam(teamMemberReqDto);
				team = teamService.getTeamInfobyTeamId(teamId);
				return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));

			}
		}

		return ResponseEntity.badRequest().build();
	}
	
//	@ApiOperation(value = "팀 구성 완료하기")
//	@GetMapping("/complete/{teamId}")
//	public ResponseEntity<? extends BasicResponse> completeTeamBuilding(@PathVariable Long teamId) {
//
//		teamService.completeTeamBuilding(teamId);
//		TeamListResDto team = teamService.getTeamInfobyTeamId(teamId);
//		return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));
//	}

//	@ApiOperation(value = "팀장 변경하기")
//	@PutMapping("/member")
//	public ResponseEntity<? extends BasicResponse> changeTeamLeader(@RequestBody TeamMemberReqDto teamMemberReqDto) {
//
//		Long teamId = teamMemberReqDto.getTeamId();
//		Long userId = teamMemberReqDto.getUserId();
//
//		List<Long> ids = teamService.getTeamMemberIdbyTeamId(teamId);
//
//		for (Long id : ids) {
//			if (userId == id) { // 존재하는 멤버일 경우
//				teamService.changeTeamLeader(teamMemberReqDto);
//				TeamListResDto team = teamService.getTeamInfobyTeamId(teamId);
//				return ResponseEntity.ok(new CommonResponse<TeamListResDto>(team));
//			}
//		}
//
//		return ResponseEntity.badRequest().build();
//	}
	
}
