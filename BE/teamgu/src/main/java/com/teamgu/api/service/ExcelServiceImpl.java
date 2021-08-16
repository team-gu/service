package com.teamgu.api.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.req.TeamWithUserToExcelReqDto;
import com.teamgu.api.dto.res.HorizontalByTeamResDto;
import com.teamgu.api.dto.res.UserInfoByTeam;
import com.teamgu.api.dto.res.VerticalByUserResDto;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service("ExcelService")
public class ExcelServiceImpl implements ExcelService{
	@Override
	public String createExcelToTeam(List<HorizontalByTeamResDto> horizontalList) throws IOException {
		//2. 컬럼 갯수를 파악하기 위해 최대 인원 구성 수를 파악한다
		int maxMembers = 0;
		for(int i =0;i<horizontalList.size();i++) {
			maxMembers = Integer.max(horizontalList.get(i).getMembers().size(),maxMembers);			
		}
		
		//3. 엑셀 파일의 초기 설정을 한다
		SXSSFWorkbook workbook = new SXSSFWorkbook();
		
		//시트생성
		SXSSFSheet sheet = workbook.createSheet("팀별 가로비");
		
		//시트 열 너비 설정
//				sheet.setColumnWidth(columnIndex, width);
		
		//헤더 행 생성
		Row headerRow = sheet.createRow(0);
		//해당 행의 열 셀 생성
		Cell headerCell =null;
		
		//공통 정보에 대한 헤더 생성
		String[] headers = {"기수","프로젝트","트랙","팀명"};
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
		for(int i =0;i<horizontalList.size();i++) {
			HorizontalByTeamResDto info = horizontalList.get(i);
			
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
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		log.info("wirte stream");
		workbook.write(outputStream);
		
		//base64 인코딩
		String bres = Base64.getEncoder().encodeToString(outputStream.toByteArray());
		workbook.close();				
		return bres;
	}
	@Override
	public String createExcelToUser(List<VerticalByUserResDto> verticalList) throws IOException {
		
		//3. 엑셀 파일의 초기 설정을 한다
		SXSSFWorkbook workbook = new SXSSFWorkbook();
		
		//시트생성
		SXSSFSheet sheet = workbook.createSheet("유저별 세로비");
		
		//시트 열 너비 설정
//						sheet.setColumnWidth(columnIndex, width);
		
		//헤더 행 생성
		Row headerRow = sheet.createRow(0);
		//해당 행의 열 셀 생성
		Cell headerCell =null;
		
		//공통 정보에 대한 헤더 생성
		String[] headers = {"학번","이름","이메일","팀코드","팀명","역할","트랙"};
		for(int i=0;i<headers.length;i++) {
			headerCell = headerRow.createCell(i);
			headerCell.setCellValue(headers[i]);			
		}
		
		//4. 내용 행 및 셀 생성
		Row bodyRow = null;
		Cell bodyCell = null;
		for(int i =0;i<verticalList.size();i++) {
			VerticalByUserResDto info = verticalList.get(i);
			
			//행 생성
			bodyRow = sheet.createRow(i+1);//header 다음 줄부터
			
			//데이터 학번 표시
			bodyCell = bodyRow.createCell(0);
			bodyCell.setCellValue(info.getStudent_number());
			
			//데이터 이름 표시
			bodyCell = bodyRow.createCell(1);
			bodyCell.setCellValue(info.getName());
			
			//데이터 이메일 표시
			bodyCell = bodyRow.createCell(2);
			bodyCell.setCellValue(info.getEmail());
			
			//데이터 팀코드 표시
			bodyCell = bodyRow.createCell(3);
			bodyCell.setCellValue(info.getTeam_code());
			
			//데이터 팀명 표시
			bodyCell = bodyRow.createCell(4);
			bodyCell.setCellValue(info.getTeam_name());
			
			//데이터 역할 표시
			bodyCell = bodyRow.createCell(5);
			bodyCell.setCellValue(info.getTeam_role());
			
			//데이터 트랙 표시
			bodyCell = bodyRow.createCell(6);
			bodyCell.setCellValue(info.getTrack_name());
			
		}
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		log.info("wirte stream");
		workbook.write(outputStream);
		
		//base64 인코딩
		String bres = Base64.getEncoder().encodeToString(outputStream.toByteArray());
		workbook.close();				
		return bres;
	}
}
