package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QProjectDetail is a Querydsl query type for ProjectDetail
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QProjectDetail extends EntityPathBase<ProjectDetail> {

    private static final long serialVersionUID = 245505564L;

    public static final QProjectDetail projectDetail = new QProjectDetail("projectDetail");

    public final DateTimePath<java.util.Date> activeDate = createDateTime("activeDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> endDate = createDateTime("endDate", java.util.Date.class);

    public final NumberPath<Integer> projectCode = createNumber("projectCode", Integer.class);

    public final NumberPath<Integer> stageCode = createNumber("stageCode", Integer.class);

    public final DateTimePath<java.util.Date> startDate = createDateTime("startDate", java.util.Date.class);

    public QProjectDetail(String variable) {
        super(ProjectDetail.class, forVariable(variable));
    }

    public QProjectDetail(Path<? extends ProjectDetail> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProjectDetail(PathMetadata metadata) {
        super(ProjectDetail.class, metadata);
    }

}

