package com.teamgu.api.service;

import com.teamgu.api.dto.req.UserPoolNameReqDto;
import com.teamgu.api.dto.req.UserPoolPageReqDto;
import com.teamgu.api.dto.res.UserPoolNameResDto;
import com.teamgu.api.dto.res.UserPoolPageResDto;
import com.teamgu.api.dto.res.UserPoolResDto;
import com.teamgu.database.repository.UserPoolRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("userPoolService")
@Log4j2
public class UserPoolServiceImpl implements UserPoolService {

    @Autowired
    UserPoolRepository userPoolRepository;

    @Override
    public UserPoolPageResDto findUsersByFilter(UserPoolPageReqDto userPoolPageReqDto) {
        List<Object[]> list = userPoolRepository.findUsersByFilter(userPoolPageReqDto);
        List<UserPoolResDto> retList = new ArrayList<>();

        int size = list.size();
        int totPageCnt = size / userPoolPageReqDto.getPageSize();
        int startIdx = userPoolPageReqDto.getPageNum() * userPoolPageReqDto.getPageSize();
        int endIdx = startIdx + userPoolPageReqDto.getPageSize();

        for (int i = startIdx; i < size && i < endIdx; i++) {
            Object[] elem = list.get(i);

            UserPoolResDto userPoolResDto = UserPoolResDto.builder().build();

            userPoolResDto.setId(Long.parseLong(elem[0].toString()));
            userPoolResDto.setTrackList(new ArrayList<>());
            userPoolResDto.setSkillList(new ArrayList<>());

            if (ObjectUtils.isNotEmpty(elem[1])) { //이름
                userPoolResDto.setName(elem[1].toString());
            }

            if (ObjectUtils.isNotEmpty(elem[2])) { //소개
                userPoolResDto.setIntroduce(elem[2].toString());
            }

            if (ObjectUtils.isNotEmpty(elem[3])) { //프로필 파일 서버측 이름
                userPoolResDto.setFileName(elem[3].toString());
            }

            if (ObjectUtils.isNotEmpty(elem[4])) { //프로필 확장자
                userPoolResDto.setExtension(elem[4].toString());
            }


            if (elem[5] != null) { //wish Track
                String[] tracks = elem[5].toString().split(",");
                for(String track : tracks) {
                    userPoolResDto.getTrackList().add(track);
                }
            }

            if (elem[6] != null) { //스킬 코드
                String[] skills = elem[6].toString().split(",");
                for(String skill : skills) {
                    userPoolResDto.getSkillList().add(skill);
                }
            }

            retList.add(userPoolResDto);
        }

        return UserPoolPageResDto.builder()
                .dataList(retList)
                .totPageCnt(totPageCnt).build();
    }

    @Override
    public List<UserPoolNameResDto> findUsersBySimName(UserPoolNameReqDto userPoolNameReqDto) {
        return userPoolRepository.findUsersBySimName(userPoolNameReqDto);
    }
}
