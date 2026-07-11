// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Tabs, 
  Tab, 
  Box,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
// import { countries } from './Pages/countries'; // You'll need to create this list

const AuthModal = ({ open, onClose, onLogin, onSignup }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    phone: '',
    countryCode: '+1'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasNumber && hasSpecialChar;
  };

  const handleLogin = () => {
    // Simple validation
    if (!loginData.email || !loginData.password) {
      setErrors({ ...errors, login: 'Please fill all fields' });
      return;
    }
    onLogin(loginData);
  };

  const handleSignup = () => {
    const newErrors = {};
    
    if (!signupData.firstName) newErrors.firstName = 'First name is required';
    if (!signupData.lastName) newErrors.lastName = 'Last name is required';
    if (!signupData.email) newErrors.email = 'Email is required';
    if (!validatePassword(signupData.password)) {
      newErrors.password = 'Password must be 8+ chars with 1 number and 1 special character';
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signupData.phone) newErrors.phone = 'Phone is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSignup(signupData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {activeTab === 0 ? 'Login' : 'Sign Up'}
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      
      <DialogContent dividers>
        {activeTab === 0 ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              margin="normal"
              error={!!errors.login}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={handleLoginChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!errors.login}
            />
            {errors.login && (
              <Typography color="error" variant="body2">
                {errors.login}
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={signupData.firstName}
                onChange={handleSignupChange}
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={signupData.lastName}
                onChange={handleSignupChange}
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>
            
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={signupData.password}
              onChange={handleSignupChange}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            
            <Box display="flex" gap={2} mt={2}>
              <Select
                value={signupData.countryCode}
                onChange={(e) => setSignupData({...signupData, countryCode: e.target.value})}
                sx={{ width: 120 }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.phone}>
                    {country.flag} {country.code}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={signupData.phone}
                onChange={handleSignupChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={activeTab === 0 ? handleLogin : handleSignup}
          color="primary"
        >
          {activeTab === 0 ? 'Login' : 'Sign Up'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;