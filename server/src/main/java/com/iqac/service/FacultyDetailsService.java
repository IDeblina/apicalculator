package com.iqac.service;


import com.iqac.model.FacultyDetails;
import com.iqac.repository.FacultyDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyDetailsService {
    @Autowired
    private FacultyDetailsRepository facultyDetailsRepository;

    public List<FacultyDetails> getAllFaculties() {
        return facultyDetailsRepository.findAll();
    }

    public FacultyDetails getFacultyById(Long id) {
        return facultyDetailsRepository.findById(id).orElse(null);
    }

    public FacultyDetails saveFaculty(FacultyDetails facultyDetails) {
        return facultyDetailsRepository.save(facultyDetails);
    }

    public void deleteFaculty(Long id) {
        facultyDetailsRepository.deleteById(id);
    }
}
