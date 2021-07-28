package com.teamgu.api.service;

import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.api.dto.res.NoticeListResDto;
import com.teamgu.database.repository.NoticeFileRepository;
import com.teamgu.database.repository.NoticeRepository;
import com.teamgu.mapper.NoticeDetailMapper;
import com.teamgu.mapper.NoticeListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    NoticeFileRepository noticeFileRepository;

    @Override //클라로부터 입력받은 Pageable 정보로 page 리턴
    public Page<NoticeListResDto> getNoticeList(Pageable pageable) {
        //Mapper를 이용하여 Entity -> DTO 매핑
        return noticeRepository.findAll(pageable).map(NoticeListMapper.INSTANCE::noticeToDto);
    }

    @Override //클라로부터 입력받은 공지사항 id로 조회
    public NoticeDetailResDto getNoticeDetail(long id) {
        //FindById는 Optional 객체를 리턴, dto로 매핑
        Optional<NoticeDetailResDto> notice = noticeRepository.findById(id).map(NoticeDetailMapper.INSTANCE::noticeToDto);

        //Optional이기에 null Exception처리 필요
        //Optional 사용방법 중 가장 클린 코드 방식이라고 한다
        return notice.orElse(null);
    }

    @Override
    @Transactional
    public boolean deleteNotice(long id) {
        boolean ret = noticeRepository.existsById(id);

        if(ret) {
            noticeRepository.deleteById(id);
        }

        return ret;
    }

}
