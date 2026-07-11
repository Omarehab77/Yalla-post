import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create,
  DesignServices,
  TrendingUp,
  Timeline,
  ContactSupport,
  Chat,
  Business,
  ExpandMore,
  AutoAwesome,
  SwapHoriz,
  Dashboard,
  School,
  FilterAlt,
  People,
  Build,
  Palette,
  Link,
  MonetizationOn,
  Cloud,
  Campaign,
  Psychology,
  Language
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './Pages/translations/LanguageContext';

const OurProcess = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState('scamper');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  const navItems = [
    { text: t('home'), icon: <HomeIcon sx={{ color: '#FF007F' }} />, action: () => navigate('/') },
    { text: t('designStudio'), icon: <Create sx={{ color: '#FF007F' }} />, action: () => navigate('/Designstudio') },
    { text: t('professionalDesign'), icon: <DesignServices sx={{ color: '#FF007F' }} />, action: () => navigate('/professional-design') },
    { text: t('marketingServices'), icon: <TrendingUp sx={{ color: '#FF007F' }} />, action: () => navigate('/marketing') },
    { text: t('ourProcess'), icon: <Timeline sx={{ color: '#FF007F' }} />, action: () => navigate('/process') },
    { text: t('messages'), icon: <Chat sx={{ color: '#FF007F' }} />, action: () => navigate('/messages') },
    { text: t('becomeEntrepreneur'), icon: <Business sx={{ color: '#FF007F' }} />, action: () => navigate('/entrepreneur') },
    { text: t('contactUs'), icon: <ContactSupport sx={{ color: '#FF007F' }} />, action: () => navigate('/contact') }
  ];

  const scamperItems = [
    { 
      icon: <SwapHoriz color="primary" />,
      title: t('substitute'),
      description: t('substituteDescription')
    },
    { 
      icon: <Dashboard color="primary" />,
      title: t('modify'),
      description: t('modifyDescription')
    },
    { 
      icon: <School color="primary" />,
      title: t('putToAnotherUse'),
      description: t('putToAnotherUseDescription')
    },
    { 
      icon: <FilterAlt color="primary" />,
      title: t('eliminate'),
      description: t('eliminateDescription')
    }
  ];

  const mindMappingItems = [
    {
      category: t('targetUser'),
      icon: <People color="secondary" />,
      items: [
        t('smallBusinessOwners'),
        t('freelancers'),
        t('marketingBeginners')
      ]
    },
    {
      category: t('coreFeatures'),
      icon: <Build color="secondary" />,
      items: [
        t('seoTools'),
        t('mediaUploads'),
        t('templateMarketplace')
      ]
    },
    {
      category: t('userExperience'),
      icon: <Palette color="secondary" />,
      items: [
        t('simpleOnboarding'),
        t('premadeTemplates'),
        t('dragAndDrop')
      ]
    },
    {
      category: t('integration'),
      icon: <Link color="secondary" />,
      items: [
        t('googleAnalytics'),
        t('socialAutoPosting'),
        t('emailMarketing')
      ]
    },
    {
      category: t('monetization'),
      icon: <MonetizationOn color="secondary" />,
      items: [
        t('premiumTemplates'),
        t('subscriptionPlans'),
        // t('whiteLabel')
      ]
    },
    {
      category: t('technicalAspects'),
      icon: <Cloud color="secondary" />,
      items: [
        t('cloudHosting'),
        t('httpsSecurity'),
        t('automatedBackups')
      ]
    },
    {
      category: t('marketingGrowth'),
      icon: <Campaign color="secondary" />,
      items: [
        t('contentStrategy'),
        t('freeTrial'),
        t('referralProgram')
      ]
    }
  ];

  const aiFuturePlans = [
    t('aiDesignSuggestions'),
    t('abTesting'),
    t('voiceEditing'),
    t('predictiveAnalytics'),
    t('aiMarketingCopy'),
    t('templateRecommendations'),
    // t('accessibilityChecking')
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
      <Container maxWidth="lg" sx={{ pt: '80px', pb: 4 }}>
        <Typography variant="h3" sx={{ 
          mb: 4,
          fontWeight: 800,
          color: '#2A2A52',
          textAlign: 'center'
        }}>
          {t('ourProcessMethodology')}
        </Typography>

        {/* SCAMPER Model Section */}
        <Accordion 
          expanded={expanded === 'scamper'} 
          onChange={handleChange('scamper')}
          sx={{ mb: 2, borderRadius: '8px !important' }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AutoAwesome color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {t('scamperModel')}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {scamperItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    p: 2,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}>
                        {item.icon}
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600,
                          ml: 1.5,
                          color: '#2A2A52'
                        }}>
                          {item.title}
                        </Typography>
                      </Box>
                      <Typography color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Mind Mapping Section */}
        <Accordion 
          expanded={expanded === 'mindmap'} 
          onChange={handleChange('mindmap')}
          sx={{ mb: 2, borderRadius: '8px !important' }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Psychology color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {t('mindMappingApproach')}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {mindMappingItems.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    p: 2,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}>
                        {category.icon}
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600,
                          ml: 1.5,
                          color: '#2A2A52'
                        }}>
                          {category.category}
                        </Typography>
                      </Box>
                      <List dense>
                        {category.items.map((item, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Box sx={{ 
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#FF007F'
                              }} />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Future AI Plans Section */}
        <Accordion 
          expanded={expanded === 'ai'} 
          onChange={handleChange('ai')}
          sx={{ borderRadius: '8px !important' }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AutoAwesome color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {t('futureAIIntegration')}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {t('aiDevelopmentDescription')}
            </Typography>
            
            <Grid container spacing={2}>
              {aiFuturePlans.map((plan, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    backgroundColor: 'rgba(255, 0, 127, 0.05)',
                    borderRadius: '8px'
                  }}>
                    <Box sx={{ 
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#FF007F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      mt: '2px'
                    }}>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Typography>{plan}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="body1" paragraph sx={{ mt: 3 }}>
              {t('aiRoadmapDescription')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default OurProcess;