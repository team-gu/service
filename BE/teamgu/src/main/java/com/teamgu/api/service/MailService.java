package com.teamgu.api.service;

import com.teamgu.api.dto.MailDto;

public interface MailService {
    void sendMail(MailDto mailDto);
}
