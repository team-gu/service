package com.teamgu.api.service;

import com.teamgu.api.dto.res.CodeDetailResDto;

import java.util.HashMap;
import java.util.List;

public interface CodeService {
    HashMap<String, List<CodeDetailResDto>> getUserCode();
}
