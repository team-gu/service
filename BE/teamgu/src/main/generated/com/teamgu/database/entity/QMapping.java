package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMapping is a Querydsl query type for Mapping
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMapping extends EntityPathBase<Mapping> {

    private static final long serialVersionUID = -717077600L;

    public static final QMapping mapping = new QMapping("mapping");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Integer> projectCode = createNumber("projectCode", Integer.class);

    public final NumberPath<Integer> stageCode = createNumber("stageCode", Integer.class);

    public final ListPath<Team, QTeam> teams = this.<Team, QTeam>createList("teams", Team.class, QTeam.class, PathInits.DIRECT2);

    public final NumberPath<Integer> trackCode = createNumber("trackCode", Integer.class);

    public final ListPath<WishTrack, QWishTrack> wishTracks = this.<WishTrack, QWishTrack>createList("wishTracks", WishTrack.class, QWishTrack.class, PathInits.DIRECT2);

    public QMapping(String variable) {
        super(Mapping.class, forVariable(variable));
    }

    public QMapping(Path<? extends Mapping> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMapping(PathMetadata metadata) {
        super(Mapping.class, metadata);
    }

}

