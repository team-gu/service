package com.teamgu.api.dto.req;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Setter
@ApiModel(description = "사용자 정보 요청 모델")
public class UserInfoReqDto {
	
	@ApiModelProperty(name = "user index", example = "1")
	Long id;
	
	@ApiModelProperty(name = "user email", example = "idea@naver.com")
	String email;

	@ApiModelProperty(name = "studentNumber", example = "0546419")
	String studentNumber;
	
	@ApiModelProperty(name = "wishPosition", example = "Front")
	String wishPosition;
	
	@ApiModelProperty(name = "wishTrack", example = "[\"웹 기술\", \"웹 디자인\"]")
	List<String> wishTracks;
	
	@ApiModelProperty(name = "introduce", example = "안녕하세요! 할말이 없어요!")
	String introduce;
	
	@ApiModelProperty(name = "skill", example = "[\"C\", \"Java\"]")
	List<String> skills;

	@ApiModelProperty(name = "profile image")
	MultipartFile profileImage;
	
}
