package com.teamgu.database.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User extends BaseEntity{
	short role;//0:퇴소자, 1:교육생, 2:관리자, 3:총관리자
	@Column(length = 20)
	String name;
	@Column(length = 40)
	String email;
	
	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	String password;

	String refreshToken;
	@Column(length = 7)
	String studentNumber;
	@Column(length = 1000)
	String introduce;
	
	short major; // 전공 여부, 0 : Default, 1: 전공자, 2: 비전공자
	
	int wishPositionCode;
	
	/**
	 * user가 하나 삭제 됐을 때, UserConference는 삭제되어야 하지만
	 * Conference는 삭제되면 안된다.
	 * */
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval=true)	
	@OnDelete(action = OnDeleteAction.CASCADE)
	List<UserConference> userConferences = new ArrayList<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval=true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Skill> skills = new ArrayList<>();

	@OneToMany(mappedBy="user")
	private List<Team> teams = new ArrayList<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval=true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserTeam> userTeams = new ArrayList<>();
	
	@OneToMany(mappedBy="user")//cascade를 걸면 유저가 지워지면 컨퍼런스도 지워진다
	private List<Conference> conferences = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<Notice> notices = new ArrayList<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<WishTrack> wishTracks = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<UserFollow> fromuserFollows = new ArrayList<>();
	
	@OneToMany(mappedBy="userT")
	private List<UserFollow> toUserFollows = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<Quiz> quizs = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<QuizScore> quizScores = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private List<UserInfoAward> userAward = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private List<UserInfoProject> userProject = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private List<UserClass> userClass = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Chat> chats = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private List<UserChatRoom> userChatRoom = new ArrayList<>();
	
	
	/**
	 * 유저 생성 시, 기본적으로 default 값이 들어가야 한다.
	 */
	private String profileOriginName;
	
	private String profileServerName;
	
	private String profileExtension;
	
	public User() {}


	@Builder
    public User(Long id, String email, String password, String name, String studentNumber, short role, String profileExtension, String profileServerName, String profileOriginName){
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.studentNumber = studentNumber;
        this.profileExtension = profileExtension;
        this.profileServerName = profileServerName;
        this.profileOriginName = profileOriginName;
    }

}
