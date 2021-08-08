package com.teamgu.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@Api(value = "File Download API", tags = {"File Download."})
@RestController
@RequestMapping("/api/files")
@Log4j2
public class FileDownladController {
    /**
     * 파일 다운로드 Api
     *
     * @param url
     */
    @GetMapping()
    @ApiOperation(value = "")
    public ResponseEntity<Resource> downloadFile(
            @RequestParam @ApiParam(value = "자동완성 이름", required = true) String url
    ) {
        try {
            String filePath = new File("").getAbsolutePath() + File.separator + File.separator + url;
            File file = new File(filePath);
            Resource rs = new UrlResource(file.toURI());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=" + rs.getFilename())	//다운 받아지는 파일 명 설정
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.length()))	//파일 사이즈 설정
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString())	//바이너리 데이터로 받아오기 설정
                    .body(rs);	//파일 넘기기
        } catch (Exception e ) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
