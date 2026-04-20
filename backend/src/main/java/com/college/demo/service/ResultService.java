package com.college.demo.service;
import com.college.demo.model.Result;
import com.college.demo.repository.ResultRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResultService {
    private final ResultRepository repository;

    public ResultService(ResultRepository repository) {
        this.repository = repository;
    }

    public Result postResult(Result result) {
        return repository.save(result);
    }

    public List<Result> getAll() {
        return repository.findAll();
    }

    public List<Result> getByPoster(String name) {
        return repository.findByPostedBy(name);
    }
}

