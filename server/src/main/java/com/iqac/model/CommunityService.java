package com.iqac.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Community_Service")
public class CommunityService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyDetails faculty;

    private Integer serviceHours; // Number of hours contributed to community service
    private Integer projectsParticipated; // Number of community service projects participated
    private Integer eventsOrganized; // Number of community events organized
    private Integer foreignParticipation ; // Whether they participated in international service

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

    public Integer getServiceHours() {
        return serviceHours;
    }

    public void setServiceHours(Integer serviceHours) {
        this.serviceHours = serviceHours;
    }

    public Integer getProjectsParticipated() {
        return projectsParticipated;
    }

    public void setProjectsParticipated(Integer projectsParticipated) {
        this.projectsParticipated = projectsParticipated;
    }

    public Integer getEventsOrganized() {
        return eventsOrganized;
    }

    public void setEventsOrganized(Integer eventsOrganized) {
        this.eventsOrganized = eventsOrganized;
    }

    public Integer getForeignParticipation() {
        return foreignParticipation;
    }

    public void setForeignParticipation(Integer foreignParticipation) {
        this.foreignParticipation = foreignParticipation;
    }
}
