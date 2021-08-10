package com.teamgu.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileImgDto {
    private String originName;
    private String serverName;
    private String extension;
}
