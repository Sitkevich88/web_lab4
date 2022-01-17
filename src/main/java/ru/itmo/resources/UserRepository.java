package ru.itmo.resources;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}
