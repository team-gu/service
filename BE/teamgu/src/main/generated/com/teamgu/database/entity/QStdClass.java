package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStdClass is a Querydsl query type for StdClass
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QStdClass extends EntityPathBase<StdClass> {

    private static final long serialVersionUID = 410028163L;

    public static final QStdClass stdClass = new QStdClass("stdClass");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Integer> name = createNumber("name", Integer.class);

    public final NumberPath<Integer> projectCode = createNumber("projectCode", Integer.class);

    public final NumberPath<Integer> stageCode = createNumber("stageCode", Integer.class);

    public final ListPath<UserClass, QUserClass> userClass = this.<UserClass, QUserClass>createList("userClass", UserClass.class, QUserClass.class, PathInits.DIRECT2);

    public QStdClass(String variable) {
        super(StdClass.class, forVariable(variable));
    }

    public QStdClass(Path<? extends StdClass> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStdClass(PathMetadata metadata) {
        super(StdClass.class, metadata);
    }

}

