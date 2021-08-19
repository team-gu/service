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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@Api(value = "공지사항 API", tags = {"Notice."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeServiceImpl noticeService;

    /**
     * 공지사항 목록 Api
     *
     * @param title
     * @param pageable
     * @return ResponseEntity
     */
    @GetMapping
    @ApiOperation(value = "공지사항 목록 가져오기", notes = "공지사항 목록에 대한 pagination 정보를 반환")
    public ResponseEntity<? extends BasicResponse> getNoticeList(
            Pageable pageable,
            @RequestParam @ApiParam(value = "검색할 공지사항의 제목", required = false) String title
    ) {

        return ResponseEntity.ok(new CommonResponse<Page<NoticeListResDto>>(noticeService.getNoticeList(title, pageable)));
    }

    /**
     * 공지사항 세부정보 Api
     * 공지사항 목록에서 선택하게끔 되는 로직이기에 not Nullable => ok status만 리턴
     *
     * @param id
     * @return ResponseEntity
     */
    @GetMapping("/{id}")
    @ApiOperation(value = "공지사항 세부내용 가져오기", notes = "선택한 공지사항에 대해 세부 정보를 반환")
    public ResponseEntity<? extends BasicResponse> getNoticeDetail(
            @PathVariable @ApiParam(value = "공지사항의 id", required = true) long id
    ) {

        NoticeDetailResDto oNoticeDetail = noticeService.getNoticeDetail(id);

        if (oNoticeDetail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 공지사항이 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<NoticeDetailResDto>(oNoticeDetail));
    }

    /**
     * 공지사항 삭제 Api
     * 존재하지 않을 경우 404오류와 문구 리턴
     * 제대로 삭제된 경우 빈 Content를 리턴한다
     *
     * @param id
     * @return ResponseEntity
     */
    @DeleteMapping("/{id}")
    @ApiOperation(value = "공지사항 삭제하기", notes = "특정 공지사항 지우고 성공 여부 리턴")
    public ResponseEntity<? extends BasicResponse> deleteNotice(
            @PathVariable @ApiParam(value = "공지사항의 id", required = true) long id
    ) {

        if (!noticeService.deleteNotice(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("일치하는 공지사항이 없습니다."));
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * 공지사항 등록 Api
     * 생성 오류시 408오류와 문구 리턴
     * 성공일 경우 빈 Content 리턴
     *
     * @param noticeReqDto
     * @return ResponseEntity
     */
    @PostMapping
    @ApiOperation(value = "공지사항 등록하기", notes = "NoticeReqDto 형태로 입력이 들어와 성공 여부 리턴")
    public ResponseEntity<? extends BasicResponse> createNotice(
            @ApiParam(value = "공지사항 VO", required = true) NoticeReqDto noticeReqDto
    ) {

        if (!noticeService.createNotice(noticeReqDto)) {
            return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                    .body(new ErrorResponse("공지사항 등록에 실패하였습니다."));
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * 공지사항 수정 Api
     * 수정 오류시 408오류와 문구 리턴
     * 성공일 경우 빈 Content 리턴
     *
     * @param id
     * @param noticeReqDto
     * @return ResponseEntity
     */
    @PatchMapping("/{id}")
    @ApiOperation(value = "공지사항 수정하기", notes = "수정할 공지사항의 id, NoticeReqDto 형태로 입력이 들어와 성공 여부 리턴")
    public ResponseEntity<? extends BasicResponse> updateNotice(
            @PathVariable @ApiParam(value = "공지사항 id", required = true) long id,
            @ApiParam(value = "공지사항 VO", required = true) NoticeReqDto noticeReqDto
    ) {
        if (!noticeService.updateNotice(id, noticeReqDto)) {
            return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                    .body(new ErrorResponse("공지사항 수정에 실패하였습니다."));
        }

        return ResponseEntity.noContent().build();
    }
}
