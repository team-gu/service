package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCodeDetail is a Querydsl query type for CodeDetail
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCodeDetail extends EntityPathBase<CodeDetail> {

    private static final long serialVersionUID = 1460525196L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCodeDetail codeDetail1 = new QCodeDetail("codeDetail1");

    public final QCode code;

    public final NumberPath<Integer> codeDetail = createNumber("codeDetail", Integer.class);

    public final StringPath Name = createString("Name");

    public QCodeDetail(String variable) {
        this(CodeDetail.class, forVariable(variable), INITS);
    }

    public QCodeDetail(Path<? extends CodeDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCodeDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCodeDetail(PathMetadata metadata, PathInits inits) {
        this(CodeDetail.class, metadata, inits);
    }

    public QCodeDetail(Class<? extends CodeDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.code = inits.isInitialized("code") ? new QCode(forProperty("code")) : null;
    }

}

