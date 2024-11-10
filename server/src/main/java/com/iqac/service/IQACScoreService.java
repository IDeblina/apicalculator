package com.iqac.service;

import com.iqac.model.*;
import com.iqac.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IQACScoreService {
    @Autowired
    private FacultyDetailsRepository facultyDetailsRepository;
    @Autowired
    private TeacherPerformanceRepository teacherPerformanceRepository;
    @Autowired
    private ResearchContributionRepository researchContributionRepository;
    @Autowired
    private PhDPapersRepository phdPapersRepository;
    @Autowired
    private CommunityServiceRepository communityServiceRepository;
    @Autowired
    private TrainingDevelopmentRepository trainingDevelopmentRepository;

    public Double calculateIQACScore(Long facultyId) {

        Double totalScore =
                getPerformanceScore(facultyId)+
                getResearchScore(facultyId)+
                getPhdScore(facultyId)+
                getCommunityScore(facultyId)+
                getTrainingScore(facultyId);

        return totalScore;
    }

    private Double getTrainingScore(Long facultyId) {

        // 5. Calculate Training & Development Score
        Double trainingScore = 0.0;
        TrainingDevelopment training = trainingDevelopmentRepository.findByFacultyId(facultyId);
        if (training != null) {
            trainingScore = (training.getTrainingsAttended() * 1.5)
                    + (training.getCertificationsObtained() * 3)
                    + (training.getWorkshopsConducted() * 4)
                    + (training.getOnlineCoursesCompleted() * 2);
        }
        return trainingScore;


    }

    private Double getCommunityScore(Long facultyId) {
        Double communityScore = 0.0;
        // 4. Calculate Community Service Score
        CommunityService communityService = communityServiceRepository.findByFacultyId(facultyId);
        if (communityService != null) {
             communityScore = (communityService.getServiceHours() * 1.2)
                    + (communityService.getProjectsParticipated() * 2)
                    + (communityService.getEventsOrganized() * 3)
                    + (communityService.getForeignParticipation()* 6);
        }

        return communityScore;

    }

    private Double getPhdScore(Long facultyId) {
        // 3. Calculate PhD Supervision Score
        Double phdScore = 0.0;
        PhDPapers phdPapers = phdPapersRepository.findByFacultyId(facultyId);
        if (phdPapers != null) {
             phdScore = (double) ((phdPapers.getPapersSupervised() * 4)
                    + (phdPapers.getThesesGuided() * 2));
        }

        return phdScore;
    }

    private Double getResearchScore(Long facultyId) {
        // 2. Calculate Research Contribution Score
        Double researchScore = 0.0;
        ResearchContribution research = researchContributionRepository.findByFacultyId(facultyId);
        if (research != null) {
            researchScore = (double) ((research.getPapersPublished() * 2)
                    + (research.getConferencesAttended() != null ? research.getConferencesAttended() * 3 : 0)
                    + (research.getProjectsCompleted() * 4)
                    + (research.getPapersPublished() * 5));
        }
        return researchScore;
    }

    private Double getPerformanceScore(Long facultyId) {
        // 1. Calculate Teacher Performance Score
        Double performanceScore = 0.0;
        TeacherPerformance performance = teacherPerformanceRepository.findByFacultyId(facultyId);

        if (performance != null) {
            performanceScore = (performance.getPerformanceScore() / 10)
                    + (performance.getTeachingExperienceYears() * 1.5)
                    + (performance.getFeedbackScore() != null ? performance.getFeedbackScore() * 0.5 : 0)
                    + (performance.getCoursesTaught() * 0.1);
        }
        return performanceScore;
    }
}
