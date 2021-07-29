package com.teamgu.common.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DateTimeUtil {
    public String getDateAndTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String curDate = now.format(dateTimeFormatter);

        return curDate;
    }

    public String getDate() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String curDate = now.format(dateTimeFormatter);

        return curDate;
    }
}
