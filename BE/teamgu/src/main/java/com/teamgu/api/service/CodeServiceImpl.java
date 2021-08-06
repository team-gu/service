package com.teamgu.api.service;

import com.teamgu.api.dto.res.CodeDetailResDto;
import com.teamgu.database.entity.CodeDetail;
import com.teamgu.database.repository.CodeDetailRepository;
import com.teamgu.mapper.CodeDetailMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service("codeService")
@Log4j2
public class CodeServiceImpl implements CodeService {

    @Autowired
    CodeDetailRepository codeDetailRepository;

    @Override
    public HashMap<String, List<CodeDetailResDto>> getUserCode(String studentNumber) {
        String stage = studentNumber.substring(0, 2);
        HashMap<String, List<CodeDetailResDto>> retHash = initHash();
        List<CodeDetailResDto> stgList = codeDetailRepository.getStgCodeDetail(),
                prjList = codeDetailRepository.getPrjCodeDetail(),
                trkList = codeDetailRepository.getTrkCodeDetail(stage),
                sklList = codeDetailRepository.getSklCodeDetail(),
                posList = codeDetailRepository.getPosCodeDetail(),
                regList = codeDetailRepository.getRegCodeDetail();

        retHash.put("프로젝트", prjList);
        retHash.put("기수", stgList);
        retHash.put("트랙", trkList);
        retHash.put("스킬", sklList);
        retHash.put("역할", posList);
        retHash.put("지역", regList);

        return retHash;
    }

    private HashMap<String, List<CodeDetailResDto>> initHash() {
        HashMap<String, List<CodeDetailResDto>> retHash = new HashMap<>();

        retHash.put("프로젝트", new ArrayList<>());
        retHash.put("지역", new ArrayList<>());
        retHash.put("역할", new ArrayList<>());
        retHash.put("트랙", new ArrayList<>());
        retHash.put("스킬", new ArrayList<>());
        retHash.put("기수", new ArrayList<>());
        retHash.put("전공/비전공", new ArrayList<>());

        retHash.get("전공/비전공").add(CodeDetailResDto.builder()
                .codeName("전공")
                .code(1)
                .build()
        );

        retHash.get("전공/비전공").add(CodeDetailResDto.builder()
                .codeName("비전공")
                .code(2)
                .build()
        );

        return retHash;
    }
}
