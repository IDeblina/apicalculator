package com.iqac.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Administrative_Contribution")
public class AdministrativeContribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyDetails faculty;

    private Integer committeesLed;
    private Integer eventsOrganized;
    private Integer leadershipRoles;

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

    public Integer getCommitteesLed() {
        return committeesLed;
    }

    public void setCommitteesLed(Integer committeesLed) {
        this.committeesLed = committeesLed;
    }

    public Integer getEventsOrganized() {
        return eventsOrganized;
    }

    public void setEventsOrganized(Integer eventsOrganized) {
        this.eventsOrganized = eventsOrganized;
    }

    public Integer getLeadershipRoles() {
        return leadershipRoles;
    }

    public void setLeadershipRoles(Integer leadershipRoles) {
        this.leadershipRoles = leadershipRoles;
    }

}
