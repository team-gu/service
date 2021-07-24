package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserFile is a Querydsl query type for UserFile
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserFile extends EntityPathBase<UserFile> {

    private static final long serialVersionUID = -1215912107L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserFile userFile = new QUserFile("userFile");

    public final StringPath extension = createString("extension");

    public final StringPath name = createString("name");

    public final StringPath originalName = createString("originalName");

    public final DatePath<java.sql.Date> registDate = createDate("registDate", java.sql.Date.class);

    public final QUser user;

    public QUserFile(String variable) {
        this(UserFile.class, forVariable(variable), INITS);
    }

    public QUserFile(Path<? extends UserFile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserFile(PathMetadata metadata, PathInits inits) {
        this(UserFile.class, metadata, inits);
    }

    public QUserFile(Class<? extends UserFile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

