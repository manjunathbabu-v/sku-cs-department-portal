package com.college.demo.repository;
import com.college.demo.model.StudyMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
    List<StudyMaterial> findByUploadedBy(String uploadedBy);
    List<StudyMaterial> findByDepartment(String department);
}