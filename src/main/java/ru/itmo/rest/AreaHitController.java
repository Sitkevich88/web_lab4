package ru.itmo.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.itmo.model.User;
import ru.itmo.services.AreaHitService;
import ru.itmo.services.UserService;
import ru.itmo.web_objects.PointRequest;
import ru.itmo.web_objects.PointResponse;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AreaHitController {

    private final UserService userService;
    private final AreaHitService areaHitService;

    @PostMapping(path = "/app/hit", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    PointResponse hit(@RequestBody PointRequest request) {
        String login  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByLogin(login);
        return areaHitService.savePoint(request, user);
    }

    @DeleteMapping(path = "/app/clear", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<PointResponse> getAll() {
        String login  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByLogin(login);
        return areaHitService.clearPoints(user);
    }
}
