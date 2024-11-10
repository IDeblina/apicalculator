package com.iqac.service;

import com.iqac.model.CommunityService;
import com.iqac.repository.CommunityServiceRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityServiceService {
    @Autowired
    private CommunityServiceRepository communityServiceRepository;

    public List<CommunityService> getAllServices() {
        return communityServiceRepository.findAll();
    }

    public CommunityService getServiceById(Long id) {
        return communityServiceRepository.findById(id).orElse(null);
    }

    //GET service by facultyId
    public CommunityService getServiceByFacultyId(Long facultyId) {
        return communityServiceRepository.findByFacultyId(facultyId);
    }
    public CommunityService saveService(CommunityService communityService) {
        return communityServiceRepository.save(communityService);
    }

    public void deleteService(Long id) {
        communityServiceRepository.deleteById(id);
    }

// PUT (Update) service by facultyId
    public CommunityService updateServiceByFacultyId(Long facultyId, CommunityService updatedService) {
        CommunityService existingService = communityServiceRepository.findByFacultyId(facultyId);
        if (existingService != null) {
            // Update the existing service with the new details
            existingService.setServiceHours(updatedService.getServiceHours());
            existingService.setProjectsParticipated(updatedService.getProjectsParticipated());
            existingService.setEventsOrganized(updatedService.getEventsOrganized());
            existingService.setForeignParticipation(updatedService.getForeignParticipation());
            // Add any other fields to update as needed
            return communityServiceRepository.save(existingService);
        } else {
            return null;  // No existing service found for the given facultyId
        }
    }

    public void deleteByFacultyId(Long facultyId) {
        CommunityService communityService = communityServiceRepository.findByFacultyId(facultyId);
        if(communityService!=null){
            communityServiceRepository.delete(communityService);
        }
    }

}
