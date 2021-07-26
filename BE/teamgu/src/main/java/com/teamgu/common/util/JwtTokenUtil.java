package com.teamgu.common.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.teamgu.common.auth.TeamguUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenUtil {
	@Value("${jwt.secret}")
	private String secretKey;
	@Value("${jwt.issuer}")
	private String issuer;

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

	/**
	 * access 토큰 생성 함수
	 */
	public String getAccessToken(String email) {
		Map<String, Object> claims = new HashMap<>();
		return Jwts.builder().setClaims(claims).setSubject(email).setIssuer(issuer)
				.setExpiration(getExpireDate(ACCESS_TOKEN_EXPIRE_TIME)).signWith(SignatureAlgorithm.HS512, secretKey)
				.compact();
	}

	/**
	 * refresh 토큰 생성 함수
	 */
	public String getRefreshToken(String email) {
		return Jwts.builder().setSubject(email).setIssuer(issuer)
				.setExpiration(getExpireDate(REFRESH_TOKEN_EXPIRE_TIME)).signWith(SignatureAlgorithm.HS512, secretKey)
				.compact();
	}

	/**
	 * 유효기간 Date로 변환하는 함수
	 */
	public Date getExpireDate(long expTime) {
		Date now = new Date();
		return new Date(now.getTime() + expTime);
	}
	
	

	/**
	 * token 유효성 검중 함수
	 */
	public boolean isValidToken(String token, TeamguUserDetails userDetails) {
		final String checkedEmail = getEmailFromToken(token);
		return(checkedEmail.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}



	/**
	 * token의 subject(email) 검색
	 */
	public String getEmailFromToken(String token) {
		try {
			return getClaimFromToken(token, Claims::getSubject);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	/**
	 * secret 키를 가지고 token에서 정보 검색 
	 */
	public Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}
	
	/**
     * 토큰 만료 체크 함수 
     */
    public Boolean isTokenExpired(String token){
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

}
