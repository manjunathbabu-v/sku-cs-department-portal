package com.college.demo.controller;

import com.college.demo.dto.LoginRequest;
import com.college.demo.dto.RegisterRequest;
import com.college.demo.model.User;
import com.college.demo.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        boolean success = authService.register(req);

        if (success) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Registration successful"
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email already exists or invalid data"
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User user = authService.login(req);

        if (user != null) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", user
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Invalid email or password"
            ));
        }
    }
}