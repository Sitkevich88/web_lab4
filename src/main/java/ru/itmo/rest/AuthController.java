package ru.itmo.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.itmo.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping(path = "/signin", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getAuthUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        //User user = (principal instanceof User) ? (User) principal : null;
        return (principal instanceof User) ? new ResponseEntity<>("Success", HttpStatus.OK) : new ResponseEntity<>("Wrong Credentials", HttpStatus.FORBIDDEN);
    }

    /*@PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestParam("username") String username,
                                          @RequestParam("password") String password) {
        boolean unique = service.isLoginUnique(username);
        if (!unique){
            return new ResponseEntity<>("This username already exists", HttpStatus.FORBIDDEN);
        }
        service.saveUser(new com.springbootsecurityrest.model.User(username, password));
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }*/
    @PostMapping("/signup")
    public String registerUser() {
        return "aaaaa"; //todo
    }
}
