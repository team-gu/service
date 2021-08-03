package com.teamgu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
/**
 * JavaScript에서 생성할 웹소켓의 연결과 메세지 송수신 위치를 설정
 * @author Kang Seunghyun
 *
 */
@Configuration
@EnableWebSocketMessageBroker // WebSocket message handling을 허용
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
	/**
	 * 최초 소켓 연결 시 endpoint
	 * socketjs client가 웹소켓 handshake connection을 생성하는 경로이다
	 */
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/stomp/chat")
				.setAllowedOriginPatterns(
						"http://*:3000",
						"http://*.*.*.*:3000",
						"http://*:5500",
						"http://*:8080")
				.withSockJS(); //javascript에서 SockJS 생성자를 통해 연결
	}
	
	
	/**
	 * 어플리케이션 내부에서 사용할 path를 지정한다
	 */
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		// "/send" 경로로 시작하는 STOMP 메세지의 "destination"헤더는 @Controller 객체의 @MessageMapping 메서드로 라우팅된다
		// 즉, client에서 send 요청을 처리한다
		config.setApplicationDestinationPrefixes("/send"); //클라이언트에서 메세지 송신 시 붙여줄 prefix
//		config.setApplicationDestinationPrefixes("/pub"); //클라이언트에서 메세지 송신 시 붙여줄 prefix
		
		// 내장된 메세지 브로커를 사용해 Client에게 Subscriptions, Broadcasting 기능을 제공한다.
		// 또한 /receive 로 시작하는 "destination" 헤더를 가진 메세지를 브로커로 라우팅한다.
		config.enableSimpleBroker("/receive"); //메세지 응답 prefix
//		config.enableSimpleBroker("/sub"); //메세지 응답 prefix
	}
	
}
