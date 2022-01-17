package ru.itmo.resources;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.model.AreaHit;
import ru.itmo.model.User;

import java.util.List;

public interface AreaHitRepository extends JpaRepository<AreaHit, Long> {
    List<AreaHit> findAllByUser(User user);

    void deleteByUser(User user);
}
