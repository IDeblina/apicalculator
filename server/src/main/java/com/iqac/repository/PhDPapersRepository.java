package com.iqac.repository;

import com.iqac.model.PhDPapers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhDPapersRepository extends JpaRepository<PhDPapers, Long> {
    PhDPapers findByFacultyId(Long facultyId);
}

