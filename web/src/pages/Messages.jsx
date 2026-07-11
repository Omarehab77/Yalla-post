import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Button,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  ArrowBack,
  Home as HomeIcon,
  Create,
  DesignServices,
  TrendingUp,
  Timeline,
  ContactSupport,
  Language,
  Chat,
  Business,
  Send,
  Search
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from './translations/LanguageContext';
import { applyRTLStyles, flipIconPosition, getFlexDirection, getDrawerAnchor } from './rtlUtils';

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Sample conversation data
  const conversations = [
    {
      id: 1,
      name: t('johnDoe'),
      avatar: '',
      lastMessage: t('hiAboutDesign'),
      time: '10:30 AM',
      unread: 2,
      messages: [
        { sender: 'them', text: t('hiAboutDesign'), time: '10:30 AM' },
        { sender: 'me', text: t('yesWhatAboutIt'), time: '10:32 AM' },
        { sender: 'them', text: t('likeColorScheme'), time: '10:33 AM' }
      ]
    },
    {
      id: 2,
      name: t('janeSmith'),
      avatar: '',
      lastMessage: t('scheduleCall'),
      time: t('yesterday'),
      unread: 0,
      messages: [
        { sender: 'them', text: t('scheduleCall'), time: t('yesterday') }
      ]
    },
    {
      id: 3,
      name: t('designTeam'),
      avatar: '',
      lastMessage: t('feedbackMockup'),
      time: t('monday'),
      unread: 5,
      messages: [
        { sender: 'them', text: t('feedbackMockup'), time: t('monday') }
      ]
    }
  ];

  useEffect(() => {
    // Check if we're coming from a contact button with a recipient
    if (location.state?.recipient) {
      const conversation = conversations.find(c => c.name === location.state.recipient);
      if (conversation) {
        setSelectedConversation(conversation);
      }
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

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedConversation = {
      ...selectedConversation,
      messages: [
        ...selectedConversation.messages,
        { sender: 'me', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ],
      lastMessage: newMessage,
      time: t('justNow')
    };

    setSelectedConversation(updatedConversation);
    setNewMessage('');
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

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        height: 'calc(100vh - 64px)',
        pt: '64px',
        display: 'flex'
      }}>
        {/* Conversations List */}
        <Box sx={{ 
          width: 350,
          borderRight: '1px solid rgba(0,0,0,0.1)',
          display: { xs: selectedConversation ? 'none' : 'block', md: 'block' }
        }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#2A2A52' }}>
              {t('messagesTitle')}
            </Typography>
            <TextField
              fullWidth
              placeholder={t('searchMessages')}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
              sx={{ mt: 2 }}
            />
          </Box>
          <List sx={{ overflowY: 'auto', height: 'calc(100vh - 180px)' }}>
            {conversations.map((conversation) => (
              <ListItem key={conversation.id} disablePadding>
                <ListItemButton 
                  onClick={() => setSelectedConversation(conversation)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 127, 0.05)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <Badge 
                      color="error" 
                      variant="dot" 
                      invisible={conversation.unread === 0}
                    >
                      <Avatar sx={{ width: 40, height: 40 }} />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={600}>
                          {conversation.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        noWrap 
                        sx={{ 
                          fontWeight: conversation.unread > 0 ? 600 : 400,
                          color: conversation.unread > 0 ? '#2A2A52' : 'text.secondary'
                        }}
                      >
                        {conversation.lastMessage}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        {selectedConversation ? (
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            {/* Chat Header */}
            <Box sx={{ 
              p: 2,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0,0,0,0.1)'
            }}>
              <IconButton 
                onClick={() => setSelectedConversation(null)}
                sx={{ display: { md: 'none' }, mr: 1 }}
              >
                <ArrowBack />
              </IconButton>
              <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
              <Box>
                <Typography fontWeight={600}>{selectedConversation.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('onlineStatus')}
                </Typography>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ 
              flex: 1,
              p: 2,
              overflowY: 'auto',
              background: 'rgba(255,255,255,0.7)'
            }}>
              {selectedConversation.messages.map((message, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex',
                    justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 1.5,
                      borderRadius: message.sender === 'me' ? 
                        '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      backgroundColor: message.sender === 'me' ? 
                        '#FF007F' : 'rgba(0,0,0,0.05)',
                      color: message.sender === 'me' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography>{message.text}</Typography>
                    <Typography 
                      variant="caption" 
                      display="block" 
                      textAlign="right"
                      sx={{ 
                        color: message.sender === 'me' ? 
                          'rgba(255,255,255,0.7)' : 'text.secondary'
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box sx={{ 
              p: 2,
              borderTop: '1px solid rgba(0,0,0,0.1)',
              background: 'rgba(255,255,255,0.9)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder={t('typeMessage')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  sx={{ mr: 1 }}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            p: 3
          }}>
            <Chat sx={{ fontSize: 80, color: '#BDBDBD', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1, color: '#2A2A52' }}>
              {t('selectConversation')}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {t('selectConversationPrompt')}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF007F',
                '&:hover': { backgroundColor: '#DDB6F2' }
              }}
            >
              {t('newMessageButton')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Messages;