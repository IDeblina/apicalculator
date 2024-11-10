package com.iqac.service;

import com.iqac.model.ResearchContribution;
import com.iqac.repository.ResearchContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResearchContributionService {
    @Autowired
    private ResearchContributionRepository researchContributionRepository;


    public List<ResearchContribution> getAllContributions() {
        return researchContributionRepository.findAll();
    }

    public ResearchContribution getContributionById(Long id) {
        return researchContributionRepository.findById(id).orElse(null);
    }

    public ResearchContribution getContributionByFacultyId(Long facultyId) {
        return researchContributionRepository.findByFacultyId(facultyId);
    }

    public ResearchContribution saveContribution(ResearchContribution researchContribution) {
        return researchContributionRepository.save(researchContribution);
    }

    public void deleteContribution(Long id) {
        researchContributionRepository.deleteById(id);
    }

    public ResearchContribution updateContribution(Long facultyId, ResearchContribution updatedContribution) {
        // Find the existing research contribution by facultyId
        ResearchContribution existingContribution = researchContributionRepository.findByFacultyId(facultyId);

        if (existingContribution != null) {
            // Update the existing record with new values
            existingContribution.setPapersPublished(updatedContribution.getPapersPublished());
            existingContribution.setProjectsCompleted(updatedContribution.getProjectsCompleted());
            existingContribution.setConferencesAttended(updatedContribution.getConferencesAttended());
            // Save the updated record
            return researchContributionRepository.save(existingContribution);
        } else {
            // If no record found with the given facultyId, return null (or you could throw an exception)
            return null;
        }
    }

    public void deleteByFacultyId(Long facultyId) {
        ResearchContribution researchContribution = researchContributionRepository.findByFacultyId(facultyId);
        if(researchContribution!=null){
            researchContributionRepository.delete(researchContribution);
        }
    }


}
