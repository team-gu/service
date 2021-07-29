package com.teamgu.api.service;

import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.api.dto.res.NoticeListResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface NoticeService {
    Page<NoticeListResDto> getNoticeList(Pageable pageable);
    NoticeDetailResDto getNoticeDetail(long id);
    boolean deleteNotice(long id);
}
