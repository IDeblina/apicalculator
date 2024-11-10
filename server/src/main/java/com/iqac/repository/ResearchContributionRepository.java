package com.iqac.repository;

import com.iqac.model.ResearchContribution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResearchContributionRepository extends JpaRepository<ResearchContribution, Long> {
    ResearchContribution findByFacultyId(Long facultyId);
}
