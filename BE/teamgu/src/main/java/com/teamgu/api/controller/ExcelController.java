package com.teamgu.api.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
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
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teamgu.api.dto.UserRegistDto;
import com.teamgu.api.dto.req.TeamWithUserToExcelReqDto;
import com.teamgu.api.dto.req.UserProjectExcelReqDto;
import com.teamgu.api.dto.res.BaseResDto;
import com.teamgu.api.dto.res.BasicResponse;
import com.teamgu.api.dto.res.CommonResponse;
import com.teamgu.api.dto.res.ErrorResponse;
import com.teamgu.api.dto.res.HorizontalByTeamResDto;
import com.teamgu.api.dto.res.UserInfoByTeam;
import com.teamgu.api.dto.res.VerticalByUserResDto;
import com.teamgu.api.service.AdminServiceImpl;
import com.teamgu.api.service.ExcelServiceImpl;
import com.teamgu.api.service.TeamServiceImpl;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.database.entity.User;

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
	
	@Autowired
	UserServiceImpl userService;
	
	@Autowired
	ExcelServiceImpl excelService;
	
	@Autowired
	AdminServiceImpl adminService;
	
	@PostMapping("/user/insert")
	@ApiOperation(value="엑셀 파일을 삽입하여 삽입된 유저의 목록을 회원 가입시킨다")
	@ApiResponses({
		@ApiResponse(code = 200, message = "파일을 읽고 Dto화 성공. 그리고 유저 추가 성공"),
		@ApiResponse(code = 400, message = "잘못된 파일 형식 또는 잘못된 데이터 또는 유저의 가입 실패",response = BaseResDto.class)
	})
	public ResponseEntity<? extends BasicResponse> excelToUsers(@RequestParam("excelFile") MultipartFile file){
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
		List<User> users = new ArrayList<User>();
		
		//첫 행은 컬럼명이므로 제외
		for(int i = 1; i<worksheet.getPhysicalNumberOfRows();i++) {
			Row row = worksheet.getRow(i);
			String email;
			String name;
			String studentNumber;
			String stringMajor;
			int intMajor;
			try {
				email = row.getCell(0).getStringCellValue();
				name = row.getCell(1).getStringCellValue();
				studentNumber = row.getCell(2).getStringCellValue();
				stringMajor =  row.getCell(3).getStringCellValue();
				if(!stringMajor.equals("전공")&&!stringMajor.equals("비전공"))
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ErrorResponse(i+"번째 행 전공데이터는 반드시 전공 또는 비전공이라고 입력해 주세요."));
				intMajor = stringMajor.equals("전공")?1:2;//전공은 1, 비전공은 2
			}catch(Exception e) {
				//잘못된 데이터가 있다면 에러 반환
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ErrorResponse(i+"번째 행 데이터가 잘못되었습니다."));
			}	
    		String password = studentNumber;//초기 패스워드는 email과 동일하게 설정
    		short role = 1;
    		User user = User.builder()
    				.email(email)
    				.password(password)//초기패스워드는 본인의 학번
    				.name(name)
    				.role(role)
    				.major((short)intMajor)
    				.profileExtension("png")
    				.profileServerName("c21f969b5f03d33d43e04f8f136e7682")
    				.profileOriginName("default")
    				.studentNumber(studentNumber)
    				.build();
    		users.add(user);
		}
		
		if(users.size()==0)//user가 없는 경우
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("가입을 요청한 유저 데이터가 없습니다"));
    	
        if (userService.saveAll(users))
            return ResponseEntity.ok(new CommonResponse<String>("회원 등록 성공"));
        else
            return ResponseEntity.status(500).body(new CommonResponse<String>("회원 등록 실패"));
	}
	

	@PostMapping("/team/export")
	@ApiOperation(value="기수-프로젝트도메인에 맞는 팀을 가로비 정렬하여 Excel파일로 export한다")
