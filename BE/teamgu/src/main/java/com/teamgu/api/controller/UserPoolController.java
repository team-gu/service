package com.teamgu.api.controller;

import com.teamgu.api.dto.req.UserPoolNameReqDto;
import com.teamgu.api.dto.req.UserPoolPageReqDto;
import com.teamgu.api.dto.res.*;
import com.teamgu.api.service.UserPoolServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "인력풀 API", tags = {"UserPool."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/userPool")
@Log4j2
public class UserPoolController {

    @Autowired
    UserPoolServiceImpl userPoolService;

    /**
     * 인력 풀 검색 Api
     *
     * @param userPoolPageReqDto
     */
    @PostMapping("/search")
    @ApiOperation(value = "필터를 기반으로 하여 원하는 유저 목록을 가져올 수 있는 Api")
    public ResponseEntity<? extends BasicResponse> searchUserPool(
            @RequestBody @ApiParam(value = "검색 필터 데이터", required = true) UserPoolPageReqDto userPoolPageReqDto
    ) {
        if (ObjectUtils.isEmpty(userPoolPageReqDto.getStudentNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("입력값이 정확하지 않습니다"));
        }

        UserPoolPageResDto oFilteredPage = userPoolService.findUsersByFilter(userPoolPageReqDto);

        if (CollectionUtils.isEmpty(oFilteredPage.getDataList())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 유저가 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<UserPoolPageResDto>(oFilteredPage));
    }

    /**
     * 인력풀 유저명 자동완성 Api
     *
     * @param userPoolNameReqDto
     */
    @PostMapping("/search/name")
    @ApiOperation(value = "사용자 검색시 이름 or 이메일 기반으로 자동완성 가능하게 하는 Api")
    public ResponseEntity<? extends BasicResponse> findUserBySimName(
            @RequestBody @ApiParam(value = "유저 목록 자동완성시 필요한 데이터", required = true) UserPoolNameReqDto userPoolNameReqDto
    ) {
        List<UserPoolNameResDto> oSimNameSet = userPoolService.findUsersBySimName(userPoolNameReqDto);

        if (CollectionUtils.isEmpty(oSimNameSet)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ErrorResponse("일치하는 유저가 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<List<UserPoolNameResDto>>(oSimNameSet));
    }

}
