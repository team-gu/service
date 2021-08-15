package com.teamgu.api.service;

import java.util.List;
import java.util.Optional;

import com.teamgu.api.dto.MailDto;
import com.teamgu.api.dto.UserProfileImgDto;
import com.teamgu.common.util.RandomPwdUtil;
import com.teamgu.handler.ProfileImageHandler;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamgu.api.dto.req.LoginReqDto;
import com.teamgu.api.dto.req.PasswordReqDto;
import com.teamgu.api.dto.req.TokenReqDto;
import com.teamgu.api.dto.req.TrackReqDto;
import com.teamgu.api.dto.req.UserInfoReqDto;
import com.teamgu.api.dto.res.LoginResDto;
import com.teamgu.api.dto.res.SkillResDto;
import com.teamgu.api.dto.res.TokenResDto;
import com.teamgu.api.dto.res.UserClassResDto;
import com.teamgu.api.dto.res.UserInfoAwardResDto;
import com.teamgu.api.dto.res.UserInfoResDto;
import com.teamgu.api.dto.res.UserInfoProjectResDto;
import com.teamgu.common.auth.JwtUserDetailsService;
import com.teamgu.common.util.JwtTokenUtil;
import com.teamgu.database.entity.Mapping;
import com.teamgu.database.entity.User;
import com.teamgu.database.entity.UserInfoAward;
import com.teamgu.database.entity.UserInfoProject;
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
@Log4j2
public class UserServiceImpl implements UserService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private RandomPwdUtil randomPwdUtil;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MailServiceImpl mailService;

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

    @Autowired
    ProfileImageHandler profileImageHandler;

    //프로필 이미지에 접근하기 위한 서버 baseUrl
    private static final String serverUrl = "https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/";

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    // email을 통한 User Entity 조회
    @Override
    public Optional<User> getUserByEmail(String email) {
        logger.info(email);
        Optional<User> user = null;
        try {
            user = userRepository.findByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (user.isPresent()) {// Optional의 null 체크(값ㅇ ㅣ있는 경우)
            logger.info(user.get().getEmail());
        } else {// 없는 경우
            throw new RuntimeException("일치하는 유저가 없습니다.");
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
        loginRes.setUserInfo(getUserDetailInfo(user.getId()));

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
    public UserInfoResDto updateUserDetailInfo(UserInfoReqDto userInfoReqDto) {
        UserInfoResDto userInfoResDto = null;
        Long userId = userInfoReqDto.getId();
        User user = getUserById(userId).get();
        //프로필 이미지 서버 내 저장 및 파일명 파싱처리
        UserProfileImgDto userProfileImgDto = profileImageHandler.parseFileInfo(userInfoReqDto.getProfileImage());

        int stageCode = (user.getStudentNumber().charAt(0) - '0') * 10
                + user.getStudentNumber().charAt(1) - '0' + 100;

        // Wish Position, Introduce 수정
        userRepositorySupport.updateUserDetailInfo(userInfoReqDto, userProfileImgDto);

        /*
         * Wish Track 수정
         */
        // 수정할 WishTrack
        List<TrackReqDto> updateWishTracks = userInfoReqDto.getWishTracks();
        // 기존 WishTrack
        List<TrackReqDto> originWishTracks = userRepositorySupport.selectUserWishTrackByUserId(userId);

        int updateWishTracksSize = updateWishTracks.size();
        int originWishTracksSize = originWishTracks.size();

        boolean updateWishTracksCheck[] = new boolean[updateWishTracksSize];
        boolean originWishTracksCheck[] = new boolean[originWishTracksSize];

        // 추가, 삭제 체크
        for (int i = 0; i < updateWishTracksSize; i++) {
            for (int j = 0; j < originWishTracksSize; j++) {
                if (updateWishTracks.get(i).getCodeName().equals(originWishTracks.get(j).getCodeName())) {
                    updateWishTracksCheck[i] = true;
                    originWishTracksCheck[j] = true;
                }
            }
        }

        // updateWishTracksCheck가 false 이면 추가된 Track
        for (int i = 0; i < updateWishTracksSize; i++) {
            if (updateWishTracksCheck[i]) continue;
            Mapping mapping = mappingRepositorySupport.selectMapping(updateWishTracks.get(i).getCode(), stageCode);
            wishTrackRepositorySupport.insertWishTrack(userId, mapping.getId());

        }

        // originWishTracksCheck가 false이면 삭제된 Track
        for (int i = 0; i < originWishTracksSize; i++) {
            if (originWishTracksCheck[i]) continue;
            Mapping mapping = mappingRepositorySupport.selectMapping(originWishTracks.get(i).getCode(), stageCode);

            userRepositorySupport.deleteUserWishTrack(userId, mapping.getId());
        }


        /*
         * Skill 수정
         */
        // 업데이트 Skills
        List<SkillResDto> updateSkills = userInfoReqDto.getSkills();
        // 기존 Skills
        List<SkillResDto> originSkills = userRepositorySupport.selectUserSkillByUserId(userInfoReqDto.getId());

        int updateSkillsSize = updateSkills.size();
        int originSkillsSize = originSkills.size();

        boolean updateSkillsCheck[] = new boolean[updateSkillsSize];
        boolean originSkillsCheck[] = new boolean[originSkillsSize];

        // 추가, 삭제 체크
        for (int i = 0; i < updateSkillsSize; i++) {
            for (int j = 0; j < originSkillsSize; j++) {
                if (updateSkills.get(i).getCodeName().equals(originSkills.get(j).getCodeName())) {
                    updateSkillsCheck[i] = true;
                    originSkillsCheck[j] = true;
                }
            }
        }

        // updateSkillsCheck가 false 이면 추가된 Skill
        for (int i = 0; i < updateSkillsSize; i++) {
            if (updateSkillsCheck[i]) continue;
            userSkillRepositorySupport.insertSkiil(userId, updateSkills.get(i).getCode());
        }

        // originSkillsCheck가 false 이면 삭제된 Skill
        for (int i = 0; i < originSkillsSize; i++) {
            if (originSkillsCheck[i]) continue;
            userRepositorySupport.deleteUserSkill(userId, originSkills.get(i).getCode());
        }

        //복잡한 트랜잭션의 결과 select로 가져온 결과가 updated이전의 값들
        //때문에 업데이트 내용을 직접 Dto에 삽입
        userInfoResDto = getUserDetailInfo(userId);
        userInfoResDto.setEmail(userInfoReqDto.getEmail());
        userInfoResDto.setStudentNumber(userInfoReqDto.getStudentNumber());
        userInfoResDto.setWishPositionCode(userInfoReqDto.getWishPosition());
        userInfoResDto.setWishTrack(userInfoReqDto.getWishTracks());
        userInfoResDto.setIntroduce(userInfoReqDto.getIntroduce());
        userInfoResDto.setSkills(userInfoReqDto.getSkills());
        userInfoResDto.setImg(serverUrl + userProfileImgDto.getServerName() + "." + userProfileImgDto.getExtension());

        return userInfoResDto;
    }

    /**
     * 비밀번호 변경함수
     */
    @Override
    public boolean changePassword(PasswordReqDto passwordReq) {

        User user = null;

        try {
            user = getUserByEmail(passwordReq.getEmail()).get();
        } catch (Exception e) {
            log.error("일치하는 유저가 존재하지 않습니다.");

            return false;
        }

        if(passwordEncoder.matches(passwordReq.getOriPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(passwordReq.getModPassword()));
            userRepository.save(user);

            return true;
        }

        return false;
    }

    /**
     * 비밀번호 초기화 함수
     */
    @Override
    public short initPassword(String email) {
        User user = null;
        String tmpPwd = "";

        try {
            user = getUserByEmail(email).get();
        } catch (Exception e) {
            log.info("일치하는 유저가 존재하지 않습니다.");

            return 0;
        }

        //10자리 임시 비밀번호 생성
        tmpPwd = randomPwdUtil.getRandomPwd();

        //임시 비밀번호 세팅
        user.setTempPassword(passwordEncoder.encode(tmpPwd));
        userRepository.save(user);

        try {
            //메일 발송 로직
            MailDto mailDto = MailDto.builder()
                    .address(email)
                    .title("TeamGu 서비스 임시비밀번호")
                    .message("임시 비밀번호 : " + tmpPwd)
                    .build();

            mailService.sendMail(mailDto);
        } catch (Exception e) {
            log.error("메일 전송에 실패하였습니다.");

            return -1;
        }

        return 1;
    }

    /**
     * 임시 비밀번호로 로그인 시 원본 비밀번호는 폐기, 임시 비밀번호를 원본으로 대체
     */

    public void modifyOriginPwd(User user, String tempPwd) {
        user.setPassword(tempPwd);
        user.setTempPassword("");
        userRepository.save(user);
    }

    /**
     * 마이페이지 데이터 조회 함수
     */
    @Override
    public UserInfoResDto getUserDetailInfo(Long userId) {
        User user = userRepository.getOne(userId);
        UserInfoResDto userInfoRes = new UserInfoResDto();

        Long id = user.getId();
        String studentNumber = user.getStudentNumber();

        // User Index Number
        userInfoRes.setId(id);

        // User 이름
        userInfoRes.setName(user.getName());

        String profileServerName = user.getProfileServerName();
        String profileExtension = user.getProfileExtension();
        String profilePath = serverUrl + profileServerName + "." + profileExtension;
        short userRole = user.getRole();
        userInfoRes.setImg(profilePath);

        // User Role
        userInfoRes.setRole(userRole);

        // User 이메일
        userInfoRes.setEmail(user.getEmail());

        // 교육생일 경우만 조회
        if (userRole == 1) {

            // User 전공
            userInfoRes.setMajor(user.getMajor());

            // User 학번
            userInfoRes.setStudentNumber(studentNumber);

            // User 기술 스택 조회
            List<SkillResDto> skills = userRepositorySupport.selectUserSkillByUserId(id);
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
            List<TrackReqDto> tracks = userRepositorySupport.selectUserWishTrackByUserId(id);
            userInfoRes.setWishTrack(tracks);

            // User Class 조회
            int stage = studentNumber.charAt(1) - '0';
            UserClassResDto userClass = userRepositorySupport.selectUserClassByUserId(id, stage);
            userInfoRes.setUserClass(userClass);

            //User ProjectCodes 조회
            List<Integer> projectCodes = userRepositorySupport.selectUserProjectCodes(id);
            userInfoRes.setProjectCodes(projectCodes);

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

    @Override
    public LoginResDto reqInfo(String auth) {

        log.info(auth);

        if (StringUtils.isEmpty(auth)) {
            throw new RuntimeException("Access Token이 존재하지 않습니다");
        }

        String token = auth.substring(7);

        // 1) access toekn 검증
        if (!jwtTokenUtil.validateToken(token)) {
            throw new RuntimeException("Access Token이 만료되었습니다.");
        }

        // 2) Auth 가져온다
        Authentication authentication = jwtTokenUtil.getAuthentication(token);

        // 3. 토큰에 존재하는 email을 기반으로 유저 정보 조회
        User user = userRepository.findByEmail(authentication.getName()).get();

        return login(null, user);
    }
    
    @Override
    public boolean saveAll(List<User> users) {
    	for(int i =0;i<users.size();i++) {
    		String passwd = users.get(i).getPassword();
    		users.get(i).setPassword(passwordEncoder.encode(passwd));
    	}
        if (userRepository.saveAll(users) == null) {
        	log.error(users.size()+"명의 가입을 실패했습니다.");
            return false;
        }
        return true;
    }
}
