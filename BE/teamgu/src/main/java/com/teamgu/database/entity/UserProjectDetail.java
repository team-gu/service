package com.teamgu.database.entity;

import com.teamgu.database.entity.pk.UserProjectDetailPK;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@IdClass(UserProjectDetailPK.class)
public class UserProjectDetail {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private ProjectDetail projectDetail;
}
