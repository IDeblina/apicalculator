package com.iqac.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Teacher_Performance")
public class TeacherPerformance{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyDetails faculty;

    private Double performanceScore;
    private Integer teachingExperienceYears;
    private Double feedbackScore;
    private Integer coursesTaught;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FacultyDetails getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDetails faculty) {
        this.faculty = faculty;
    }

    public Double getPerformanceScore() {
        return performanceScore;
    }

    public void setPerformanceScore(Double performanceScore) {
        this.performanceScore = performanceScore;
    }

    public Integer getTeachingExperienceYears() {
        return teachingExperienceYears;
    }

    public void setTeachingExperienceYears(Integer teachingExperienceYears) {
        this.teachingExperienceYears = teachingExperienceYears;
    }

    public Double getFeedbackScore() {
        return feedbackScore;
    }

    public void setFeedbackScore(Double feedbackScore) {
        this.feedbackScore = feedbackScore;
    }

    public Integer getCoursesTaught() {
        return coursesTaught;
    }

    public void setCoursesTaught(Integer coursesTaught) {
        this.coursesTaught = coursesTaught;
    }
}