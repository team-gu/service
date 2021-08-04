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

import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.PasswordReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.TokenResDto;
import com.teamgu.api.dto.res.UserClassResDto;
import com.teamgu.api.dto.res.UserInfoAwardResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.api.dto.res.UserInfoProjectResDto;
import com.teamgu.common.auth.JwtUserDetailsService;
import com.teamgu.common.util.JwtTokenUtil;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.Skill;
import com.teamgu.database.entity.User;
import com.teamgu.database.entity.UserInfoAward;
import com.teamgu.database.entity.UserInfoProject;
import com.teamgu.database.entity.WishTrack;
import com.teamgu.database.repository.UserInfoAwardRepository;
import com.teamgu.database.repository.CodeDetailRepositorySupport;
import com.teamgu.database.repository.MappingRepository;
import com.teamgu.database.repository.MappingRepositorySupport;
import com.teamgu.database.repository.ProjectDetailRepository;
import com.teamgu.database.repository.ProjectDetailRepositorySuport;
import com.teamgu.database.repository.UserInfoProjectRepository;
import com.teamgu.database.repository.UserSkillRepository;
import com.teamgu.database.repository.UserSkillRepositorySupport;
import com.teamgu.database.repository.UserRepositorySupport;
import com.teamgu.database.repository.UserRepository;
import com.teamgu.database.repository.WishTrackRepository;
import com.teamgu.database.repository.WishTrackRepositorySupport;

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
	UserSkillRepository skillRepository;
	@Autowired
	UserInfoProjectRepository projectRepository;
	@Autowired
	UserInfoAwardRepository awardRepository;

	@Autowired
	MappingRepository mappingRepository;
	
	@Autowired
	MappingRepositorySupport mappingRepositorySupport;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	UserSkillRepositorySupport userSkillRepositorySupport;
	
	@Autowired
	WishTrackRepositorySupport wishTrackRepositorySupport;

	@Autowired
	ProjectDetailRepository projectDetailRepository;
	@Autowired
	ProjectDetailRepositorySuport projectDetailRepositorySuport;
	@Autowired
	CodeDetailRepositorySupport codeDetailRepositorySupport;

	@Autowired
	JwtUserDetailsService userDetailsService;

	Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	// email을 통한 User Entity 조회
	@Override
	public Optional<User> getUserByEmail(String email) {
		logger.info(email);
		Optional<User> user = userRepository.findByEmail(email);
		if (user.isPresent()) {// Optional의 null 체크(값ㅇ ㅣ있는 경우)
			logger.info(user.get().getEmail());
		} else {// 없는 경우
			logger.info("user가 비었습니다.");
		}
		return user;
	}

	// id를 통한 User Entity 조회
	@Override
	public Optional<User> getUserById(Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {// Optional의 null 체크(값ㅇ ㅣ있는 경우)
			logger.info(user.get().getEmail());
		} else {// 없는 경우
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
	public void updateUserDetailInfo(UserInfoReqDto userInfoReqDto) {

		Long userId = userInfoReqDto.getId();			
		User user = getUserById(userId).get();

		// Wish Position, Introduce 수정
		//userRepositorySupport.updateUserDetailInfo(userInfoReqDto);
		
		/*
		 * Wish Track 수정
		 */
		// 수정할 WishTrack
		List<String> updateWishTracks = userInfoReqDto.getWishTracks();
		// 기존 WishTrack
		List<String> originWishTracks = userRepositorySupport.selectUserWishTrackByUserId(userId);

		int updateWishTracksSize = updateWishTracks.size();
		int originWishTracksSize = originWishTracks.size();
		
		boolean updateWishTracksCheck[] = new boolean[updateWishTracksSize];
		boolean originWishTracksCheck[] = new boolean[originWishTracksSize];
		
		// 추가, 삭제 체크
		for(int i = 0; i<updateWishTracksSize; i++) {
			for(int j = 0; j<originWishTracksSize; j++) {
				if(updateWishTracks.get(i).equals(originWishTracks.get(j))) {
					updateWishTracksCheck[i] = true;
					originWishTracksCheck[j] = true;
				}
			}
		}
		
		// updateWishTracksCheck가 false 이면 추가된 Track
		for(int i = 0; i<updateWishTracksSize; i++) {
			if(updateWishTracksCheck[i]) continue;
			int trackCode = codeDetailRepositorySupport.findTtrackCode(updateWishTracks.get(i));
			WishTrack wishTrack = new WishTrack();
			Mapping mapping = mappingRepositorySupport.selectMapping(trackCode);
			//Mapping mapping = mappingRepository.findByTrackCode(trackCode).get();
			wishTrackRepositorySupport.insertWishTrack(userId, mapping.getId());
			//wishTrackRepository.save(wishTrack);
			
		}
		
		// originWishTracksCheck가 false이면 삭제된 Track
		for(int i = 0; i<originWishTracksSize; i++) {
			if(originWishTracksCheck[i]) continue;
			int trackCode = codeDetailRepositorySupport.findTtrackCode(originWishTracks.get(i));
			userRepositorySupport.deleteUserWishTrack(userId, trackCode);
		}
		
		
		/*
		 * Skill 수정
		 */
		// 업데이트 Skills
		List<String> updateSkills = userInfoReqDto.getSkills();
		// 기존 Skills
		List<String> originSkills = userRepositorySupport.selectUserSkillByUserId(userInfoReqDto.getId());
				
		int updateSkillsSize = updateSkills.size();
		int originSkillsSize = originSkills.size();
		
		boolean updateSkillsCheck[] = new boolean[updateSkillsSize];
		boolean originSkillsCheck[] = new boolean[originSkillsSize];
		
		// 추가, 삭제 체크
		for(int i = 0; i<updateSkillsSize; i++) {
			for(int j = 0; j<originSkillsSize; j++) {
				if(updateSkills.get(i).equals(originSkills.get(j))) {
					updateSkillsCheck[i] = true;
					originSkillsCheck[j] = true;
				}
			}
		}
		
		// updateSkillsCheck가 false 이면 추가된 Skill
		for(int i = 0; i<updateSkillsSize; i++) {
			if(updateSkillsCheck[i]) continue;
			int skillCode = codeDetailRepositorySupport.findSkillCode(updateSkills.get(i));
			userSkillRepositorySupport.insertSkiil(userId, skillCode);
			//skillRepository.save(skill);
		}
		
		// originSkillsCheck가 false 이면 삭제된 Skill
		for(int i = 0; i<originSkillsSize; i++) {
			if(originSkillsCheck[i]) continue;
			int skillCode = codeDetailRepositorySupport.findSkillCode(originSkills.get(i));
			userRepositorySupport.deleteUserSkill(userId, skillCode);
		}
		
		
//		User user = getUserByEmail(userInfoReq.getEmail()).get();
//		user.setStudentNumber(userInfoReq.getStudentNumber());
//		user.setWishPositionCode(userInfoReq.getWishPosition());
//		System.out.println(userInfoReq.getStudentNumber().substring(1, 2) + "기");
//		// 학번 입력 받아서 project
//		int stageCode = codeDetailRepositorySupport.finStageCode(userInfoReq.getStudentNumber().substring(1, 2) + "기");
//
//		int projegtCode = projectDetailRepositorySuport.findProjectCode();
//
//		// 선호 트랙 저장
//		List<String> wishTracks = userInfoReq.getWishTrack();
//		WishTrack wishTrack = new WishTrack();
//		for (String name : wishTracks) {
//			wishTrack.setUser(user);
//			// string to int
//			int code = codeDetailRepositorySupport.findTtrackCode(name);
//			wishTrack.setMapping(
//					Mapping.builder().stageCode(stageCode).projectCode(projegtCode).trackCode(code).build());
//			wishTrackRepository.save(wishTrack);
//		}
//
//		user.setIntroduce(userInfoReq.getIntroduce());
//
//		// 기술 스택 저장
//		List<String> skills = userInfoReq.getSkill();
//		Skill skill = new Skill();
//		for (String name : skills) {
//			int code = codeDetailRepositorySupport.findSkillCode(name);
//			skill.setUser(user);
//			skill.setSkillCode(code);
//			skillRepository.save(skill);
//		}
//
//		userRepository.save(user);
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

		Long id = user.getId();
		String studentNumber = user.getStudentNumber();

		// User Index Number
		userInfoRes.setId(id);

		// User 이름
		userInfoRes.setName(user.getName());

		String profileServerName = user.getProfileServerName();
		String profileExtension = user.getProfileExtension();
		String profilePath = profileServerName + "." + profileExtension;
		short userRole = user.getRole();
		userInfoRes.setImg(profilePath);

		// User Role
		userInfoRes.setRole(userRole);

		// User 이메일
		userInfoRes.setEmail(email);

		// 교육생일 경우만 조회
		if (userRole == 1) {
			
			// User 전공
			userInfoRes.setMajor(user.getMajor());

			// User 학번
			userInfoRes.setStudentNumber(studentNumber);

			// User 기술 스택 조회
			List<String> skills = userRepositorySupport.selectUserSkillByUserId(id);
			userInfoRes.setSkills(skills);

			// User Position 조회
			String position = codeDetailRepositorySupport.findPositionName(user.getWishPositionCode());
			userInfoRes.setWishPositionCode(position);
			
			// User Introduce 조회
			userInfoRes.setIntroduce(user.getIntroduce());

			// User 프로젝트 경력 조회
			List<UserInfoProjectResDto> projects = userRepositorySupport.selectUserProjectByUserId(id);
			userInfoRes.setProjects(projects);

			// User 수상 경력 조회
			List<UserInfoAwardResDto> awards = userRepositorySupport.selectUserAwardByUserId(id);
			userInfoRes.setAwards(awards);

			// User Wish Track 조회
			List<String> tracks = userRepositorySupport.selectUserWishTrackByUserId(id);
			userInfoRes.setWishTrack(tracks);

			// User Class 조회
			int stage = studentNumber.charAt(1) - '0';
			UserClassResDto userClass = userRepositorySupport.selectUserClassByUserId(id, stage);
			userInfoRes.setUserClass(userClass);

		}

		return userInfoRes;

	}

//	/**
//	 * 프로젝트 데이터 입력, 수정 함수
//	 */
//	@Override
//	public void setProjectInfo(List<ProjectReqDto> projectInfoReq) {
//		UserInfoProject userProject = new UserInfoProject();
//		for (ProjectReqDto project : projectInfoReq) {
//			userProject.setIntroduce(project.getIntroduce());
//			userProject.setName(project.getName());
//			userProject.setPositionCode(codeDetailRepositorySupport.findPositionCode(project.getPosition()));
//			userProject.setUrl(project.getUrl());
//			System.out.println(project.getEmail());
//			User user = getUserByEmail(project.getEmail()).get();
//			userProject.setUser(user);
//			System.out.println(projectRepository.findByName(project.getName()));
//			System.out.println(projectRepository.findByName(project.getName()).isPresent());
//			// 입력
//			if (!projectRepository.findByName(project.getName()).isPresent()) {
//				projectRepository.save(userProject);
//			} else { // 수정
//				projectRepositorySuport.modProjects(userProject, user.getEmail());
//			}
//		}
//	}

	/*
	 * User Info Project 입력
	 */

	@Override
	public List<UserInfoProjectResDto> insertUserInfoProject(UserInfoProjectResDto userInfoProjectResDto) {
		User user = getUserById(userInfoProjectResDto.getUserId()).get();
		UserInfoProject userProject = new UserInfoProject();
		userProject.setIntroduce(userInfoProjectResDto.getIntroduce());
		userProject.setName(userInfoProjectResDto.getName());
		userProject.setPositionCode(codeDetailRepositorySupport.findPositionCode(userInfoProjectResDto.getPosition()));
		userProject.setUrl(userInfoProjectResDto.getUrl());
		userProject.setUser(user);
		projectRepository.save(userProject);
		return userRepositorySupport.selectUserProjectByUserId(userInfoProjectResDto.getUserId());
	}

	/*
	 * User Info Project 수정
	 */
	@Override
	public List<UserInfoProjectResDto> updateUserInfoProject(UserInfoProjectResDto userInfoProjectResDto) {

		int positionCode = codeDetailRepositorySupport.findPositionCode(userInfoProjectResDto.getPosition());
		userRepositorySupport.updateUserInfoProject(userInfoProjectResDto, positionCode);
		return userRepositorySupport.selectUserProjectByUserId(userInfoProjectResDto.getUserId());
	}

	/*
	 * User Info Project 삭제
	 */
	@Override
	public void deleteUserInfoProject(Long id) {
		// TODO Auto-generated method stub
		userRepositorySupport.deleteUserInfoProject(id);
	}

//	/**
//	 * 수상내역 데이터 입력, 수정 함수
//	 */
//	@Override
//	public void setAwardInfo(List<AwardReqDto> awardReqDto) {
//		UserInfoAward userAward = new UserInfoAward();
//		for (AwardReqDto award : awardReqDto) {
//			userAward.setAgency(award.getAgency());
//			userAward.setIntroduce(award.getIntroduce());
//			userAward.setName(award.getName());
//			userAward.setDate(award.getDate());
//			User user = getUserByEmail(award.getEmail()).get();
//			userAward.setUser(user);
//			// 입력
//			if (!awardRepository.findByName(award.getName()).isPresent()) {
//				awardRepository.save(userAward);
//			} else { // 수정
//				awardRepositorySuport.modAwards(userAward, user.getEmail());
//			}
//		}
//	}

	/*
	 * User Info Award 입력
	 */
	@Override
	public List<UserInfoAwardResDto> insertUserInfoAward(UserInfoAwardResDto userInfoAwardResDto) {
		UserInfoAward userAward = new UserInfoAward();
		User user = getUserById(userInfoAwardResDto.getUserId()).get();
		userAward.setAgency(userInfoAwardResDto.getAgency());
		userAward.setDate(userInfoAwardResDto.getDate());
		userAward.setIntroduce(userInfoAwardResDto.getIntroduce());
		userAward.setName(userInfoAwardResDto.getName());
		userAward.setUser(user);
		awardRepository.save(userAward);
		return userRepositorySupport.selectUserAwardByUserId(userInfoAwardResDto.getUserId());
	}

	/*
	 * User Info Award 수정
	 */
	@Override
	public List<UserInfoAwardResDto> updateUserInfoAward(UserInfoAwardResDto userInfoAwardResDto) {
		// TODO Auto-generated method stub
		userRepositorySupport.updateUserInfoAward(userInfoAwardResDto);
		return userRepositorySupport.selectUserAwardByUserId(userInfoAwardResDto.getUserId());
	}

	/*
	 * User Info Award 삭제
	 */
	@Override
	public void deleteUserInfoAward(Long id) {
		// TODO Auto-generated method stub
		userRepositorySupport.deleteUserInfoAward(id);
	}

}
