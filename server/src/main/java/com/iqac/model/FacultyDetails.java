package com.iqac.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Faculty_Details")
public class FacultyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String department;
    private String contactNumber;
    private LocalDate joiningDate;
    private String designation;
    private String address;

    public FacultyDetails() {
    }

    public FacultyDetails(String name, String email, String department, String contactNumber, LocalDate joiningDate, String designation, String address) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.contactNumber = contactNumber;
        this.joiningDate = joiningDate;
        this.designation = designation;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
