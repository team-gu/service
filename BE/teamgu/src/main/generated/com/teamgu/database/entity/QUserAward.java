package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserAward is a Querydsl query type for UserAward
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserAward extends EntityPathBase<UserAward> {

    private static final long serialVersionUID = 957219748L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserAward userAward = new QUserAward("userAward");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath agency = createString("agency");

    public final DatePath<java.sql.Date> date = createDate("date", java.sql.Date.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduce = createString("introduce");

    public final StringPath name = createString("name");

    public final QUser user;

    public QUserAward(String variable) {
        this(UserAward.class, forVariable(variable), INITS);
    }

    public QUserAward(Path<? extends UserAward> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserAward(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserAward(PathMetadata metadata, PathInits inits) {
        this(UserAward.class, metadata, inits);
    }

    public QUserAward(Class<? extends UserAward> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

