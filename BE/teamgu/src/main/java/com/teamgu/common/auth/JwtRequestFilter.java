package com.teamgu.common.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.teamgu.common.util.JwtTokenUtil;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String tokenHeader = request.getHeader("Authorization");

		String userEmail = null;
		String jwtToken = null;

		// 1) JWT 토큰은 "Beare token"을 받는다.
		if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
			jwtToken = tokenHeader.substring(7);
			try {
				userEmail = jwtTokenUtil.getEmailFromToken(jwtToken);
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException("11 UserEmail from token error");
			}
		} else {
			logger.warn("JWT token does not begin with Bearer String");
		}

		// 2) 토큰을 검증한다.
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			TeamguUserDetails userDetails = (TeamguUserDetails) this.jwtUserDetailsService
					.loadUserByUsername(userEmail);

			// 2-1) 유효 토큰인지 확인
			if (jwtTokenUtil.isValidToken(jwtToken, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		filterChain.doFilter(request, response);
	}

}
