package com.iqac.repository;

import com.iqac.model.TrainingDevelopment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingDevelopmentRepository extends JpaRepository<TrainingDevelopment, Long> {
    TrainingDevelopment findByFacultyId(Long facultyId);
}
