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
    public HashMap<String, List<CodeDetailResDto>> getUserCode() {
        HashMap<String, List<CodeDetailResDto>> retHash = initHash();
        List<CodeDetail> stgList = codeDetailRepository.getStgCodeDetail(),
                prjList = codeDetailRepository.getPrjCodeDetail(),
                trkList = codeDetailRepository.getTrkCodeDetail(),
                sklList = codeDetailRepository.getSklCodeDetail(),
                posList = codeDetailRepository.getPosCodeDetail(),
                regList = codeDetailRepository.getRegCodeDetail();

        for (CodeDetail elem : prjList) {
            retHash.get("프로젝트").add(CodeDetailMapper.INSTANCE.codeDetailToDto(elem));
        }
        for (CodeDetail elem : stgList) {
            retHash.get("기수").add(CodeDetailMapper.INSTANCE.codeDetailToDto(elem));
        }
        for (CodeDetail elem : trkList) {
            retHash.get("트랙").add(CodeDetailMapper.INSTANCE.codeDetailToDto(elem));
        }
        for (CodeDetail elem : sklList) {
            retHash.get("스킬").add(CodeDetailMapper.INSTANCE.codeDetailToDto(elem));
        }
        for (CodeDetail elem : posList) {
            retHash.get("역할").add(CodeDetailMapper.INSTANCE.codeDetailToDto(elem));
        }
        for (CodeDetail elem : regList) {
            retHash.get("지역").add(CodeDetailMapper.INSTANCE.codeDetailToDto(elem));
        }
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
