package com.teamgu.api.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.teamgu.api.dto.req.AwardReqDto;
import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.PasswordReqDto;
import com.teamgu.api.dto.req.ProjectReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.TokenResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.api.dto.res.UserProjectDto;
import com.teamgu.common.auth.JwtUserDetailsService;
import com.teamgu.common.util.JwtTokenUtil;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.Skill;
import com.teamgu.database.entity.User;
import com.teamgu.database.entity.UserAward;
import com.teamgu.database.entity.UserProject;
import com.teamgu.database.entity.WishTrack;
import com.teamgu.database.repository.AwardRepository;
import com.teamgu.database.repository.AwardRepositorySuport;
import com.teamgu.database.repository.CodeDetailRepositorySupport;
import com.teamgu.database.repository.ProjectDetailRepository;
import com.teamgu.database.repository.ProjectDetailRepositorySuport;
import com.teamgu.database.repository.ProjectRepository;
import com.teamgu.database.repository.ProjectRepositorySuport;
import com.teamgu.database.repository.SkillRepository;
import com.teamgu.database.repository.UserQueryRepository;
import com.teamgu.database.repository.UserRepository;
import com.teamgu.database.repository.WishTrackRepository;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	WishTrackRepository wishTrackRepository;
	@Autowired
	SkillRepository skillRepository;
	@Autowired
	ProjectRepository projectRepository;
	@Autowired
	AwardRepository awardRepository;
	
	@Autowired
	UserQueryRepository userQueryRepository;

	@Autowired
	ProjectDetailRepository projectDetailRepository;
	@Autowired
	ProjectDetailRepositorySuport projectDetailRepositorySuport;
	@Autowired
	CodeDetailRepositorySupport codeDetailRepositorySupport;
	@Autowired
	ProjectRepositorySuport projectRepositorySuport;
	@Autowired
	AwardRepositorySuport awardRepositorySuport;

	@Autowired
	JwtUserDetailsService userDetailsService;
	
	Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Override
	public Optional<User> getUserByEmail(String email) {
		logger.info(email);
		Optional<User> user = userRepository.findByEmail(email);
		if(user.isPresent()) {//Optional의 null 체크(값ㅇ ㅣ있는 경우)
			logger.info(user.get().getEmail());			
		}else {//없는 경우
			logger.info("user가 비었습니다.");
		}
		return user;
	}

	@Override
	public boolean save(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		if (userRepository.save(user) == null)
			return false;
		return true;
	}

	/**
	 * refresh 토큰 저장 함수
	 */
	@Override
	public void setRefreshToken(String refreshToken, User user) {
		user.setRefreshToken(refreshToken);
		userRepository.save(user);
	}

	/**
	 * login 함수
	 */
	@Override
	public LoginResDto login(LoginReqDto loginReq, User user) {
		// 1) accessToken 생성
		String accessToken = jwtTokenUtil.getAccessToken(user);
		// 2) refreshToken 생성, 저장
		String refreshToken = jwtTokenUtil.getRefreshToken();
		setRefreshToken(refreshToken, user);
		// 3) user정보
		LoginResDto loginRes = new LoginResDto();
		loginRes.setStatusCode(200);
		loginRes.setMessage("Success");
		loginRes.setAccessToken(accessToken);
		loginRes.setUserInfo(getUserDetailInfo(user.getEmail()));
		return loginRes;
	}

	/**
	 * 토큰 재생성 함수
	 */
	@Override
	public TokenResDto reissue(TokenReqDto tokenReq) {

		// 1) refresh toekn 검증
		if (!jwtTokenUtil.validateToken(tokenReq.getRefreshToken())) {
			throw new RuntimeException("Refresh Token이 만료되었습니다.");
		}

		// 2) 권한(member id)가져오기
		Authentication authentication = jwtTokenUtil.getAuthentication(tokenReq.getAccessToken());

		// 3.Member ID 로 Refresh Token 값 가져오기
		User user = userRepository.findByEmail(authentication.getName()).get();
		String refreshToken = user.getRefreshToken();
		if (refreshToken == null)
			new RuntimeException("로그아웃 된 사용자입니다.");

		// 4. Refresh Token 일치하는지 검사
		if (!refreshToken.equals(tokenReq.getRefreshToken())) {
			throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
		}
		// 5. 새로운 토큰 생성
		TokenResDto tokenDto = new TokenResDto();
		tokenDto.setAccessToken(jwtTokenUtil.getAccessToken(user));
		String newRefreshToken = jwtTokenUtil.getRefreshToken();
		tokenDto.setRefreshToken(newRefreshToken);
		// 6. 저장소 정보 업데이트
		setRefreshToken(newRefreshToken, user);

		// 토큰 발급
		return tokenDto;
	}

	/**
	 * 마이페이지 데이터 입력, 수정 함수
	 */
	@Override
	public void setUserDetailInfo(UserInfoReqDto userInfoReq) {

		User user = getUserByEmail(userInfoReq.getEmail()).get();
		user.setStudentNumber(userInfoReq.getStudentNumber());
		user.setWishPositionCode(userInfoReq.getWishPosition());
		System.out.println(userInfoReq.getStudentNumber().substring(1, 2)+"기");
		// 학번 입력 받아서 project
		int stageCode = codeDetailRepositorySupport.finStageCode(userInfoReq.getStudentNumber().substring(1, 2) + "기");
		
		int projegtCode = projectDetailRepositorySuport.findProjectCode();

		// 선호 트랙 저장
		List<String> wishTracks = userInfoReq.getWishTrack();
		WishTrack wishTrack = new WishTrack();
		for (String name : wishTracks) {
			wishTrack.setUser(user);
			// string to int
			int code = codeDetailRepositorySupport.findTtrackCode(name);
			wishTrack.setMapping(
					Mapping.builder().stageCode(stageCode).projectCode(projegtCode).trackCode(code).build());
			wishTrackRepository.save(wishTrack);
		}

		user.setIntroduce(userInfoReq.getIntroduce());

		// 기술 스택 저장
		List<String> skills = userInfoReq.getSkill();
		Skill skill = new Skill();
		for (String name : skills) {
			int code = codeDetailRepositorySupport.findSkillCode(name);
			skill.setUser(user);
			skill.setSkillCode(code);
			skillRepository.save(skill);
		}
		

		userRepository.save(user);
	}

	/**
	 * 프로젝트 데이터 입력, 수정 함수
	 */
	@Override
	public void setProjectInfo(List<ProjectReqDto> projectInfoReq) {
		UserProject userProject = new UserProject();
		for (ProjectReqDto project : projectInfoReq) {
			userProject.setIntroduce(project.getIntroduce());
			userProject.setName(project.getName());
			userProject.setPositionCode(codeDetailRepositorySupport.findPositionCode(project.getPosition()));
			userProject.setUrl(project.getUrl());
			System.out.println(project.getEmail());
			User user = getUserByEmail(project.getEmail()).get();
			userProject.setUser(user);
			System.out.println(projectRepository.findByName(project.getName()));
			System.out.println(projectRepository.findByName(project.getName()).isPresent());
			// 입력
			if (!projectRepository.findByName(project.getName()).isPresent()) {
				projectRepository.save(userProject);
			} else { // 수정
				projectRepositorySuport.modProjects(userProject, user.getEmail());
			}
		}
	}

	/**
	 * 수상내역 데이터 입력, 수정 함수
	 */
	@Override
	public void setAwardInfo(List<AwardReqDto> awardReqDto) {
		UserAward userAward = new UserAward();
		for (AwardReqDto award : awardReqDto) {
			userAward.setAgency(award.getAgency());
			userAward.setIntroduce(award.getIntroduce());
			userAward.setName(award.getName());
			userAward.setDate(award.getDate());
			User user = getUserByEmail(award.getEmail()).get();
			userAward.setUser(user);
			// 입력
			if (!awardRepository.findByName(award.getName()).isPresent()) {
				awardRepository.save(userAward);
			} else { // 수정
				awardRepositorySuport.modAwards(userAward, user.getEmail());
			}
		}
	}

	/**
	 * 비밀번호 변경함수
	 */
	@Override
	public void setPassward(PasswordReqDto passwordReq) {
		User user = getUserByEmail(passwordReq.getEmail()).get();
		user.setPassword(passwordEncoder.encode(passwordReq.getPassword()));
		userRepository.save(user);
	}

	/**
	 * 마이페이지 데이터 조회 함수
	 */
	@Override
	public UserInfoResDto getUserDetailInfo(String email) {
		User user = userRepository.findByEmail(email).get();
		UserInfoResDto userInfoRes = new UserInfoResDto();
		userInfoRes.setEmail(email);
		userInfoRes.setPassword(user.getPassword());
		userInfoRes.setStudentNumber(user.getStudentNumber());

		List<Skill> skills = user.getSkills();
		List<String> skillName = new ArrayList<>();
		for (Skill sk : skills) {
			skillName.add(codeDetailRepositorySupport.findSkillName(sk.getSkillCode()));
		}
		userInfoRes.setSkill(skillName);

		String position = codeDetailRepositorySupport.findPositionName(user.getWishPositionCode());
		userInfoRes.setWishPositionCode(position);
		userInfoRes.setIntroduce(user.getIntroduce());

		List<UserProject> projects = userQueryRepository.selectUserProjectByEmail(email);
		List<UserProjectDto> userProjects = new ArrayList<UserProjectDto>();
		for(UserProject project : projects) {
			UserProjectDto userProjectDto = new UserProjectDto();
			userProjectDto.setIntroduce(project.getIntroduce());
			userProjectDto.setName(project.getName());
			userProjectDto.setPosition(codeDetailRepositorySupport.findPositionName(project.getPositionCode()));
			userProjectDto.setUrl(project.getUrl());
			userProjects.add(userProjectDto);
		}
		userInfoRes.setProjects(userProjects);

		//userInfoRes.setProjects(user.getUserProject());
		List<UserAward> awards = userQueryRepository.selectUserAwardByEmail(email);
		userInfoRes.setAwards(awards);
		return userInfoRes;
		
	}

}
