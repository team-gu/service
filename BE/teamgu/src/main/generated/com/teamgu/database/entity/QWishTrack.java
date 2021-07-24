package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWishTrack is a Querydsl query type for WishTrack
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWishTrack extends EntityPathBase<WishTrack> {

    private static final long serialVersionUID = 660299574L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWishTrack wishTrack = new QWishTrack("wishTrack");

    public final QMapping mapping;

    public final QUser user;

    public QWishTrack(String variable) {
        this(WishTrack.class, forVariable(variable), INITS);
    }

    public QWishTrack(Path<? extends WishTrack> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWishTrack(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWishTrack(PathMetadata metadata, PathInits inits) {
        this(WishTrack.class, metadata, inits);
    }

    public QWishTrack(Class<? extends WishTrack> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mapping = inits.isInitialized("mapping") ? new QMapping(forProperty("mapping")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

