package com.teamgu.database.repository;

import com.teamgu.database.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPoolRepository extends JpaRepository<User, Long>, UserPoolRepositoryCustom {
}
