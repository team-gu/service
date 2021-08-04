package com.teamgu.api.controller;

import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.service.CodeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/user")
    @ApiOperation(value = "인력 풀 필터에 사용될 코드 반환", notes = "인력 풀 컴포넌트에 들어갈 코드들의 세부 내용을 json으로 반환한다")
    public ResponseEntity<? extends BasicResponse> getUserCodeDetail() {
        HashMap<String, List<CodeDetailResDto>> oCodeDetail = codeService.getUserCode();

        if(oCodeDetail == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("서버 오류"));
        }

        return ResponseEntity.ok(new CommonResponse<HashMap<String, List<CodeDetailResDto>>>(oCodeDetail));
    }
}
