package com.iqac.repository;

import com.iqac.model.AdministrativeContribution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministrativeContributionRepository extends JpaRepository<AdministrativeContribution, Long> {
    AdministrativeContribution findByFacultyId(Long facultyId);
}
