package com.college.demo.controller;
import com.college.demo.model.JobPost;
import com.college.demo.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/job-posts")
@CrossOrigin
public class JobPostController {
    @Autowired
    private JobPostService service;
    @PostMapping
    public JobPost post(@RequestBody JobPost jobPost) {
        return service.postJob(jobPost);
    }
    @GetMapping
    public List<JobPost> getAll() {
        return service.getAllJobs();
    }
    @GetMapping("/by-author/{author}")
    public List<JobPost> getByAuthor(@PathVariable String author) {
        return service.getByAuthor(author);
    }
}

