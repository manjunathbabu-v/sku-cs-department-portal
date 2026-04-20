package com.college.demo.model;
import jakarta.persistence.*;

@Entity // This tells Spring "This is a MySQL table"
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING) 
    private Role role;
    private String department;
    private String rollNumber;
    
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
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
}