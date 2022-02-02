package ru.itmo.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;

@Service
public class MyPasswordEncoder extends BCryptPasswordEncoder {
    public MyPasswordEncoder() {
        super(12);
    }

}
