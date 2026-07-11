import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  CreditCard,
  Person,
  LocationOn,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from './translations/LanguageContext';

const steps = ['Plan Details', 'Payment Information', 'Confirmation'];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Get selected plan from navigation state
  const selectedPlan = location.state?.plan || {
    name: 'Pro Plan',
    price: '$25'
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // On final step, complete the purchase
      handleCompletePurchase();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompletePurchase = () => {
    // Here you would typically send data to your backend
    console.log('Purchase completed:', {
      plan: selectedPlan,
      payment: cardDetails,
      user: userInfo
    });
    
    // Redirect to success page or back to design studio
    navigate('/DesignStudio', { 
      state: { 
        purchaseCompleted: true,
        marketingEnabled: true,
        message: `Your ${selectedPlan.name} has been activated!`
      },
      replace: true // This prevents going back to checkout
    });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ 
      pt: 4,
      pb: 8,
      background: 'linear-gradient(175deg, #F8FAFF 0%, #FFFFFF 100%)'
    }}>
      <Container maxWidth="md">
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{t(label)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {t('planDetails')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">{selectedPlan.name}</Typography>
                  <Typography color="text.secondary">
                    {t('selectedPlan')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h4" align="right" color="primary">
                    {selectedPlan.price}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('planIncludes')}:
                </Typography>
                <ul>
                  {selectedPlan.features?.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body1">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </CardContent>
          </Card>
        )}

        {activeStep === 1 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {t('paymentInformation')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>{t('paymentMethod')}</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label={t('paymentMethod')}
                >
                  <MenuItem value="credit">{t('creditCard')}</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="bank">{t('bankTransfer')}</MenuItem>
                </Select>
              </FormControl>

              {paymentMethod === 'credit' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('cardNumber')}
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('cardName')}
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      placeholder={t('nameOnCard')}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label={t('expiryDate')}
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                    />
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        )}

        {activeStep === 2 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {t('userInformation')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('fullName')}
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('email')}
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('phone')}
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('address')}
                    name="address"
                    value={userInfo.address}
                    onChange={handleUserInfoChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={t('acceptTerms')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            {t('back')}
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={activeStep === steps.length - 1 && !termsAccepted}
            sx={{ 
              minWidth: 120,
              background: 'linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)'
            }}
          >
            {activeStep === steps.length - 1 ? t('completePurchase') : t('next')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutPage;