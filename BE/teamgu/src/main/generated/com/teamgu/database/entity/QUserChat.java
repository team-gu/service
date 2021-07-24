package com.teamgu.database.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserChat is a Querydsl query type for UserChat
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserChat extends EntityPathBase<UserChat> {

    private static final long serialVersionUID = -1216002767L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserChat userChat = new QUserChat("userChat");

    public final QChat chat;

    public final QChatRoom chatRoom;

    public final QUser user;

    public QUserChat(String variable) {
        this(UserChat.class, forVariable(variable), INITS);
    }

    public QUserChat(Path<? extends UserChat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserChat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserChat(PathMetadata metadata, PathInits inits) {
        this(UserChat.class, metadata, inits);
    }

    public QUserChat(Class<? extends UserChat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chat = inits.isInitialized("chat") ? new QChat(forProperty("chat"), inits.get("chat")) : null;
        this.chatRoom = inits.isInitialized("chatRoom") ? new QChatRoom(forProperty("chatRoom")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

