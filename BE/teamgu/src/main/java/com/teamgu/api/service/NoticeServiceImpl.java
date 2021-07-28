package com.teamgu.api.service;

import com.teamgu.api.dto.res.NoticeListResDto;
import com.teamgu.database.repository.NoticeRepository;
import com.teamgu.mapper.NoticeListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Page<NoticeListResDto> getNoticeList(Pageable pageable) {
        return noticeRepository.findAll(pageable).map(NoticeListMapper.INSTANCE::noticeToDto);
    }
}
