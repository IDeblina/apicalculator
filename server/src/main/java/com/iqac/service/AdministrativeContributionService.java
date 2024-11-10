package com.iqac.service;

import com.iqac.model.AdministrativeContribution;
import com.iqac.repository.AdministrativeContributionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministrativeContributionService {
    @Autowired
    private AdministrativeContributionRepository administrativeContributionRepository;

    public List<AdministrativeContribution> getAllContributions() {
        return administrativeContributionRepository.findAll();
    }

    public AdministrativeContribution getContributionById(Long id) {
        return administrativeContributionRepository.findById(id).orElse(null);
    }

    //Get contribution by facultyId
    public AdministrativeContribution getContributionByFacultyId(Long facultyId) {
        return administrativeContributionRepository.findByFacultyId(facultyId); // Assuming this method is in the repository
    }

    public AdministrativeContribution saveContribution(AdministrativeContribution administrativeContribution) {
        return administrativeContributionRepository.save(administrativeContribution);
    }

    public void deleteContribution(Long id) {
        administrativeContributionRepository.deleteById(id);
    }

    // New: Update contribution by facultyId
    public AdministrativeContribution updateContributionByFacultyId(Long facultyId, AdministrativeContribution updatedContribution) {
        AdministrativeContribution existingContribution = administrativeContributionRepository.findByFacultyId(facultyId);

        if (existingContribution != null) {
            // Update the existing record with new data
            existingContribution.setCommitteesLed(updatedContribution.getCommitteesLed());
            existingContribution.setEventsOrganized(updatedContribution.getEventsOrganized());
            existingContribution.setLeadershipRoles(updatedContribution.getLeadershipRoles());

            return administrativeContributionRepository.save(existingContribution);
        }
        return null; // Return null if no contribution exists for the given facultyId
    }

    public void deleteByFacultyId(Long facultyId) {
        AdministrativeContribution administrativeContribution = administrativeContributionRepository.findByFacultyId(facultyId);
        if(administrativeContribution != null) {
            administrativeContributionRepository.delete(administrativeContribution);
        }
    }
}
