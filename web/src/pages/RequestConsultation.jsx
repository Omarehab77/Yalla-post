import React from 'react';
import { 
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';

// const StyledContainer = styled(Container)(({ theme }) => ({
//   paddingTop: theme.spacing(6),
//   paddingBottom: theme.spacing-6),
//   minHeight: '80vh',
// )}};

const RequestConsultation = ({ isMobile, isTablet }) => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // You would typically call an API here
  };

  return (
    <StyledContainer maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Request a Consultation
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Let's discuss your project needs
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Project Type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              variant="outlined"
            >
              {/* For dropdown version:
              <MenuItem value="web">Web Design</MenuItem>
              <MenuItem value="branding">Branding</MenuItem>
              */}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Details"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  padding: theme.spacing(1.5, 4),
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
              >
                Submit Request
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Box mt={6} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          We'll contact you within 24 hours to schedule your consultation
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default RequestConsultation;