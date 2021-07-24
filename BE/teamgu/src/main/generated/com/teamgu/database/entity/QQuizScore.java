package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizScore is a Querydsl query type for QuizScore
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuizScore extends EntityPathBase<QuizScore> {

    private static final long serialVersionUID = -1712121969L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuizScore quizScore = new QQuizScore("quizScore");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final QUser user;

    public QQuizScore(String variable) {
        this(QuizScore.class, forVariable(variable), INITS);
    }

    public QQuizScore(Path<? extends QuizScore> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuizScore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuizScore(PathMetadata metadata, PathInits inits) {
        this(QuizScore.class, metadata, inits);
    }

    public QQuizScore(Class<? extends QuizScore> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

