package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserProject is a Querydsl query type for UserProject
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserProject extends EntityPathBase<UserProject> {

    private static final long serialVersionUID = 1062379168L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserProject userProject = new QUserProject("userProject");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduce = createString("introduce");

    public final StringPath name = createString("name");

    public final NumberPath<Integer> positionCode = createNumber("positionCode", Integer.class);

    public final StringPath url = createString("url");

    public final QUser user;

    public QUserProject(String variable) {
        this(UserProject.class, forVariable(variable), INITS);
    }

    public QUserProject(Path<? extends UserProject> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserProject(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserProject(PathMetadata metadata, PathInits inits) {
        this(UserProject.class, metadata, inits);
    }

    public QUserProject(Class<? extends UserProject> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

