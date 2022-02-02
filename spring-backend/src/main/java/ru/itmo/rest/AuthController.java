package ru.itmo.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;
import ru.itmo.dto.Credentials;
import ru.itmo.dto.JwtResponse;
import ru.itmo.jwt.JwtUtil;
import ru.itmo.model.User;
import ru.itmo.services.UserService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;


    @PostMapping(path = "/signin", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signIn(@RequestBody Credentials authenticationRequest) throws Exception {

        try {
            authenticationManager.
                    authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = service.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping(path = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signUp( @RequestBody Credentials authenticationRequest) {

        boolean unique = service.isLoginUnique(authenticationRequest.getUsername());
        if (!unique){
            throw new BadCredentialsException("User already exists");
        }
        User user = service.saveUser(authenticationRequest);
        try {
            authenticationManager.
                    authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    authenticationRequest.getUsername(),
                                    authenticationRequest.getPassword()
                            )
                    );
        }
        catch (BadCredentialsException e) {
            System.out.println("It should not have happened"); //should not happen
        }




        final UserDetails userDetails = service.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

}
