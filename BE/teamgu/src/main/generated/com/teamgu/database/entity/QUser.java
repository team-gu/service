package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1718418887L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final ListPath<Chat, QChat> chat = this.<Chat, QChat>createList("chat", Chat.class, QChat.class, PathInits.DIRECT2);

    public final ListPath<Conference, QConference> conferences = this.<Conference, QConference>createList("conferences", Conference.class, QConference.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<UserFollow, QUserFollow> fromuserFollows = this.<UserFollow, QUserFollow>createList("fromuserFollows", UserFollow.class, QUserFollow.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduce = createString("introduce");

    public final StringPath name = createString("name");

    public final ListPath<Notice, QNotice> notices = this.<Notice, QNotice>createList("notices", Notice.class, QNotice.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final ListPath<Quiz, QQuiz> quizs = this.<Quiz, QQuiz>createList("quizs", Quiz.class, QQuiz.class, PathInits.DIRECT2);

    public final ListPath<QuizScore, QQuizScore> quizScores = this.<QuizScore, QQuizScore>createList("quizScores", QuizScore.class, QQuizScore.class, PathInits.DIRECT2);

    public final StringPath refreshToken = createString("refreshToken");

    public final NumberPath<Short> role = createNumber("role", Short.class);

    public final ListPath<Skill, QSkill> skills = this.<Skill, QSkill>createList("skills", Skill.class, QSkill.class, PathInits.DIRECT2);

    public final StringPath studentNumber = createString("studentNumber");

    public final ListPath<Team, QTeam> teams = this.<Team, QTeam>createList("teams", Team.class, QTeam.class, PathInits.DIRECT2);

    public final ListPath<UserFollow, QUserFollow> toUserFollows = this.<UserFollow, QUserFollow>createList("toUserFollows", UserFollow.class, QUserFollow.class, PathInits.DIRECT2);

    public final ListPath<UserAward, QUserAward> userAward = this.<UserAward, QUserAward>createList("userAward", UserAward.class, QUserAward.class, PathInits.DIRECT2);

    public final ListPath<UserChat, QUserChat> userChat = this.<UserChat, QUserChat>createList("userChat", UserChat.class, QUserChat.class, PathInits.DIRECT2);

    public final ListPath<UserClass, QUserClass> userClass = this.<UserClass, QUserClass>createList("userClass", UserClass.class, QUserClass.class, PathInits.DIRECT2);

    public final QUserFile userFile;

    public final ListPath<UserProject, QUserProject> userProject = this.<UserProject, QUserProject>createList("userProject", UserProject.class, QUserProject.class, PathInits.DIRECT2);

    public final ListPath<UserTeam, QUserTeam> userTeams = this.<UserTeam, QUserTeam>createList("userTeams", UserTeam.class, QUserTeam.class, PathInits.DIRECT2);

    public final NumberPath<Integer> wishPosition = createNumber("wishPosition", Integer.class);

    public final ListPath<WishTrack, QWishTrack> wishTracks = this.<WishTrack, QWishTrack>createList("wishTracks", WishTrack.class, QWishTrack.class, PathInits.DIRECT2);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userFile = inits.isInitialized("userFile") ? new QUserFile(forProperty("userFile"), inits.get("userFile")) : null;
    }

}

