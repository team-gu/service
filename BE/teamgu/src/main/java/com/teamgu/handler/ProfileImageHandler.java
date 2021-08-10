package com.teamgu.handler;

import com.teamgu.api.dto.UserProfileImgDto;
import com.teamgu.api.dto.res.NoticeFileResDto;
import com.teamgu.common.util.DateTimeUtil;
import com.teamgu.common.util.MD5GenUtil;
import com.teamgu.database.entity.NoticeFile;
import com.teamgu.mapper.NoticeFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
/**
 * 유저 프로필 이미지 I/O 핸들러 클래스
 */
public class ProfileImageHandler {
    @Autowired
    MD5GenUtil md5GenUtil;

    @Autowired
    DateTimeUtil dateTimeUtil;

    /**
     * MD5, 날짜를 기반으로 MultiPartFile을 File로 전환 및 저장하는 함수
     *
     * @param multipartFile
     * @return
     */
    public UserProfileImgDto parseFileInfo(MultipartFile multipartFile) {
        UserProfileImgDto userProfileImgDto = UserProfileImgDto.builder().build();

        if (!ObjectUtils.isEmpty(multipartFile)) { //생성할 파일 목록이 존재 하는 경우
            //프로젝트 디렉토리 내에 저장하기 위한 절대 경로 설정
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

            //파일 저장할 세부 경로
            //파일 저장 디렉토리는 해당 유저의 email로 처리한다
            String path = "profile";
            File file = new File(path);

            //해당 디렉토리 존재 안하면
            if (!file.exists()) {
                file.mkdirs();
            }

            try {
                String[] dotSplitArr = multipartFile.getOriginalFilename().split("\\.");
                int size = dotSplitArr.length;
                StringBuilder originalName = new StringBuilder();
                String extension = dotSplitArr[size - 1];

                for (int i = 0; i < size - 1; i++) { //파일명에 '.' 있는 경우 처리
                    originalName.append(dotSplitArr[i]).append(".");
                }

                originalName.setLength(originalName.length() - 1); //마지막 '.' 삭제 처리

                String md5Name = new MD5GenUtil(originalName.toString()).toString(); //파일명 암호화

                //여기서 UserProfileImgDto 생성
                userProfileImgDto = UserProfileImgDto.builder()
                        .originName(originalName.toString())
                        .serverName(md5Name)
                        .extension(extension)
                        .build();

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

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        //Service Layer에서 변환된 파일정보를 토대로 User Table 업데이트
        return userProfileImgDto;
    }
}
