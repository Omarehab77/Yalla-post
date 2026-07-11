import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Popover,
  Menu
} from '@mui/material';
import {
  DesignServices,
  Star,
  Share,
  Download,
  Edit,
  CheckCircle,
  Menu as MenuIcon,
  Home as HomeIcon,
  Create,
  TrendingUp,
  Timeline,
  ContactSupport,
  Language,
  Chat,
  Business,
  Facebook,
  WhatsApp,
  LinkedIn,
  Instagram,
  ContentCopy
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from './translations/LanguageContext';
import { applyRTLStyles, flipIconPosition, getFlexDirection, getDrawerAnchor } from './rtlUtils';
import html2canvas from 'html2canvas';

const ProfessionalDesign = ({ isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const [designs, setDesigns] = useState([]);
  const [newPublished, setNewPublished] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [currentDesignForShare, setCurrentDesignForShare] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    // Load designs from localStorage with proper error handling
    try {
      const proDesigns = JSON.parse(localStorage.getItem('professionalDesigns') || '[]');
      setDesigns(proDesigns);
    } catch (error) {
      console.error('Error loading professional designs:', error);
      setDesigns([]);
    }
    
    // Check for newly published design
    if (location.state?.newlyPublished) {
      setNewPublished(true);
      const timer = setTimeout(() => setNewPublished(false), 5000);
      return () => clearTimeout(timer);
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

  // Share functionality
  const handleShareClick = (event, design) => {
    setCurrentDesignForShare(design);
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const shareOnPlatform = (platform) => {
    const designUrl = `${window.location.origin}/design/${currentDesignForShare.id}`;
    const message = `Check out this professional design: ${currentDesignForShare.name} - ${designUrl}`;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(designUrl)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we just open the app
        window.open('instagram://app', '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(designUrl)}&title=${encodeURIComponent(currentDesignForShare.name)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(designUrl);
        setSnackbar({
          open: true,
          message: 'Link copied to clipboard!',
          severity: 'success'
        });
        break;
      default:
        break;
    }
    handleShareClose();
  };

  // Download functionality
  const handleDownload = async (design) => {
    try {
      // Create a temporary element to render the design for capture
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = `${design.size?.width || 800}px`;
      tempDiv.style.height = `${design.size?.height || 600}px`;
      tempDiv.style.backgroundColor = design.pages?.[0]?.backgroundColor || '#ffffff';
      document.body.appendChild(tempDiv);

      // Render design elements
      design.pages?.[0]?.elements?.forEach((el, idx) => {
        const elementDiv = document.createElement('div');
        elementDiv.style.position = 'absolute';
        elementDiv.style.left = `${el.x}px`;
        elementDiv.style.top = `${el.y}px`;
        elementDiv.style.width = `${el.width}px`;
        elementDiv.style.height = `${el.height}px`;
        elementDiv.style.backgroundColor = el.color || 'transparent';
        elementDiv.style.border = `${el.borderWidth || 0}px solid ${el.borderColor || 'transparent'}`;
        elementDiv.style.borderRadius = `${el.borderRadius || 0}px`;
        
        if (el.type === 'text') {
          elementDiv.innerText = el.text;
          elementDiv.style.fontFamily = el.fontFamily || 'Arial';
          elementDiv.style.fontSize = `${el.fontSize || 16}px`;
          elementDiv.style.color = el.textColor || '#000000';
          elementDiv.style.textAlign = el.textAlign || 'left';
        } else if (el.type === 'image' && el.imageUrl) {
          const img = document.createElement('img');
          img.src = el.imageUrl;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          elementDiv.appendChild(img);
        }
        
        tempDiv.appendChild(elementDiv);
      });

      // Capture and download
      const canvas = await html2canvas(tempDiv);
      const link = document.createElement('a');
      link.download = `${design.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Clean up
      document.body.removeChild(tempDiv);

      setSnackbar({
        open: true,
        message: 'Design downloaded successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error downloading design:', error);
      setSnackbar({
        open: true,
        message: 'Failed to download design',
        severity: 'error'
      });
    }
  };

  const getDesignThumbnail = (design) => {
    if (design.pages?.[0]?.elements?.some(el => el.type === 'image' && el.imageUrl)) {
      return design.pages[0].elements.find(el => el.type === 'image' && el.imageUrl).imageUrl;
    }
    return null;
  };

  const handleContactOwner = (design) => {
    navigate('/messages', { state: { recipient: design.owner, designId: design.id } });
  };

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
          <MenuIcon fontSize="large" />
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

      {/* Share Menu Popover */}
      <Popover
        open={Boolean(shareAnchorEl)}
        anchorEl={shareAnchorEl}
        onClose={handleShareClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Share Design</Typography>
          <List>
            <ListItemButton onClick={() => shareOnPlatform('whatsapp')}>
              <ListItemIcon><WhatsApp color="success" /></ListItemIcon>
              <ListItemText primary="WhatsApp" />
            </ListItemButton>
            <ListItemButton onClick={() => shareOnPlatform('facebook')}>
              <ListItemIcon><Facebook color="primary" /></ListItemIcon>
              <ListItemText primary="Facebook" />
            </ListItemButton>
            <ListItemButton onClick={() => shareOnPlatform('instagram')}>
              <ListItemIcon><Instagram color="secondary" /></ListItemIcon>
              <ListItemText primary="Instagram" />
            </ListItemButton>
            <ListItemButton onClick={() => shareOnPlatform('linkedin')}>
              <ListItemIcon><LinkedIn color="primary" /></ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </ListItemButton>
            <ListItemButton onClick={() => shareOnPlatform('copy')}>
              <ListItemIcon><ContentCopy /></ListItemIcon>
              <ListItemText primary="Copy Link" />
            </ListItemButton>
          </List>
        </Box>
      </Popover>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        p: isMobile ? 2 : 4,
        pt: '80px'
      }}>
        {/* Success notification */}
        {newPublished && (
          <Box sx={{
            mb: 4,
            p: 2,
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <CheckCircle sx={{ mr: 1 }} />
            <Typography>
              {t('designPublishedSuccess')}: {location.state.designName}
            </Typography>
          </Box>
        )}

        <Typography variant="h3" sx={{ 
          mb: 4,
          fontWeight: 800,
          color: '#2A2A52'
        }}>
          {t('professionalDesigns')}
        </Typography>

        {designs.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            textAlign: 'center'
          }}>
            <DesignServices sx={{ fontSize: 80, color: '#5A5A8A', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: '#2A2A52' }}>
              {t('noProfessionalDesigns')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#5A5A8A' }}>
              {t('publishFromDesignStudio')}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/design-studio')}
              sx={{
                backgroundColor: '#FF007F',
                '&:hover': { backgroundColor: '#DDB6F2' }
              }}
            >
              {t('goToDesignStudio')}
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {designs.map((design, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  {/* Design Thumbnail */}
                  <Box sx={{ 
                    height: 200,
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    {getDesignThumbnail(design) ? (
                      <img
                        src={getDesignThumbnail(design)}
                        alt={design.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F5F5F5'
                      }}>
                        <DesignServices sx={{ fontSize: 60, color: '#BDBDBD' }} />
                      </Box>
                    )}
                    <Chip
                      label={design.status || 'published'}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: design.status === 'published' ? '#4CAF50' : '#FFC107',
                        color: 'white'
                      }}
                    />
                  </Box>

                  {/* Design Info */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2A2A52' }}>
                        {design.name}
                      </Typography>
                      <Chip
                        label={`${design.size?.width || 0}×${design.size?.height || 0}`}
                        size="small"
                        sx={{ backgroundColor: 'rgba(58, 58, 114, 0.1)' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {new Date(design.publishedAt).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                      <Typography variant="body2">
                        {design.owner || 'Anonymous'}
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* Actions */}
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton 
                        onClick={(e) => handleShareClick(e, design)}
                        sx={{ color: '#3A3A72' }}
                      >
                        <Share />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDownload(design)}
                        sx={{ color: '#3A3A72' }}
                      >
                        <Download />
                      </IconButton>
                    </Box>
                    <Box>
                      <Button
                        size="small"
                        startIcon={<Chat />}
                        onClick={() => handleContactOwner(design)}
                        sx={{ mr: 1 }}
                      >
                        {t('contact')}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => navigate('/design-studio', { state: { editDesign: design } })}
                      >
                        {t('edit')}
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

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

export default ProfessionalDesign;