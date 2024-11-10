package com.iqac.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.context.annotation.Bean;

public class IQACEntity {

    @JsonProperty("faculty") // Optional: To customize the JSON field name
    private FacultyDetails faculty;

    @JsonProperty("iqacScore") // Optional: To customize the JSON field name
    private Double iqacScore;

    // Constructor with parameters
    public IQACEntity(FacultyDetails faculty, Double iqacScore) {
        this.faculty = faculty;
        this.iqacScore = iqacScore;
    }

    // Default constructor
    public IQACEntity() {
    }

    // Getter and setter for faculty
    public FacultyDetails getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDetails faculty) {
        this.faculty = faculty;
    }

    // Getter and setter for iqacScore
    public Double getIqacScore() {
        return iqacScore;
    }

    public void setIqacScore(Double iqacScore) {
        this.iqacScore = iqacScore;
    }
}