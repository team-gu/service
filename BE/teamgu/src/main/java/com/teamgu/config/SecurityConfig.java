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
        // ???????????? ??????????????? ?????? ???????????? ????????? ????????? ?????? ?????????
        // AuthenticationManager??? ????????????.
        // BCryptPasswordEncoder??? ??????
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception{
        
    	CharacterEncodingFilter filter = new CharacterEncodingFilter();

        filter.setEncoding("UTF-8");

        filter.setForceEncoding(true);

        http.addFilterBefore(filter,CsrfFilter.class)
                .cors()
                .and()
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
                        "/swagger/**",
                        "/stomp/chat/**",
                        "/send/**",
                        "/receive/**",
                        "/api/file/**",
                        "/api/excel/**",
                        "/api/user/password/init"
                       )
                .permitAll()
                // ?????? ?????? ????????? ????????? ??????.
                .anyRequest().authenticated().and()
                // ???????????? ????????? ????????????, ????????? ???????????? ????????? ???????????? ?????????.
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .formLogin().disable()
                .headers().frameOptions().disable();
        		// ?????? ????????? ????????? ???????????? ????????? ????????????.
        		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);       
    }
}
