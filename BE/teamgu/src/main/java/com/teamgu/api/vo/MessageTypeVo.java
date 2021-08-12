package com.teamgu.api.vo;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
@Getter
public class MessageTypeVo {
	String inviteWaiting = "TEAM_INVITE_WAITING";
	String inviteAccepted = "TEAM_INVITE_ACCEPTED";
	String inviteRejected = "TEAM_INVITE_REJECTED";
	String inviteExpired = "TEAM_INVITE_EXPIRED";
	String recInvite = "RTC_INVITE";
}
