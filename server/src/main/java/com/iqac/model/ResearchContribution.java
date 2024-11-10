package com.iqac.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Research_Contribution")
public class ResearchContribution{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyDetails faculty;

    private Integer papersPublished;
    private Integer projectsCompleted;
    private Integer conferencesAttended;

    // Getters and Setters


    public FacultyDetails getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDetails faculty) {
        this.faculty = faculty;
    }

    public Integer getPapersPublished() {
        return papersPublished;
    }

    public void setPapersPublished(Integer papersPublished) {
        this.papersPublished = papersPublished;
    }

    public Integer getProjectsCompleted() {
        return projectsCompleted;
    }

    public void setProjectsCompleted(Integer projectsCompleted) {
        this.projectsCompleted = projectsCompleted;
    }

    public Integer getConferencesAttended() {
        return conferencesAttended;
    }

    public void setConferencesAttended(Integer conferencesAttended) {
        this.conferencesAttended = conferencesAttended;
    }
}
