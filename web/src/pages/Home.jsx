import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Drawer, 
  ListItemButton,
  Divider,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brush, 
  DesignServices, 
  TrendingUp, 
  Public, 
  Campaign, 
  Analytics, 
  Rocket, 
  CheckCircle, 
  Menu,
  Home as HomeIcon,
  Create,
  Groups,
  Timeline,
  ContactSupport,
  Language,
  Chat,
  Business 
} from '@mui/icons-material';
import { LanguageContext } from './translations/LanguageContext';
import { translations } from './translations';
import { 
  applyRTLStyles, 
  flipIconPosition,
  getFlexDirection,
  getTextAlign,
  getDrawerAnchor
} from './rtlUtils';

const HomePage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, changeLanguage, t, direction } = useContext(LanguageContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  const designOptions = [
    {
      icon: <Brush fontSize="large" />,
      title: t('diyDesignStudio'),
      description: t('diyDesignDescription'),
      action: t('startDesigning')
    },
    {
      icon: <DesignServices fontSize="large" />,
      title: t('professionalDesign'),
      description: t('professionalDesignDescription'),
      action: t('requestDesign')
    }
  ];

  const marketingFeatures = [
    {
      icon: <TrendingUp fontSize="large" />,
      title: t('socialMediaBoost'),
      description: t('socialMediaBoostDescription')
    },
    {
      icon: <Public fontSize="large" />,
      title: t('seoOptimization'),
      description: t('seoOptimizationDescription')
    },
    {
      icon: <Campaign fontSize="large" />,
      title: t('targetedAds'),
      description: t('targetedAdsDescription')
    },
    {
      icon: <Analytics fontSize="large" />,
      title: t('performanceTracking'),
      description: t('performanceTrackingDescription')
    }
  ];

  // Enhanced background elements with more effects
  const bgElements = [
    // Large organic blobs with more movement
    {
      type: "blob",
      size: 400,
      color: "rgba(255, 200, 100, 0.2)",
      position: { top: "10%", left: "5%" },
      animation: {
        x: [0, 80, 0],
        y: [0, 40, 0],
        scale: [1, 1.2, 1],
        transition: { duration: 20, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      type: "blob",
      size: 300,
      color: "rgba(100, 200, 255, 0.2)",
      position: { bottom: "15%", right: "10%" },
      animation: {
        x: [0, -60, 0],
        y: [0, -30, 0],
        scale: [1, 0.8, 1],
        transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
      }
    },
    
    // More geometric shapes with faster animations
    {
      type: "triangle",
      size: 180,
      color: "rgba(221, 182, 242, 0.2)",
      position: { top: "30%", right: "20%" },
      animation: {
        rotate: [0, 180, 360],
        transition: { duration: 15, repeat: Infinity, ease: "linear" }
      }
    },
    {
      type: "hexagon",
      size: 120,
      color: "rgba(255, 100, 150, 0.2)",
      position: { bottom: "30%", left: "20%" },
      animation: {
        y: [0, 30, 0],
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
      }
    },
    
    // More floating particles with varied movement
    ...Array.from({ length: 30 }, (_, i) => ({
      type: "particle",
      size: 15 + Math.random() * 20,
      color: `hsla(${Math.floor(Math.random() * 360)}, 100%, 70%, ${0.4 + Math.random() * 0.3})`,
      position: { 
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      },
      animation: {
        x: [0, (Math.random() - 0.5) * 150],
        y: [0, (Math.random() - 0.5) * 80],
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 15 + Math.random() * 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    })),
    
    // More connection lines with stronger colors
    {
      type: "line",
      points: ["10% 20%", "20% 30%", "15% 50%"],
      color: "rgba(255, 0, 127, 0.2)",
      width: 4,
      animation: {
        pathOffset: [0, 1, 0],
        transition: { duration: 6, repeat: Infinity, ease: "linear" }
      }
    },
    {
      type: "line",
      points: ["75% 10%", "90% 20%", "85% 40%"],
      color: "rgba(221, 182, 242, 0.2)",
      width: 4,
      animation: {
        pathOffset: [1, 0, 1],
        transition: { duration: 8, repeat: Infinity, ease: "linear" }
      }
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
      background: `
        linear-gradient(175deg, #F8FAFF 0%, #FFFFFF 100%),
        radial-gradient(circle at 70% 30%, rgba(255, 0, 127, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 30% 70%, rgba(221, 182, 242, 0.1) 0%, transparent 40%),
        radial-gradient(circle at center, rgba(100, 200, 255, 0.1) 0%, transparent 60%)
      `,
      pt: 0,
      ...applyRTLStyles(language)
    }}>
      {/* Enhanced Animated background elements */}
      {bgElements.map((element, index) => {
        if (element.type === "particle") {
          return (
            <Box
              key={`particle-${index}`}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{
                opacity: element.animation.opacity,
                x: element.animation.x,
                y: element.animation.y
              }}
              transition={element.animation.transition}
              sx={{
                position: "absolute",
                width: element.size,
                height: element.size,
                borderRadius: "50%",
                background: element.color,
                ...element.position,
                zIndex: 0,
                filter: "blur(2px)"
              }}
            />
          );
        } else if (element.type === "line") {
          return (
            <Box
              key={`line-${index}`}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 0,
                '&::before': {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(to right, transparent 0%, ${element.color} 50%, transparent 100%)`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 8s infinite linear",
                  clipPath: `polygon(${element.points.join(",")})`
                }
              }}
            />
          );
        } else {
          const clipPath = 
            element.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" :
            element.type === "hexagon" ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" :
            "circle(50%)";
            
          return (
            <Box
              key={`shape-${index}`}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                ...element.animation
              }}
              transition={{
                opacity: { duration: 1, delay: index * 0.1 },
                ...element.animation.transition
              }}
              sx={{
                position: "absolute",
                width: element.size,
                height: element.size,
                background: element.color,
                zIndex: 0,
                ...element.position,
                clipPath,
                filter: "blur(4px)",
                borderRadius: element.type === "blob" ? "50%" : "none"
              }}
            />
          );
        }
      })}

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

      {/* Hero Section */}
      <Box sx={{ 
        pt: '80px',
        pb: 8,
        position: 'relative',
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Grid container spacing={6} alignItems="center" sx={{ mt: 4, flexDirection: getFlexDirection(language) }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" sx={{ 
                fontWeight: 900,
                mb: 3,
                lineHeight: 1.2,
                color: '#2A2A52',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                textAlign: getTextAlign(language)
              }}>
                <Box component="span" sx={{ color: '#FF007F' }}>{t('create')}.</Box> {t('design')}. <Box component="span" sx={{ 
                  background: 'linear-gradient(45deg, #FF007F, #DDB6F2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {t('market')}.
                </Box>
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 4,
                color: '#5A5A8A',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                textAlign: getTextAlign(language)
              }}>
                {t('businessShineDescription')}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                justifyContent: language === 'ar' ? 'flex-end' : 'flex-start'
              }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/start-design')}  // Updated to /start-design
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)',
                    boxShadow: '0 4px 20px rgba(255, 0, 127, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 0, 127, 0.5)',
                    }
                  }}
                >
                  {t('startDesigning')}
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/professional-design')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    border: '2px solid #3A3A72',
                    color: '#3A3A72',
                    '&:hover': {
                      backgroundColor: 'rgba(58, 58, 114, 0.05)',
                    }
                  }}
                >
                  {t('seeExamples')}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component={motion.div}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,0,127,0.1) 0%, rgba(221,182,242,0.1) 100%)',
                    zIndex: 1
                  }
                }}
              >
                <img 
                  src="./dist/images/ttt.png" 
                  alt={t('designPreview')} 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block',
                    position: 'relative',
                    zIndex: 0
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Design Options Section */}
      <Box sx={{ py: 8, position: 'relative' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 800,
            mb: 2,
            color: '#2A2A52'
          }}>
            {t('chooseDesignPath')}
          </Typography>
          <Typography variant="h6" align="center" sx={{ 
            mb: 6,
            color: '#5A5A8A',
            maxWidth: 700,
            mx: 'auto'
          }}>
            {t('gotYouCovered')}
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {designOptions.map((option, index) => (
              <Grid item xs={12} md={6} lg={5} key={index}>
                <Card 
                  component={motion.div}
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                  sx={{ 
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    border: index === 1 ? '2px solid #FF007F' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: index === 1 
                        ? 'linear-gradient(135deg, rgba(255,0,127,0.03) 0%, rgba(221,182,242,0.03) 100%)' 
                        : 'none',
                      zIndex: 0
                    }
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Avatar sx={{ 
                      bgcolor: index === 1 ? 'rgba(255, 0, 127, 0.1)' : 'rgba(58, 58, 114, 0.1)',
                      color: index === 1 ? '#FF007F' : '#3A3A72',
                      width: 80,
                      height: 80,
                      mb: 3,
                      mx: 'auto'
                    }}>
                      {option.icon}
                    </Avatar>
                    <Typography variant="h4" component="h3" sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: '#2A2A52'
                    }}>
                      {option.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#5A5A8A',
                      lineHeight: 1.6,
                      mb: 3
                    }}>
                      {option.description}
                    </Typography>
                    <Button
                      variant={index === 1 ? "contained" : "outlined"}
                      size="large"
                      onClick={() => navigate(index === 0 ? '/professional-design' : '/Contact')}  // Updated routes
                      sx={{
                        borderRadius: '12px',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        ...(index === 1 && {
                          background: 'linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)',
                          '&:hover': {
                            boxShadow: '0 8px 15px rgba(255, 0, 127, 0.3)',
                          }
                        }),
                        ...(index === 0 && {
                          border: '2px solid #3A3A72',
                          color: '#3A3A72',
                          '&:hover': {
                            backgroundColor: 'rgba(58, 58, 114, 0.05)',
                          }
                        })
                      }}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Marketing Features Section */}
      <Box sx={{ 
        py: 8, 
        background: 'linear-gradient(135deg, rgba(248,250,255,0.9) 0%, rgba(255,255,255,0.9) 100%)',
        position: 'relative'
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 800,
            mb: 2,
            color: '#2A2A52'
          }}>
            {t('marketYourDesign')}
          </Typography>
          <Typography variant="h6" align="center" sx={{ 
            mb: 6,
            color: '#5A5A8A',
            maxWidth: 700,
            mx: 'auto'
          }}>
            {t('marketYourDesignDescription')}
          </Typography>
          
          <Grid container spacing={4}>
            {marketingFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                  sx={{ 
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: 'rgba(255, 0, 127, 0.1)',
                      color: '#FF007F',
                      width: 60,
                      height: 60,
                      mb: 3,
                      mx: 'auto'
                    }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: '#2A2A52'
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#5A5A8A',
                      lineHeight: 1.6
                    }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box sx={{ py: 8, position: 'relative' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 800,
            mb: 6,
            color: '#2A2A52'
          }}>
            {t('howItWorks')}
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            {[
              {
                step: "1",
                title: t('createRequestDesign'),
                description: t('createRequestDesignDescription'),
                icon: <Brush sx={{ fontSize: 40 }} />
              },
              {
                step: "2",
                title: t('reviewApprove'),
                description: t('reviewApproveDescription'),
                icon: <CheckCircle sx={{ fontSize: 40 }} />
              },
              {
                step: "3",
                title: t('marketingLaunch'),
                description: t('marketingLaunchDescription'),
                icon: <Rocket sx={{ fontSize: 40 }} />
              },
              {
                step: "4",
                title: t('trackResults'),
                description: t('trackResultsDescription'),
                icon: <Analytics sx={{ fontSize: 40 }} />
              }
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'white',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)'
                    }
                  }}
                >
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 0, 127, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: '#FF007F'
                  }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: '#2A2A52'
                  }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: '#5A5A8A',
                    lineHeight: 1.6
                  }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ 
        py: 8,
        background: 'linear-gradient(135deg, #2A2A52 0%, #3A3A72 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 }, position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" align="center" sx={{ 
            fontWeight: 800,
            mb: 3
          }}>
            {t('readyToTransform')}
          </Typography>
          <Typography variant="h6" align="center" sx={{ 
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
            opacity: 0.9
          }}>
            {t('readyToTransformDescription')}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3, 
            flexWrap: 'wrap',
            flexDirection: getFlexDirection(language)
          }}>
            <Button 
              variant="contained"
              size="large"
              onClick={() => navigate('/start-design')}  // Updated to /start-design
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 0, 127, 0.5)',
                }
              }}
            >
              {t('startDesigning')}
            </Button>
            <Button 
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}  // Updated to /request-consultation
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 700,
                border: '2px solid white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              {t('requestConsultation')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Global styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </Box>
  );
};

export default HomePage;