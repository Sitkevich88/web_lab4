package ru.itmo.services;


import org.springframework.data.domain.Example;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.itmo.model.User;
import ru.itmo.resources.UserRepository;

import java.util.HashSet;

@Service
public class UserService implements UserDetailsService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getByLogin(String login) {
        return repository.findByLogin(login);
    }

    public boolean saveUser(User user){
        boolean exists = repository.exists(Example.of(user));
        if (!exists) {
            repository.save(user);
        }
        return !exists;
    }

    public boolean isLoginUnique(String login){
        User user = repository.findByLogin(login);
        if (user==null){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User u = getByLogin(login);
        if (u==null) {
            throw new UsernameNotFoundException(String.format("User %s is not found", login));
        }
        return new org.springframework.security.core.userdetails.User(u.getLogin(), u.getPassword(), true, true, true, true, new HashSet<>());
    }
}
