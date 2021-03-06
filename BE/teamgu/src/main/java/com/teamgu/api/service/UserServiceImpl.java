package com.teamgu.api.service;

import java.util.List;
import java.util.Optional;

import com.teamgu.api.dto.MailDto;
import com.teamgu.api.dto.UserProfileImgDto;
import com.teamgu.common.util.RandomPwdUtil;
import com.teamgu.handler.ProfileImageHandler;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import org.checkerframework.checker.nullness.Opt;
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

    //????????? ???????????? ???????????? ?????? ?????? baseUrl
    private static final String serverUrl = "https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/";

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    // email??? ?????? User Entity ??????
    @Override
    public Optional<User> getUserByEmail(String email) {
        Optional<User> oUser = userRepository.findByEmail(email);

        return oUser;
    }

    // id??? ?????? User Entity ??????
    @Override
    public Optional<User> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {// Optional??? null ??????(?????? ????????? ??????)
            logger.info(user.get().getEmail());
        } else {// ?????? ??????
            logger.info("user??? ???????????????.");
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
     * refresh ?????? ?????? ??????
     */
    @Override
    public void setRefreshToken(String refreshToken, User user) {
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
    }

    /**
     * login ??????
     */
    @Override
    public LoginResDto login(LoginReqDto loginReq, User user) {

        // 1) accessToken ??????
        String accessToken = jwtTokenUtil.getAccessToken(user);

        // 2) refreshToken ??????, ??????
        String refreshToken = jwtTokenUtil.getRefreshToken();
        setRefreshToken(refreshToken, user);

        // 3) user??????
        LoginResDto loginRes = new LoginResDto();
        loginRes.setStatusCode(200);
        loginRes.setMessage("Success");
        loginRes.setAccessToken(accessToken);
        loginRes.setUserInfo(getUserDetailInfo(user.getId()));

        return loginRes;
    }

    /**
     * ?????? ????????? ??????
     */
    @Override
    public Optional<TokenResDto> reissue(TokenReqDto tokenReq) {
        Optional<TokenResDto> oTokenReqDto = Optional.empty();

        // 1) refresh toekn ??????
        if (!jwtTokenUtil.validateToken(tokenReq.getRefreshToken())) {
//            throw new RuntimeException("Refresh Token??? ?????????????????????.");
            return oTokenReqDto;
        }

        // 2) ??????(member id)????????????
        Authentication authentication = jwtTokenUtil.getAuthentication(tokenReq.getAccessToken());

        // 3.Member ID ??? Refresh Token ??? ????????????
        User user = userRepository.findByEmail(authentication.getName()).get();
        String refreshToken = user.getRefreshToken();
        if (refreshToken == null) {
//            new RuntimeException("???????????? ??? ??????????????????.");
            return oTokenReqDto;
        }

        // 4. Refresh Token ??????????????? ??????
        if (!refreshToken.equals(tokenReq.getRefreshToken())) {
//            throw new RuntimeException("????????? ?????? ????????? ???????????? ????????????.");
            return oTokenReqDto;
        }
        // 5. ????????? ?????? ??????
        TokenResDto tokenDto = new TokenResDto();
        tokenDto.setAccessToken(jwtTokenUtil.getAccessToken(user));
        String newRefreshToken = jwtTokenUtil.getRefreshToken();
        tokenDto.setRefreshToken(newRefreshToken);
        // 6. ????????? ?????? ????????????
        setRefreshToken(newRefreshToken, user);

        oTokenReqDto = Optional.ofNullable(tokenDto);

        // ?????? ??????
        return oTokenReqDto;
    }

    /**
     * ??????????????? ????????? ??????, ?????? ??????
     */
    @Override
    public UserInfoResDto updateUserDetailInfo(UserInfoReqDto userInfoReqDto) {
        UserInfoResDto userInfoResDto = null;
        Long userId = userInfoReqDto.getId();
        User user = getUserById(userId).get();
        //????????? ????????? ?????? ??? ?????? ??? ????????? ????????????
        UserProfileImgDto userProfileImgDto = profileImageHandler.parseFileInfo(userInfoReqDto.getProfileImage());

        int stageCode = (user.getStudentNumber().charAt(0) - '0') * 10
                + user.getStudentNumber().charAt(1) - '0' + 100;

        // Wish Position, Introduce ??????
        userRepositorySupport.updateUserDetailInfo(userInfoReqDto, userProfileImgDto);

        /*
         * Wish Track ??????
         */
        // ????????? WishTrack
        List<TrackReqDto> updateWishTracks = userInfoReqDto.getWishTracks();
        // ?????? WishTrack
        List<TrackReqDto> originWishTracks = userRepositorySupport.selectUserWishTrackByUserId(userId);

        int updateWishTracksSize = updateWishTracks.size();
        int originWishTracksSize = originWishTracks.size();

        boolean updateWishTracksCheck[] = new boolean[updateWishTracksSize];
        boolean originWishTracksCheck[] = new boolean[originWishTracksSize];

        // ??????, ?????? ??????
        for (int i = 0; i < updateWishTracksSize; i++) {
            for (int j = 0; j < originWishTracksSize; j++) {
                if (updateWishTracks.get(i).getCodeName().equals(originWishTracks.get(j).getCodeName())) {
                    updateWishTracksCheck[i] = true;
                    originWishTracksCheck[j] = true;
                }
            }
        }

        // updateWishTracksCheck??? false ?????? ????????? Track
        for (int i = 0; i < updateWishTracksSize; i++) {
            if (updateWishTracksCheck[i]) continue;
            Mapping mapping = mappingRepositorySupport.selectMapping(updateWishTracks.get(i).getCode(), stageCode);
            wishTrackRepositorySupport.insertWishTrack(userId, mapping.getId());

        }

        // originWishTracksCheck??? false?????? ????????? Track
        for (int i = 0; i < originWishTracksSize; i++) {
            if (originWishTracksCheck[i]) continue;
            Mapping mapping = mappingRepositorySupport.selectMapping(originWishTracks.get(i).getCode(), stageCode);

            userRepositorySupport.deleteUserWishTrack(userId, mapping.getId());
        }


        /*
         * Skill ??????
         */
        // ???????????? Skills
        List<SkillResDto> updateSkills = userInfoReqDto.getSkills();
        // ?????? Skills
        List<SkillResDto> originSkills = userRepositorySupport.selectUserSkillByUserId(userInfoReqDto.getId());

        int updateSkillsSize = updateSkills.size();
        int originSkillsSize = originSkills.size();

        boolean updateSkillsCheck[] = new boolean[updateSkillsSize];
        boolean originSkillsCheck[] = new boolean[originSkillsSize];

        // ??????, ?????? ??????
        for (int i = 0; i < updateSkillsSize; i++) {
            for (int j = 0; j < originSkillsSize; j++) {
                if (updateSkills.get(i).getCodeName().equals(originSkills.get(j).getCodeName())) {
                    updateSkillsCheck[i] = true;
                    originSkillsCheck[j] = true;
                }
            }
        }

        // updateSkillsCheck??? false ?????? ????????? Skill
        for (int i = 0; i < updateSkillsSize; i++) {
            if (updateSkillsCheck[i]) continue;
            userSkillRepositorySupport.insertSkiil(userId, updateSkills.get(i).getCode());
        }

        // originSkillsCheck??? false ?????? ????????? Skill
        for (int i = 0; i < originSkillsSize; i++) {
            if (originSkillsCheck[i]) continue;
            userRepositorySupport.deleteUserSkill(userId, originSkills.get(i).getCode());
        }

        //????????? ??????????????? ?????? select??? ????????? ????????? updated????????? ??????
        //????????? ???????????? ????????? ?????? Dto??? ??????
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
     * ???????????? ????????????
     */
    @Override
    public boolean changePassword(PasswordReqDto passwordReq) {

        Optional<User> oUser = getUserByEmail(passwordReq.getEmail());
        User user = null;

        if(!oUser.isPresent()) {
            return false;
        } else {
          user = oUser.get();
        }

        if(passwordEncoder.matches(passwordReq.getOriPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(passwordReq.getModPassword()));
            userRepository.save(user);

            return true;
        }

        return false;
    }

    /**
     * ???????????? ????????? ??????
     */
    @Override
    public short initPassword(String email) {
        Optional<User> oUser = getUserByEmail(email);
        User user = null;
        String tmpPwd = "";


        if(!oUser.isPresent()) {
            return 0;
        } else {
            user = oUser.get();
        }

        //10?????? ?????? ???????????? ??????
        tmpPwd = randomPwdUtil.getRandomPwd();

        //?????? ???????????? ??????
        user.setTempPassword(passwordEncoder.encode(tmpPwd));
        userRepository.save(user);

        try {
            //?????? ?????? ??????
            MailDto mailDto = MailDto.builder()
                    .address(email)
                    .title("TeamGu ????????? ??????????????????")
                    .message("?????? ???????????? : " + tmpPwd)
                    .build();

            mailService.sendMail(mailDto);
        } catch (Exception e) {
            log.error("?????? ????????? ?????????????????????.");

            return -1;
        }

        return 1;
    }

    /**
     * ?????? ??????????????? ????????? ??? ?????? ??????????????? ??????, ?????? ??????????????? ???????????? ??????
     */

    public void modifyOriginPwd(User user, String tempPwd) {
        user.setPassword(tempPwd);
        user.setTempPassword("");
        userRepository.save(user);
    }

    /**
     * ??????????????? ????????? ?????? ??????
     */
    @Override
    public UserInfoResDto getUserDetailInfo(Long userId) {
        User user = userRepository.getOne(userId);
        UserInfoResDto userInfoRes = new UserInfoResDto();

        Long id = user.getId();
        String studentNumber = user.getStudentNumber();

        // User Index Number
        userInfoRes.setId(id);

        // User ??????
        userInfoRes.setName(user.getName());

        String profileServerName = user.getProfileServerName();
        String profileExtension = user.getProfileExtension();
        String profilePath = serverUrl + profileServerName + "." + profileExtension;
        short userRole = user.getRole();
        userInfoRes.setImg(profilePath);

        // User Role
        userInfoRes.setRole(userRole);

        // User ?????????
        userInfoRes.setEmail(user.getEmail());

        // ???????????? ????????? ??????
        if (userRole == 1) {

            // User ??????
            userInfoRes.setMajor(user.getMajor());

            // User ??????
            userInfoRes.setStudentNumber(studentNumber);

            // User ?????? ?????? ??????
            List<SkillResDto> skills = userRepositorySupport.selectUserSkillByUserId(id);
            userInfoRes.setSkills(skills);

            // User Position ??????
            String position = codeDetailRepositorySupport.findPositionName(user.getWishPositionCode());
            userInfoRes.setWishPositionCode(position);

            // User Introduce ??????
            userInfoRes.setIntroduce(user.getIntroduce());

            // User ???????????? ?????? ??????
            List<UserInfoProjectResDto> projects = userRepositorySupport.selectUserProjectByUserId(id);
            userInfoRes.setProjects(projects);

            // User ?????? ?????? ??????
            List<UserInfoAwardResDto> awards = userRepositorySupport.selectUserAwardByUserId(id);
            userInfoRes.setAwards(awards);

            // User Wish Track ??????
            List<TrackReqDto> tracks = userRepositorySupport.selectUserWishTrackByUserId(id);
            userInfoRes.setWishTrack(tracks);

            // User Class ??????
            int stage = studentNumber.charAt(1) - '0';
            UserClassResDto userClass = userRepositorySupport.selectUserClassByUserId(id, stage);
            userInfoRes.setUserClass(userClass);

            //User ProjectCodes ??????
            List<Integer> projectCodes = userRepositorySupport.selectUserProjectCodes(id);
            userInfoRes.setProjectCodes(projectCodes);

        }

        return userInfoRes;

    }

//	/**
//	 * ???????????? ????????? ??????, ?????? ??????
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
//			// ??????
//			if (!projectRepository.findByName(project.getName()).isPresent()) {
//				projectRepository.save(userProject);
//			} else { // ??????
//				projectRepositorySuport.modProjects(userProject, user.getEmail());
//			}
//		}
//	}

    /*
     * User Info Project ??????
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
     * User Info Project ??????
     */
    @Override
    public List<UserInfoProjectResDto> updateUserInfoProject(UserInfoProjectResDto userInfoProjectResDto) {

        int positionCode = codeDetailRepositorySupport.findPositionCode(userInfoProjectResDto.getPosition());
        userRepositorySupport.updateUserInfoProject(userInfoProjectResDto, positionCode);
        return userRepositorySupport.selectUserProjectByUserId(userInfoProjectResDto.getUserId());
    }

    /*
     * User Info Project ??????
     */
    @Override
    public void deleteUserInfoProject(Long id) {
        // TODO Auto-generated method stub
        userRepositorySupport.deleteUserInfoProject(id);
    }

//	/**
//	 * ???????????? ????????? ??????, ?????? ??????
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
//			// ??????
//			if (!awardRepository.findByName(award.getName()).isPresent()) {
//				awardRepository.save(userAward);
//			} else { // ??????
//				awardRepositorySuport.modAwards(userAward, user.getEmail());
//			}
//		}
//	}

    /*
     * User Info Award ??????
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
     * User Info Award ??????
     */
    @Override
    public List<UserInfoAwardResDto> updateUserInfoAward(UserInfoAwardResDto userInfoAwardResDto) {
        // TODO Auto-generated method stub
        userRepositorySupport.updateUserInfoAward(userInfoAwardResDto);
        return userRepositorySupport.selectUserAwardByUserId(userInfoAwardResDto.getUserId());
    }

    /*
     * User Info Award ??????
     */
    @Override
    public void deleteUserInfoAward(Long id) {
        // TODO Auto-generated method stub
        userRepositorySupport.deleteUserInfoAward(id);
    }

    /**
     * ??????????????? ???????????? ????????? ????????? ?????? ?????? ??????
     *
     * @param auth
     * @return
     */
    @Override
    public String getInfoOfJwt(String auth) {
        log.info(auth);

        if(StringUtils.isEmpty(auth)) {
            log.error("Token??? ???????????? ????????????");

            return null;
        }

        String token = auth.substring(7);
        Authentication authentication = jwtTokenUtil.getAuthentication(token);

        log.info("???????????? ?????? ????????? : '{}'", authentication.getName());

        return token;
    }

    /**
     * ?????? ?????? ????????? ?????? ??????
     * ??? ?????? ??????
     *
     * @param auth
     * @return
     */
    @Override
    public LoginResDto reqInfo(String auth) {

        log.info(auth);

        if (StringUtils.isEmpty(auth)) {
            return null;
//            throw new RuntimeException("Access Token??? ???????????? ????????????");
        }

        String token = auth.substring(7);

        // 1) access token ??????
        if (!jwtTokenUtil.validateToken(token)) {
            return null;
//            throw new RuntimeException("Access Token??? ?????????????????????.");
        }

        // 2) Auth ????????????
        Authentication authentication = jwtTokenUtil.getAuthentication(token);

        // 3. ????????? ???????????? email??? ???????????? ?????? ?????? ??????
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
        	log.error(users.size()+"?????? ????????? ??????????????????.");
            return false;
        }
        return true;
    }
}
