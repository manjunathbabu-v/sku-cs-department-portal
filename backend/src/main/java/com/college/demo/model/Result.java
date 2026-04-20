package com.college.demo.model;
import jakarta.persistence.*;

@Entity
@Table(name = "results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    private String studentName;
    private String rollNumber;
    private String department;
    private String subject;
    private int marks;
    private String status;
    private String postedBy;
    
    @PrePersist
    @PreUpdate
    public void normalize() {
        if (this.department != null) {
            this.department = this.department.trim().toUpperCase().replace(".", "");
        }
        if (this.rollNumber != null) {
            this.rollNumber = this.rollNumber.trim();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPostedBy() { return postedBy; }
    public void setPostedBy(String postedBy) { this.postedBy = postedBy; }
}