package com.iqac.controller;

import com.iqac.model.TeacherPerformance;
import com.iqac.service.TeacherPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/teacher-performance")
public class TeacherPerformanceController {
    @Autowired
    private TeacherPerformanceService teacherPerformanceService;

    @GetMapping
    public List<TeacherPerformance> getAllPerformances() {
        return teacherPerformanceService.getAllPerformances();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<TeacherPerformance> getPerformanceById(@PathVariable Long id) {
//        TeacherPerformance performance = teacherPerformanceService.getPerformanceById(id);
//        return performance != null ? ResponseEntity.ok(performance) : ResponseEntity.notFound().build();
//    }

    @GetMapping("/{facultyId}")
    public ResponseEntity<TeacherPerformance> getPerformanceByFacultyId(@PathVariable Long facultyId) {
        TeacherPerformance performance = teacherPerformanceService.getPerformanceByFacultyId(facultyId);
        return ResponseEntity.ok(performance);
    }

    @PostMapping
    public TeacherPerformance createPerformance(@RequestBody TeacherPerformance teacherPerformance) {
        return teacherPerformanceService.savePerformance(teacherPerformance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformance(@PathVariable Long id) {
        teacherPerformanceService.deletePerformance(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{facultyId}")
    public ResponseEntity<TeacherPerformance> updatePerformance(@PathVariable Long facultyId,
                                                                @RequestBody TeacherPerformance updatedPerformance) {
        TeacherPerformance updated = teacherPerformanceService.updatePerformance(facultyId, updatedPerformance);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
}
