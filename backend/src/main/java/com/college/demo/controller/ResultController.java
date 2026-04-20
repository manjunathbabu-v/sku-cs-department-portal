package com.college.demo.controller;
import com.college.demo.model.Result;
import com.college.demo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin
public class ResultController {
    @Autowired
    private  ResultService service;
    @PostMapping
    public Result post(@RequestBody Result result) {
        return service.postResult(result);
    }
    @GetMapping
    public List<Result> getAll() {
        return service.getAll();
    }
    @GetMapping("/by-poster/{name}")
    public List<Result> getByPoster(@PathVariable String name) {
        return service.getByPoster(name);
    }
}
