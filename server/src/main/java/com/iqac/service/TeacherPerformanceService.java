package com.iqac.service;


import com.iqac.model.TeacherPerformance;
import com.iqac.repository.TeacherPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherPerformanceService {
    @Autowired
    private TeacherPerformanceRepository teacherPerformanceRepository;

    public List<TeacherPerformance> getAllPerformances() {
        return teacherPerformanceRepository.findAll();
    }

    public TeacherPerformance getPerformanceById(Long id) {
        return teacherPerformanceRepository.findById(id).orElse(null);
    }
    //GET by facultyId
    public TeacherPerformance getPerformanceByFacultyId(Long facultyId) {
        return teacherPerformanceRepository.findByFacultyId(facultyId);
    }

    public TeacherPerformance savePerformance(TeacherPerformance teacherPerformance) {
        return teacherPerformanceRepository.save(teacherPerformance);
    }

    public void deletePerformance(Long id) {
        teacherPerformanceRepository.deleteById(id);
    }

    public TeacherPerformance updatePerformance(Long facultyId, TeacherPerformance updatedPerformance) {
        // Find the teacher performance record by facultyId
        TeacherPerformance existingPerformance = teacherPerformanceRepository.findByFacultyId(facultyId);

        if (existingPerformance != null) {
            // Update the existing record with new values
            existingPerformance.setPerformanceScore(updatedPerformance.getPerformanceScore());
            existingPerformance.setTeachingExperienceYears(updatedPerformance.getTeachingExperienceYears());
            existingPerformance.setFeedbackScore(updatedPerformance.getFeedbackScore());
            existingPerformance.setCoursesTaught(updatedPerformance.getCoursesTaught());

            // Save the updated record
            return teacherPerformanceRepository.save(existingPerformance);
        } else {
            // If no record is found for the given facultyId, return null (or you could throw an exception)
            return null;
        }
    }

    public void deleteByFacultyId(Long facultyId) {
        TeacherPerformance teacherPerformance = teacherPerformanceRepository.findByFacultyId(facultyId);
        if(teacherPerformance!=null){
            teacherPerformanceRepository.delete(teacherPerformance);
        }
    }
}
