package com.iqac.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Training_Development")
public class TrainingDevelopment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyDetails faculty;

    private Integer trainingsAttended; // Number of training or professional development programs attended
    private Integer certificationsObtained; // Number of certifications obtained
    private Integer workshopsConducted; // Number of workshops conducted by the faculty
    private Integer onlineCoursesCompleted; // Number of online courses completed

    // Getters and Setters
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

    public Integer getTrainingsAttended() {
        return trainingsAttended;
    }

    public void setTrainingsAttended(Integer trainingsAttended) {
        this.trainingsAttended = trainingsAttended;
    }

    public Integer getCertificationsObtained() {
        return certificationsObtained;
    }

    public void setCertificationsObtained(Integer certificationsObtained) {
        this.certificationsObtained = certificationsObtained;
    }

    public Integer getWorkshopsConducted() {
        return workshopsConducted;
    }

    public void setWorkshopsConducted(Integer workshopsConducted) {
        this.workshopsConducted = workshopsConducted;
    }

    public Integer getOnlineCoursesCompleted() {
        return onlineCoursesCompleted;
    }

    public void setOnlineCoursesCompleted(Integer onlineCoursesCompleted) {
        this.onlineCoursesCompleted = onlineCoursesCompleted;
    }

}
