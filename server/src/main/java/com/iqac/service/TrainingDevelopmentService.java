package com.iqac.service;

import com.iqac.model.TrainingDevelopment;
import com.iqac.repository.TrainingDevelopmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingDevelopmentService {

    @Autowired
    private TrainingDevelopmentRepository trainingDevelopmentRepository;

    public List<TrainingDevelopment> getAllTrainings() {
        return trainingDevelopmentRepository.findAll();
    }

    public TrainingDevelopment getTrainingById(Long id) {
        return trainingDevelopmentRepository.findById(id).orElse(null);
    }

    public TrainingDevelopment getTrainingByFacultyId(Long facultyId) {
        return trainingDevelopmentRepository.findByFacultyId(facultyId);
    }

    public TrainingDevelopment saveTraining(TrainingDevelopment trainingDevelopment) {
        return trainingDevelopmentRepository.save(trainingDevelopment);
    }

    public void deleteTraining(Long id) {
        trainingDevelopmentRepository.deleteById(id);
    }

    public void deleteTrainingByFacultyId(Long facultyId) {
        TrainingDevelopment existingTraining = trainingDevelopmentRepository.findByFacultyId(facultyId);
        if (existingTraining != null) {
            trainingDevelopmentRepository.delete(existingTraining);
        }
    }

    // Update training development by facultyId
    public TrainingDevelopment updateTraining(Long facultyId, TrainingDevelopment updatedTrainingDevelopment) {
        // Find the training development record by facultyId
        TrainingDevelopment existingTraining = trainingDevelopmentRepository.findByFacultyId(facultyId);

        if (existingTraining != null) {
            // Update the existing record with the new values
            existingTraining.setTrainingsAttended(updatedTrainingDevelopment.getTrainingsAttended());
            existingTraining.setCertificationsObtained(updatedTrainingDevelopment.getCertificationsObtained());
            existingTraining.setWorkshopsConducted(updatedTrainingDevelopment.getWorkshopsConducted());
            existingTraining.setOnlineCoursesCompleted(updatedTrainingDevelopment.getOnlineCoursesCompleted());
            // Add any other fields that need to be updated here.

            // Save the updated record
            return trainingDevelopmentRepository.save(existingTraining);
        } else {
            // If no record found with the given facultyId, return null (or throw an exception based on your choice)
            return null;
        }
    }

    public void deleteByFacultyId(Long facultyId) {
        TrainingDevelopment trainingDevelopment = trainingDevelopmentRepository.findByFacultyId(facultyId);
        if(trainingDevelopment!=null){
            trainingDevelopmentRepository.delete(trainingDevelopment);
        }
    }
}
