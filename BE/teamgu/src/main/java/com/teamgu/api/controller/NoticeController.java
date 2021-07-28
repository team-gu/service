package com.teamgu.api.controller;

import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.api.dto.res.NoticeListResDto;
import com.teamgu.api.service.NoticeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "공지사항 API", tags = {"Notice."})
@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeServiceImpl noticeService;

    @GetMapping //공지사항 목록 가져오기
    @ApiOperation(value = "공지사항 목록 가져오기", notes = "공지사항 목록에 대한 pagination 정보를 반환")
    public Page<NoticeListResDto> getNoticeList(Pageable pageable) {
        return noticeService.getNoticeList(pageable);
    }

    @GetMapping("/{id}") //특정 공지사항의 id를 기반으로 세부정보 조회, 공지사항 목록에서 선택하게끔 되는 로직이기에 null을 리턴할 수 없다 => 즉 ok status만 리턴
    @ApiOperation(value = "공지사항 세부내용 가져오기", notes = "선택한 공지사항에 대해 세부 정보를 반환")
    public ResponseEntity<NoticeDetailResDto> getNoticeDetail(@PathVariable @ApiParam(value = "공지사항의 id", required = true) int id) {
        return ResponseEntity.ok(noticeService.getNoticeDetail(id));
    }
}
