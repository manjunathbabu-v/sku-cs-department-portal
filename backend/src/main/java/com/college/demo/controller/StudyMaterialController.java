package com.college.demo.controller;
import com.college.demo.model.StudyMaterial;
import com.college.demo.service.StudyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin
public class StudyMaterialController {

    @Autowired
    private StudyMaterialService service;

    @PostMapping
    public StudyMaterial upload(@RequestBody StudyMaterial material) {
        return service.uploadMaterial(material);
    }
    @GetMapping
    public List<StudyMaterial> getAll() {
        return service.getAll();
    }
    @GetMapping("/by-uploader/{name}")
    public List<StudyMaterial> getByUploader(@PathVariable String name) {
        return service.getByUploader(name);
    }
    @GetMapping("/by-department/{department}")
    public List<StudyMaterial> getByDepartment(@PathVariable String department) {
        return service.getByDepartment(department);
    }
}

