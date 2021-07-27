package com.teamgu.common.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.teamgu.database.entity.User;
import com.teamgu.database.repository.UserRepository;

@Component
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userOptional = userRepository.findByEmail(username);
		User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("user email not found!"));
		
		TeamguUserDetails userDetails = new TeamguUserDetails(user);
		return userDetails;
		
	}

}
