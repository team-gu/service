package com.teamgu.database.entity;

import java.util.Date;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class NoticeFile extends BaseEntity {
    @Column(length = 120)
    String originalName;
    @Column(length = 45)
    String name;
    @Column(length = 45)
    String extension;
    Date registDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;
}
