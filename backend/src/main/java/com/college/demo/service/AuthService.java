package com.college.demo.service;

import com.college.demo.dto.LoginRequest;
import com.college.demo.dto.RegisterRequest;
import com.college.demo.model.Role;
import com.college.demo.model.User;
import com.college.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    public boolean register(RegisterRequest req) {
        try {
            System.out.println("REGISTER REQUEST: " + req.getEmail());

            // ✅ Check duplicate email
            if (userRepo.existsByEmail(req.getEmail())) {
                System.out.println("Email already exists");
                return false;
            }

            // ✅ Create user
            User user = new User();
            user.setName(req.getName());
            user.setEmail(req.getEmail());
            user.setPassword(req.getPassword());

            // 🔥 FIX: String → Enum conversion
            Role role = Role.valueOf(req.getRole().toUpperCase());
            user.setRole(role);

            user.setDepartment(req.getDepartment());

            // ✅ Only students have roll number
            if (role == Role.STUDENT) {
                user.setRollNumber(req.getRollNumber());
            }

            // ✅ Save to DB
            User savedUser = userRepo.save(user);

            System.out.println("USER SAVED ID: " + savedUser.getId());

            return true;

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 shows real error in console
            return false;
        }
    }

    public User login(LoginRequest req) {
        return userRepo.findByEmail(req.getEmail())
                .filter(user -> user.getPassword().equals(req.getPassword()))
                .orElse(null);
    }
}