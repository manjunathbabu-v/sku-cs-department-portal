package com.college.demo.service;
import com.college.demo.model.StudyMaterial;
import com.college.demo.repository.StudyMaterialRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudyMaterialService {
    private final StudyMaterialRepository repository;
    public StudyMaterialService(StudyMaterialRepository repository) {
        this.repository = repository;
    }

    public StudyMaterial uploadMaterial(StudyMaterial material) {
        return repository.save(material);
    }

    public List<StudyMaterial> getAll() {
        return repository.findAll();
    }

    public List<StudyMaterial> getByUploader(String name) {
        return repository.findByUploadedBy(name);
    }

    public List<StudyMaterial> getByDepartment(String department) {
        return repository.findByDepartment(department);
    }
}
