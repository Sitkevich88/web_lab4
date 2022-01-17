package ru.itmo.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.itmo.model.AreaHit;
import ru.itmo.model.User;
import ru.itmo.resources.AreaHitRepository;
import ru.itmo.web_objects.PointRequest;
import ru.itmo.web_objects.PointResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AreaHitService {

    private final AreaHitRepository repo;
    private final AreaHitChecker checker;

    public PointResponse savePoint(PointRequest request, User user){
        PointResponse response = checker.getResponse(request);
        AreaHit areaHit = new AreaHit(null, response.getX(), response.getY(), response.getR(), response.getResult(), user);
        repo.save(areaHit);
        return response;
    }

    public List<PointResponse> getPoints(User user){
        return repo.findAllByUser(user).stream()
                .map(u-> new PointResponse(u.getX(), u.getY(), u.getR(), u.getRes()))
                .collect(Collectors.toList());
    }

    public List<PointResponse> clearPoints(User user){
        repo.deleteByUser(user);
        return new ArrayList<>();
    }

}
