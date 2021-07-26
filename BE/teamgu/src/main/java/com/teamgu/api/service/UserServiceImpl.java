package com.teamgu.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamgu.database.entity.User;
import com.teamgu.database.repository.UserRepository;
@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public Optional<User> getUserByEmail(String email) {
		Optional<User> user = userRepository.findUserByEmail(email);
		return user;
	}
	@Override
	public boolean save(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
	    if(userRepository.save(user)==null)return false;
	    return true;
	}
	@Override
	public void setRefreshToken(String refreshToken, User user) {
		user.setRefreshToken(refreshToken);
		userRepository.save(user);
	}

}
