package com.iqac.controller;

import com.iqac.model.AdministrativeContribution;
import com.iqac.service.AdministrativeContributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/administrative-contributions")
public class AdministrativeContributionController {
    @Autowired
    private AdministrativeContributionService administrativeContributionService;

    @GetMapping
    public List<AdministrativeContribution> getAllContributions() {
        return administrativeContributionService.getAllContributions();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<AdministrativeContribution> getContributionById(@PathVariable Long id) {
//        AdministrativeContribution contribution = administrativeContributionService.getContributionById(id);
//        return contribution != null ? ResponseEntity.ok(contribution) : ResponseEntity.notFound().build();
//    }

    //Get contribution by facultyId
    @GetMapping("/{facultyId}")
    public ResponseEntity<AdministrativeContribution> getContributionByFacultyId(@PathVariable Long facultyId) {
        AdministrativeContribution contribution = administrativeContributionService.getContributionByFacultyId(facultyId);
        return ResponseEntity.ok(contribution);
    }

    @PostMapping
    public AdministrativeContribution createContribution(@RequestBody AdministrativeContribution administrativeContribution) {
        return administrativeContributionService.saveContribution(administrativeContribution);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContribution(@PathVariable Long id) {
        administrativeContributionService.deleteContribution(id);
        return ResponseEntity.noContent().build();
    }

    //Update contribution by facultyId
    @PutMapping("/{facultyId}")
    public ResponseEntity<AdministrativeContribution> updateContributionByFacultyId(
            @PathVariable Long facultyId, @RequestBody AdministrativeContribution updatedContribution) {
        AdministrativeContribution contribution = administrativeContributionService.updateContributionByFacultyId(facultyId, updatedContribution);
        return contribution != null ? ResponseEntity.ok(contribution) : ResponseEntity.notFound().build();
    }
}
