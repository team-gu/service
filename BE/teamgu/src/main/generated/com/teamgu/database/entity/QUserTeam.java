package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserTeam is a Querydsl query type for UserTeam
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserTeam extends EntityPathBase<UserTeam> {

    private static final long serialVersionUID = -1215499210L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserTeam userTeam = new QUserTeam("userTeam");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QTeam team;

    public final QUser user;

    public QUserTeam(String variable) {
        this(UserTeam.class, forVariable(variable), INITS);
    }

    public QUserTeam(Path<? extends UserTeam> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserTeam(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserTeam(PathMetadata metadata, PathInits inits) {
        this(UserTeam.class, metadata, inits);
    }

    public QUserTeam(Class<? extends UserTeam> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new QTeam(forProperty("team"), inits.get("team")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

