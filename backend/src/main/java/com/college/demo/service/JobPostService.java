package com.college.demo.service;
import com.college.demo.model.JobPost;
import com.college.demo.repository.JobPostRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobPostService {
    private final JobPostRepository repository;
    
    public JobPostService(JobPostRepository repository) {
        this.repository = repository;
    }

    public JobPost postJob(JobPost jobPost) {
        return repository.save(jobPost);
    }
    public List<JobPost> getAllJobs() {
        return repository.findAll();
    }

    public List<JobPost> getByAuthor(String author) {
        return repository.findByAuthor(author);
    }
}

