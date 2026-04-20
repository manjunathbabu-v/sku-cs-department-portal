package com.college.demo.service;
import com.college.demo.model.Announcement;
import com.college.demo.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementRepository repo;
    public Announcement save(Announcement announcement) {
        return repo.save(announcement);
    }
    public List<Announcement> getAll() {
        return repo.findAll();
    }
    public List<Announcement> getByAuthor(String author) {
        return repo.findByAuthor(author);
    }
}

