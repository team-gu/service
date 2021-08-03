package com.teamgu.database.entity.pk;

import com.teamgu.database.entity.ProjectDetail;
import com.teamgu.database.entity.User;

import java.io.Serializable;

public class UserProjectDetailPK implements Serializable {
    User user;
    ProjectDetail projectDetail;
}
