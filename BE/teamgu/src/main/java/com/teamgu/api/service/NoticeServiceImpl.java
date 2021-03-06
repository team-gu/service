package com.teamgu.api.service;

import com.teamgu.api.dto.req.NoticeReqDto;
import com.teamgu.api.dto.res.NoticeDetailResDto;
import com.teamgu.api.dto.res.NoticeFileResDto;
import com.teamgu.api.dto.res.NoticeListResDto;
import com.teamgu.common.util.DateTimeUtil;
import com.teamgu.database.entity.Notice;
import com.teamgu.database.entity.NoticeFile;
import com.teamgu.database.entity.User;
import com.teamgu.database.repository.NoticeFileRepository;
import com.teamgu.database.repository.NoticeRepository;
import com.teamgu.database.repository.UserRepository;
import com.teamgu.handler.NoticeFileHandler;
import com.teamgu.mapper.NoticeDetailMapper;
import com.teamgu.mapper.NoticeFileMapper;
import com.teamgu.mapper.NoticeListMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    DateTimeUtil dateTimeUtil;
    @Autowired
    NoticeRepository noticeRepository;
    @Autowired
    NoticeFileRepository noticeFileRepository;
    @Autowired
    NoticeFileHandler noticeFileHandler;

    @Override //클라로부터 입력받은 Pageable 정보로 page 리턴
    public Page<NoticeListResDto> getNoticeList(String title, Pageable pageable) {

        //Mapper를 이용하여 Entity -> DTO 매핑
        return noticeRepository.findByTitleContaining(title, pageable).map(NoticeListMapper.INSTANCE::noticeToDto);
//        return noticeRepository.findAll(pageable);
    }

    @Override //클라로부터 입력받은 공지사항 id로 조회
    public NoticeDetailResDto getNoticeDetail(long id) {
        //FindById는 Optional 객체를 리턴, dto로 매핑
        Optional<NoticeDetailResDto> notice = noticeRepository.findById(id).map(NoticeDetailMapper.INSTANCE::noticeToDto);

        //Optional이기에 null Exception처리 필요
        //Optional 사용방법 중 가장 클린 코드 방식이라고 한다
        return notice.orElse(null);
    }

    @Override //파일의 원본명과 실제 저장된 경로를 HashMap으로 리턴
    public HashMap<String, String> getPathOfFile(String fileServerName) {
        HashMap<String, String> retHash = new HashMap<>();
        NoticeFileResDto noticeFileDto = NoticeFileMapper.INSTANCE.noticeFileToDto(noticeFileRepository.findByCheckSumName(fileServerName));
        StringBuilder path = new StringBuilder();

        if(ObjectUtils.isEmpty(noticeFileDto)) {
            return null;
        }

        path.append(new File("").getAbsolutePath() + File.separator + File.separator)
                .append("notice")
                .append(File.separator)
                .append(noticeFileDto.getRegistDate())
                .append(File.separator)
                .append(noticeFileDto.getName())
                .append('.')
                .append(noticeFileDto.getExtension());

        retHash.put("path", path.toString());
        retHash.put("oriFileName", noticeFileDto.getOriginalName() + '.' + noticeFileDto.getExtension());

        return retHash;
    }

    @Override
    @Transactional
    public boolean deleteNotice(long id) {
        boolean ret = noticeRepository.existsById(id);

        if (ret) {
            noticeRepository.deleteById(id);
        }

        return ret;
    }

    @Override
    @Transactional
    public boolean createNotice(NoticeReqDto noticeReqDto) {
        String curDate = dateTimeUtil.getDateAndTime();
        User user = userRepository.getOne(noticeReqDto.getUserId());
        List<NoticeFile> fileList = noticeFileHandler.parseNoticeFileInfo(noticeReqDto.getNoticeFiles());
        Notice notice = NoticeDetailMapper.INSTANCE.dtoToNotice(
                NoticeDetailResDto.builder()
                        .title(noticeReqDto.getTitle())
                        .content(noticeReqDto.getContent())
                        .createDate(curDate)
                        .modifyDate(curDate)
                        .build());

        notice.setUser(user);
        for (NoticeFile noticeFile : fileList) {
            notice.addFile(noticeFile);
        }

        return noticeRepository.save(notice) != null;
    }

    @Override
    public boolean updateNotice(long id, NoticeReqDto noticeReqDto) {
        Optional<Notice> oNotice = noticeRepository.findById(id);
        List<NoticeFile> fileList = new ArrayList<>();
        List<MultipartFile> newFileList = new ArrayList<>();

        if(!CollectionUtils.isEmpty(noticeReqDto.getNoticeFiles())) {
            for(MultipartFile multipartFile : noticeReqDto.getNoticeFiles()) {
                String fileName = multipartFile
                        .getOriginalFilename()
                        .split("\\.")[0];

                NoticeFile noticeFile = noticeFileRepository.findByOriginName(fileName);

                if (noticeFile != null) {
                    fileList.add(noticeFile);
                } else {
                    newFileList.add(multipartFile);
                }
            }
        }

        fileList.addAll(noticeFileHandler.parseNoticeFileInfo(newFileList));

        if(oNotice.isPresent()) {
            Notice notice = oNotice.get();

            notice.setTitle(noticeReqDto.getTitle());
            notice.setContent(noticeReqDto.getContent());
            notice.getNoticeFiles().clear();

            for (NoticeFile noticeFile : fileList) {
                notice.addFile(noticeFile);
            }

            return noticeRepository.save(notice) != null;
        }

        return false;
    }

}
