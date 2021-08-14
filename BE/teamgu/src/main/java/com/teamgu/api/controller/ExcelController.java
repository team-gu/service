package com.teamgu.api.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teamgu.api.dto.UserRegistDto;
import com.teamgu.api.dto.req.TeamWithUserToExcelReqDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.dto.res.HorizontalByTeamResDto;
import com.teamgu.api.dto.res.UserInfoByTeam;
import com.teamgu.api.service.TeamServiceImpl;

import io.jsonwebtoken.lang.Collections;
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
	@Autowired
	TeamServiceImpl teamService;
	
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
	

	@PostMapping("/export")
	@ApiOperation(value="기수-프로젝트도메인에 맞는 팀을 가로비 정렬하여 Excel파일로 export한다")
//	@ApiResponses({
//		@ApiResponse(code = 200, message = "파일을 읽고 Dto화 성공"),
//		@ApiResponse(code = 400, message = "잘못된 파일 형식 또는 잘못된 데이터",response = BaseResDto.class)
//	})
	public ResponseEntity<? extends BasicResponse> UsersByTeamsToExcel(@RequestBody TeamWithUserToExcelReqDto teamWithUserToExcelReqDto){
		//1. 엑셀파일로 만들 데이터들을 객체화한다.		
		int project_code = teamWithUserToExcelReqDto.getProject_code();
		int stage_code = teamWithUserToExcelReqDto.getStage_code();
		List<HorizontalByTeamResDto> results = teamService.getHorizontalByTeamInfo(project_code, stage_code);
		if(results.size()==0||results.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("결과 값이 존재하지 않습니다."));
		}
		
		//2. 컬럼 갯수를 파악하기 위해 최대 인원 구성 수를 파악한다
		int maxMembers = 0;
		for(int i =0;i<results.size();i++) {
			maxMembers = Integer.max(results.get(i).getMembers().size(),maxMembers);			
		}
		
		//3. 엑셀 파일의 초기 설정을 한다
		SXSSFWorkbook workbook = new SXSSFWorkbook();
		
		//시트생성
		SXSSFSheet sheet = workbook.createSheet("팀별 가로비");
		
		//시트 열 너비 설정
//		sheet.setColumnWidth(columnIndex, width);
		
		//헤더 행 생성
		Row headerRow = sheet.createRow(0);
		//해당 행의 열 셀 생성
		Cell headerCell =null;
		
		//공통 정보에 대한 헤더 생성
		String[] headers = {"기수","프로젝트","트랙"};
		for(int i=0;i<headers.length;i++) {
			headerCell = headerRow.createCell(i);
			headerCell.setCellValue(headers[i]);			
		}
		//멤버 정보에 대한 헤더 생성
		headerCell = headerRow.createCell(headers.length);
		headerCell.setCellValue("팀장");
		for(int i =headers.length+1;i<headers.length+maxMembers;i++) {			
			headerCell = headerRow.createCell(i);
			headerCell.setCellValue("팀원"+(i-headers.length));//팀원1, 팀원2 ,,,,
		}
		
		//4. 내용 행 및 셀 생성
		Row bodyRow = null;
		Cell bodyCell = null;
		for(int i =0;i<results.size();i++) {
			HorizontalByTeamResDto info = results.get(i);
			
			//행 생성
			bodyRow = sheet.createRow(i+1);//header 다음 줄부터
			
			//데이터 기수 표시
			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue(info.getStage_name());
			
			//데이터 프로젝트 도메인 표시
			bodyCell = bodyRow.createCell(1);
			bodyCell.setCellValue(info.getProject_name());
			
			//데이터 트랙 표시
			bodyCell = bodyRow.createCell(2);
			bodyCell.setCellValue(info.getTrack_name());
			
			//데이터 팀명 표시
			bodyCell = bodyRow.createCell(3);
			bodyCell.setCellValue(info.getName());
			
			//데이터 멤버 표시
			//우선 팀장을 가장 위로 정렬해준다(셀 맨 앞이 팀장이므로)
			info.getMembers().sort(new Comparator<UserInfoByTeam>() {
				@Override
				public int compare(UserInfoByTeam o1, UserInfoByTeam o2) {					
					if(o1.getRole().equals("팀장"))
						return -1;
					else return 0;
				}
			});
			for(int j=0;j<info.getMembers().size();j++) {
				UserInfoByTeam userInfo = info.getMembers().get(j); 
				bodyCell = bodyRow.createCell(j+4);
				//이름(학번) 형태로 기재
				bodyCell.setCellValue(userInfo.getName()+"("+userInfo.getStudentNumber()+")");				
			}
		}
		
		return  ResponseEntity.ok(new CommonResponse<SXSSFWorkbook>(workbook));
	}
		
}
