import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Snackbar, Alert, CircularProgress, TextField, Button, Container, Box, Typography } from '@mui/material'; 


const FacultyIqacDetails = () => {
    const [iqacScore, setIqacScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [iqacDetails, setIqacDetails] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate hook

    const { id } = useParams();

    const APIEndpoints = {
        A: 'api/training-developments',
        B: 'api/research-contributions',
        C: 'api/teacher-performance',
        D: 'api/phd-papers',
        E: 'api/community-services',
        F: 'api/administrative-contributions'
    };

    const fetchIqacScore = async () => {
        try {
            const response = await axiosInstance.get(`/api/iqac/calculatescore/${id}`);
            setIqacScore(response.data.iqacScore);
            if(response.data.iqacScore!==0){
                fetchIqacDetails();

            }

        } catch (error) {
            setError('Failed to load IQAC score');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchIqacDetails = async () => {
        try {
            const tndRes = await axiosInstance.get(`${APIEndpoints.A}/${id}`);
            const rncRes = await axiosInstance.get(`${APIEndpoints.B}/${id}`);
            const thrRes = await axiosInstance.get(`${APIEndpoints.C}/${id}`);
            const phdRes = await axiosInstance.get(`${APIEndpoints.D}/${id}`);
            const cmtRes = await axiosInstance.get(`${APIEndpoints.E}/${id}`);
            const admRes = await axiosInstance.get(`${APIEndpoints.F}/${id}`);
            
            setIqacDetails((prevData) => ({
                ...prevData,
                facultyRes: {
                                name: tndRes.data.faculty.name,
                                email: tndRes.data.faculty.email,
                                department: tndRes.data.faculty.department,
                                contactNumber: tndRes.data.faculty.contactNumber,
                                joiningDate: tndRes.data.faculty.joiningDate,
                                designation: tndRes.data.faculty.designation,
                                address: tndRes.data.faculty.address
                            },
                tndRes: {
                    trainingsAttended : tndRes.data.trainingsAttended, 
                    certificationsObtained : tndRes.data.certificationsObtained,
                    workshopsConducted : tndRes.data.workshopsConducted, 
                    onlineCoursesCompleted : tndRes.data.onlineCoursesCompleted
                },
                rncRes: {
                    papersPublished : rncRes.data.papersPublished, 
                    projectsCompleted : rncRes.data.projectsCompleted,
                    conferencesAttended : rncRes.data.conferencesAttended
                },
                thrRes: {
                    performanceScore : thrRes.data.performanceScore, 
                    teachingExperienceYears : thrRes.data.teachingExperienceYears,
                    feedbackScore : thrRes.data.feedbackScore, 
                    coursesTaught : thrRes.data.coursesTaught
                },
                phdRes: {
                    papersSupervised : phdRes.data.papersSupervised, 
                    thesesGuided : phdRes.data.thesesGuided
                },
                cmtRes: {
                    serviceHours : cmtRes.data.serviceHours, 
                    projectsParticipated : cmtRes.data.projectsParticipated,
                    eventsOrganized : cmtRes.data.eventsOrganized, 
                    foreignParticipation : cmtRes.data.foreignParticipation
                },
                admRes: {
                    committeesLed : admRes.data.committeesLed, 
                    eventsOrganized : admRes.data.eventsOrganized,
                    leadershipRoles : admRes.data.leadershipRoles
                }
            }));
        } catch (error) {
            setError('Error fetching IQAC details');
            console.error('Error fetching IQAC details:', error);
        }
    };

    useEffect(() => {
        fetchIqacScore();   
    }, [id]);

    const generatePDF = () => {
        if(iqacScore===0){
            return;
        }
        const doc = new jsPDF();
        const facultyName = iqacDetails.facultyRes.name;
    
        // Title and Faculty ID
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text("IQAC Score Report", 20, 20);
        doc.setFontSize(14);
        doc.text(`Faculty: ${facultyName}`, 20, 30);
    
        // Set IQAC Score in red and bold
        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0); // Red color
        doc.setFont("helvetica", "bold"); // Bold font
        doc.text(`IQAC Score: ${iqacScore !== null ? iqacScore : 'Not available'}`, 20, 40);
    
        // Reset text color and font for other content
        doc.setTextColor(0);
        doc.setFont("helvetica", "normal");
    
        // Function to add section
        const addSection = (title, data, yPosition) => {
            doc.setFillColor(230, 230, 250);  // Light lavender background
            doc.rect(20, yPosition, 170, 8, "F"); // Section background
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text(title, 22, yPosition + 6);
    
            doc.autoTable({
                startY: yPosition + 10,
                head: [['Metric', 'Value']],
                body: Object.entries(data).map(([key, value]) => [key, value || 'N/A']),
                theme: 'grid',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] }
            });
            return doc.lastAutoTable.finalY + 10; // return updated yPosition for next section
        };
    
        let yPosition = 50; // Initial Y position after title and IQAC Score
    
        // Add each section
        yPosition = addSection("Personal Details", iqacDetails.facultyRes || {}, yPosition);
        yPosition = addSection("Training and Development", iqacDetails.tndRes || {}, yPosition);
        yPosition = addSection("Research and Contributions", iqacDetails.rncRes || {}, yPosition);
        yPosition = addSection("Teacher Performance", iqacDetails.thrRes || {}, yPosition);
        yPosition = addSection("PhD Papers", iqacDetails.phdRes || {}, yPosition);
        yPosition = addSection("Community Services", iqacDetails.cmtRes || {}, yPosition);
        yPosition = addSection("Administrative Contributions", iqacDetails.admRes || {}, yPosition);
    
        // Save the PDF
        doc.save(`iqac_score_report_${facultyName}.pdf`);
    };
    

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Faculty IQAC Details</h2>
            
            {/* Error message if any */}
            {error ? (
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            ) : loading ? (
                // Loading spinner when data is being fetched
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Faculty Name and Download Button */}
                    <div className="mt-3">
                        <h5>{iqacDetails.facultyRes?.name}</h5>
                    </div>
                                        {/* IQAC Score Section */}
                    <div className="mt-3">
                        <h5>IQAC Score: 
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {iqacScore !== null ? iqacScore : 'Not available'}
                            </span>
                        </h5>
                    </div>
                    <div className="mt-2">
                        <button onClick={generatePDF} className="btn btn-success">
                            Download IQAC Report
                        </button>
                    </div>
    

    
                    {/* Training & Development Table */}
                    <div className="mt-4">
                        <h5>Training & Development</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Trainings Attended</td>
                                    <td>{iqacDetails.tndRes?.trainingsAttended || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Certifications Obtained</td>
                                    <td>{iqacDetails.tndRes?.certificationsObtained || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Workshops Conducted</td>
                                    <td>{iqacDetails.tndRes?.workshopsConducted || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Online Courses Completed</td>
                                    <td>{iqacDetails.tndRes?.onlineCoursesCompleted || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    {/* Research & Contributions Table */}
                    <div className="mt-4">
                        <h5>Research & Contributions</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Papers Published</td>
                                    <td>{iqacDetails.rncRes?.papersPublished || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Projects Completed</td>
                                    <td>{iqacDetails.rncRes?.projectsCompleted || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Conferences Attended</td>
                                    <td>{iqacDetails.rncRes?.conferencesAttended || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    {/* Teacher Performance Table */}
                    <div className="mt-4">
                        <h5>Teacher Performance</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Performance Score</td>
                                    <td>{iqacDetails.thrRes?.performanceScore || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Teaching Experience (Years)</td>
                                    <td>{iqacDetails.thrRes?.teachingExperienceYears || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Feedback Score</td>
                                    <td>{iqacDetails.thrRes?.feedbackScore || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Courses Taught</td>
                                    <td>{iqacDetails.thrRes?.coursesTaught || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    {/* Additional Sections (like PhD, Community Services, etc.) */}
                    {/* Add more tables here for other sections as necessary */}

                                {/* Home Button */}
            <Box textAlign="center" mb={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')} // Navigate to the home page
                    sx={{ marginBottom: '20px' }}
                >
                    Home
                </Button>
            </Box>
    
                </>
            )}
        </div>
    );
    
}

export default FacultyIqacDetails;
