package com.teamgu.api.dto.res;

import org.springframework.http.HttpStatus;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BaseResDto {
	@ApiModelProperty(name="응답 메시지", example = "정상")
	String message = null;
	@ApiModelProperty(name="응답 코드", example = "200")
	int statusCode = 0;
	
	public BaseResDto() {}
	
	public BaseResDto(Integer statusCode){
		this.statusCode = statusCode;
	}
	
	public BaseResDto(int statusCode, String message){
		this.statusCode = statusCode;
		this.message = message;
	}
}
