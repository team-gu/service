package com.teamgu.database.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User extends BaseEntity{
	short role;
	@Column(length = 20)
	String name;
	@Column(length = 40)
	String email;
	
	String password;
	@Column(length = 45)
	String refreshToken;
	@Column(length = 7)
	String studentNumber;
	@Column(length = 1000)
	String introduce;
	int wishPosition;
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Skill> skills = new ArrayList<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL )
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Team> teams = new ArrayList<>();
	
	@OneToMany(mappedBy="user" )
	private List<UserTeam> userTeams = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<Conference> conferences = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<Notice> notices = new ArrayList<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<WishTrack> wishTracks = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<UserFollow> fromuserFollows = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<UserFollow> toUserFollows = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<Quiz> quizs = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<QuizScore> quizScores = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserAward> userAward;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserProject> userProject;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private UserFile userFile;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserClass> userClass;

	@OneToMany(mappedBy = "user")
	private List<Chat> chat;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<UserChat> userChat;
	
	
	public User() {}


	@Builder
    public User(Long id, String email, String password){
        this.id = id;
        this.email = email;
        this.password = password;
    }

}
