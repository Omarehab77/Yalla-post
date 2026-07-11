import React, { useState, useRef, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  ListItemButton,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  Home as HomeIcon,
  Create,
  DesignServices,
  TrendingUp,
  Timeline,
  ContactSupport,
  Chat,
  Business,
  Menu as MenuIcon,
  Phone,
  Email,
  LocationOn,
  Send,
  Close,
  Language
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { LanguageContext } from './translations/LanguageContext';

const ContactUs = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const formRef = useRef();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Navigation items
  const navItems = [
    { text: t('home'), icon: <HomeIcon sx={{ color: '#FF007F' }} />, action: () => navigate('/') },
    { text: t('designStudio'), icon: <Create sx={{ color: '#FF007F' }} />, action: () => navigate('/DesignStudio') },
    { text: t('professionalDesign'), icon: <DesignServices sx={{ color: '#FF007F' }} />, action: () => navigate('/professional-design') },
    { text: t('marketingServices'), icon: <TrendingUp sx={{ color: '#FF007F' }} />, action: () => navigate('/marketing') },
    { text: t('ourProcess'), icon: <Timeline sx={{ color: '#FF007F' }} />, action: () => navigate('/process') },
    { text: t('messages'), icon: <Chat sx={{ color: '#FF007F' }} />, action: () => navigate('/messages') },
    { text: t('becomeEntrepreneur'), icon: <Business sx={{ color: '#FF007F' }} />, action: () => navigate('/entrepreneur') },
    { text: t('contactUs'), icon: <ContactSupport sx={{ color: '#FF007F' }} />, action: () => navigate('/contact') }
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Format current date
    const now = new Date();
    const formattedDate = now.toLocaleString(language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Create params object
    const templateParams = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      message: formData.message,
      date: formattedDate
    };

    // Send using emailjs.send()
    emailjs.send(
      'service_53rv2hq',
      'template_004hx3r',
      templateParams,
      'By16Ml2yCca3uDNUx'
    )
    .then(() => {
      setSnackbar({
        open: true,
        message: t('messageSentSuccess'),
        severity: 'success'
      });
      setFormData({ user_name: '', user_email: '', message: '' });
    })
    .catch((err) => {
      console.error('Error:', err);
      setSnackbar({
        open: true,
        message: t('messageSentError'),
        severity: 'error'
      });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactMethods = [
    {
      icon: <Phone sx={{ color: '#FF007F', fontSize: 40 }} />,
      title: t('phone'),
      info: '+20 100 319 3883',
      action: 'tel:+01003193883'
    },
    {
      icon: <Email sx={{ color: '#FF007F', fontSize: 40 }} />,
      title: t('email'),
      info: 'omartech228@gmail.com',
      action: 'mailto:omartech228@gmail.com'
    },
    {
      icon: <LocationOn sx={{ color: '#FF007F', fontSize: 40 }} />,
      title: t('office'),
      info: t('123 Business Ave, Suite 100 Tech City, TC 12345'),
      action: 'https://maps.google.com'
    }
  ];

  const businessHours = [
    t('Monday - Friday: 9:00 AM - 6:00 PM'),
    t('Saturday: 10:00 AM - 4:00 PM'),
    t('Sunday: Closed')
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      background: `
        linear-gradient(175deg, #F8FAFF 0%, #FFFFFF 100%),
        radial-gradient(circle at 70% 30%, rgba(255, 0, 127, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 30% 70%, rgba(221, 182, 242, 0.1) 0%, transparent 40%),
        radial-gradient(circle at center, rgba(100, 200, 255, 0.1) 0%, transparent 60%)
      `,
      direction: language === 'ar' ? 'rtl' : 'ltr'
    }}>
      {/* Header */}
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        zIndex: 1200,
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(5px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        flexDirection: language === 'ar' ? 'row-reverse' : 'row'
      }}>
        <Box sx={{ width: "120px" }}>
          <img 
            src="./dist/images/gg.png" 
            alt={t('companyLogo')} 
            style={{ 
              width: "100%", 
              height: "auto",
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }} 
          />
        </Box>
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            color: '#3A3A72',
            '&:hover': {
              backgroundColor: 'rgba(58, 58, 114, 0.1)'
            }
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Navigation Drawer */}
      <Drawer
        anchor={language === 'ar' ? 'left' : 'right'}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box>
          <Box sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            flexDirection: language === 'ar' ? 'row-reverse' : 'row'
          }}>
            <img 
              src="./dist/images/gg.png" 
              alt={t('companyLogo')} 
              style={{ 
                width: "100px", 
                height: "auto",
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }} 
            />
            <IconButton onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>

          <List sx={{ p: 2 }}>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => {
                    item.action();
                    toggleDrawer(false)();
                  }}
                  sx={{
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 127, 0.05)',
                      '& .MuiListItemIcon-root': {
                        transform: 'scale(1.1)'
                      }
                    },
                    flexDirection: language === 'ar' ? 'row-reverse' : 'row'
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    transition: 'transform 0.2s ease',
                    mr: language === 'ar' ? 0 : '16px',
                    ml: language === 'ar' ? '16px' : 0
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: '#2A2A52',
                      fontSize: '1rem'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Language Selector */}
        <Box sx={{ 
          p: 3,
          borderTop: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(248, 250, 255, 0.5)'
        }}>
          <FormControl fullWidth>
            <InputLabel>{t('language')}</InputLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
              label={t('language')}
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.1)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.2)'
                }
              }}
            >
              <MenuItem value="en">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Language sx={{ mr: 1 }} />
                  {t('english')}
                </Box>
              </MenuItem>
              <MenuItem value="de">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Language sx={{ mr: 1 }} />
                  {t('deutsch')}
                </Box>
              </MenuItem>
              <MenuItem value="ar">
                <Box sx={{ display: 'flex', alignItems: 'center', direction: 'rtl' }}>
                  <Language sx={{ ml: 1 }} />
                  العربية
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pt: '100px', pb: 6 }}>
        {/* Contact Header */}
        <Box textAlign="center" mb={6}>
          <ContactSupport sx={{ fontSize: 60, color: '#FF007F', mb: 2 }} />
          <Typography variant="h2" sx={{ 
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(90deg, #FF007F 0%, #3A3A72 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('contactUs')}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {t('contactSubtitle')}
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Methods */}
          <Grid item xs={12} md={5}>
            <Card sx={{ 
              p: 4,
              height: '100%',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                mb: 4,
                color: '#2A2A52'
              }}>
                {t('contactInformation')}
              </Typography>

              <List>
                {contactMethods.map((method, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 50 }}>
                        {method.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {method.title}
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            component="a" 
                            href={method.action} 
                            sx={{ 
                              textDecoration: 'none',
                              color: 'text.secondary',
                              '&:hover': {
                                color: '#FF007F'
                              },
                              whiteSpace: 'pre-line'
                            }}
                          >
                            {method.info}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < contactMethods.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {t('businessHoursTitle')}
                </Typography>
                {businessHours.map((hour, index) => (
                  <Typography key={index}>{hour}</Typography>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ 
              p: 4,
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: '#2A2A52'
              }}>
                {t('sendMessageTitle')}
              </Typography>

              <form onSubmit={handleSubmit} ref={formRef}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('yourName')}
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF007F',
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('emailAddress')}
                      name="user_email"
                      type="email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF007F',
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('yourMessage')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#ddd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF007F',
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      disabled={loading}
                      sx={{
                        backgroundColor: '#FF007F',
                        '&:hover': {
                          backgroundColor: '#D6006A'
                        },
                        '&:disabled': {
                          backgroundColor: '#ccc'
                        },
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {loading ? t('sending') : t('sendMessage')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box sx={{ mt: 8, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <iframe
            title={t('companyLocation')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215373510518!2d-73.98784492416478!3d40.74844047138969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;