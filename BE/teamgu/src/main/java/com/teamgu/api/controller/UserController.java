package com.teamgu.api.controller;

import java.util.List;

import com.teamgu.api.dto.req.PasswordInitReqDto;
import com.teamgu.api.dto.res.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.teamgu.api.dto.req.PasswordReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.service.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "마이페이지 정보 입력", tags = {"User."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@Log4j2
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Transactional
    @PatchMapping("/password/change")
    @ApiOperation(value = "비밀번호 변경", notes = "비밀번호를 변경한다.")
    public ResponseEntity<? extends BasicResponse> changePassword(
            @RequestBody @ApiParam(value = "비밀번호", required = true) PasswordReqDto password) {

        if(!userService.changePassword(password)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("현재 비밀번호가 일치하지 않거나 이메일이 일치하는 유저가 없습니다."));
        }

        return ResponseEntity.ok(new CommonResponse<String>("비밀번호 변경 완료"));
    }

    @Transactional
    @PatchMapping("/password/init")
    @ApiOperation(value = "비밀번호 초기화", notes = "비밀번호를 초기화 한다.")
    public ResponseEntity<? extends BasicResponse> initPassword(
            @RequestBody @ApiParam(value = "초기화할 대상의 이메일", required = true) PasswordInitReqDto passwordInitReqDto) {

        log.info(passwordInitReqDto.getEmail());

        short result = userService.initPassword(passwordInitReqDto.getEmail());

        if(result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("일치하는 유저가 없습니다."));
        } else if(result == -1) {
            return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                    .body(new ErrorResponse("임시 비밀번호 발급에 실패하였습니다."));
        }

        return ResponseEntity.ok(new CommonResponse<String>("비밀번호 초기화 완료"));
    }

    @ApiOperation(value = "사용자 상세정보 조회", notes = "마이페이지에서 사용자 상세정보를 조회한다.")
    @GetMapping("/userInfo/{userId}")
    public ResponseEntity<UserInfoResDto> getUserDetailInfo(
            @PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserDetailInfo(userId));
    }

    @ApiOperation(value = "사용자 상세정보 입력/ 수정", notes = "사용자 상세정보를 입력, 수정한다.")
    @PutMapping("/userInfo")
    public ResponseEntity<UserInfoResDto> updateUserDetailInfo(
            @ApiParam(value = "마이페이지 정보", required = true) UserInfoReqDto userInfoReq) {

        UserInfoResDto ret = userService.updateUserDetailInfo(userInfoReq);

        return ResponseEntity.ok(ret);
    }

    @ApiOperation(value = "유저 프로젝트 입력", notes = "사용자 프로젝트를 입력", response = String.class)
    @PostMapping("/project")
    public ResponseEntity<List<UserInfoProjectResDto>> insertUserInfoProject(
            @RequestBody UserInfoProjectResDto userInfoProjectResDto) {

        return new ResponseEntity<List<UserInfoProjectResDto>>(userService.insertUserInfoProject(userInfoProjectResDto),
                HttpStatus.OK);
    }

    @ApiOperation(value = "유저 프로젝트 수정", notes = "사용자 프로젝트를 수정한다", response = String.class)
    @PutMapping("/project")
    public ResponseEntity<List<UserInfoProjectResDto>> updateUserInfoProject(
            @RequestBody UserInfoProjectResDto userInfoProjectResDto) {

        return new ResponseEntity<List<UserInfoProjectResDto>>(userService.updateUserInfoProject(userInfoProjectResDto),
                HttpStatus.OK);

    }

    @ApiOperation(value = "유저 프로젝트 삭제", notes = "사용자 프로젝트를 삭제한다.", response = String.class)
    @DeleteMapping("/project/{id}")
    public ResponseEntity<String> deleteUserInfoProject(@PathVariable Long id) {

        userService.deleteUserInfoProject(id);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

    @ApiOperation(value = "유저 수상내역 입력", notes = "사용자 수상 이력을 입력한다", response = String.class)
    @PostMapping("/award")
    public ResponseEntity<List<UserInfoAwardResDto>> insertUserInfoAward(
            @RequestBody UserInfoAwardResDto userInfoAwardResDto) {

        return new ResponseEntity<List<UserInfoAwardResDto>>(userService.insertUserInfoAward(userInfoAwardResDto),
                HttpStatus.OK);
    }

    @ApiOperation(value = "유저 수상내역 수정", notes = "사용자 수상 이력을 수정한다.", response = String.class)
    @PutMapping("/award")
    public ResponseEntity<List<UserInfoAwardResDto>> updateUserInfoAward(
            @RequestBody UserInfoAwardResDto userInfoAwardResDto) {

        return new ResponseEntity<List<UserInfoAwardResDto>>(userService.updateUserInfoAward(userInfoAwardResDto),
                HttpStatus.OK);
    }

    @ApiOperation(value = "유저 수상내역 삭제", notes = "사용자 수상 이력을 삭제한다.", response = String.class)
    @DeleteMapping("/award/{id}")
    public ResponseEntity<String> deleteUserInfoAward(@PathVariable Long id) {

        userService.deleteUserInfoAward(id);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

}
