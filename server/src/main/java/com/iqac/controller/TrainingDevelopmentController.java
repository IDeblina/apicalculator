package com.iqac.controller;

import com.iqac.model.TrainingDevelopment;
import com.iqac.service.TrainingDevelopmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/training-developments")
public class TrainingDevelopmentController {

    @Autowired
    private TrainingDevelopmentService trainingDevelopmentService;

    @GetMapping
    public List<TrainingDevelopment> getAllTrainings() {
        return trainingDevelopmentService.getAllTrainings();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<TrainingDevelopment> getTrainingById(@PathVariable Long id) {
//        TrainingDevelopment training = trainingDevelopmentService.getTrainingById(id);
//        return training != null ? ResponseEntity.ok(training) : ResponseEntity.notFound().build();
//    }
    @GetMapping("/{facultyId}")
    public ResponseEntity<TrainingDevelopment> getTrainingByFacultyId(@PathVariable Long facultyId) {
        TrainingDevelopment training = trainingDevelopmentService.getTrainingByFacultyId(facultyId);
        return ResponseEntity.ok(training);
    }

    @PostMapping
    public TrainingDevelopment CreateTraining(@RequestBody TrainingDevelopment trainingDevelopment) {
        return trainingDevelopmentService.saveTraining(trainingDevelopment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTraining(@PathVariable Long id) {
        trainingDevelopmentService.deleteTraining(id);
        return ResponseEntity.noContent().build();
    }
//    @DeleteMapping("/{facultyId}")
//    public ResponseEntity<Void> deleteTrainingByFacultyId(@PathVariable Long facultyId) {
//        trainingDevelopmentService.deleteTrainingByFacultyId(facultyId);
//        return ResponseEntity.noContent().build();
//    }

    // Update training development by facultyId instead of id
    @PutMapping("/{facultyId}")
    public ResponseEntity<TrainingDevelopment> updateTraining(@PathVariable Long facultyId,
                                                              @RequestBody TrainingDevelopment trainingDevelopment) {
        // Call the service method that updates by facultyId
        TrainingDevelopment updatedTraining = trainingDevelopmentService.updateTraining(facultyId, trainingDevelopment);

        if (updatedTraining != null) {
            return ResponseEntity.ok(updatedTraining); // Return the updated record
        } else {
            return ResponseEntity.notFound().build(); // If record not found, return 404
        }
    }
}
