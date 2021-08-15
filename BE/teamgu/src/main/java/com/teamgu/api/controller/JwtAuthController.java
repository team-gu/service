package com.teamgu.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.teamgu.api.dto.res.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import com.teamgu.api.dto.UserRegistDto;
import com.teamgu.api.dto.req.DummyReqDto;
import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.service.UserServiceImpl;
import com.teamgu.database.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "인증(로그인, 로그아웃) API", tags = {"Auth."})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class JwtAuthController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    Logger logger = LoggerFactory.getLogger(JwtAuthController.class);

    @PostMapping("/dummyData")
    @ApiOperation(value = "더미 데이터 추가", notes = "사용자 초기정보(email/pwd/name/role)를 추가 한다")
    public ResponseEntity<BaseResDto> signIn(
            @RequestBody @ApiParam(value = "더미 데이터 추가 (email,pw)", required = true) DummyReqDto dummyReq) {

        String email = dummyReq.getEmail();
        String password = dummyReq.getPassword();
        String name = dummyReq.getName();
        short role = dummyReq.getRole();
        String studentNumber = dummyReq.getStudentNumber();
        User user = User.builder()
                .email(email)
                .password(password)
                .name(name)
                .role(role)
                .profileExtension("png")
                .profileServerName("c21f969b5f03d33d43e04f8f136e7682")
                .profileOriginName("default")
                .studentNumber(studentNumber)
                .build();
        if (userService.save(user))
            return ResponseEntity.ok(new BaseResDto(200, "Success"));
        else
            return ResponseEntity.status(500).body(new BaseResDto(500, "Fail Insert"));

    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "이메일과 패스워드를 입력해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResDto.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResDto.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResDto.class)
    })
    public ResponseEntity<LoginResDto> login(@RequestBody @ApiParam(value = "로그인 정보(email,pw)", required = true) LoginReqDto loginReq) {

        String email = loginReq.getEmail();
        String password = loginReq.getPassword();
        logger.info("email: " + email + " password: " + password);

        Optional<User> opuser = userService.getUserByEmail(email);
        if (opuser.isPresent()) {

            User user = opuser.get();

            if (passwordEncoder.matches(password, user.getPassword())) { //기존 비밀번호로 로그인한 경우
                return ResponseEntity.ok(userService.login(loginReq, user));
            } else if(passwordEncoder.matches(password, user.getTempPassword())) { //발급받은 임시 비밀번호로 로그인한 경우
                userService.modifyOriginPwd(user, user.getTempPassword());
                return ResponseEntity.ok(userService.login(loginReq, user));
            }
        }
        return ResponseEntity.status(404).body(new LoginResDto(404, "Invalid account", null, null));
    }

    @GetMapping("/reissue")
    @ApiOperation(value = "토큰 재발급", notes = "token을 재발급 받는다.")
    public ResponseEntity<TokenResDto> reissue(@RequestBody @ApiParam(value = "토큰 재발급 요청", required = true) TokenReqDto tokenReq) {
        return ResponseEntity.ok(userService.reissue(tokenReq));
    }

    @GetMapping("/reqInfo")
    @ApiOperation(value = "상태 초기화시 토큰 기반 정보 재요청", notes = "유저의 정보를 재공급 한다.")
    public ResponseEntity<? extends BasicResponse> reqInfo(
            @RequestHeader("Authorization") @ApiParam(value = "정보 재발급 요청", required = true) String auth
    ) {

        LoginResDto oUserInfo = userService.reqInfo(auth);

        if (ObjectUtils.isEmpty(oUserInfo)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("토큰이 만료되었거나 일치하는 유저정보가 없습니다"));
        }

        return ResponseEntity.ok(new CommonResponse<LoginResDto>(oUserInfo));

    }
    
    @PostMapping("/regist/users")
    @ApiOperation(value = "N명의 유저를 회원가입 시킨다")
    public ResponseEntity<? extends BasicResponse> signInUsers(
            @RequestBody @ApiParam(value = "", required = true) List<UserRegistDto> usersRegist) {
    	List<User> users = new ArrayList<User>();
    	
    	for(UserRegistDto userRegist:usersRegist) {
    		String studentNumber = userRegist.getStudentNumber();    		
    		String email = userRegist.getEmail();
    		String password = studentNumber;//초기 패스워드는 email과 동일하게 설정
    		String name = userRegist.getName();
    		short role = 1;
    		User user = User.builder()
    				.email(email)
    				.password(password)//초기패스워드는 본인의 학번
    				.name(name)
    				.role(role)
    				.profileExtension("png")
    				.profileServerName("c21f969b5f03d33d43e04f8f136e7682")
    				.profileOriginName("default")
    				.studentNumber(studentNumber)
    				.build();
    		users.add(user);
    	}
    	if(users.size()==0)//user가 없는 경우
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("가입을 요청한 유저 데이터가 없습니다"));
    	
        if (userService.saveAll(users))
            return ResponseEntity.ok(new CommonResponse<String>("회원 등록 성공"));
        else
            return ResponseEntity.status(500).body(new CommonResponse<String>("회원 등록 실패"));

    }
}
