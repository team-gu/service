package com.teamgu.handler;

import com.teamgu.api.dto.res.NoticeFileResDto;
import com.teamgu.common.util.DateTimeUtil;
import com.teamgu.common.util.MD5GenUtil;
import com.teamgu.database.entity.NoticeFile;
import com.teamgu.mapper.NoticeFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
/**
 * 첨부파일 I/O 핸들러 클래스
 */
public class NoticeFileHandler {

    @Autowired
    MD5GenUtil md5GenUtil;

    @Autowired
    DateTimeUtil dateTimeUtil;

    /**
     * MD5, 날짜를 기반으로 MultiPartFile을 File로 전환 및 저장하는 함수
     *
     * @param multipartFiles
     * @return
     */
    public List<NoticeFile> parseFileInfo(List<MultipartFile> multipartFiles) {
        List<NoticeFile> fileList = new ArrayList<>();

        if (!CollectionUtils.isEmpty(multipartFiles)) { //생성할 파일 목록이 존재 하는 경우
            //파일 저장 디렉토리는 생성 날짜로
            String curDate = dateTimeUtil.getDate();

            //프로젝트 디렉토리 내에 저장하기 위한 절대 경로 설정
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
            //파일 저장할 세부 경로
            String path = "images" + File.separator + curDate;
            File file = new File(path);

            //해당 디렉토리 존재 안하면
            if (!file.exists()) {
                file.mkdirs();
            }

            //파일 디렉토리의 날짜와는 다르게 DB에 저장될 날짜는 yyyy-MM-dd HH:mm:ss 이어야해서 다시 가져온다
            curDate = dateTimeUtil.getDateAndTime();

            try {
                for (MultipartFile multipartFile : multipartFiles) {
                    String[] dotSplitArr = multipartFile.getOriginalFilename().split("\\.");
                    int size = dotSplitArr.length;
                    String originalName = "";
                    String extension = dotSplitArr[size - 1];
                    String md5Name = new MD5GenUtil(originalName).toString();

                    for(int i = 0; i < size - 1; i++) {
                        originalName += (dotSplitArr[i] + ("."));
                    }

                    //여기서 NoticeFileResDto를 만들고
                    //각각의 NoticeFileResDto를 Mapper를 통해 NoticeFile Entity로 변환
                    NoticeFile noticeFile = NoticeFileMapper.INSTANCE.dtoToNoticeFile(
                            NoticeFileResDto.builder()
                                    .originalName(originalName)
                                    .extension(extension)
                                    .name(md5Name)
                                    .registDate(curDate)
                                    .build());

                    fileList.add(noticeFile);

                    //업로드 한 파일 데이터를 지정한 경로(절대)에 저장
                    file = new File(absolutePath
                            + File.separator
                            + path
                            + File.separator
                            + md5Name
                            + "."
                            + extension);
                    multipartFile.transferTo(file);

                    //파일 읽기쓰기 권한 세팅
                    file.setWritable(true);
                    file.setReadable(true);

                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return fileList;
    }
}
