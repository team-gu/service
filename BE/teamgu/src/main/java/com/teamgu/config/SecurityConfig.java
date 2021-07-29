package com.teamgu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.teamgu.common.auth.JwtAuthEntryPoint;
import com.teamgu.common.auth.JwtRequestFilter;
import com.teamgu.common.auth.JwtUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Autowired
    private JwtAuthEntryPoint jwtAuthEntryPoint;
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    

    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    @Autowired
    public void configGlobal(AuthenticationManagerBuilder auth) throws Exception{
        // 일치하는 자격증명을 위해 사용자를 로드할 위치를 알수 있도록
        // AuthenticationManager를 구성한다.
        // BCryptPasswordEncoder를 이용
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception{
        
    	CharacterEncodingFilter filter = new CharacterEncodingFilter();

        filter.setEncoding("UTF-8");

        filter.setForceEncoding(true);

        http.addFilterBefore(filter,CsrfFilter.class)
                .cors().disable()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        "/api/auth/dummyData",
                        "/api/auth/login",
                        "/api/auth/reissue",
                        "/v2/api-docs",
                        "/configuration/ui",
                        "/swagger-resources/**", 
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger/**"
                       )
                .permitAll()
                // 다른 모든 요청은 인증을 한다.
                .anyRequest().authenticated().and()
                // 상태없는 세션을 이용하며, 세션에 사용자의 상태를 저장하지 않는다.
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .formLogin().disable()
                .headers().frameOptions().disable();
        		// 모든 요청에 토큰을 검증하는 필터를 추가한다.
        		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
       
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
