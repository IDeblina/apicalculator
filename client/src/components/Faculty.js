import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Container,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

const Faculty = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [isAddingFaculty, setIsAddingFaculty] = useState(false);
    const [newFaculty, setNewFaculty] = useState({
        name: '',
        email: '',
        department: '',
        address: '',
        contactNumber: '',
        designation: '',
        joiningDate: '',
    });
    const [openDeleteModal, setOpenDeleteModal] = useState(false); 
    const [facultyIdToDelete, setFacultyIdToDelete] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        try {
            const response = await axiosInstance.get('/api/faculties');
            setFacultyList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClick = (id) => {
        setFacultyIdToDelete(id); 
        setOpenDeleteModal(true); 
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/faculties/${facultyIdToDelete}`);
            setOpenDeleteModal(false); 
            fetchFaculty(); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false); 
    };

    const handleViewDetails = (id) => {
        navigate(`/faculties/${id}`);
    };

    const handleIQACView = (id) => {
        navigate(`/faculties/iqac/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFaculty((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddFaculty = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/faculties', newFaculty);
            setIsAddingFaculty(false); 
            fetchFaculty(); 
            setNewFaculty({
                name: '',
                email: '',
                department: '',
                address: '',
                contactNumber: '',
                designation: '',
                joiningDate: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle resetting the list by clearing search term
    const handleShowAllFaculty = () => {
        setSearchTerm(''); // Clear the search term to show full list
    };

    // Filter faculty list based on search term
    const filteredFacultyList = searchTerm
        ? facultyList.filter((faculty) =>
            faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : facultyList; // Show full list if searchTerm is empty

    return (
        <Container>
            <Box mt={4} textAlign="center" pb={3}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                    Welcome to the API Calculator System
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h4" gutterBottom align="center">
                    {isAddingFaculty ? 'Add Faculty' : 'Faculty List'}
                </Typography>

                <Box mb={4} display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { setIsAddingFaculty(false); handleShowAllFaculty(); }}
                        sx={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        Show Faculty List
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setIsAddingFaculty(true)}
                        sx={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        Add Faculty
                    </Button>
                </Box>

                {/* Render filtered faculty list */}
                {!isAddingFaculty ? (
                    <>
                        <Box mt={4} mb={4} display="flex" justifyContent="center" gap={2}>
                            <TextField
                                label="Search Faculty by Name"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                fullWidth
                                sx={{ maxWidth: 300 }}
                            />
                        </Box>

                        {filteredFacultyList.length === 0 ? (
                            <Typography variant="h6" color="error" align="center">
                                No matching faculty found.
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredFacultyList.map((faculty) => (
                                    <Grid item xs={12} sm={6} md={4} key={faculty.id}>
                                        <Card sx={{ boxShadow: 3 }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                                                    {faculty.name}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    <strong>Email:</strong> {faculty.email}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    <strong>Department:</strong> {faculty.department}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    <strong>Contact:</strong> {faculty.contactNumber}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    <strong>Designation:</strong> {faculty.designation}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    <strong>Joining Date:</strong> {faculty.joiningDate}
                                                </Typography>
                                                <Box mt={2} display="flex" gap={2}>
                                                    <Button
                                                        variant="contained"
                                                        color="info"
                                                        onClick={() => handleViewDetails(faculty.id)}
                                                    >
                                                        Details
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => handleIQACView(faculty.id)}
                                                    >
                                                        Get IQAC
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleDeleteClick(faculty.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                ) : (
                    <form onSubmit={handleAddFaculty}>
                    <Box mb={3}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={newFaculty.name}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={newFaculty.email}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Department"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="department"
                            value={newFaculty.department}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="address"
                            value={newFaculty.address}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="contactNumber"
                            value={newFaculty.contactNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Designation"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="designation"
                            value={newFaculty.designation}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Joining Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="joiningDate"
                            value={newFaculty.joiningDate}
                            onChange={handleInputChange}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="success" sx={{ fontFamily: 'Roboto, sans-serif' }}>
                        Add Faculty
                    </Button>
                </form>
                )}
            </Box>

            {/* Delete Confirmation Modal */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Are you sure you want to delete this faculty?</DialogTitle>
                <DialogContent>
                    <Typography>Once deleted, this action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Faculty;
