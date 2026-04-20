package com.college.demo.repository;
import com.college.demo.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByPostedBy(String postedBy);
}