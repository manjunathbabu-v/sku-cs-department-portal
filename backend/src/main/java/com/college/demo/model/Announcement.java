package com.college.demo.model;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "announcements")
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;
    private String author;
    private String department;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date = new Date();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
}