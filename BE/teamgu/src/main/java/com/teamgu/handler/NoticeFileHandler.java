package com.teamgu.handler;

import com.teamgu.api.dto.res.NoticeFileResDto;
import com.teamgu.common.util.DateTimeUtil;
import com.teamgu.common.util.MD5GenUtil;
import com.teamgu.database.entity.NoticeFile;
import com.teamgu.mapper.NoticeFileMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * 공지사항 첨부파일 I/O 핸들러 클래스
 */
@Log4j2
@Component
public class NoticeFileHandler {

    @Autowired
    MD5GenUtil md5GenUtil;

    @Autowired
    DateTimeUtil dateTimeUtil;

    private static final String serverUrl = "https://i5a202.p.ssafy.io:8080/api/file/display?url=notice/images/";

    public String parseNoticeImgInfo(MultipartFile multipartFile) {
        String retStr = null;

        if(!ObjectUtils.isEmpty(multipartFile)) {
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
            String path = "notice" + File.separator + "images";
            File file = new File(path);

            if(!file.exists()) {
                file.mkdirs();
            }

            try {
                String[] dotSplitArr = multipartFile.getOriginalFilename().split("\\.");
                int size = dotSplitArr.length;
                StringBuilder originalName = new StringBuilder();
                String extension = dotSplitArr[size - 1];

                for(int i = 0; i < size - 1; i++) {
                    originalName.append(dotSplitArr[i]).append(".");
                }

                originalName.setLength(originalName.length() - 1);

                String md5Name = new MD5GenUtil(originalName.toString()).toString();

                file = new File(absolutePath
                        + File.separator
                        + path
                        + File.separator
                        + md5Name
                        + "."
                        + extension);
                multipartFile.transferTo(file);

                retStr = serverUrl + md5Name + "." + extension;

                //파일 읽기쓰기 권한 세팅
                file.setWritable(true);
                file.setReadable(true);
            } catch (Exception e) {
                log.error("md5 변환 에러");
            }
        }

        return retStr;
    }

    /**
     * MD5, 날짜를 기반으로 MultiPartFile을 File로 전환 및 저장하는 함수
     * 첨부파일 업로드 Handler
     * @param multipartFiles
     * @return
     */
    public List<NoticeFile> parseNoticeFileInfo(List<MultipartFile> multipartFiles) {
        List<NoticeFile> fileList = new ArrayList<>();

        if (!CollectionUtils.isEmpty(multipartFiles)) { //생성할 파일 목록이 존재 하는 경우
            //파일 저장 디렉토리는 생성 날짜로
            String curDate = dateTimeUtil.getDate();

            //프로젝트 디렉토리 내에 저장하기 위한 절대 경로 설정
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
            //파일 저장할 세부 경로
            String path = "notice" + File.separator + curDate;
            File file = new File(path);

            //해당 디렉토리 존재 안하면
            if (!file.exists()) {
                file.mkdirs();
            }

            //파일 디렉토리의 날짜와는 다르게 DB에 저장될 날짜는 yyyy-MM-dd HH:mm:ss 이어야해서 다시 가져온다
            curDate = dateTimeUtil.getDateAndTime();

            try {
                for (MultipartFile multipartFile : multipartFiles) {

                    //파일명 비어있는 경우 없는거니까 처리 x
                    if(ObjectUtils.isEmpty(multipartFile.getOriginalFilename())) continue;

                    String[] dotSplitArr = multipartFile.getOriginalFilename().split("\\.");
                    int size = dotSplitArr.length;
                    StringBuilder originalName = new StringBuilder();
                    String extension = dotSplitArr[size - 1];

                    for(int i = 0; i < size - 1; i++) {
                        originalName.append(dotSplitArr[i]).append(".");
                    }

                    originalName.setLength(originalName.length() - 1);

                    String md5Name = new MD5GenUtil(originalName.toString()).toString();

                    //여기서 NoticeFileResDto를 만들고
                    //각각의 NoticeFileResDto를 Mapper를 통해 NoticeFile Entity로 변환
                    NoticeFile noticeFile = NoticeFileMapper.INSTANCE.dtoToNoticeFile(
                            NoticeFileResDto.builder()
                                    .originalName(originalName.toString())
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
                log.error("md5 변환 에러");
            }
        }

        return fileList;
    }
}
