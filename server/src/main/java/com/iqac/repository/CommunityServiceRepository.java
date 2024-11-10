package com.iqac.repository;

import com.iqac.model.CommunityService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityServiceRepository extends JpaRepository<CommunityService, Long> {
    CommunityService findByFacultyId(Long facultyId);
}
