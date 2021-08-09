package com.teamgu.api.controller;

import com.teamgu.api.dto.req.UserPoolReqDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.dto.res.UserPoolResDto;
import com.teamgu.api.service.UserPoolServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
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
     * @param userPoolReqDto
     */
    @PostMapping("/search")
    @ApiOperation(value = "")
    public ResponseEntity<? extends BasicResponse> searchUserPool(
            @RequestBody @ApiParam(value = "검색 필터 데이터", required = true) UserPoolReqDto userPoolReqDto
    ) {
        List<UserPoolResDto> oFilteredList = userPoolService.findUsersByFilter(userPoolReqDto);

        if(CollectionUtils.isEmpty(oFilteredList)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 유저가 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<List<UserPoolResDto>>(oFilteredList));
    }
}
