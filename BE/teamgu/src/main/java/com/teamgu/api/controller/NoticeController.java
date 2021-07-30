package com.teamgu.api.controller;

import com.teamgu.api.dto.req.NoticeReqDto;
import com.teamgu.api.dto.res.*;
import com.teamgu.api.service.NoticeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "공지사항 API", tags = {"Notice."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeServiceImpl noticeService;

    @GetMapping //공지사항 목록 가져오기
    @ApiOperation(value = "공지사항 목록 가져오기", notes = "공지사항 목록에 대한 pagination 정보를 반환")
    public ResponseEntity<? extends BasicResponse> getNoticeList(Pageable pageable) {
        return ResponseEntity.ok(new CommonResponse<Page<NoticeListResDto>>(noticeService.getNoticeList(pageable)));
    }

    @GetMapping("/{id}") //특정 공지사항의 id를 기반으로 세부정보 조회, 공지사항 목록에서 선택하게끔 되는 로직이기에 null을 리턴할 수 없다 => 즉 ok status만 리턴
    @ApiOperation(value = "공지사항 세부내용 가져오기", notes = "선택한 공지사항에 대해 세부 정보를 반환")
    public ResponseEntity<? extends BasicResponse> getNoticeDetail(
            @PathVariable @ApiParam(value = "공지사항의 id", required = true) long id) {

        NoticeDetailResDto oNoticeDetail = noticeService.getNoticeDetail(id);

        if (oNoticeDetail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 공지사항이 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<NoticeDetailResDto>(oNoticeDetail));

    }

    @DeleteMapping("/{id}") //특정 공지사항 id 기반으로 삭제
    @ApiOperation(value = "공지사항 삭제하기", notes = "특정 공지사항 지우고 성공 여부 리턴")
    public ResponseEntity<? extends BasicResponse> deleteNotice(
            @PathVariable @ApiParam(value = "공지사항의 id", required = true) long id) {

        if (!noticeService.deleteNotice(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 공지사항이 없습니다."));
        }

        return ResponseEntity.noContent().build(); //제대로 삭제되었으면 그냥 빈 객체 리턴

    }

    @PostMapping //공지사항 등록
    @ApiOperation(value = "공지사항 등록하기", notes = "NoticeReqDto 형태로 입력이 들어와 성공 여부 리턴")
    public ResponseEntity<? extends BasicResponse> createNotice(
            @ApiParam(value = "공지사항 VO", required = true) NoticeReqDto noticeReqDto) {

        if (!noticeService.createNotice(noticeReqDto)) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("공지사항 등록에 실패하였습니다."));
        }

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    @ApiOperation(value = "공지사항 수정하기", notes = "수정할 공지사항의 id, NoticeReqDto 형태로 입력이 들어와 성공 여부 리턴")
    public ResponseEntity<? extends BasicResponse> updateNotice(
            @PathVariable @ApiParam(value = "공지사항 id", required = true) long id,
            @ApiParam(value = "공지사항 VO", required = true) NoticeReqDto noticeReqDto
    ) {
        if(!noticeService.updateNotice(id, noticeReqDto)) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("공지사항 수정에 실패하였습니다."));
        }

        return ResponseEntity.noContent().build();
    }
}
