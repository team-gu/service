package com.teamgu.common.util;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.teamgu.common.auth.TeamguUserDetails;
import com.teamgu.database.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class JwtTokenUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);
	
	@Value("${jwt.secret}")
	private String secretKey;
	@Value("${jwt.issuer}")
	private String issuer;

	private static final String AUTHORITIES_KEY = "auth";

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

	/**
	 * access 토큰 생성 함수
	 */
	public String getAccessToken(User user) {
		return Jwts.builder().claim(AUTHORITIES_KEY,user.getRole())
				.setSubject(user.getEmail()).setIssuer(issuer)
				.setExpiration(getExpireDate(ACCESS_TOKEN_EXPIRE_TIME)).signWith(SignatureAlgorithm.HS512, secretKey)
				.compact();
	}

	/**
	 * refresh 토큰 생성 함수
	 */
	public String getRefreshToken() {
		return Jwts.builder().setExpiration(getExpireDate(REFRESH_TOKEN_EXPIRE_TIME))
				.signWith(SignatureAlgorithm.HS512, secretKey).compact();
	}

	/**
	 * 유효기간 Date로 변환하는 함수
	 */
	public Date getExpireDate(long expTime) {
		Date now = new Date();
		return new Date(now.getTime() + expTime);
	}

	/**
	 * 권한 함수
	 */
	public Authentication getAuthentication(String accessToken) {
		// 토큰 복호화
		Claims claims = parseClaims(accessToken);

		if (claims.get(AUTHORITIES_KEY) == null) {
			throw new RuntimeException("권한 정보가 없는 토큰입니다.");
		}

		// 클레임에서 권한 정보 가져오기
		 Collection<? extends GrantedAuthority> authorities =
	                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
	                        .map(SimpleGrantedAuthority::new)
	                        .collect(Collectors.toList());

		// UserDetails 객체를 만들어서 Authentication 리턴
		TeamguUserDetails principal = new TeamguUserDetails(claims.getSubject(), "", authorities);

		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}

	private Claims parseClaims(String accessToken) {
		try {
			return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody();
		} catch (UnsupportedJwtException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * token 유효성 검중 함수
	 */
	public boolean validateToken(String token) throws UnsupportedJwtException {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
        	logger.info("잘못된 JWT 서명입니다.");
        } catch (JwtException e) {
        	logger.info("만료된 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
        	logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
