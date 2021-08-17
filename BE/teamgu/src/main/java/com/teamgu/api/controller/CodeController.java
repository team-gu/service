package com.teamgu.api.controller;

import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.service.CodeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Api(value = "코드 API", tags = {"CodeDetail."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/codeDetail")
@Log4j2
public class CodeController {

    @Autowired
    CodeServiceImpl codeService;

    /**
     * 초기에 인력풀에서 필터를 init 하기 위한 end point
     *
     * @param studentNumber
     * @return
     */
    @GetMapping("/user/{studentNumber}")
    @ApiOperation(value = "인력 풀 필터에 사용될 코드 반환", notes = "인력 풀 컴포넌트에 들어갈 코드들의 세부 내용을 json으로 반환한다")
    public ResponseEntity<? extends BasicResponse> getUserCodeDetail(
            @PathVariable("studentNumber") @ApiParam(value = "유저의 학번", required = true) String studentNumber
    ) {
        HashMap<String, List<CodeDetailResDto>> oCodeDetail = codeService.getUserCode(studentNumber);

        if(oCodeDetail == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ErrorResponse("필터 데이터가 없습니다."));
        }

        return ResponseEntity.ok(new CommonResponse<HashMap<String, List<CodeDetailResDto>>>(oCodeDetail));
    }

    /**
     * 프로젝트 코드 선택할때마다 트랙 필터를 init하기 위한 end point
     *
     * @param studentNumber
     * @param projectCode
     * @return
     */
    @GetMapping("/user/trackList")
    @ApiOperation(value = "인력 풀 필터에 사용되는 트랙 리스트 반환", notes = "선택되는 프로젝트 코드와 유저의 학번을 토대로 선택 가능한 트랙 코드들을 json으로 반환한다")
    public ResponseEntity<? extends BasicResponse> getUserTrackCodeDetail(
            @RequestParam @ApiParam(value = "유저의 학번", required = true) String studentNumber,
            @RequestParam @ApiParam(value = "선택된 프로젝트 코드", required = true) int projectCode
    ) {
        HashMap<String, List<CodeDetailResDto>> oCodeDetail = codeService.getTrackCode(studentNumber, projectCode);

        if(CollectionUtils.isEmpty(oCodeDetail)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ErrorResponse("트랙 리스트가 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<HashMap<String, List<CodeDetailResDto>>>(oCodeDetail));
    }
}
