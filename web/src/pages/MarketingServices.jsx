import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import {
  Menu,
  Home as HomeIcon,
  Create,
  DesignServices,
  TrendingUp,
  Timeline,
  ContactSupport,
  Language,
  CheckCircle,
  Star,
  Rocket,
  Public,
  Chat,
  Business 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './translations/LanguageContext';
import { applyRTLStyles, flipIconPosition, getFlexDirection, getDrawerAnchor } from './rtlUtils';

const MarketingServices = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  const marketingPlans = [
    {
      name: t('basicPlan'),
      price: '$15',
      features: [
        t('socialMediaPosting'),
        t('basicSeo'),
        t('monthlyAnalytics'),
        t('emailSupport')
      ],
      recommended: false,
      icon: <Star color="primary" />
    },
    {
      name: t('proPlan'),
      price: '$25',
      features: [
        t('socialMediaManagement'),
        t('advancedSeo'),
        t('weeklyAnalytics'),
        t('prioritySupport'),
        t('adCampaignSetup')
      ],
      recommended: true,
      icon: <Rocket color="primary" />
    },
    {
      name: t('enterprisePlan'),
      price: '$50',
      features: [
        t('fullSocialMediaStrategy'),
        t('premiumSeo'),
        t('realTimeAnalytics'),
        t('24/7Support'),
        t('multiChannelAds'),
        t('contentCreation')
      ],
      recommended: false,
      icon: <Public color="primary" />
    }
  ];

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
      ...applyRTLStyles(language)
    }}>
      {/* Header with Menu Icon */}
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
        ...(language === 'ar' && { flexDirection: 'row-reverse' })
      }}>
        <Box sx={{ width: "120px" }}>
          <img 
            src="/images/gg.png" 
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
          <Menu fontSize="large" />
        </IconButton>
      </Box>

      {/* Navigation Drawer */}
      <Drawer
        anchor={getDrawerAnchor(language)}
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
            flexDirection: getFlexDirection(language)
          }}>
            <img 
              src="/images/gg.png" 
              alt={t('companyLogo')} 
              style={{ 
                width: "100px", 
                height: "auto",
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }} 
            />
            <IconButton onClick={toggleDrawer(false)}>
              <Box component="span" sx={{
                width: 24,
                height: 24,
                display: 'block',
                position: 'relative',
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: '100%',
                  height: 2,
                  backgroundColor: '#3A3A72',
                  transformOrigin: 'center'
                },
                '&:before': {
                  transform: 'rotate(45deg)'
                },
                '&:after': {
                  transform: 'rotate(-45deg)'
                }
              }} />
            </IconButton>
          </Box>

          <List sx={{ p: 2 }}>
            {navItems.map((item, index) => (
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
                    flexDirection: getFlexDirection(language)
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    transition: 'transform 0.2s ease',
                    ...(language === 'ar' && { marginRight: 0, marginLeft: '16px' })
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
            <Select
              value={language}
              onChange={handleLanguageChange}
              sx={{
                borderRadius: '8px',
                '& .MuiSelect-select': {
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: getFlexDirection(language)
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.1)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.2)'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    mt: 1,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                  }
                }
              }}
            >
              <MenuItem value="en" sx={{ display: 'flex', alignItems: 'center' }}>
                <Language sx={{ ...flipIconPosition(language) }} />
                <Box component="span">{t('english')}</Box>
              </MenuItem>
              <MenuItem value="de" sx={{ display: 'flex', alignItems: 'center' }}>
                <Language sx={{ ...flipIconPosition(language) }} />
                <Box component="span">{t('deutsch')}</Box>
              </MenuItem>
              <MenuItem value="ar" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                direction: 'rtl'
              }}>
                <Language sx={{ ...flipIconPosition(language) }} />
                <Box component="span">العربية</Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ pt: '80px', pb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 800,
            mb: 2,
            color: '#2A2A52'
          }}>
            {/* {t('chooseMarketingPlan')} */}
          </Typography>
          <Typography variant="h6" align="center" sx={{ 
            mb: 6,
            color: '#5A5A8A',
            maxWidth: 700,
            mx: 'auto'
          }}>
            {t('marketingPlanDescription')}
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {marketingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  position: 'relative',
                  border: plan.recommended ? '2px solid #FF007F' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '16px',
                  boxShadow: plan.recommended ? '0 8px 24px rgba(255, 0, 127, 0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  {plan.recommended && (
                    <Box sx={{
                      position: 'absolute',
                      top: -10,
                      right: 20,
                      backgroundColor: '#FF007F',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {t('recommended')}
                    </Box>
                  )}
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {plan.icon}
                      <Typography variant="h4" sx={{ 
                        ml: 2,
                        fontWeight: 700,
                        color: '#2A2A52'
                      }}>
                        {plan.name}
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ 
                      mb: 3,
                      fontWeight: 800,
                      color: '#FF007F'
                    }}>
                      {plan.price}
                      <Typography component="span" variant="body1" sx={{ color: '#5A5A8A' }}>
                        /{t('month')}
                      </Typography>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <List>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx} disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
<Button
  fullWidth
  variant={plan.recommended ? "contained" : "outlined"}
  size="large"
  sx={{
    mt: 3,
    borderRadius: '12px',
    fontWeight: 700,
    py: 1.5,
    ...(plan.recommended && {
      background: 'linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)',
      '&:hover': {
        boxShadow: '0 8px 15px rgba(255, 0, 127, 0.3)',
      }
    }),
    ...(!plan.recommended && {
      border: '2px solid #3A3A72',
      color: '#3A3A72',
      '&:hover': {
        backgroundColor: 'rgba(58, 58, 114, 0.05)',
      }
    })
  }}
  onClick={() => navigate('/checkout', { 
    state: { 
      plan: {
        name: plan.name,
        price: plan.price,
        features: plan.features
      } 
    } 
  })}
>
  {t('choosePlan')}
</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MarketingServices;