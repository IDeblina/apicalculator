package com.iqac.repository;

import com.iqac.model.TeacherPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherPerformanceRepository extends JpaRepository<TeacherPerformance, Long> {
    TeacherPerformance findByFacultyId(Long facultyId);
}
