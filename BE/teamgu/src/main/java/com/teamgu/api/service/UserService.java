package com.teamgu.api.service;

import java.util.Optional;

import com.teamgu.database.entity.User;

/**
 * 사용자 관련 비즈니스 로직
 * */
public interface UserService {
	Optional<User> getUserByEmail(String email);
	void save(User user);
}
