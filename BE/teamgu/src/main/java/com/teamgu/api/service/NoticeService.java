package com.teamgu.api.service;

import com.teamgu.api.dto.req.NoticeReqDto;
import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.api.dto.res.NoticeListResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;

public interface NoticeService {
    Page<NoticeListResDto> getNoticeList(Pageable pageable);

    NoticeDetailResDto getNoticeDetail(long id);

    HashMap<String, String> getPathOfFile(String fileServerName);

    boolean deleteNotice(long id);

    boolean createNotice(NoticeReqDto noticeReqDto);

    boolean updateNotice(long id, NoticeReqDto noticeReqDto);
}
