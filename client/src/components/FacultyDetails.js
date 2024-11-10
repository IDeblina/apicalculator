import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../config/axiosInstance'; 
import { Snackbar, Alert, CircularProgress, TextField, Button, Container, Box, Typography } from '@mui/material'; 

const FacultyDetails = () => {

    const { id } = useParams(); 
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [faculty, setFaculty] = useState({});
    const [activeForm, setActiveForm] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [loading, setLoading] = useState(false); 

    const [tndData, setTndData] = useState({
        trainingsAttended: '',
        certificationsObtained: '',
        workshopsConducted: '',
        onlineCoursesCompleted: ''
    });

    const [researchData, setResearchData] = useState({
        papersPublished: '',
        projectsCompleted: '',
        conferencesAttended: ''
    });

    const [teachingData, setTeachingData] = useState({
        performanceScore: '',
        teachingExperienceYears: '',
        feedbackScore: '',
        coursesTaught: ''
    });

    const [phdData, setPhdData] = useState({
        papersSupervised: '',
        thesesGuided: ''
    });

    const [communityData , setCommunityData] = useState({
        serviceHours: '',
        projectsParticipated: '',
        eventsOrganized: '',
        foreignParticipation: ''
    });

    const [adminContributionData , setAdministrativeData] = useState({
        committeesLed: '',
        eventsOrganized: '',
        leadershipRoles: ''
    });

    const handleInputChange = (e, form) => {
        const { name, value } = e.target;
        
        if (form === 'A') {
            setTndData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else if (form === 'B') {
            setResearchData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else if (form === 'C') {
            setTeachingData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else if (form === 'D') {
            setPhdData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else if (form === 'E') {
            setCommunityData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else if (form === 'F') {
            setAdministrativeData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleFormSubmit = async (e, form) => {
        e.preventDefault();

        let data = { 
            faculty: {
                id: faculty.id, // Ensure faculty has id set to null if it's new, 
                name: faculty.name,
                email: faculty.email,
                department: faculty.department,
                contactNumber: faculty.contactNumber,
                joiningDate: faculty.joiningDate,
                designation: faculty.designation,
                address: faculty.address
            }
        };

        if (form === 'A') {
            data = { ...data, ...tndData };
        } else if (form === 'B') {
            data = { ...data, ...researchData };
        } else if (form === 'C') {
            data = { ...data, ...teachingData };
        } else if (form === 'D') {
            data = { ...data, ...phdData };
        } else if (form === 'E') {
            data = { ...data, ...communityData };
        } else if (form === 'F') {
            data = { ...data, ...adminContributionData };
        }


        const formEndpoints = {
            A: 'api/training-developments',
            B: 'api/research-contributions',
            C: 'api/teacher-performance',
            D: 'api/phd-papers',
            E: 'api/community-services',
            F: 'api/administrative-contributions'
        };
        
        try {
            setLoading(true);
            const endpoint = formEndpoints[form];
            console.log("Endpoint:", endpoint);
            console.log("Data to be sent:", data);
            if (!endpoint) {
                setMessage(`No endpoint configured for form ${form}`);
                setOpenSnackbar(true);
                return;
            }
        
            // First, check if the data exists for the given faculty ID
            const existingData = await axiosInstance.get(`${endpoint}/${faculty.id}`);
        
            if (!existingData.data || existingData.data.length === 0) {
                // No training development record exists for this faculty, so use POST to create a new entry
                await axiosInstance.post(endpoint, data);
                setMessage(`${form} created successfully!`);
            } else {
                // If data exists, use PUT to update the record
                await axiosInstance.put(`${endpoint}/${faculty.id}`, data);
                setMessage(`${form} updated successfully!`);
            }
        
        setOpenSnackbar(true);
            } 
            catch (error) {
                setMessage(`Error submitting Form ${form}`);
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        

    };

    useEffect(() => {
        getFacultyDetails();
    }, []);

    const getFacultyDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`api/faculties/${id}`);
            setFaculty(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Error fetching faculty details');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: 3 }}>
            <Box textAlign="center" mb={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Faculty Details
                </Typography>
                <Typography variant="h6" sx={{ color: '#555' }}>
                    {faculty.name}
                </Typography>
            </Box>

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

            {/* Navigation buttons */}
<Box textAlign="center" mb={3} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
    <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setActiveForm('A')} 
        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
    >
        Training and Development
    </Button>
    <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setActiveForm('B')}
        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
    >
        Research and Publications
    </Button>
    <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setActiveForm('C')}
        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
    >
        Teaching and Evaluation
    </Button>
    <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setActiveForm('D')}
        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
    >
        PhD Records
    </Button>
    <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setActiveForm('E')}
        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
    >
        Community Service Records
    </Button>
    <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setActiveForm('F')}
        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
    >
        Administrative Works
    </Button>
</Box>

            {loading ? (
                <Box textAlign="center" mt={5}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                activeForm === 'A' && (
                    <form onSubmit={(e) => handleFormSubmit(e, 'A')}>
                        <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', color: '#333' }}>
                                Training and Development Records
                            </Typography>

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Trainings Attended"
                                name="trainingsAttended"
                                type="number"
                                value={tndData.trainingsAttended}
                                onChange={(e) => handleInputChange(e, 'A')}
                                sx={{ marginBottom: '15px' }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Certifications Obtained"
                                name="certificationsObtained"
                                type="number"
                                value={tndData.certificationsObtained}
                                onChange={(e) => handleInputChange(e, 'A')}
                                sx={{ marginBottom: '15px' }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Workshops Conducted"
                                name="workshopsConducted"
                                type="number"
                                value={tndData.workshopsConducted}
                                onChange={(e) => handleInputChange(e, 'A')}
                                sx={{ marginBottom: '15px' }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Online Courses Completed"
                                name="onlineCoursesCompleted"
                                type="number"
                                value={tndData.onlineCoursesCompleted}
                                onChange={(e) => handleInputChange(e, 'A')}
                                sx={{ marginBottom: '15px' }}
                            />

                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="success" 
                                sx={{ width: '100%', padding: '10px', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                            >
                                Submit training records
                            </Button>
                        </Box>
                    </form>
                )
            )}

            {activeForm === 'B' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'B')}>
                    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', color: '#333' }}>
                            Research and Publications Records
                        </Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Papers Published"
                            name="papersPublished"
                            type="number"
                            value={researchData.papersPublished}
                            onChange={(e) => handleInputChange(e, 'B')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Research Projects"
                            name="projectsCompleted"
                            type="number"
                            value={researchData.projectsCompleted}
                            onChange={(e) => handleInputChange(e, 'B')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Conferences Attended"
                            name="conferencesAttended"
                            type="number"
                            value={researchData.conferencesAttended}
                            onChange={(e) => handleInputChange(e, 'B')}
                            sx={{ marginBottom: '15px' }}
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success" 
                            sx={{ width: '100%', padding: '10px', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                        >
                            Submit research reacords
                        </Button>
                    </Box>
                </form>
            )}

            {activeForm === 'C' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'C')}>
                    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', color: '#333' }}>
                            Teaching and Evaluation Records
                        </Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Courses Taught"
                            name="coursesTaught"
                            type="number"
                            value={teachingData.coursesTaught}
                            onChange={(e) => handleInputChange(e, 'C')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Feedback Score"
                            name="feedbackScore"
                            type="number"
                            value={teachingData.feedbackScore}
                            onChange={(e) => handleInputChange(e, 'C')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Teaching Experience Years"
                            name="teachingExperienceYears"
                            type="number"
                            value={teachingData.teachingExperienceYears}
                            onChange={(e) => handleInputChange(e, 'C')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="performance Score"
                            name="performanceScore"
                            type="number"
                            value={teachingData.performanceScore}
                            onChange={(e) => handleInputChange(e, 'C')}
                            sx={{ marginBottom: '15px' }}
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success" 
                            sx={{ width: '100%', padding: '10px', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                        >
                            Submit teaching records
                        </Button>
                    </Box>
                </form>
            )}
            {activeForm === 'D' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'D')}>
                    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', color: '#333' }}>
                            PHD records
                        </Typography>

                         <TextField
                            fullWidth
                            variant="outlined"
                            label="Papers Supervised"
                            name="papersSupervised"
                            type="number"
                            value={phdData.papersSupervised}
                            onChange={(e) => handleInputChange(e, 'D')}
                            sx={{ marginBottom: '15px' }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Theses Guided"
                            name="thesesGuided"
                            type="number"
                            value={phdData.thesesGuided}
                            onChange={(e) => handleInputChange(e, 'D')}
                            sx={{ marginBottom: '15px' }}
                        />
                       
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success" 
                            sx={{ width: '100%', padding: '10px', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                        >
                            Submit phd records
                        </Button>
                    </Box>
                </form>
            )}
            {activeForm === 'E' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'E')}>
                    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', color: '#333' }}>
                            Community and service Records
                        </Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Service Hours"
                            name="serviceHours"
                            type="number"
                            value={communityData.serviceHours}
                            onChange={(e) => handleInputChange(e, 'E')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Projects Participated"
                            name="projectsParticipated"
                            type="number"
                            value={communityData.projectsParticipated}
                            onChange={(e) => handleInputChange(e, 'E')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Events Organized"
                            name="eventsOrganized"
                            type="number" 
                            value={communityData.eventsOrganized}
                            onChange={(e) => handleInputChange(e, 'E')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Performance Foreign Participation"
                            name="foreignParticipation"
                            type="number"
                            value={communityData.foreignParticipation}
                            onChange={(e) => handleInputChange(e, 'E')}
                            sx={{ marginBottom: '15px' }}
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success" 
                            sx={{ width: '100%', padding: '10px', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                        >
                            Submit community service records
                        </Button>
                    </Box>
                </form>
            )}
            {activeForm === 'F' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'F')}>
                    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', color: '#333' }}>
                            Community and service Records
                        </Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Committees Led"
                            name="committeesLed"
                            type="number"
                            value={adminContributionData.committeesLed}
                            onChange={(e) => handleInputChange(e, 'F')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Events Organized"
                            name="eventsOrganized"
                            type="number"
                            value={adminContributionData.eventsOrganized}
                            onChange={(e) => handleInputChange(e, 'F')}
                            sx={{ marginBottom: '15px' }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Leadership Roles"
                            name="leadershipRoles"
                            type="number"
                            value={adminContributionData.leadershipRoles}
                            onChange={(e) => handleInputChange(e, 'F')}
                            sx={{ marginBottom: '15px' }}
                        />
                        

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success" 
                            sx={{ width: '100%', padding: '10px', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                        >
                            Submit administrative records
                        </Button>
                    </Box>
                </form>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} 
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={message.includes('successfully') ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default FacultyDetails;
