package com.teamgu.api.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommonResponse<T> extends BasicResponse {
    private int dataCount;
    private T data;

    public CommonResponse(T data) {
        this.data = data;
        if(data instanceof List) {
            this.dataCount = ((List<?>)data).size();
        } else {
            this.dataCount = 1;
        }
    }
}
