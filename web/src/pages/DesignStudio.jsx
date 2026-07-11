import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  Drawer
} from '@mui/material';
import {
  Menu,
  Delete,
  Edit,
  ArrowBack,
  Home as HomeIcon,
  Create,
  DesignServices,
  TrendingUp,
  Timeline,
  ContactSupport,
  Language,
  CheckCircle,
  Chat,
  Business
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from './translations/LanguageContext';
import { applyRTLStyles, flipIconPosition, getFlexDirection, getDrawerAnchor } from './rtlUtils';

const DesignStudio = ({ isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [designToDelete, setDesignToDelete] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    if (location.state?.marketingEnabled) {
      setMarketingEnabled(true);
    }
  }, [location.state]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  useEffect(() => {
    const loadDesigns = () => {
      try {
        const designs = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
        setSavedDesigns(designs);
      } catch (error) {
        console.error('Error loading designs:', error);
      }
    };
    loadDesigns();
  }, []);

  const handleViewDesign = (design) => {
    setSelectedDesign(design);
  };

  const handleCloseDetails = () => {
    setSelectedDesign(null);
  };

  const handleDeleteDesign = (design) => {
    setDesignToDelete(design);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteDesign = () => {
    try {
      const updatedDesigns = savedDesigns.filter(d => d.name !== designToDelete.name);
      setSavedDesigns(updatedDesigns);
      localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns));
      
      if (selectedDesign?.name === designToDelete.name) {
        setSelectedDesign(null);
      }
    } catch (error) {
      console.error('Error deleting design:', error);
    } finally {
      setOpenDeleteDialog(false);
      setDesignToDelete(null);
    }
  };

  const handleEditDesign = (design) => {
    navigate('/start-design', { state: { editDesign: design } });
  };

  const handlePublishDesign = () => {
    if (!selectedDesign) {
      setSnackbar({
        open: true,
        message: t('selectDesignFirst'),
        severity: 'error'
      });
      return;
    }

    try {
      const professionalDesigns = JSON.parse(localStorage.getItem('professionalDesigns') || '[]');
      const newPublishedDesign = {
        ...selectedDesign,
        id: `pub-${Date.now()}`,
        publishedAt: new Date().toISOString(),
        status: 'published',
        views: 0,
        likes: 0,
        owner: 'currentUser' // Replace with actual user ID
      };

      localStorage.setItem(
        'professionalDesigns',
        JSON.stringify([...professionalDesigns, newPublishedDesign])
      );

      setSnackbar({
        open: true,
        message: t('designPublishedSuccess', { name: selectedDesign.name }),
        severity: 'success'
      });

      navigate('/professional-design', {
        state: {
          newlyPublished: true,
          designName: selectedDesign.name
        }
      });

    } catch (error) {
      console.error('Publish error:', error);
      setSnackbar({
        open: true,
        message: t('publishFailed'),
        severity: 'error'
      });
    }
  };

  const getDesignThumbnail = (design) => {
    if (design.pages?.[0]?.elements?.some(el => el.type === 'image' && el.imageUrl)) {
      const imageElement = design.pages[0].elements.find(el => el.type === 'image' && el.imageUrl);
      return imageElement.imageUrl;
    }
    return null;
  };

  const navItems = [
    { text: t('home'), icon: <HomeIcon sx={{ color: '#FF007F' }} />, action: () => navigate('/') },
    { text: t('designStudio'), icon: <Create sx={{ color: '#FF007F' }} />, action: () => navigate('/design-studio') },
    { text: t('professionalDesign'), icon: <DesignServices sx={{ color: '#FF007F' }} />, action: () => navigate('/professional-design') },
    { text: t('marketingServices'), icon: <TrendingUp sx={{ color: '#FF007F' }} />, action: () => navigate('/marketing') },
    { text: t('OurProcess'), icon: <Timeline sx={{ color: '#FF007F' }} />, action: () => navigate('/process') },
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
      <Box sx={{ 
        flex: 1, 
        p: isMobile ? 2 : 4,
        pt: '80px'
      }}>
        {selectedDesign ? (
          <Box>
            <Button 
              startIcon={<ArrowBack />}
              onClick={handleCloseDetails}
              sx={{ 
                mb: 2,
                color: '#5A5A8A',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }
              }}
            >
              {t('backToDesigns')}
            </Button>
            
            <Paper sx={{ 
              p: 3, 
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#2A2A52' }}>
                  {selectedDesign.name}
                </Typography>
                <Box>
                  <Chip 
                    label={`${selectedDesign.size?.width || 0}×${selectedDesign.size?.height || 0}`}
                    sx={{ 
                      mr: 1, 
                      backgroundColor: 'rgba(58, 58, 114, 0.1)',
                      color: '#2A2A52'
                    }}
                  />
                  <Chip 
                    label={selectedDesign.type || 'design'}
                    sx={{ 
                      backgroundColor: 'rgba(255, 0, 127, 0.1)',
                      color: '#FF007F'
                    }}
                  />
                </Box>
              </Box>
              
              {/* Design Preview */}
              <Box sx={{ 
                width: '100%',
                height: 400,
                position: 'relative',
                bgcolor: selectedDesign.pages?.[0]?.backgroundColor || '#ffffff',
                overflow: 'auto',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                mb: 3
              }}>
                {selectedDesign.pages?.[0]?.elements?.map((el, idx) => (
                  <Box key={idx} sx={{
                    position: 'absolute',
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    backgroundColor: el.color || 'transparent',
                    background: el.gradient === 'linear' ? 
                      `linear-gradient(45deg, ${el.color}, #FFFFFF)` :
                      el.gradient === 'radial' ?
                      `radial-gradient(circle, ${el.color}, #FFFFFF)` :
                      el.color,
                    border: `${el.borderWidth}px solid ${el.borderColor}`,
                    borderRadius: `${el.borderRadius}px`,
                    opacity: el.opacity / 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: el.shadow === 'small' ? '0 2px 8px rgba(0,0,0,0.15)' :
                      el.shadow === 'medium' ? '0 4px 12px rgba(0,0,0,0.2)' :
                      el.shadow === 'large' ? '0 8px 24px rgba(0,0,0,0.25)' : 'none'
                  }}>
                    {el.type === 'text' && (
                      <Typography sx={{ 
                        fontSize: el.fontSize,
                        fontFamily: el.fontFamily,
                        fontWeight: el.fontWeight,
                        fontStyle: el.fontStyle,
                        textDecoration: el.textDecoration,
                        color: el.textColor,
                        backgroundColor: el.backgroundColor,
                        textAlign: el.textAlign,
                        p: 1,
                        width: '100%'
                      }}>
                        {el.text}
                      </Typography>
                    )}
                    {el.type === 'image' && el.imageUrl && (
                      <img 
                        src={el.imageUrl} 
                        alt="Design element" 
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: el.filter === 'grayscale' ? 'grayscale(100%)' :
                            el.filter === 'vintage' ? 'sepia(70%) hue-rotate(300deg) saturate(500%)' :
                            el.filter === 'hdr' ? 'brightness(1.2) contrast(1.2) saturate(1.5)' :
                            el.filter === 'blur' ? 'blur(2px)' :
                            el.filter === 'darken' ? 'brightness(0.8)' :
                            el.filter === 'contrast' ? 'contrast(1.5)' : 'none'
                        }} 
                      />
                    )}
                  </Box>
                ))}
              </Box>
              
              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteDesign(selectedDesign)}
                  sx={{ 
                    color: '#FF3D00',
                    borderColor: '#FF3D00',
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 61, 0, 0.05)',
                      borderColor: '#FF3D00'
                    }
                  }}
                >
                  {t('delete')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => handleEditDesign(selectedDesign)}
                  sx={{ 
                    backgroundColor: '#3A3A72',
                    '&:hover': { backgroundColor: '#2A2A52' }
                  }}
                >
                  {t('editDesign')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<TrendingUp />}
                  onClick={handlePublishDesign}
                  sx={{ 
                    backgroundColor: marketingEnabled ? '#4CAF50' : '#FF007F',
                    '&:hover': { 
                      backgroundColor: marketingEnabled ? '#388E3C' : '#DDB6F2' 
                    }
                  }}
                >
                  {marketingEnabled ? t('publishNow') : t('publishAndMarket')}
                </Button>
              </Box>
            </Paper>
          </Box>
        ) : (
          // Gallery View
          <>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#2A2A52' }}>
              {t('mySavedDesigns')}
            </Typography>

            {savedDesigns.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '60vh'
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#5A5A8A' }}>
                  {t('noDesignsSavedYet')}
                </Typography>
                <Button 
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#FF007F',
                    color: 'white',
                    '&:hover': { backgroundColor: '#DDB6F2' }
                  }}
                  onClick={() => navigate('/start-design')}
                >
                  {t('createNewDesign')}
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {savedDesigns.map((design) => {
                  const thumbnail = getDesignThumbnail(design);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={design.name}>
                      <Paper sx={{ 
                        p: 2, 
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-5px)' }
                      }}>
                        {/* Design Preview Thumbnail */}
                        <Box 
                          sx={{ 
                            height: 200,
                            mb: 2,
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '12px',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            backgroundColor: design.pages?.[0]?.backgroundColor || '#ffffff'
                          }}
                          onClick={() => handleViewDesign(design)}
                        >
                          {thumbnail ? (
                            <img 
                              src={thumbnail} 
                              alt="Design thumbnail" 
                              style={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }} 
                            />
                          ) : (
                            // Fallback preview with elements
                            design.pages?.[0]?.elements?.map((el, idx) => (
                              <Box key={idx} sx={{
                                position: 'absolute',
                                left: `${(el.x / design.size.width) * 100}%`,
                                top: `${(el.y / design.size.height) * 100}%`,
                                width: `${(el.width / design.size.width) * 100}%`,
                                height: `${(el.height / design.size.height) * 100}%`,
                                bgcolor: el.color || 'rgba(255, 0, 127, 0.3)',
                                border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor}` : 'none',
                                borderRadius: `${el.borderRadius}px`
                              }} />
                            ))
                          )}
                        </Box>

                        {/* Design Info */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2A2A52' }}>
                            {design.name}
                          </Typography>
                          <Chip 
                            label={`${design.size?.width || 0}×${design.size?.height || 0}`}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(58, 58, 114, 0.1)',
                              color: '#2A2A52'
                            }}
                          />
                        </Box>

                        {/* Actions */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                          <IconButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDesign(design);
                            }}
                            sx={{ color: '#FF3D00' }}
                          >
                            <Delete />
                          </IconButton>
                          <Button 
                            variant="contained"
                            startIcon={<Edit />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditDesign(design);
                            }}
                            sx={{ 
                              backgroundColor: '#FF007F',
                              color: 'white',
                              '&:hover': { backgroundColor: '#DDB6F2' }
                            }}
                          >
                            {t('edit')}
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2A2A52' }}>{t('deleteDesign')}?</DialogTitle>
        <DialogContent>
          <Typography>
            {t('deleteConfirm')} "{designToDelete?.name}"? {t('actionCannotBeUndone')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ color: '#5A5A8A' }}
          >
            {t('cancel')}
          </Button>
          <Button 
            onClick={confirmDeleteDesign}
            sx={{ color: '#FF3D00' }}
          >
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
      >
        <Alert 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DesignStudio;