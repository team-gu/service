package com.teamgu.api.dto.req;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserPoolNameReqDto {
    private String target;
    private String studentNumber;
    private int projectCode;
}
