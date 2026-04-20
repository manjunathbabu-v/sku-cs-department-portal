package com.college.demo.controller;
import com.college.demo.model.Announcement;
import com.college.demo.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/announcements")
@CrossOrigin
public class AnnouncementController {

    @Autowired
    private AnnouncementService service;

    @PostMapping
    public ResponseEntity<Announcement> create(@RequestBody Announcement announcement) {
        return new ResponseEntity<>(service.save(announcement), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Announcement> getAll() {
        return service.getAll();
    }

    @GetMapping("/by-author/{author}")
    public List<Announcement> getByAuthor(@PathVariable String author) {
        return service.getByAuthor(author);
    }
}
