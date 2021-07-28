package com.teamgu.api.service;

import com.teamgu.api.dto.res.NoticeListResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {
    Page<NoticeListResDto> getNoticeList(Pageable pageable);
}