//	@ApiResponses({
//		@ApiResponse(code = 200, message = "파일을 읽고 Dto화 성공"),
//		@ApiResponse(code = 400, message = "잘못된 파일 형식 또는 잘못된 데이터",response = BaseResDto.class)
//	})
	public ResponseEntity<? extends BasicResponse> UsersByTeamsToExcel(@RequestBody TeamWithUserToExcelReqDto teamWithUserToExcelReqDto){
		log.info("Excel export");
		//1. 엑셀파일로 만들 데이터들을 객체화한다.		
		int project_code = teamWithUserToExcelReqDto.getProject_code();
		int stage_code = teamWithUserToExcelReqDto.getStage_code();
		List<HorizontalByTeamResDto> results = teamService.getHorizontalByTeamInfo(project_code, stage_code);
		if(results.size()==0||results.isEmpty()) {
			log.error("empty dto");
			return ResponseEntity.noContent().build();
		}
		try {
			String base64res = excelService.createExcelToTeam(results);			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add("Content-Disposition", "attachment; filename=test.xlsx");
			return ResponseEntity.ok(new CommonResponse<String>(base64res));
		} catch (IOException e) {
			log.error("엑셀 파일 Export 실패");
			e.printStackTrace();
		}
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/user/export")
	@ApiOperation(value="기수-프로젝트도메인에 맞는 유저를 세로비 정렬하여 Excel파일로 export한다")
//	@ApiResponses({
//		@ApiResponse(code = 200, message = "파일을 읽고 Dto화 성공"),
//		@ApiResponse(code = 400, message = "잘못된 파일 형식 또는 잘못된 데이터",response = BaseResDto.class)
//	})
	public ResponseEntity<? extends BasicResponse> UsersByTeamVerticalToExcel(@RequestBody TeamWithUserToExcelReqDto teamWithUserToExcelReqDto){
		log.info("Excel export");
		//1. 엑셀파일로 만들 데이터들을 객체화한다.		
		int project_code = teamWithUserToExcelReqDto.getProject_code();
		int stage_code = teamWithUserToExcelReqDto.getStage_code();
		List<VerticalByUserResDto> results = teamService.getVerticalByUserInfo(project_code, stage_code);
		if(results.size()==0||results.isEmpty()) {
			log.error("empty dto");
			return ResponseEntity.noContent().build();
		}
		try {
			String base64res = excelService.createExcelToUser(results);			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add("Content-Disposition", "attachment; filename=test.xlsx");
			return ResponseEntity.ok(new CommonResponse<String>(base64res));
		} catch (IOException e) {
			log.error("엑셀 파일 Export 실패");
			e.printStackTrace();
		}
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/userproject/insert")
	@ApiOperation(value="엑셀 파일을 삽입하여 삽입된 유저의 목록을 특정 프로젝트에 추가한다")
	@ApiResponses({
		@ApiResponse(code = 200, message = "파일을 읽고 Dto화 성공. 그리고 유저 추가 성공"),
		@ApiResponse(code = 400, message = "잘못된 파일 형식 또는 잘못된 데이터 또는 유저의 추가 실패"),
		@ApiResponse(code = 500, message = "이미 프로젝트에 존재하는 유저의 목록(실패한 유저의 이메일)을 반환한다")
	})
	public ResponseEntity<? extends BasicResponse> excelToUsersProject(@RequestPart(value="project_id") Long project_id, @RequestPart(value="file") MultipartFile file){
		log.info("입력된 project_id : "+project_id);
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
		
		//1. 이메일로 userId를 가져온다
		List<Long> userids = new ArrayList<Long>();
		List<String> emails = new ArrayList<String>();
		//첫 행은 컬럼명이므로 제외
		log.info("줄 갯수 : "+worksheet.getPhysicalNumberOfRows());
		for(int i = 1; i<worksheet.getPhysicalNumberOfRows();i++) {
			Row row = worksheet.getRow(i);
			String email;
			try {
				email = row.getCell(0).getStringCellValue();
				if(email.isEmpty()||email.equals("")) {
					log.error("공백 문자가 들어왔습니다");
					break;
				}
				
				emails.add(email);
			}catch(Exception e) {
				//잘못된 데이터가 있다면 에러 반환
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ErrorResponse(i+"번째 행 데이터가 잘못되었습니다."));
			}	
			log.info("엑셀에서 추출한 이메일 데이터 : "+email);
		}
		
		// get userid by email
		for(int i = 0;i<emails.size();i++) {			
			log.info("email존재 userService 체크 : "+emails.get(i));
			User user = userService.getUserByEmail(emails.get(i)).get();
			userids.add(user.getId());
		}
		
		List<String> errorEmails = new ArrayList<String>();//에러 발생한 이메일
		for(int i = 0;i<userids.size();i++) {
			if(adminService.checkUserProjectDetail(userids.get(i), project_id)) { // User가 이 프로젝트에 존재하지 않으면
				adminService.addStudentToProject(userids.get(i), project_id);	
			}else {
				errorEmails.add(emails.get(i));
			}
		}
		
        if (errorEmails.size()==0)
            return ResponseEntity.ok(new CommonResponse<String>("모든 유저 등록 성공"));
        else
            return ResponseEntity.status(500).body(new CommonResponse<List<String>>(errorEmails));
	}
}
