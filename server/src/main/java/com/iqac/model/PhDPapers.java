package com.iqac.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PhD_Papers")
public class PhDPapers{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyDetails faculty;

    private Integer papersSupervised;
    private Integer thesesGuided;

    public PhDPapers() {
    }

    public PhDPapers(FacultyDetails faculty, Integer papersSupervised, Integer thesesGuided) {
        this.faculty = faculty;
        this.papersSupervised = papersSupervised;
        this.thesesGuided = thesesGuided;
    }

    public FacultyDetails getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDetails faculty) {
        this.faculty = faculty;
    }

    public Integer getPapersSupervised() {
        return papersSupervised;
    }

    public void setPapersSupervised(Integer papersSupervised) {
        this.papersSupervised = papersSupervised;
    }

    public Integer getThesesGuided() {
        return thesesGuided;
    }

    public void setThesesGuided(Integer thesesGuided) {
        this.thesesGuided = thesesGuided;
    }
}
