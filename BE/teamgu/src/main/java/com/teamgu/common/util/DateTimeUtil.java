package com.teamgu.common.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
/**
 * 자주 사용되는 날짜 변환 관련 함수를 담은 클래스
 */
public class DateTimeUtil {

    /**
     * 현재 날짜와 시간을 문자열로 리턴하는 함수
     *
     * @return String
     */
    public String getDateAndTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String curDate = now.format(dateTimeFormatter);

        return curDate;
    }

    /**
     * 현재 날짜를 문자열로 리턴하는 함수
     *
     * @return
     */
    public String getDate() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String curDate = now.format(dateTimeFormatter);

        return curDate;
    }
}
