package com.teamgu.api.vo;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Component
@Data
@RequiredArgsConstructor
public class MessageTemplate {
	private final SimpMessagingTemplate template;
	
}
