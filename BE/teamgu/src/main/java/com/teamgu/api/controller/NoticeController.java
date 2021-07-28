package com.teamgu.api.controller;

import com.teamgu.api.dto.res.NoticeListResDto;
import com.teamgu.api.service.NoticeServiceImpl;
import com.teamgu.database.entity.Notice;
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
    @ApiOperation(value = "공지사항 목록 가져오기", notes = "공지사항 목록에 대한 pagination 정보를 리턴")
    public Page<NoticeListResDto> getNoticeList(Pageable pageable) {
        return noticeService.getNoticeList(pageable);
    }
}
