package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserClass is a Querydsl query type for UserClass
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserClass extends EntityPathBase<UserClass> {

    private static final long serialVersionUID = 958739135L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserClass userClass = new QUserClass("userClass");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final QStdClass classInfo;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QUser user;

    public QUserClass(String variable) {
        this(UserClass.class, forVariable(variable), INITS);
    }

    public QUserClass(Path<? extends UserClass> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserClass(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserClass(PathMetadata metadata, PathInits inits) {
        this(UserClass.class, metadata, inits);
    }

    public QUserClass(Class<? extends UserClass> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.classInfo = inits.isInitialized("classInfo") ? new QStdClass(forProperty("classInfo")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

