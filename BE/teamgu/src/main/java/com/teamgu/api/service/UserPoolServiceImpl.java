package com.teamgu.api.service;

import com.teamgu.api.dto.req.UserPoolReqDto;
import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.api.dto.res.UserPoolResDto;
import com.teamgu.database.repository.CodeDetailRepository;
import com.teamgu.database.repository.UserPoolRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@Service("userPoolService")
@Log4j2
public class UserPoolServiceImpl implements UserPoolService {

    @Autowired
    UserPoolRepository userPoolRepository;

    @Override
    public HashMap<Long, UserPoolResDto> findUsersByFilter(UserPoolReqDto userPoolReqDto) {
        List<Object[]> list = userPoolRepository.findUsersByFilter(userPoolReqDto);
        HashMap<String, String> codeHash = userPoolRepository.getCodeDetail();
        HashMap<Long, UserPoolResDto> retHash = new HashMap<>();

        for (Object[] elem : list) {
            long id = Long.parseLong(elem[0].toString());
            if (retHash.get(id) == null) {
                UserPoolResDto dto = UserPoolResDto.builder()
                        .name("")
                        .introduce("")
                        .fileName("")
                        .extension("")
                        .trackList(new HashSet<>())
                        .skillList(new HashSet<>()).build();

                if (ObjectUtils.isNotEmpty(elem[1])) {
                    dto.setName(elem[1].toString());
                }

                if (ObjectUtils.isNotEmpty(elem[2])) {
                    dto.setIntroduce(elem[2].toString());
                }

                if (ObjectUtils.isNotEmpty(elem[3])) {
                    dto.setFileName(elem[3].toString());
                }

                if (ObjectUtils.isNotEmpty(elem[4])) {
                    dto.setExtension(elem[4].toString());
                }

                retHash.put(id, dto);
            }

            if (elem[5] != null) {
                retHash.get(id).getTrackList().add(codeHash.get("TR" + elem[5]));
            }
            if (elem[6] != null) {
                retHash.get(id).getSkillList().add(codeHash.get("SK" + elem[6]));
            }
        }

        return retHash;
    }
}
