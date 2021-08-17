package com.teamgu.api.controller;

import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.service.NoticeServiceImpl;
import com.teamgu.handler.NoticeFileHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

@Api(value = "File Download API", tags = {"File Download."})
@RestController
@RequestMapping("/api/file")
@Log4j2
public class StaticFileController {

    @Autowired
    NoticeFileHandler noticeFileHandler;

    @Autowired
    NoticeServiceImpl noticeService;

    @PostMapping("/upload")
    @ApiOperation(value = "")
    public ResponseEntity<? extends BasicResponse> uploadNoticeImage(
            @RequestBody @ApiParam(value = "공지사항 content에 넣을 이미지", required = true) MultipartFile multipartFile
    ) {
        String retStr = noticeFileHandler.parseNoticeImgInfo(multipartFile);

        if(StringUtils.isEmpty(retStr)) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("파일 업로드 실패"));
        }

        return ResponseEntity.ok(new CommonResponse<String>(retStr));
    }

    /**
     * 파일 다운로드 Api
     *
     * @param nfile
     */
    @GetMapping("/download")
    @ApiOperation(value = "")
    public ResponseEntity<Resource> downloadNoticeFile(
            @RequestParam @ApiParam(value = "파일 암호화 이름", required = true) String nfile
    ) {

        HashMap<String, String> urlInfo = noticeService.getPathOfFile(nfile); //체크섬 파일명을 가지고 파일의 절대경로와 원본 파일명을 가져온다

        try {
            File file = new File(urlInfo.get("path")); //파일 접근
            Resource rs = new UrlResource(file.toURI()); //Resources생성
            String oriName = URLEncoder.encode(urlInfo.get("oriFileName"), "UTF-8").replaceAll("\\+", "%20"); //한글 파일인 경우 인코딩 처리
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + oriName +"\""); //다운 받아지는 파일명 설정
            headers.set(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.length())); //파일 사이즈 설정
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString()); //바이너리 데이터로 받아오기 설정
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(rs);	//파일 넘기기
        } catch (Exception e ) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 이미지 보여주기 Api
     * img태그 url속성에서 사용
     *
     * @param url
     */
    @GetMapping("/display")
    @ApiOperation(value = "")
    public ResponseEntity<Resource> displayFile(
            @RequestParam @ApiParam(value = "자동완성 이름", required = true) String url
    ) {
        String path = new File("").getAbsolutePath() + File.separator + File.separator + url;
        Resource resource = new FileSystemResource(path);

        if(!resource.exists()) {
            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
        }

        HttpHeaders header = new HttpHeaders();
        Path filePath = null;

        try {
            filePath = Paths.get(path);
            header.add("Content-Type", Files.probeContentType(filePath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
}
