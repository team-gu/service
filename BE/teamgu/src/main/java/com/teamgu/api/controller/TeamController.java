package com.teamgu.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.TeamListResDto;
import com.teamgu.api.service.TeamServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "팀 관리 API", tags = { "Team." })
@RestController
@CrossOrigin("*")
@RequestMapping("/api/team")
public class TeamController {

	@Autowired
	TeamServiceImpl teamService;

	@ApiOperation(value = "팀 리스트 조회", response = List.class)
	@GetMapping
	public ResponseEntity<? extends BasicResponse> getTeamList() {

		List<TeamListResDto> teamListResDto = teamService.getTeamList();
		
		return ResponseEntity.ok(new CommonResponse<List<TeamListResDto>>(teamListResDto));
	}
//
//	@ApiOperation(value = "팀 리스트 조회")
//	@PostMapping("/")
//	public ResponseEntity<List<TeamListResDto>> getTeamListbyFilter() {
//		return new ResponseEntity<List<TeamListResDto>>(teamService.getTeamList(), HttpStatus.OK);
//	}
//
	@ApiOperation(value = "팀 추가하기", response = String.class)
	@PostMapping("/add")
	public ResponseEntity<? extends BasicResponse> createTeam(@RequestBody TeamListResDto teamListResDto) {
		teamService.createTeam(teamListResDto);
		List<TeamListResDto> teamList = teamService.getTeamList();

		return ResponseEntity.ok(new CommonResponse<List<TeamListResDto>>(teamList));
	}

	@ApiOperation(value = "팀 정보 수정하기")
	@PutMapping("{teamId}")
	public ResponseEntity<? extends BasicResponse> updateTeamInfo(@RequestBody TeamListResDto teamListResDto) {

		teamService.updateTeamInfo(teamListResDto);
		List<TeamListResDto> teamList = teamService.getTeamList();
		return ResponseEntity.ok(new CommonResponse<List<TeamListResDto>>(teamList));
	}

	@ApiOperation(value = "팀 삭제하기")
	@DeleteMapping("{teamId}")
	public ResponseEntity<? extends BasicResponse> deleteTeam(@PathVariable Long teamId) {
		teamService.deleteTeam(teamId);
		List<TeamListResDto> teamList = teamService.getTeamList();
		return ResponseEntity.ok(new CommonResponse<List<TeamListResDto>>(teamList));
	}
}
