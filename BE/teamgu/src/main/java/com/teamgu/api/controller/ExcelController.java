package com.teamgu.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teamgu.api.dto.UserRegistDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.log4j.Log4j2;

@Api(value="엑셀 입출력", tags= {"Excel."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/excel")
@Log4j2
public class ExcelController {	
	@PostMapping("/read")
	@ApiOperation(value="엑셀 파일을 삽입하여 삽입된 유저의 목록을 반환한다. 유저를 직접 생성하진 않는다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "파일을 읽고 Dto화 성공"),
		@ApiResponse(code = 400, message = "잘못된 파일 형식 또는 잘못된 데이터",response = BaseResDto.class)
	})
	public ResponseEntity<? extends BasicResponse> excelToUsers(@RequestParam("excelFile") MultipartFile file){
		List<UserRegistDto> userRegistDtoList = new ArrayList<UserRegistDto>();
		String extension = FilenameUtils.getExtension(file.getOriginalFilename());
		
		//엑셀 파일 형식이 아닌 경우 에러
		if(!extension.equals("xlsx") && !extension.equals("xls")) {
			log.error("엑셀 파일 형식이 아닙니다");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("엑셀 파일 형식이 아닙니다."));
		}
		Workbook workbook = null;
		try {
			if(extension.equals("xlsx")) 
				workbook = new XSSFWorkbook(file.getInputStream());
			else
				workbook = new HSSFWorkbook(file.getInputStream());
		}
		catch(Exception e) {
			log.error("엑셀 파일 로딩 실패");
			e.printStackTrace();
		}
		
		Sheet worksheet = workbook.getSheetAt(0);
		
		//첫 행은 컬럼명이므로 제외
		for(int i = 1; i<worksheet.getPhysicalNumberOfRows();i++) {
			Row row = worksheet.getRow(i);
			String email;
			String name;
			String studentNumber;
			String stringMajor;
			long longMajor;
			try {
				email = row.getCell(0).getStringCellValue();
				name = row.getCell(1).getStringCellValue();
				studentNumber = row.getCell(2).getStringCellValue();
				stringMajor =  row.getCell(3).getStringCellValue();
				if(!stringMajor.equals("전공")&&!stringMajor.equals("비전공"))
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ErrorResponse(i+"번째 행 전공데이터는 반드시 전공 또는 비전공이라고 입력해 주세요."));
				longMajor = stringMajor.equals("전공")?1:2;//전공은 1, 비전공은 2
			}catch(Exception e) {
				//잘못된 데이터가 있다면 에러 반환
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ErrorResponse(i+"번째 행 데이터가 잘못되었습니다."));
			}
			UserRegistDto userRegistDto = UserRegistDto.builder()
												.email(email)
												.name(name)
												.studentNumber(studentNumber)
												.major(longMajor)
												.build();
			userRegistDtoList.add(userRegistDto);
		}
		return ResponseEntity.ok(new CommonResponse<List<UserRegistDto>>(userRegistDtoList));		
	}
}
