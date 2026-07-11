import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Drawer,
  IconButton,
  ListItemButton,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  ExpandMore,
  PlayCircle,
  CheckCircle,
  Business,
  Lightbulb,
  TrendingUp,
  MonetizationOn,
  People,
  Link,
  Menu as MenuIcon,
  Home as HomeIcon,
  Create,
  DesignServices,
  Timeline,
  ContactSupport,
  Chat,
  School,
  FilterAlt,
  Close,
  Language
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './translations/LanguageContext';

const Entrepreneur = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openStory, setOpenStory] = useState(null);

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  // Navigation items - consistent with OurProcess page
  const navItems = [
    { text: t('home'), icon: <HomeIcon sx={{ color: '#FF007F' }} />, action: () => navigate('/') },
    { text: t('designStudio'), icon: <Create sx={{ color: '#FF007F' }} />, action: () => navigate('/DesignStudio') },
    { text: t('professionalDesign'), icon: <DesignServices sx={{ color: '#FF007F' }} />, action: () => navigate('/professional-design') },
    { text: t('marketingServices'), icon: <TrendingUp sx={{ color: '#FF007F' }} />, action: () => navigate('/marketing') },
    { text: t('ourProcess'), icon: <Timeline sx={{ color: '#FF007F' }} />, action: () => navigate('/process') },
    { text: t('messages'), icon: <Chat sx={{ color: '#FF007F' }} />, action: () => navigate('/messages') },
    { text: t('becomeEntrepreneur'), icon: <Business sx={{ color: '#FF007F' }} />, action: () => navigate('/entrepreneur') },
    { text: t('contactUs'), icon: <ContactSupport sx={{ color: '#FF007F' }} />, action: () => navigate('/contact') },
    { text: t('LiveAICourses'), icon: <ContactSupport sx={{ color: '#FF007F' }} />, action: () => navigate('/Live_Courses') }

  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleOpenStory = (story) => {
    setOpenStory(story);
  };

  const handleCloseStory = () => {
    setOpenStory(null);
  };

  // Enhanced courses data with custom images
  const [courses] = useState([
    {
      title: t('fromIdeaToLaunch'),
      image: "./dist/images/y1.png",
      url: "https://youtu.be/r-98YRAF1dY?si=cTQ3UFSNaXI6jkuG",
      category: t('gettingStarted'),
      duration: t('1hour'),
      lessons: 1
    },
    {
      title: t('digitalMarketingMastery'),
      image: "./dist/images/y2.png",
      url: "https://youtube.com/playlist?list=PLJnp6H0VfvtNfquqh2Oj35Hdy_cEcMihe&si=rxso4M-ejHTNJiVI",
      category: t('marketing'),
      duration: t('2hours'),
      lessons: 35
    },
    {
      title: t('fundingYourVenture'),
      image: "./dist/images/y3.png",
      url: "https://youtube.com/playlist?list=PLITcMmkX7BfzwJ_MwJTZhODASXKbItbVl&si=Ju1wPuGZhL870-OJ",
      category: t('finance'),
      duration: t('10hours'),
      lessons: 24
    },
    {
      title: t('buildingYourBrand'),
      image: "./dist/images/y4.png",
      url: "https://youtube.com/playlist?list=PLzKJi2GjpkEFsV13D3WPm5s6tZVkvKJ1-&si=_esgrHVvVDnspfwg",
      category: t('branding'),
      duration: t('5hours'),
      lessons: 16
    }
  ]);

  // Expanded tips section
  const tips = [
    {
      title: t('validateBeforeInvest'),
      content: t('validateBeforeInvestContent'),
      icon: <FilterAlt color="primary" />
    },
    {
      title: t('buildYourNetwork'),
      content: t('buildYourNetworkContent'),
      icon: <People color="primary" />
    },
    {
      title: t('masterCashFlow'),
      content: t('masterCashFlowContent'),
      icon: <MonetizationOn color="primary" />
    },
    {
      title: t('leverageTechnology'),
      content: t('leverageTechnologyContent'),
      icon: <DesignServices color="primary" />
    },
    {
      title: t('focusCustomerNeeds'),
      content: t('focusCustomerNeedsContent'),
      icon: <Chat color="primary" />
    },
    {
      title: t('developResilience'),
      content: t('developResilienceContent'),
      icon: <School color="primary" />
    },
    { 
  text: t('LiveAICourses'), 
  icon: <School sx={{ color: '#FF007F' }} />, 
  action: () => navigate('/ai-courses') 
}
  ];

  // Additional resources
  const resources = [
    { name: t('sbaLearningCenter'), url: "https://www.sba.gov/learning-center" },
    { name: t('scoreBusinessMentoring'), url: "https://www.score.org" },
    { name: t('courseraEntrepreneurship'), url: "https://www.coursera.org/business/entrepreneurship" },
    { name: t('hbrStartupResources'), url: "https://hbr.org/startup-resources" },
    { name: t('localBusinessCenter'), url: "https://americassbdc.org" }
  ];

  // Success stories with full content
  const successStories = [
    {
      name: "Sarah Johnson",
      business: "EcoPack Solutions",
      quote: t('sarahQuote'),
      image: "./dist/images/sara.png",
      fullStory: {
        background: t('sarahBackground'),
        journey: [
          t('sarahJourney1'),
          t('sarahJourney2'),
          t('sarahJourney3'),
          t('sarahJourney4')
        ],
        challenges: [
          t('sarahChallenge1'),
          t('sarahChallenge2'),
          t('sarahChallenge3')
        ],
        advice: [
          t('sarahAdvice1'),
          t('sarahAdvice2'),
          t('sarahAdvice3')
        ],
        results: [
          t('sarahResult1'),
          t('sarahResult2'),
          t('sarahResult3')
        ]
      }
    },
    {
      name: "Michael Chen",
      business: "TechTutor",
      quote: t('michaelQuote'),
      image: "./dist/images/mi.png",
      fullStory: {
        background: t('michaelBackground'),
        journey: [
          t('michaelJourney1'),
          t('michaelJourney2'),
          t('michaelJourney3'),
          t('michaelJourney4')
        ],
        challenges: [
          t('michaelChallenge1'),
          t('michaelChallenge2'),
          t('michaelChallenge3')
        ],
        advice: [
          t('michaelAdvice1'),
          t('michaelAdvice2'),
          t('michaelAdvice3')
        ],
        results: [
          t('michaelResult1'),
          t('michaelResult2'),
          t('michaelResult3')
        ]
      }
    }
  ];

  // Recommended books
  const books = [
    t('leanStartup'),
    t('zeroToOne'),
    t('hundredDollarStartup')
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
      {/* Header with Logo and Menu - consistent with OurProcess */}
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
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Navigation Drawer - consistent with OurProcess */}
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
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Business sx={{ fontSize: 80, color: '#FF007F', mb: 3 }} />
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            mb: 2,
            background: 'linear-gradient(90deg, #FF007F 0%, #3A3A72 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('launchYourJourney')}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            {t('entrepreneurSubtitle')}
          </Typography>
        </Box>

        {/* Courses Section */}
        <Box mb={10}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 5,
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              backgroundColor: '#FF007F',
              borderRadius: 2
            }
          }}>
            <PlayCircle sx={{ mr: 2, verticalAlign: 'middle', color: '#FF007F' }} />
            {t('essentialCourses')}
          </Typography>
          
          <Grid container spacing={4}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.image}
                    alt={course.title}
                    sx={{ 
                      objectFit: 'cover',
                      borderBottom: '4px solid #FF007F'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip 
                      label={course.category} 
                      size="small" 
                      sx={{ 
                        mb: 2,
                        backgroundColor: '#F0F0FF',
                        color: '#3A3A72',
                        fontWeight: 600
                      }} 
                    />
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                      {course.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⏱️ {course.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📚 {course.lessons} {t('lessons')}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      href={course.url}
                      sx={{
                        backgroundColor: '#FF007F',
                        '&:hover': { backgroundColor: '#D6006A' },
                        fontWeight: 600
                      }}
                    >
                      {t('enrollNow')}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tips Section */}
        <Box mb={10}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 5,
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              backgroundColor: '#FF007F',
              borderRadius: 2
            }
          }}>
            <Lightbulb sx={{ mr: 2, verticalAlign: 'middle', color: '#FFC107' }} />
            {t('expertTips')}
          </Typography>
          
          <Grid container spacing={4}>
            {tips.map((tip, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  p: 3,
                  borderLeft: '4px solid #FF007F',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 0, 127, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      {tip.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {tip.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    {tip.content}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Success Stories */}
        <Box mb={10}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 5,
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              backgroundColor: '#FF007F',
              borderRadius: 2
            }
          }}>
            💼 {t('successStories')}
          </Typography>
          
          <Grid container spacing={4}>
            {successStories.map((story, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: '100%'
                }}>
                  <CardMedia
                    component="img"
                    image={story.image}
                    alt={story.name}
                    sx={{
                      width: { xs: '100%', sm: 150 },
                      height: { xs: 200, sm: 'auto' },
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    flex: 1
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {story.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                      {t('founder')}, {story.business}
                    </Typography>
                    <Typography sx={{ flexGrow: 1, fontStyle: 'italic', mb: 2 }}>
                      "{story.quote}"
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleOpenStory(story)}
                      sx={{ 
                        alignSelf: 'flex-start',
                        color: '#FF007F',
                        borderColor: '#FF007F',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 0, 127, 0.08)',
                          borderColor: '#D6006A'
                        }
                      }}
                    >
                      {t('readFullStory')}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Story Dialog */}
        <Dialog 
          open={Boolean(openStory)} 
          onClose={handleCloseStory}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            pb: 2
          }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {openStory?.name}
              </Typography>
              <Typography color="text.secondary">
                {t('founderOf')} {openStory?.business}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseStory}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ pt: 3 }}>
            {openStory && (
              <Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Box sx={{ width: 150, mr: 3, flexShrink: 0 }}>
                    <CardMedia
                      component="img"
                      image={openStory.image}
                      alt={openStory.name}
                      sx={{ borderRadius: 1 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      "{openStory.quote}"
                    </Typography>
                    <Typography paragraph>
                      {openStory.fullStory.background}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#FF007F' }}>
                        {t('theJourney')}
                      </Typography>
                      <List>
                        {openStory.fullStory.journey.map((item, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemIcon>
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
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#FF007F' }}>
                        {t('keyChallenges')}
                      </Typography>
                      <List>
                        {openStory.fullStory.challenges.map((item, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemIcon>
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
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#FF007F' }}>
                        {t('adviceForEntrepreneurs')}
                      </Typography>
                      <List>
                        {openStory.fullStory.advice.map((item, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemIcon>
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
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#FF007F' }}>
                        {t('resultsAchieved')}
                      </Typography>
                      <List>
                        {openStory.fullStory.results.map((item, i) => (
                          <ListItem key={i} sx={{ px: 0 }}>
                            <ListItemIcon>
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
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
            <Button 
              onClick={handleCloseStory}
              sx={{ color: '#FF007F' }}
            >
              {t('close')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Resources Section */}
        <Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 5,
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              backgroundColor: '#FF007F',
              borderRadius: 2
            }
          }}>
            <Link sx={{ mr: 2, verticalAlign: 'middle', color: '#2196F3' }} />
            {t('additionalResources')}
          </Typography>
          
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 600 }}>{t('helpfulLinksTools')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {resources.map((resource, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: '#FF007F' 
                      }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            color: '#3A3A72',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          {resource.name}
                        </a>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 600 }}>{t('recommendedBooks')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {books.map((book, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF007F' }} />
                    </ListItemIcon>
                    <ListItemText primary={book} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
};

export default Entrepreneur;