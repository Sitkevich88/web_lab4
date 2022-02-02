package ru.itmo.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.itmo.model.User;
import ru.itmo.services.AreaHitService;
import ru.itmo.services.UserService;
import ru.itmo.dto.PointRequest;
import ru.itmo.dto.PointResponse;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/app")
public class AreaHitController {

    private final UserService userService;
    private final AreaHitService areaHitService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path = "/hit", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    PointResponse hit(@RequestBody PointRequest request) {
        String login  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByLogin(login);
        return areaHitService.savePoint(request, user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = "/clear", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<PointResponse> removeAll() {
        String login  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByLogin(login);
        return areaHitService.clearPoints(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/points", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<PointResponse> getAll() {
        String login  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getByLogin(login);
        return areaHitService.getPoints(user);
    }
}
