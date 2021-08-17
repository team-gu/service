package com.teamgu.api.service;

import com.teamgu.api.dto.res.CodeDetailResDto;

import java.util.HashMap;
import java.util.List;

public interface CodeService {
    HashMap<String, List<CodeDetailResDto>> getUserCode(String studentNumber);
    HashMap<String, List<CodeDetailResDto>> getTrackCode(String studentNumber, int projectCode);
}
