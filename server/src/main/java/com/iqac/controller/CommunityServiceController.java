package com.iqac.controller;

import com.iqac.model.CommunityService;
import com.iqac.service.CommunityServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/community-services")
public class CommunityServiceController {

    @Autowired
    private CommunityServiceService communityServiceService;

    @GetMapping
    public List<CommunityService> getAllServices() {
        return communityServiceService.getAllServices();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<CommunityService> getServiceById(@PathVariable Long id) {
//        CommunityService service = communityServiceService.getServiceById(id);
//        return service != null ? ResponseEntity.ok(service) : ResponseEntity.notFound().build();
//    }

    //Get service by facultyId
    @GetMapping("/{facultyId}")
    public ResponseEntity<CommunityService> getServiceByFacultyId(@PathVariable Long facultyId) {
        CommunityService service = communityServiceService.getServiceByFacultyId(facultyId);
        return ResponseEntity.ok(service);
    }

    @PostMapping
    public CommunityService createService(@RequestBody CommunityService communityService) {
        return communityServiceService.saveService(communityService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        communityServiceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
    // Update service by facultyId
    @PutMapping("/{facultyId}")
    public ResponseEntity<CommunityService> updateServiceByFacultyId(@PathVariable Long facultyId,
                                                                     @RequestBody CommunityService updatedService) {
        CommunityService updatedCommunityService = communityServiceService.updateServiceByFacultyId(facultyId, updatedService);
        return updatedCommunityService != null ? ResponseEntity.ok(updatedCommunityService) : ResponseEntity.notFound().build();
    }

}
