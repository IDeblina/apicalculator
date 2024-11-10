package com.iqac.service;

import com.iqac.model.PhDPapers;
import com.iqac.repository.PhDPapersRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhDPapersService {
    @Autowired
    private PhDPapersRepository phdPapersRepository;

    public List<PhDPapers> getAllPapers() {
        return phdPapersRepository.findAll();
    }

    public PhDPapers getPaperById(Long id) {
        return phdPapersRepository.findById(id).orElse(null);
    }

    // New: GET by facultyId
    public PhDPapers getPaperByFacultyId(Long facultyId) {
        return phdPapersRepository.findByFacultyId(facultyId);
    }
    public PhDPapers savePaper(PhDPapers phdPapers) {
        return phdPapersRepository.save(phdPapers);
    }

    public void deletePaper(Long id) {
        phdPapersRepository.deleteById(id);
    }

    // New: PUT (Update) by facultyId
    public PhDPapers updatePaper(Long facultyId, PhDPapers updatedPhDPapers) {
        // Find the existing PhDPapers record by facultyId
        PhDPapers existingPaper = phdPapersRepository.findByFacultyId(facultyId);

        if (existingPaper != null) {
            // Update the existing record with the new values
            existingPaper.setPapersSupervised(updatedPhDPapers.getPapersSupervised());
            existingPaper.setThesesGuided(updatedPhDPapers.getThesesGuided());
            // Save the updated record
            return phdPapersRepository.save(existingPaper);
        } else {
            // If no record found with the given facultyId, return null (or throw an exception if preferred)
            return null;
        }
    }

    public void deleteByFacultyId(Long facultyId) {
        PhDPapers phDPapers = phdPapersRepository.findByFacultyId(facultyId);
        if(phDPapers!=null){
            phdPapersRepository.delete(phDPapers);
        }
    }
}
