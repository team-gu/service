package com.teamgu.api.service;

import java.io.IOException;
import java.util.List;

import com.teamgu.api.dto.req.TeamWithUserToExcelReqDto;
import com.teamgu.api.dto.res.HorizontalByTeamResDto;
import com.teamgu.api.dto.res.VerticalByUserResDto;

public interface ExcelService {
	/**
	 * 팀별 가로비 Excel 파일을 생성하고 이를 base64 byte 형태로 반환한다 
	 * @param teamWithUserToExcelReqDto
	 * @return base64로 인코딩 된 byte[]
	 */
	public String createExcelToTeam(List<HorizontalByTeamResDto> horizontalByTeamResDto) throws IOException;
	/**
	 * 유저별 세로비 Excel 파일을 생성하고 이를 base64 byte 형태로 반환한다 
	 * @param teamWithUserToExcelReqDto
	 * @return base64로 인코딩 된 byte[]
	 */
	public String createExcelToUser(List<VerticalByUserResDto> verticalByUserResDto) throws IOException;
}
