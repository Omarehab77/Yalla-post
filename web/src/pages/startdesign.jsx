import React, { useState, useContext, useRef, useEffect, useCallback, createContext } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Badge,
  Slider,
  Popover,
  TextField,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Collapse,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Switch,
  Tooltip,
  Avatar,
  CircularProgress,
  Fab,
  useTheme,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FilterNone as Shadow } from '@mui/icons-material';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { 
  Brush, 
  DesignServices, 
  Image as ImageIcon,
  TextFields as TextIcon,
  Rectangle as RectangleIcon,
  Circle as CircleIcon,
  ChangeHistory as TriangleIcon,
  Star as StarIcon,
  Hexagon as HexagonIcon,
  Menu,
  Home,
  Create,
  Timeline,
  ContactSupport,
  Language,
  DesktopWindows,
  Article,
  Campaign,
  TrendingUp,
  AddPhotoAlternate,
  FormatShapes,
  DashboardCustomize,
  Close,
  Palette,
  TextFormat,
  PhotoSizeSelectActual,
  Search,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatSize,
  ArrowUpward,
  ArrowDownward,
  Save,
  // ShoppingCart,
  ExpandMore,
  ExpandLess,
  Layers,
  GridOn,
  Undo,
  Redo,
  FilterBAndW,
  FilterVintage,
  FilterHdr,
  BlurOn,
  Brightness4,
  Contrast,
  Opacity as OpacityIcon,
  Delete,
  ContentCopy,
  FlipToFront,
  FlipToBack,
  ZoomIn,
  ZoomOut,
  AspectRatio,
  BorderAll,
  BorderClear,
  BorderStyle,
  BorderOuter,
  BorderInner,
  BorderTop,
  BorderBottom,
  BorderLeft,
  BorderRight,
  BorderVertical,
  BorderHorizontal,
  LinearScale,
  Pentagon,
  Gradient,
  FontDownload,
  Style,
  Texture,
  Wallpaper,
  MoreVert,
  DragHandle,
  Add,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Remove,
  Chat,
  Business 
} from '@mui/icons-material';
import { LanguageContext } from './translations/LanguageContext';
import { 
  applyRTLStyles, 
  flipIconPosition,
  getFlexDirection,
  getTextAlign,
  getDrawerAnchor
} from './rtlUtils';
// Make sure you're importing components correctly
import DesignStudio from './DesignStudio';  // Not { DesignStudio }
// Enhanced styled components with modern design
const GlassPanel = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
  }
}));

const ModernCanvasContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  backgroundColor: theme.palette.grey[50],
  overflow: 'auto',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)',
  backgroundSize: '20px 20px',
  transition: 'all 0.3s ease'
}));

const ModernCanvas = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transformOrigin: 'center center',
  boxShadow: theme.shadows[12],
  borderRadius: '16px',
  '&:hover': {
    boxShadow: theme.shadows[16]
  }
}));

const ModernToolButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ theme, active }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: active ? 'rgba(255, 0, 127, 0.1)' : 'rgba(0, 0, 0, 0.03)',
  color: active ? '#FF007F' : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: active ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)'
  },
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '48px',
  height: '48px',
  boxShadow: active ? theme.shadows[4] : 'none'
}));

const ModernElement = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  cursor: 'move',
  '&:hover': {
    outline: `2px solid #FF007F`,
    boxShadow: `0 0 0 4px rgba(255, 0, 127, 0.3)`
  },
  '&.selected': {
    outline: `2px solid #3A3A72`,
    boxShadow: `0 0 0 4px rgba(58, 58, 114, 0.3)`
  }
}));

const ModernResizeHandle = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: 14,
  height: 14,
  backgroundColor: '#FF007F',
  borderRadius: '50%',
  zIndex: 10,
  cursor: 'pointer',
  border: `2px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.3)',
    backgroundColor: '#DDB6F2'
  }
}));

const ModernPanel = styled(({ onClose, children, ...props }) => (
  <Paper {...props}>
    {onClose && (
      <IconButton 
        onClick={onClose} 
        sx={{ 
          position: 'absolute', 
          right: 8, 
          top: 8,
          zIndex: 2
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    )}
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {children}
    </Box>
  </Paper>
))(({ theme }) => ({
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&:last-child': {
    marginBottom: 0
  }
}));

const ResizeHandle = ({ direction, onResize }) => {
  const theme = useTheme();
  const controls = useDragControls();
  
  const positionStyles = {
    'top-left': { top: -7, left: -7 },
    'top-right': { top: -7, right: -7 },
    'bottom-left': { bottom: -7, left: -7 },
    'bottom-right': { bottom: -7, right: -7 }
  };
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 14,
        height: 14,
        backgroundColor: '#FF007F',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        border: `2px solid ${theme.palette.background.paper}`,
        boxShadow: theme.shadows[4],
        ...positionStyles[direction]
      }}
      drag
      dragControls={controls}
      dragMomentum={false}
      onDrag={(e, info) => onResize(info.delta)}
      dragElastic={0}
      whileHover={{ scale: 1.2 }}
    />
  );
};

const FloatingActionButton = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: '#FF007F',
  color: 'white',
  '&:hover': {
    backgroundColor: '#DDB6F2',
    transform: 'scale(1.1)'
  },
  transition: 'all 0.2s ease',
  boxShadow: '0 8px 25px rgba(255, 0, 127, 0.3)',
  zIndex: 1000
}));

const ToolButton = ({ icon, active, onClick, tooltip, disabled = false }) => {
  const theme = useTheme();
  
  return (
    <Tooltip title={tooltip} arrow placement="right">
      <span>
        <ModernToolButton
          active={active}
          onClick={onClick}
          disabled={disabled}
          sx={{
            '&:hover': {
              transform: active ? 'translateY(-2px)' : 'none'
            }
          }}
        >
          <Badge 
            color="primary" 
            variant="dot" 
            invisible={!active}
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: -3,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
                backgroundColor: '#FF007F'
              }
            }}
          >
            {icon}
          </Badge>
        </ModernToolButton>
      </span>
    </Tooltip>
  );
};

const StartDesign = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contentType, setContentType] = useState('poster');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shapeTab, setShapeTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [fontDialogOpen, setFontDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [showGrid, setShowGrid] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [imageFilter, setImageFilter] = useState('none');
  const [loading, setLoading] = useState(false);
  const [colorPickerType, setColorPickerType] = useState('fill');
  const [gradientDialogOpen, setGradientDialogOpen] = useState(false);
  const [shadowDialogOpen, setShadowDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingText, setEditingText] = useState(false);
  const [rightPanelView, setRightPanelView] = useState('properties');
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([{ elements: [], backgroundColor: '#ffffff' }]);
  const [templateSlidesOpen, setTemplateSlidesOpen] = useState(null);
  const [templatesPanelOpen, setTemplatesPanelOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);
  const dragControls = useDragControls();

  const [designToSave, setDesignToSave] = useState(null); // To store design data waiting to be saved
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth status

  const [loginData, setLoginData] = useState({ email: '', password: '' });
const [signupData, setSignupData] = useState({ 
  username: '', 
  email: '', 
  password: '', 
  confirmPassword: '', 
  phone: '' 
});

const handleLoginChange = (e) => {
  setLoginData({ ...loginData, [e.target.name]: e.target.value });
};

const handleSignupChange = (e) => {
  setSignupData({ ...signupData, [e.target.name]: e.target.value });
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  // Handle login logic
  console.log('Login data:', loginData);
  setLoginDialogOpen(false);
};


const saveDesignToStudio = (designData) => {
  try {
    // Get existing designs or initialize empty array
    const existingDesigns = JSON.parse(localStorage.getItem('savedDesigns')) || [];
    
    // Add new design
    const updatedDesigns = [...existingDesigns, designData];
    
    // Save to localStorage
    localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns));
    
    // Show success and reset form
    alert('Design saved successfully!');
    setTemplateName('');
    setDesignToSave(null);
    
    // Optional: navigate to DesignStudio
    // navigate('/DesignStudio');
  } catch (error) {
    console.error('Error saving design:', error);
    setErrorMessage('Failed to save design');
    setErrorDialogOpen(true);
  }
};

if (designToSave) {
  saveDesignToStudio(designToSave);
}

const handleSignupSubmit = (e) => {
  e.preventDefault();
  // Handle signup logic
  console.log('Signup data:', signupData);
  setLoginDialogOpen(false);
};

if (designToSave) {
  saveDesignToStudio(designToSave);
}
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  // Canvas sizes for different content types (real sizes)
  const canvasSizes = {
    poster: { 
      presets: [
        { width: 1080, height: 1350, name: 'Instagram Portrait (1080x1350)' },
        { width: 1080, height: 1080, name: 'Instagram Square (1080x1080)' },
        { width: 1080, height: 1920, name: 'Instagram Story (1080x1920)' }
      ]
    },
    blog: { 
      presets: [
        { width: 1200, height: 800, name: 'Blog Featured (1200x800)' },
        { width: 800, height: 1200, name: 'Blog Vertical (800x1200)' },
        { width: 1200, height: 1200, name: 'Blog Square (1200x1200)' }
      ]
    },
    web: { 
      presets: [
        { width: 1920, height: 1080, name: 'Desktop (1920x1080)' },
        { width: 1200, height: 800, name: 'Tablet (1200x800)' },
        { width: 375, height: 812, name: 'Mobile (375x812)' }
      ]
    }
  };

  const [canvasSize, setCanvasSize] = useState(canvasSizes.poster.presets[0]);

  // Available shapes organized by categories
  const shapeCategories = {
    basic: [
      { id: 'rect', name: 'Rectangle', icon: <RectangleIcon /> },
      { id: 'circle', name: 'Circle', icon: <CircleIcon /> },
      { id: 'triangle', name: 'Triangle', icon: <TriangleIcon /> },
    ],
    advanced: [
      { id: 'star', name: 'Star', icon: <StarIcon /> },
      { id: 'hexagon', name: 'Hexagon', icon: <HexagonIcon /> },
      { id: 'pentagon', name: 'Pentagon', icon: <Pentagon /> },
      { id: 'rhombus', name: 'Rhombus', icon: <BorderStyle sx={{ transform: 'rotate(45deg)' }} /> },
    ],
    decorative: [
      { id: 'line-horizontal', name: 'Horizontal Line', icon: <BorderHorizontal /> },
      { id: 'line-vertical', name: 'Vertical Line', icon: <BorderVertical /> },
      { id: 'line-diagonal', name: 'Diagonal Line', icon: <LinearScale sx={{ transform: 'rotate(45deg)' }} /> },
    ]
  };

  // Sample templates data with slides
  const templateCategories = [
    {
      id: 'social',
      name: 'Social Media',
      templates: [
        { 
          id: 1, 
          name: 'Instagram Post', 
          type: 'poster', 
          category: 'social',
          slides: [
            // { 
            //   thumbnail: './dist/images/insta1.png', 
            //   elements: [
            //     {
            //       id: 'slide1-el1',
            //       type: 'image',
            //       x: 0,
            //       y: 0,
            //       width: 1080,
            //       height: 1080,
            //       imageUrl: './dist/images/insta1.png',
            //       zIndex: 1
            //     }
            //   ],
            //   backgroundColor: '#ffffff'
            // },
            { 
              thumbnail: './dist/images/insta2.png', 
              elements: [
                {
                  id: 'slide2-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1080,
                  imageUrl: './dist/images/insta2.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#f5f5f5'
            },
            { 
              thumbnail: './dist/images/insta3.png', 
              elements: [
                {
                  id: 'slide3-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1080,
                  imageUrl: './dist/images/insta3.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#e0e0e0'
            }
          ]
        },
        { 
          id: 2, 
          name: 'Facebook Cover', 
          type: 'poster', 
          category: 'social',
          slides: [
            { 
              thumbnail: './dist/images/f1.png', 
              elements: [
                {
                  id: 'slide4-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 820,
                  height: 312,
                  imageUrl: './dist/images/f1.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#ffffff'
            },
            { 
              thumbnail: './dist/images/f2.png', 
              elements: [
                {
                  id: 'slide5-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 820,
                  height: 312,
                  imageUrl: './dist/images/f2.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#f5f5f5'
            }
          ]
        },
      ]
    },
    {
      id: 'business',
      name: 'Business',
      templates: [
        { 
          id: 3, 
          name: 'Company Profile', 
          type: 'poster', 
          category: 'business',
          slides: [
            { 
              thumbnail: './dist/images/c.png', 
              elements: [
                {
                  id: 'slide6-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1200,
                  height: 800,
                  imageUrl: './dist/images/c.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#ffffff'
            },
            { 
              thumbnail: './dist/images/cc.png', 
              elements: [
                {
                  id: 'slide7-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1200,
                  height: 800,
                  imageUrl: './dist/images/cc.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#f5f5f5'
            }
          ]
        },
        { 
          id: 4, 
          name: 'Annual Report', 
          type: ['blog', 'poster'], 
          category: 'business',
          slides: [
            { 
              thumbnail: './dist/images/1.png', 
              elements: [
                {
                  id: 'slide8-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1200,
                  height: 800,
                  imageUrl: './dist/images/1.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#ffffff'
            },
            { 
              thumbnail: './dist/images/2.png', 
              elements: [
                {
                  id: 'slide9-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1200,
                  height: 800,
                  imageUrl: './dist/images/2.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#f5f5f5'
            },
            { 
              thumbnail: './dist/images/3.png', 
              elements: [
                {
                  id: 'slide10-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1200,
                  height: 800,
                  imageUrl: './dist/images/3.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#e0e0e0'
            }
          ]
        },
      ]
    },
    {
      id: 'education',
      name: 'Education',
      templates: [
        { 
          id: 5, 
          name: 'School Poster', 
          type: 'poster', 
          category: 'education',
          slides: [
            { 
              thumbnail: './dist/images/s.png', 
              elements: [
                {
                  id: 'slide11-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1350,
                  imageUrl: './dist/images/s.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#ffffff'
            }
          ]
        },
        { 
          id: 6, 
          name: 'University Flyer', 
          type: 'poster', 
          category: 'education',
          slides: [
            { 
              thumbnail: './dist/images/u1.png', 
              elements: [
                {
                  id: 'slide12-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1350,
                  imageUrl: './dist/images/u1.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#ffffff'
            },
            { 
              thumbnail: './dist/images/u2.png', 
              elements: [
                {
                  id: 'slide13-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1350,
                  imageUrl: './dist/images/u2.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#f5f5f5'
            },
            { 
              thumbnail: './dist/images/u3.png', 
              elements: [
                {
                  id: 'slide13-el1',
                  type: 'image',
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1350,
                  imageUrl: './dist/images/u3.png',
                  zIndex: 1
                }
              ],
              backgroundColor: '#f5f5f5'
            }
          ]
        },
      ]
    }
  ];

  // All templates flattened
  const allTemplates = templateCategories.flatMap(category => category.templates);

  // Filter templates based on selected category
  const filteredTemplates = selectedCategory === 'all' 
    ? allTemplates 
    : allTemplates.filter(template => template.category === selectedCategory);

  // Flatten all shapes for search
  const allShapes = Object.values(shapeCategories).flat();

  // Filter shapes based on search term
  const filteredShapes = searchTerm 
    ? allShapes.filter(shape => 
        shape.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : shapeCategories[shapeTab];

  const navItems = [
        { text: t('home'), icon: <Home sx={{ color: '#FF007F' }} />, action: () => navigate('/') },
        { text: t('designStudio'), icon: <Create sx={{ color: '#FF007F' }} />, action: () => navigate('/DesignStudio') },
        { text: t('professionalDesign'), icon: <DesignServices sx={{ color: '#FF007F' }} />, action: () => navigate('/professional-design') },
        { text: t('marketingServices'), icon: <TrendingUp sx={{ color: '#FF007F' }} />, action: () => navigate('/marketing') },
        { text: t('ourProcess'), icon: <Timeline sx={{ color: '#FF007F' }} />, action: () => navigate('/process') },
        { text: t('messages'), icon: <Chat sx={{ color: '#FF007F' }} />, action: () => navigate('/messages') },
        { text: t('becomeEntrepreneur'), icon: <Business sx={{ color: '#FF007F' }} />, action: () => navigate('/entrepreneur') },
        { text: t('contactUs'), icon: <ContactSupport sx={{ color: '#FF007F' }} />, action: () => navigate('/contact') }
      ];

  // Image filters
  const imageFilters = {
    none: { name: 'None', icon: <ImageIcon /> },
    grayscale: { name: 'Grayscale', icon: <FilterBAndW /> },
    vintage: { name: 'Vintage', icon: <FilterVintage /> },
    hdr: { name: 'HDR', icon: <FilterHdr /> },
    blur: { name: 'Blur', icon: <BlurOn /> },
    darken: { name: 'Darken', icon: <Brightness4 /> },
    contrast: { name: 'Contrast', icon: <Contrast /> }
  };

  // Font families
  const fontFamilies = [
    'Arial', 'Times New Roman', 'Courier New', 'Georgia', 
    'Verdana', 'Impact', 'Comic Sans MS', 'Trebuchet MS',
    'Palatino', 'Garamond', 'Bookman', 'Avant Garde'
  ];

  // Save current state to history
  const saveToHistory = useCallback((elements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...elements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Undo action
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasElements([...history[historyIndex - 1]]);
    }
  }, [history, historyIndex]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasElements([...history[historyIndex + 1]]);
    }
  }, [history, historyIndex]);

  // Add element to canvas
  const handleAddElement = useCallback((type) => {
    setActiveTool(type);
    if (type === 'shape') {
      setRightPanelView('shapes');
    } else {
      setRightPanelView('properties');
    }
  }, []);

  // Handle canvas click to add elements
  const handleCanvasClick = useCallback((e) => {
    if (e.target.closest('.properties-panel')) {
      return;
    }
    
    if (!activeTool || !canvasRef.current || isDragging) {
      setIsDragging(false);
      return;
    }
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;

    // Adjust for zoom level
    x = x / (zoomLevel / 100);
    y = y / (zoomLevel / 100);

    // Snap to grid if enabled
    if (snapToGrid) {
      x = Math.round(x / 20) * 20;
      y = Math.round(y / 20) * 20;
    }
    if (activeTool !== 'shape') {
      setRightPanelView('properties');
    }
  
    const baseElement = {
      id: Date.now(),
      type: activeTool,
      x,
      y,
      width: 150,
      height: 150,
      color: activeTool === 'text' ? '#000000' : 'transparent',
      zIndex: canvasElements.length + 1,
      opacity: 100,
      borderWidth: 0,
      borderColor: '#3A3A72',
      borderRadius: 0,
      shadow: 'none',
      gradient: 'none'
    };

    let newElement;

    if (activeTool === 'text') {
      newElement = {
        ...baseElement,
        text: 'Double click to edit',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'left',
        lineHeight: 1.5,
        letterSpacing: 0,
        textColor: '#000000',
        backgroundColor: 'transparent'
      };
    } else if (activeTool === 'image') {
      newElement = {
        ...baseElement,
        imageUrl: null,
        filter: 'none'
      };
    } else {
      newElement = baseElement;
    }

    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    setSelectedElement(newElement);
    saveToHistory(newElements);
    setActiveTool(null);
    setRightPanelView('properties');
  }, [activeTool, canvasElements, saveToHistory, snapToGrid, zoomLevel, isDragging]);

  // Handle element selection
  const handleElementClick = useCallback((e, element) => {
    e.stopPropagation();
    setSelectedElement(element);
    setIsDragging(false);
    setRightPanelView('properties');
  }, []);

  // Handle text element double click for editing
  const handleTextDoubleClick = useCallback((e, element) => {
    e.stopPropagation();
    if (element.type === 'text') {
      setEditingText(true);
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 0);
    }
  }, []);

  // Handle element dragging
  const handleDragElement = useCallback((id, info) => {
    setCanvasElements(prevElements => 
      prevElements.map(el => {
        if (el.id !== id) return el;
        
        let newX = el.x + info.delta.x / (zoomLevel / 100);
        let newY = el.y + info.delta.y / (zoomLevel / 100);
        
        // Snap to grid if enabled
        if (snapToGrid) {
          newX = Math.round(newX / 20) * 20;
          newY = Math.round(newY / 20) * 20;
        }
        
        return { ...el, x: newX, y: newY };
      })
    );
    setIsDragging(true);
  }, [snapToGrid, zoomLevel]);

  // Handle element resizing
  const handleResizeElement = useCallback((id, direction, delta) => {
    setCanvasElements(prevElements => 
      prevElements.map(el => {
        if (el.id !== id) return el;
        
        // Calculate new dimensions based on direction
        let newWidth = el.width;
        let newHeight = el.height;
        let newX = el.x;
        let newY = el.y;

        // Adjust width and x position for left resize
        if (direction.includes('left')) {
          const widthChange = delta.x / (zoomLevel / 100);
          newWidth = Math.max(20, el.width - widthChange);
          newX = el.x + widthChange;
        }
        
        // Adjust width for right resize
        if (direction.includes('right')) {
          const widthChange = delta.x / (zoomLevel / 100);
          newWidth = Math.max(20, el.width + widthChange);
        }
        
        // Adjust height and y position for top resize
        if (direction.includes('top')) {
          const heightChange = delta.y / (zoomLevel / 100);
          newHeight = Math.max(20, el.height - heightChange);
          newY = el.y + heightChange;
        }
        
        // Adjust height for bottom resize
        if (direction.includes('bottom')) {
          const heightChange = delta.y / (zoomLevel / 100);
          newHeight = Math.max(20, el.height + heightChange);
        }
        
        // Snap to grid if enabled
        if (snapToGrid) {
          newWidth = Math.round(newWidth / 10) * 10;
          newHeight = Math.round(newHeight / 10) * 10;
          newX = Math.round(newX / 10) * 10;
          newY = Math.round(newY / 10) * 10;
        }
        
        return {
          ...el,
          width: newWidth,
          height: newHeight,
          x: newX,
          y: newY
        };
      })
    );
  }, [snapToGrid, zoomLevel]);

  // Change content type
  const handleChangeContentType = useCallback((type) => {
    setContentType(type);
    setSelectedTemplate(null);
    setCanvasElements([]);
    setCanvasSize(canvasSizes[type].presets[0]);
    saveToHistory([]);
    setRightPanelView('properties');
    setPages([{ elements: [], backgroundColor: '#ffffff' }]);
    setCurrentPage(0);
  }, [saveToHistory]);

  // Open settings popover
  const handleOpenSettings = useCallback((event, element, type = 'fill') => {
    setSelectedElement(element);
    setColorPickerType(type);
    setAnchorEl(event.currentTarget);
  }, []);

  // Close settings popover
  const handleCloseSettings = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Change element property
  const handleChangeElementProp = useCallback((prop, value) => {
    if (!selectedElement) return;
    
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id ? { ...el, [prop]: value } : el
    );
    setCanvasElements(newElements);
    setSelectedElement(newElements.find(el => el.id === selectedElement.id));
    saveToHistory(newElements);
  }, [canvasElements, selectedElement, saveToHistory]);

  // Change page background color
  const handleChangePageBackground = useCallback((color) => {
    const newPages = [...pages];
    newPages[currentPage] = {
      ...newPages[currentPage],
      backgroundColor: color
    };
    setPages(newPages);
  }, [currentPage, pages]);

  // Handle image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file || !selectedElement) return;

    if (!file.type.match('image.*')) {
      setErrorMessage('Please select an image file');
      setErrorDialogOpen(true);
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const newElements = canvasElements.map(el => 
        el.id === selectedElement.id 
          ? { ...el, imageUrl: event.target.result } 
          : el
      );
      setCanvasElements(newElements);
      setSelectedElement(newElements.find(el => el.id === selectedElement.id));
      saveToHistory(newElements);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }, [canvasElements, selectedElement, saveToHistory]);

  // Bring element forward in z-index
  const handleBringForward = useCallback(() => {
    if (!selectedElement) return;
    
    const elementIndex = canvasElements.findIndex(el => el.id === selectedElement.id);
    if (elementIndex < canvasElements.length - 1) {
      const newElements = [...canvasElements];
      const temp = newElements[elementIndex].zIndex;
      newElements[elementIndex].zIndex = newElements[elementIndex + 1].zIndex;
      newElements[elementIndex + 1].zIndex = temp;
      
      setCanvasElements(newElements);
      setSelectedElement(newElements[elementIndex]);
      saveToHistory(newElements);
    }
  }, [canvasElements, saveToHistory, selectedElement]);

  // Send element backward in z-index
  const handleSendBackward = useCallback(() => {
    if (!selectedElement) return;
    
    const elementIndex = canvasElements.findIndex(el => el.id === selectedElement.id);
    if (elementIndex > 0) {
      const newElements = [...canvasElements];
      const temp = newElements[elementIndex].zIndex;
      newElements[elementIndex].zIndex = newElements[elementIndex - 1].zIndex;
      newElements[elementIndex - 1].zIndex = temp;
      
      setCanvasElements(newElements);
      setSelectedElement(newElements[elementIndex]);
      saveToHistory(newElements);
    }
  }, [canvasElements, saveToHistory, selectedElement]);

  // Bring element to front
  const handleBringToFront = useCallback(() => {
    if (!selectedElement) return;
    
    const maxZIndex = Math.max(...canvasElements.map(el => el.zIndex));
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id 
        ? { ...el, zIndex: maxZIndex + 1 } 
        : el
    );
    setCanvasElements(newElements);
    setSelectedElement(newElements.find(el => el.id === selectedElement.id));
    saveToHistory(newElements);
  }, [canvasElements, saveToHistory, selectedElement]);

  // Send element to back
  const handleSendToBack = useCallback(() => {
    if (!selectedElement) return;
    
    const minZIndex = Math.min(...canvasElements.map(el => el.zIndex));
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id 
        ? { ...el, zIndex: minZIndex - 1 } 
        : el
    );
    setCanvasElements(newElements);
    setSelectedElement(newElements.find(el => el.id === selectedElement.id));
    saveToHistory(newElements);
  }, [canvasElements, saveToHistory, selectedElement]);

  // Duplicate element
  const handleDuplicateElement = useCallback(() => {
    if (!selectedElement) return;
    
    const newElement = {
      ...selectedElement,
      id: Date.now(),
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      zIndex: canvasElements.length + 1
    };
    
    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    setSelectedElement(newElement);
    saveToHistory(newElements);
  }, [canvasElements, saveToHistory, selectedElement]);

  // Delete element
  const handleDeleteElement = useCallback(() => {
    if (!selectedElement) return;
    
    const newElements = canvasElements.filter(el => el.id !== selectedElement.id);
    setCanvasElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(null);
    setRightPanelView('properties');
  }, [canvasElements, saveToHistory, selectedElement]);

  
  // Save template
  const handleSaveTemplate = useCallback(() => {
    if (!templateName.trim()) {
      setErrorMessage('Please enter a template name');
      setErrorDialogOpen(true);
      return;
    }
    
    // / Prepare design data to save
  const designData = {
    name: templateName,
    elements: canvasElements,
    size: canvasSize,
    type: contentType,
    pages: pages,
    currentPage: currentPage
  };

  if (!isAuthenticated) {
    // Store design data temporarily and show login dialog
    setDesignToSave(designData);
    setSaveDialogOpen(false);
    setLoginDialogOpen(true);
    return;
  }

  // If authenticated, save directly
  saveDesignToStudio(designData);
    // Check if user is logged in (you would replace this with your actual auth check)
    const isLoggedIn = false; // Replace with actual auth check
    
    if (!isLoggedIn) {
      setSaveDialogOpen(false);
      setLoginDialogOpen(true);
      return;
    }
    
    console.log('Saving template:', {
      name: templateName,
      elements: canvasElements,
      size: canvasSize,
      type: contentType
    });
    
    setSaveDialogOpen(false);
    setTemplateName('');
    alert('Template saved successfully!');
  }, [canvasElements, canvasSize, contentType, templateName]);

  
  // Apply image filter
  const applyFilter = useCallback((filter) => {
    if (!selectedElement || selectedElement.type !== 'image') return;
    
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id ? { ...el, filter } : el
    );
    setCanvasElements(newElements);
    setSelectedElement(newElements.find(el => el.id === selectedElement.id));
    saveToHistory(newElements);
    setImageFilter(filter);
  }, [canvasElements, saveToHistory, selectedElement]);

  // Apply gradient
  const applyGradient = useCallback((gradient) => {
    if (!selectedElement) return;
    
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id ? { ...el, gradient } : el
    );
    setCanvasElements(newElements);
    setSelectedElement(newElements.find(el => el.id === selectedElement.id));
    saveToHistory(newElements);
    setGradientDialogOpen(false);
  }, [canvasElements, saveToHistory, selectedElement]);

  // Apply shadow
  const applyShadow = useCallback((shadow) => {
    if (!selectedElement) return;
    
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id ? { ...el, shadow } : el
    );
    setCanvasElements(newElements);
    setSelectedElement(newElements.find(el => el.id === selectedElement.id));
    saveToHistory(newElements);
    setShadowDialogOpen(false);
  }, [canvasElements, saveToHistory, selectedElement]);

  // Add new page
  const handleAddPage = useCallback(() => {
    const newPages = [...pages];
    newPages.push({ elements: [], backgroundColor: '#ffffff' });
    setPages(newPages);
    setCurrentPage(newPages.length - 1);
    setCanvasElements([]);
    saveToHistory([]);
  }, [pages, saveToHistory]);

  // Remove current page
  const handleRemovePage = useCallback(() => {
    if (pages.length <= 1) return;
    
    const newPages = pages.filter((_, index) => index !== currentPage);
    setPages(newPages);
    setCurrentPage(Math.min(currentPage, newPages.length - 1));
    setCanvasElements(newPages[Math.min(currentPage, newPages.length - 1)].elements);
  }, [currentPage, pages]);

  // Move page up
  const handleMovePageUp = useCallback(() => {
    if (currentPage <= 0) return;
    
    const newPages = [...pages];
    [newPages[currentPage], newPages[currentPage - 1]] = [newPages[currentPage - 1], newPages[currentPage]];
    setPages(newPages);
    setCurrentPage(currentPage - 1);
  }, [currentPage, pages]);

  // Move page down
  const handleMovePageDown = useCallback(() => {
    if (currentPage >= pages.length - 1) return;
    
    const newPages = [...pages];
    [newPages[currentPage], newPages[currentPage + 1]] = [newPages[currentPage + 1], newPages[currentPage]];
    setPages(newPages);
    setCurrentPage(currentPage + 1);
  }, [currentPage, pages.length, pages]);

  // Apply template slide
  const handleApplyTemplateSlide = useCallback((slide) => {
    if (!slide || !slide.elements) {
      setErrorMessage('No slide selected to apply');
      setErrorDialogOpen(true);
      return;
    }
    
    // Create new elements with unique IDs
    const newElements = slide.elements.map(el => ({
      ...el,
      id: Date.now() + Math.random(), // Ensure unique IDs
      zIndex: canvasElements.length + 1
    }));
    
    // Update current page with new elements and background
    const newPages = [...pages];
    newPages[currentPage] = {
      elements: newElements,
      backgroundColor: slide.backgroundColor || '#ffffff'
    };
    
    setPages(newPages);
    setCanvasElements(newElements);
    setSelectedTemplate(slide);
    setTemplateSlidesOpen(null);
    saveToHistory(newElements);
  }, [canvasElements, currentPage, pages, saveToHistory]);

  // Apply all template slides
  const handleApplyAllSlides = useCallback((template) => {
    if (!template || !template.slides || template.slides.length === 0) {
      setErrorMessage('No slides found in this template');
      setErrorDialogOpen(true);
      return;
    }
    
    const newPages = [];
    
    // Create new pages for each slide
    template.slides.forEach((slide, idx) => {
      const elements = slide.elements.map(el => ({
        ...el,
        id: Date.now() + Math.random(), // Ensure unique IDs
        zIndex: idx * 100 // Space out z-indices
      }));
      
      newPages.push({
        elements,
        backgroundColor: slide.backgroundColor || '#ffffff'
      });
    });
    
    setPages(newPages);
    setCurrentPage(0);
    setCanvasElements(newPages[0].elements);
    setSelectedTemplate(template);
    saveToHistory(newPages[0].elements);
  }, [saveToHistory]);

  // Handle clicks outside elements to deselect
  const handleClickOutside = useCallback((e) => {
    const canvas = canvasRef.current;
    const panel = document.querySelector('.properties-panel');
    
    // Check if click is outside canvas and properties panel
    if (canvas && !canvas.contains(e.target) && 
      panel && !panel.contains(e.target)) {
      setSelectedElement(null);
      setEditingText(false);
    }
  }, []);

  // Render element with appropriate styling
  const renderElement = useCallback((element) => {
    if (!element) return null;
    
    const getBackground = () => {
      if (element.gradient === 'linear') {
        return `linear-gradient(45deg, ${element.color}, #FFFFFF)`;
      } else if (element.gradient === 'radial') {
        return `radial-gradient(circle, ${element.color}, #FFFFFF)`;
      }
      return element.color;
    };

    const getShadow = () => {
      if (element.shadow === 'small') {
        return '0 2px 8px rgba(0,0,0,0.15)';
      } else if (element.shadow === 'medium') {
        return '0 4px 12px rgba(0,0,0,0.2)';
      } else if (element.shadow === 'large') {
        return '0 8px 24px rgba(0,0,0,0.25)';
      }
      return 'none';
    };

    const elementStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: element.gradient ? 'transparent' : element.color,
      background: getBackground(),
      opacity: element.opacity / 100,
      border: `${element.borderWidth}px solid ${element.borderColor}`,
      borderRadius: `${element.borderRadius}px`,
      boxShadow: getShadow(),
      filter: element.filter === 'none' ? 'none' : 
        element.filter === 'grayscale' ? 'grayscale(100%)' :
        element.filter === 'vintage' ? 'sepia(70%) hue-rotate(300deg) saturate(500%)' :
        element.filter === 'hdr' ? 'brightness(1.2) contrast(1.2) saturate(1.5)' :
        element.filter === 'blur' ? 'blur(2px)' :
        element.filter === 'darken' ? 'brightness(0.8)' :
        element.filter === 'contrast' ? 'contrast(1.5)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    switch(element.type) {
      case 'text':
        return (
          <Box 
            sx={{ 
              ...elementStyle,
              p: 1,
              overflow: 'hidden',
              fontFamily: element.fontFamily,
              fontWeight: element.fontWeight,
              fontStyle: element.fontStyle,
              textDecoration: element.textDecoration,
              textAlign: element.textAlign,
              lineHeight: element.lineHeight,
              letterSpacing: `${element.letterSpacing}px`,
              backgroundColor: element.backgroundColor,
              border: 'none',
              color: element.textColor,
              cursor: editingText ? 'text' : 'move',
              userSelect: editingText ? 'auto' : 'none'
            }}
            onDoubleClick={(e) => handleTextDoubleClick(e, element)}
          >
            {editingText && selectedElement?.id === element.id ? (
              <TextField
                inputRef={textInputRef}
                value={element.text}
                onChange={(e) => handleChangeElementProp('text', e.target.value)}
                multiline
                fullWidth
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: element.fontSize,
                    fontFamily: element.fontFamily,
                    fontWeight: element.fontWeight,
                    fontStyle: element.fontStyle,
                    textDecoration: element.textDecoration,
                    color: element.textColor,
                    backgroundColor: element.backgroundColor
                  }
                }}
                onBlur={() => setEditingText(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    setEditingText(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <Typography 
                sx={{ 
                  fontSize: element.fontSize,
                }}
              >
                {element.text}
              </Typography>
            )}
          </Box>
        );
      case 'image':
        return element.imageUrl ? (
          <Box sx={{ 
            width: '100%', 
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            ...elementStyle,
            backgroundColor: 'transparent'
          }}>
            <img 
              src={element.imageUrl} 
              alt="Uploaded content" 
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover',
                filter: elementStyle.filter
              }} 
            />
          </Box>
        ) : (
          <Box sx={{ 
            width: '100%', 
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'grey.200',
            ...elementStyle
          }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <AddPhotoAlternate sx={{ fontSize: 40, color: 'grey.500' }} />
            )}
          </Box>
        );
      case 'rect':
        return <Box sx={elementStyle} />;
      case 'circle':
        return <Box sx={{ ...elementStyle, borderRadius: '50%' }} />;
      case 'triangle':
        return (
          <Box sx={{ 
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderBottom: `${element.height}px solid ${element.color}`,
            borderLeft: `${element.width/2}px solid transparent`,
            borderRight: `${element.width/2}px solid transparent`,
            opacity: element.opacity / 100
          }} />
        );
      case 'star':
        return <Box sx={{ ...elementStyle, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />;
      case 'hexagon':
        return <Box sx={{ ...elementStyle, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />;
      case 'pentagon':
        return <Box sx={{ ...elementStyle, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />;
      case 'rhombus':
        return <Box sx={{ ...elementStyle, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />;
      case 'line-horizontal':
        return <Box sx={{ ...elementStyle, height: '2px', width: '100%', backgroundColor: element.color }} />;
      case 'line-vertical':
        return <Box sx={{ ...elementStyle, width: '2px', height: '100%', backgroundColor: element.color }} />;
      case 'line-diagonal':
        return (
          <Box sx={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '141%',
              height: '2px',
              backgroundColor: element.color,
              transform: 'rotate(45deg)',
              transformOrigin: '0 0'
            }} />
          </Box>
        );
      default:
        return <Box sx={elementStyle} />;
    }
  }, [editingText, handleChangeElementProp, handleTextDoubleClick, loading, selectedElement]);

  // Initialize history
  useEffect(() => {
    saveToHistory([]);
  }, []);

  // Handle page changes
  useEffect(() => {
    if (pages.length > 0) {
      const newPages = [...pages];
      newPages[currentPage] = { 
        ...newPages[currentPage],
        elements: canvasElements 
      };
      setPages(newPages);
    }
  }, [canvasElements, currentPage]);

  // Handle clicks outside elements to deselect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      overflow: 'hidden',
      background: `
        linear-gradient(175deg, #F8FAFF 0%, #FFFFFF 100%),
        radial-gradient(circle at 70% 30%, rgba(255, 0, 127, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 30% 70%, rgba(221, 182, 242, 0.1) 0%, transparent 40%),
        radial-gradient(circle at center, rgba(100, 200, 255, 0.1) 0%, transparent 60%)
      `,
      ...applyRTLStyles(language)
    }}>
      {/* Modern App Bar with glass effect */}
      <Box sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1200,
        borderBottom: `1px solid rgba(0, 0, 0, 0.05)`,
        ...(language === 'ar' && { flexDirection: 'row-reverse' })
      }}>
        <Box sx={{ width: 120, mr: 2 }}>
          <img src="./dist/images/gg.png" alt="Logo" style={{ width: '100%' }} />
        </Box>
        
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>{t('contentType')}</InputLabel>
            <Select
              value={contentType}
              onChange={(e) => handleChangeContentType(e.target.value)}
              label={t('contentType')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <MenuItem value="poster">{t('poster')}</MenuItem>
              <MenuItem value="blog">{t('blog')}</MenuItem>
              <MenuItem value="web">{t('webPage')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>{t('size')}</InputLabel>
            <Select
              value={canvasSize.name}
              onChange={(e) => {
                const newSize = canvasSizes[contentType].presets.find(
                  size => size.name === e.target.value
                );
                if (newSize) setCanvasSize(newSize);
              }}
              label={t('size')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {canvasSizes[contentType].presets.map((size) => (
                <MenuItem key={size.name} value={size.name}>
                  {size.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('undo')}>
            <span>
              <IconButton 
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                sx={{ 
                  mr: 1, 
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                <Undo />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('redo')}>
            <span>
              <IconButton 
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                sx={{ 
                  mr: 2, 
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                <Redo />
              </IconButton>
            </span>
          </Tooltip>
          
          <Button 
            variant="contained" 
            startIcon={<Save />}
            sx={{ 
              mr: 2,
              backgroundColor: '#3A3A72',
              color: 'white',
              borderRadius: '12px',
              '&:hover': { 
                backgroundColor: '#2A2A52',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 20px rgba(58, 58, 114, 0.3)'
            }}
            onClick={() => setSaveDialogOpen(true)}
          >
            {t('save')}
          </Button>
          {/* <Button 
            variant="contained" 
            startIcon={<ShoppingCart />}
            sx={{ 
              backgroundColor: '#FF007F',
              color: 'white',
              borderRadius: '12px',
              '&:hover': { 
                backgroundColor: '#DDB6F2',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 20px rgba(255, 0, 127, 0.3)'
            }} */}
          
            {/* {t('purchase')} */}
          {/* </Button> */}
        </Box>

        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            color: '#3A3A72',
            '&:hover': {
              backgroundColor: 'rgba(58, 58, 114, 0.1)'
            },
            ml: 2,
            transition: 'all 0.3s ease'
          }}
        >
          <Menu fontSize="large" />
        </IconButton>
      </Box>

      {/* Navigation Drawer with glass effect */}
      <Drawer
        anchor={getDrawerAnchor(language)}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.3)'
          }
        }}
      >
        <Box>
          <Box sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
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
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              sx={{
                '&:hover': {
                  transform: 'rotate(90deg)'
                },
                transition: 'transform 0.3s ease'
              }}
            >
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
                    setDrawerOpen(false);
                  }}
                  sx={{
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 127, 0.05)',
                      '& .MuiListItemIcon-root': {
                        transform: 'scale(1.1)'
                      }
                    },
                    flexDirection: getFlexDirection(language),
                    transition: 'all 0.2s ease'
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
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          background: 'rgba(248, 250, 255, 0.5)'
        }}>
          <FormControl fullWidth size="small">
            <Select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              sx={{
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '& .MuiSelect-select': {
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: getFlexDirection(language)
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    mt: 1,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
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
                <Box component="span">Deutsch</Box>
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

      {/* Main Workspace */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Panel - Element Properties (always visible) */}
        <Box sx={{ 
          height: 80,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          overflowX: 'auto',
          p: 2,
          display: 'flex',
          alignItems: 'center'
        }}>
          {selectedElement ? (
            <>
              {/* Fill Color */}
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('fill')}</Typography>
                <IconButton 
                  onClick={(e) => {
                    setColorPickerType('fill');
                    handleOpenSettings(e, selectedElement);
                  }}
                  size="small"
                  sx={{
                    '&:hover': {
                      transform: 'rotate(15deg)'
                    },
                    transition: 'transform 0.2s ease',
                    color: '#5A5A8A'
                  }}
                >
                  <Palette fontSize="small" />
                </IconButton>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    bgcolor: selectedElement.color || 'transparent', 
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    },
                    transition: 'transform 0.2s ease',
                    ml: 1
                  }}
                  onClick={(e) => {
                    setColorPickerType('fill');
                    handleOpenSettings(e, selectedElement);
                  }}
                />
                <IconButton 
                  onClick={() => setGradientDialogOpen(true)}
                  size="small"
                  sx={{
                    '&:hover': {
                      transform: 'rotate(15deg)'
                    },
                    transition: 'transform 0.2s ease',
                    color: '#5A5A8A',
                    ml: 1
                  }}
                >
                  <Gradient fontSize="small" />
                </IconButton>
              </Box>

              {selectedElement.type === 'text' && (
                <>
                  {/* Text Properties */}
                  <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('text')}</Typography>
                    <TextField
                      value={selectedElement.text}
                      onChange={(e) => handleChangeElementProp('text', e.target.value)}
                      size="small"
                      sx={{
                        width: 200,
                        mr: 1,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Text Color */}
                  <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('textColor')}</Typography>
                    <IconButton 
                      onClick={(e) => {
                        setColorPickerType('text');
                        handleOpenSettings(e, selectedElement);
                      }}
                      size="small"
                      sx={{
                        '&:hover': {
                          transform: 'rotate(15deg)'
                        },
                        transition: 'transform 0.2s ease',
                        color: '#5A5A8A'
                      }}
                    >
                      <TextFormat fontSize="small" />
                    </IconButton>
                    <Box 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        bgcolor: selectedElement.textColor || '#000000', 
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        },
                        transition: 'transform 0.2s ease',
                        ml: 1
                      }}
                      onClick={(e) => {
                        setColorPickerType('text');
                        handleOpenSettings(e, selectedElement);
                      }}
                    />
                  </Box>
                  
                  {/* Background Color */}
                  <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('backgroundColor')}</Typography>
                    <IconButton 
                      onClick={(e) => {
                        setColorPickerType('background');
                        handleOpenSettings(e, selectedElement);
                      }}
                      size="small"
                      sx={{
                        '&:hover': {
                          transform: 'rotate(15deg)'
                        },
                        transition: 'transform 0.2s ease',
                        color: '#5A5A8A'
                      }}
                    >
                      <Wallpaper fontSize="small" />
                    </IconButton>
                    <Box 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        bgcolor: selectedElement.backgroundColor || 'transparent', 
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        },
                        transition: 'transform 0.2s ease',
                        ml: 1
                      }}
                      onClick={(e) => {
                        setColorPickerType('background');
                        handleOpenSettings(e, selectedElement);
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('fontSize')}</Typography>
                    <Slider
                      value={selectedElement.fontSize}
                      onChange={(e, value) => handleChangeElementProp('fontSize', value)}
                      min={8}
                      max={72}
                      step={1}
                      size="small"
                      sx={{
                        width: 100,
                        color: '#FF007F',
                        '& .MuiSlider-thumb': {
                          '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0 0 0 8px rgba(255, 0, 127, 0.16)'
                          }
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ ml: 1, color: '#5A5A8A', minWidth: 30 }}>
                      {selectedElement.fontSize}px
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mr: 3, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title={t('bold')}>
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: selectedElement.fontWeight === 'bold' ? 'rgba(255, 0, 127, 0.1)' : 'transparent',
                          color: selectedElement.fontWeight === 'bold' ? '#FF007F' : '#5A5A8A',
                          '&:hover': {
                            bgcolor: 'rgba(255, 0, 127, 0.05)',
                            transform: 'scale(1.1)'
                          },
                          borderRadius: '8px',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => handleChangeElementProp(
                          'fontWeight', 
                          selectedElement.fontWeight === 'bold' ? 'normal' : 'bold'
                        )}
                      >
                        <FormatBold fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('italic')}>
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: selectedElement.fontStyle === 'italic' ? 'rgba(255, 0, 127, 0.1)' : 'transparent',
                          color: selectedElement.fontStyle === 'italic' ? '#FF007F' : '#5A5A8A',
                          '&:hover': {
                            bgcolor: 'rgba(255, 0, 127, 0.05)',
                            transform: 'scale(1.1)'
                          },
                          borderRadius: '8px',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => handleChangeElementProp(
                          'fontStyle', 
                          selectedElement.fontStyle === 'italic' ? 'normal' : 'italic'
                        )}
                      >
                        <FormatItalic fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('underline')}>
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: selectedElement.textDecoration === 'underline' ? 'rgba(255, 0, 127, 0.1)' : 'transparent',
                          color: selectedElement.textDecoration === 'underline' ? '#FF007F' : '#5A5A8A',
                          '&:hover': {
                            bgcolor: 'rgba(255, 0, 127, 0.05)',
                            transform: 'scale(1.1)'
                          },
                          borderRadius: '8px',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => handleChangeElementProp(
                          'textDecoration', 
                          selectedElement.textDecoration === 'underline' ? 'none' : 'underline'
                        )}
                      >
                        <FormatUnderlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              )}

              {selectedElement.type === 'image' && (
                <>
                  {/* Image Properties */}
                  <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('image')}</Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddPhotoAlternate />}
                      onClick={() => fileInputRef.current.click()}
                      size="small"
                      sx={{
                        borderRadius: '12px',
                        border: '2px solid #3A3A72',
                        color: '#3A3A72',
                        '&:hover': {
                          backgroundColor: 'rgba(58, 58, 114, 0.05)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      {t('uploadImage')}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Box>
                </>
              )}

              {/* Size Properties */}
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('size')}</Typography>
                <TextField
                  label={t('width')}
                  type="number"
                  value={selectedElement.width}
                  onChange={(e) => handleChangeElementProp('width', parseInt(e.target.value))}
                  size="small"
                  sx={{
                    width: 80,
                    mr: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
                <TextField
                  label={t('height')}
                  type="number"
                  value={selectedElement.height}
                  onChange={(e) => handleChangeElementProp('height', parseInt(e.target.value))}
                  size="small"
                  sx={{
                    width: 80,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Box>

              {/* Position Properties */}
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('position')}</Typography>
                <TextField
                  label="X"
                  type="number"
                  value={selectedElement.x}
                  onChange={(e) => handleChangeElementProp('x', parseInt(e.target.value))}
                  size="small"
                  sx={{
                    width: 80,
                    mr: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
                <TextField
                  label="Y"
                  type="number"
                  value={selectedElement.y}
                  onChange={(e) => handleChangeElementProp('y', parseInt(e.target.value))}
                  size="small"
                  sx={{
                    width: 80,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Box>

              {/* Opacity */}
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('opacity')}</Typography>
                <Slider
                  value={selectedElement.opacity}
                  onChange={(e, value) => handleChangeElementProp('opacity', value)}
                  min={0}
                  max={100}
                  step={1}
                  size="small"
                  sx={{
                    width: 100,
                    color: '#FF007F',
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(255, 0, 127, 0.16)'
                      }
                    }
                  }}
                />
                <Typography variant="body2" sx={{ ml: 1, color: '#5A5A8A', minWidth: 30 }}>
                  {selectedElement.opacity}%
                </Typography>
              </Box>

              {/* Border Properties */}
              {['rect', 'circle', 'pentagon', 'hexagon', 'rhombus'].includes(selectedElement.type) && (
                <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('border')}</Typography>
                  <TextField
                    label={t('width')}
                    type="number"
                    value={selectedElement.borderWidth}
                    onChange={(e) => handleChangeElementProp('borderWidth', parseInt(e.target.value))}
                    size="small"
                    sx={{
                      width: 60,
                      mr: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                  <IconButton 
                    onClick={(e) => {
                      setColorPickerType('border');
                      handleOpenSettings(e, selectedElement);
                    }}
                    size="small"
                    sx={{
                      '&:hover': {
                        transform: 'rotate(15deg)'
                      },
                      transition: 'transform 0.2s ease',
                      color: '#5A5A8A'
                    }}
                  >
                    <BorderStyle fontSize="small" />
                  </IconButton>
                  <Box 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      bgcolor: selectedElement.borderColor, 
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      },
                      transition: 'transform 0.2s ease',
                      ml: 1
                    }}
                    onClick={(e) => {
                      setColorPickerType('border');
                      handleOpenSettings(e, selectedElement);
                    }}
                  />
                </Box>
              )}

              {/* Layer Controls */}
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title={t('bringForward')}>
                  <IconButton
                    size="small"
                    onClick={handleBringForward}
                    sx={{ 
                      bgcolor: 'transparent',
                      color: '#5A5A8A',
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 127, 0.05)',
                        transform: 'scale(1.1)'
                      },
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ArrowUpward fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('sendBackward')}>
                  <IconButton
                    size="small"
                    onClick={handleSendBackward}
                    sx={{ 
                      bgcolor: 'transparent',
                      color: '#5A5A8A',
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 127, 0.05)',
                        transform: 'scale(1.1)'
                      },
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ArrowDownward fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('bringToFront')}>
                  <IconButton
                    size="small"
                    onClick={handleBringToFront}
                    sx={{ 
                      bgcolor: 'transparent',
                      color: '#5A5A8A',
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 127, 0.05)',
                        transform: 'scale(1.1)'
                      },
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FlipToFront fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('sendToBack')}>
                  <IconButton
                    size="small"
                    onClick={handleSendToBack}
                    sx={{ 
                      bgcolor: 'transparent',
                      color: '#5A5A8A',
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 127, 0.05)',
                        transform: 'scale(1.1)'
                      },
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FlipToBack fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title={t('duplicate')}>
                  <IconButton
                    size="small"
                    onClick={handleDuplicateElement}
                    sx={{ 
                      bgcolor: 'transparent',
                      color: '#5A5A8A',
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 127, 0.05)',
                        transform: 'scale(1.1)'
                      },
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('delete')}>
                  <IconButton
                    size="small"
                    onClick={handleDeleteElement}
                    sx={{ 
                      bgcolor: 'transparent',
                      color: '#FF3D00',
                      '&:hover': {
                        bgcolor: 'rgba(255, 61, 0, 0.05)',
                        transform: 'scale(1.1)'
                      },
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              {/* Page Background Color */}
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1, color: '#2A2A52', whiteSpace: 'nowrap' }}>{t('pageColor')}</Typography>
                <IconButton 
                  onClick={(e) => {
                    setColorPickerType('page');
                    handleOpenSettings(e, { color: pages[currentPage]?.backgroundColor || '#ffffff' });
                  }}
                  size="small"
                  sx={{
                    '&:hover': {
                      transform: 'rotate(15deg)'
                    },
                    transition: 'transform 0.2s ease',
                    color: '#5A5A8A'
                  }}
                >
                  <Wallpaper fontSize="small" />
                </IconButton>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    bgcolor: pages[currentPage]?.backgroundColor || '#ffffff', 
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    },
                    transition: 'transform 0.2s ease',
                    ml: 1
                  }}
                  onClick={(e) => {
                    setColorPickerType('page');
                    handleOpenSettings(e, { color: pages[currentPage]?.backgroundColor || '#ffffff' });
                  }}
                />
              </Box>
              
              <Typography variant="body2" sx={{ color: '#5A5A8A' }}>
                {t('noElementSelected')}
              </Typography>
            </>
          )}
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Panel - Templates (conditionally rendered) */}
          {templatesPanelOpen && (
     <Box sx={{ 
              width: 340,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRight: '1px solid rgba(0, 0, 0, 0.05)',
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              className: 'properties-panel',
            }}>
              <ModernPanel onClose={() => setTemplatesPanelOpen(false)}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2A2A52' }}>
                    {t('templates')}
                  </Typography>
                  <Tabs
                    value={selectedCategory}
                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 2 }}
                  >
                    <Tab label={t('all')} value="all" sx={{ minWidth: 'auto', px: 1.5, color: '#5A5A8A' }} />
                    {templateCategories.map(category => (
                      <Tab key={category.id} label={category.name} value={category.id} sx={{ minWidth: 'auto', px: 1.5, color: '#5A5A8A' }} />
                    ))}
                  </Tabs>
                </Box>
                
                <Grid container spacing={2} sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {filteredTemplates
    .filter(t => 
      t.type === contentType ||  // Match current content type
      (['poster','blog','web'] .includes(contentType) && t.category  === 'business') // Show business for posters too
    )
                    .map((template) => (
                      <React.Fragment key={template.id}>
                        <Grid item xs={12}>
                          <Paper
                            elevation={2}
                            sx={{
                              p: 1,
                              borderRadius: '12px',
                              cursor: 'pointer',
                              border: selectedTemplate?.id === template.id ? `2px solid #FF007F` : `1px solid rgba(0, 0, 0, 0.1)`,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0 8px 20px rgba(255, 0, 127, 0.2)'
                              }
                            }}
                            onClick={() => {
                              setSelectedTemplate(template);
                              setTemplateSlidesOpen(templateSlidesOpen === template.id ? null : template.id);
                            }}
                          >
                            <Box
                              component="img"
                              src={template.slides[0].thumbnail}
                              sx={{
                                width: '100%',
                                height: 120,
                                objectFit: 'cover',
                                borderRadius: '8px',
                                mb: 1
                              }}
                            />
                            <Typography variant="body2" align="center" sx={{ color: '#2A2A52' }}>
                              {template.name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                              <Typography variant="caption" sx={{ color: '#5A5A8A' }}>
                                {template.slides.length} {template.slides.length === 1 ? 'slide' : 'slides'}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                        
                        {templateSlidesOpen === template.id && (
                          <Grid item xs={12}>
                            <Box sx={{ 
                              pl: 2, 
                              pr: 1, 
                              py: 1, 
                              bgcolor: 'rgba(255, 0, 127, 0.05)',
                              borderRadius: '12px'
                            }}>
                              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>
                                Select a slide to apply:
                              </Typography>
                              <Grid container spacing={1}>
                                {template.slides.map((slide, index) => (
                                  <Grid item xs={6} key={index}>
                                    <Paper
                                      elevation={1}
                                      sx={{
                                        p: 0.5,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                          transform: 'translateY(-2px)',
                                          boxShadow: '0 4px 12px rgba(255, 0, 127, 0.2)'
                                        },
                                        transition: 'all 0.2s ease'
                                      }}
                                      onClick={() => handleApplyTemplateSlide(slide)}
                                    >
                                      <Box
                                        component="img"
                                        src={slide.thumbnail}
                                        sx={{
                                          width: '100%',
                                          height: 80,
                                          objectFit: 'cover',
                                          borderRadius: '6px'
                                        }}
                                      />
                                      <Typography variant="caption" align="center" sx={{ color: '#5A5A8A' }}>
                                        Slide {index + 1}
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                ))}
                                <Grid item xs={12}>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      borderRadius: '12px',
                                      backgroundColor: '#FF007F',
                                      color: 'white',
                                      '&:hover': {
                                        backgroundColor: '#DDB6F2',
                                        transform: 'translateY(-2px)'
                                      },
                                      transition: 'transform 0.2s ease'
                                    }}
                                    onClick={() => handleApplyAllSlides(template)}
                                  >
                                    Apply All Slides
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        )}
                      </React.Fragment>
                    ))}
                </Grid>
              </ModernPanel>
            </Box>
          )}

          {/* Tools Panel */}
          <Box sx={{ 
            width: 80,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRight: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            overflowY: 'auto'
          }}>
            {/* Search box under Elements */}
            <Box sx={{ width: '100%', px: 1, mb: 1 }}>
              <TextField
                fullWidth
                placeholder={t('search')}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    height: '36px'
                  }
                }}
              />
            </Box>

            <Typography variant="overline" sx={{ mb: 1, color: '#5A5A8A' }}>
              {t('elements')}
            </Typography>
            
            <ToolButton 
              icon={<TextIcon />} 
              active={activeTool === 'text'}
              onClick={() => handleAddElement('text')}
              tooltip={t('text')}
            />
            <ToolButton 
              icon={<ImageIcon />} 
              active={activeTool === 'image'}
              onClick={() => handleAddElement('image')}
              tooltip={t('image')}
            />
            <ToolButton 
              icon={<FormatShapes />} 
              active={activeTool === 'shape'}
              onClick={() => handleAddElement('shape')}
              tooltip={t('shapes')}
            />
            
            {/* Templates button */}
            <Divider sx={{ my: 2, width: '60%', borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            <ToolButton 
              icon={<DashboardCustomize />} 
              active={templatesPanelOpen}
              onClick={() => setTemplatesPanelOpen(!templatesPanelOpen)}
              tooltip={t('templates')}
            />
            
            <Divider sx={{ my: 2, width: '60%', borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            
            <Typography variant="overline" sx={{ mb: 1, color: '#5A5A8A' }}>
              {t('tools')}
            </Typography>
            
            <ToolButton 
              icon={<Layers />} 
              active={rightPanelView === 'layers'}
              onClick={() => {
                setActiveTool(null);
                setRightPanelView('layers');
              }}
              tooltip={t('layers')}
            />
            
            <ToolButton 
              icon={<GridOn />} 
              onClick={() => setShowGrid(!showGrid)}
              active={showGrid}
              tooltip={t('grid')}
            />
            
            <Divider sx={{ my: 2, width: '60%', borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            
            <Typography variant="overline" sx={{ mb: 1, color: '#5A5A8A' }}>
              {t('view')}
            </Typography>
            
            <ToolButton 
              icon={<ZoomIn />} 
              onClick={() => setZoomLevel(Math.min(zoomLevel + 10, 200))}
              disabled={zoomLevel >= 200}
              tooltip={t('zoomIn')}
            />
            <ToolButton 
              icon={<ZoomOut />} 
              onClick={() => setZoomLevel(Math.max(zoomLevel - 10, 50))}
              disabled={zoomLevel <= 50}
              tooltip={t('zoomOut')}
            />
          </Box>

          {/* Canvas Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Page Controls */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              py: 1,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <IconButton 
                onClick={handleAddPage}
                size="small"
                sx={{
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.1)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                <Add />
              </IconButton>
              <IconButton 
                onClick={handleRemovePage}
                size="small"
                sx={{
                  color: '#FF3D00',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 61, 0, 0.1)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease',
                  ml: 1
                }}
              >
                <Remove />
              </IconButton>
              
              {/* Page scroll controls */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mx: 2,
                overflowX: 'auto',
                maxWidth: '200px',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  height: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#FF007F',
                  borderRadius: '2px'
                }
              }}>
                {pages.map((_, index) => (
                  <Chip
                    key={index}
                    label={`Page ${index + 1}`}
                    onClick={() => {
                      setCurrentPage(index);
                      setCanvasElements(pages[index].elements);
                    }}
                    sx={{
                      mx: 0.5,
                      cursor: 'pointer',
                      backgroundColor: currentPage === index ? '#FF007F' : 'rgba(0, 0, 0, 0.1)',
                      color: currentPage === index ? 'white' : '#2A2A52',
                      '&:hover': {
                        backgroundColor: currentPage === index ? '#DDB6F2' : 'rgba(0, 0, 0, 0.05)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                    size="small"
                  />
                ))}
              </Box>
              
              <IconButton 
                onClick={handleMovePageUp}
                size="small"
                sx={{
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.1)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease',
                  ml: 1
                }}
              >
                <KeyboardArrowUp />
              </IconButton>
              <IconButton 
                onClick={handleMovePageDown}
                size="small"
                sx={{
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.1)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'transform 0.2s ease',
                  ml: 1
                }}
              >
                <KeyboardArrowDown />
              </IconButton>
            </Box>

            <ModernCanvasContainer
              ref={canvasRef}
              sx={{
                backgroundImage: showGrid ? `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)` : 'none',
                backgroundColor: pages[currentPage]?.backgroundColor || '#ffffff'
              }}
              onClick={handleCanvasClick}
            >
              <ModernCanvas
                sx={{
                  width: canvasSize.width * (zoomLevel / 100),
                  height: canvasSize.height * (zoomLevel / 100),
                  transform: `scale(${zoomLevel / 100})`,
                }}
              >
                {selectedTemplate && (
                  <Box
                    component="img"
                    src={selectedTemplate.thumbnail}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 0,
                      opacity: 0.7
                    }}
                  />
                )}

                <AnimatePresence>
                  {canvasElements.map((element) => (
                    <ModernElement
                      key={element.id}
                      style={{
                        left: element.x,
                        top: element.y,
                        width: ['triangle'].includes(element.type) ? 0 : element.width,
                        height: ['triangle'].includes(element.type) ? 0 : element.height,
                        zIndex: element.zIndex,
                      }}
                      drag
                      dragControls={dragControls}
                      dragConstraints={canvasRef}
                      dragMomentum={false}
                      onDrag={(e, info) => handleDragElement(element.id, info)}
                      onClick={(e) => handleElementClick(e, element)}
                      whileHover={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
                      whileTap={{ scale: 0.98 }}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={() => {
                        setIsDragging(false);
                        saveToHistory(canvasElements);
                      }}
                      className={selectedElement?.id === element.id ? 'selected' : ''}
                    >
                      {renderElement(element)}
                      
                      {/* Resize handles - only show when element is selected */}
                      {selectedElement?.id === element.id && (
                        <>
                          <ResizeHandle 
                            direction="top-left"
                            onResize={(delta) => handleResizeElement(element.id, 'top-left', delta)}
                          />
                          <ResizeHandle 
                            direction="top-right"
                            onResize={(delta) => handleResizeElement(element.id, 'top-right', delta)}
                          />
                          <ResizeHandle 
                            direction="bottom-left"
                            onResize={(delta) => handleResizeElement(element.id, 'bottom-left', delta)}
                          />
                          <ResizeHandle 
                            direction="bottom-right"
                            onResize={(delta) => handleResizeElement(element.id, 'bottom-right', delta)}
                          />
                        </>
                      )}
                    </ModernElement>
                  ))}
                </AnimatePresence>

                {!selectedTemplate && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'rgba(255,255,255,0.7)',
                      zIndex: 0,
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                      {canvasSize.name}
                    </Typography>
                    <Button 
                      variant="outlined"
                      onClick={() => setSelectedTemplate({ id: 0, name: 'Blank Canvas' })}
                      sx={{
                        borderRadius: '12px',
                        border: '2px solid #3A3A72',
                        color: '#3A3A72',
                        '&:hover': {
                          backgroundColor: 'rgba(58, 58, 114, 0.05)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      Start with Blank Canvas
                    </Button>
                  </Box>
                )}
              </ModernCanvas>
            </ModernCanvasContainer>
          </Box>

          {/* Right Panel - Layers */}
          {rightPanelView === 'layers' && (
            <Box sx={{ 
              width: 340,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <ModernPanel onClose={() => setRightPanelView('null')}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2 
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2A2A52' }}>
                    {t('layers')}
                  </Typography>
                  <IconButton 
                    onClick={() => setRightPanelView('properties')} 
                    size="small"
                    sx={{
                      '&:hover': {
                        transform: 'rotate(90deg)'
                      },
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box> 
                
                <List dense sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
                  {[...canvasElements]
                    .sort((a, b) => b.zIndex - a.zIndex)
                    .map((element) => (
                      <ListItem 
                        key={element.id}
                        sx={{ 
                          bgcolor: selectedElement?.id === element.id ? 'rgba(255, 0, 127, 0.1)' : 'transparent',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(255, 0, 127, 0.05)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => {
                          setSelectedElement(element);
                          setRightPanelView('properties');
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {element.type === 'text' && <TextIcon fontSize="small" sx={{ color: '#FF007F' }} />}
                          {element.type === 'image' && <ImageIcon fontSize="small" sx={{ color: '#FF007F' }} />}
                          {['rect', 'circle', 'triangle', 'star', 'hexagon', 'pentagon', 'rhombus'].includes(element.type) && (
                            <FormatShapes fontSize="small" sx={{ color: '#FF007F' }} />
                          )}
                          {element.type.includes('line') && <BorderStyle fontSize="small" sx={{ color: '#FF007F' }} />}
                        </ListItemIcon>
                        <ListItemText 
                          primary={element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                          secondary={`${Math.round(element.x)}px, ${Math.round(element.y)}px`}
                          primaryTypographyProps={{ color: '#2A2A52' }}
                          secondaryTypographyProps={{ color: '#5A5A8A' }}
                        />
                        <DragHandle fontSize="small" sx={{ color: '#5A5A8A' }} />
                      </ListItem>
                    ))}
                </List>
              </ModernPanel>
            </Box>
          )}

          {/* Right Panel - Shapes */}
          {rightPanelView === 'shapes' && (
            <Box sx={{ 
              width: 340,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <ModernPanel onClose={() => setRightPanelView('null')}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2 
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2A2A52' }}>
                    {t('shapes')}
                  </Typography>
                  <IconButton 
                    onClick={() => setRightPanelView('properties')} 
                    size="small"
                    sx={{
                      '&:hover': {
                        transform: 'rotate(90deg)'
                      },
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  placeholder={t('searchShapes')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ mb: 2 }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" sx={{ color: '#5A5A8A' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                />
                
                {!searchTerm && (
                  <Tabs
                    value={shapeTab}
                    onChange={(e, newValue) => setShapeTab(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 2 }}
                  >
                    <Tab label={t('basic')} value="basic" sx={{ minWidth: 'auto', px: 1.5, color: '#5A5A8A' }} />
                    <Tab label={t('advanced')} value="advanced" sx={{ minWidth: 'auto', px: 1.5, color: '#5A5A8A' }} />
                    <Tab label={t('decorative')} value="decorative" sx={{ minWidth: 'auto', px: 1.5, color: '#5A5A8A' }} />
                  </Tabs>
                )}
                
                <Grid container spacing={2}>
                  {filteredShapes.map((shape) => (
                    <Grid item xs={6} key={shape.id}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 80,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 0, 127, 0.05)',
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.2s ease',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => {
                          handleAddElement(shape.id);
                        }}
                      >
                        <Box sx={{ color: '#FF007F', mb: 1 }}>
                          {shape.icon}
                        </Box>
                        <Typography variant="caption" align="center" sx={{ color: '#2A2A52' }}>
                          {shape.name}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </ModernPanel>
            </Box>
          )}
        </Box>
      </Box>

      {/* Floating Action Button for Quick Actions */}
      <FloatingActionButton
        color="primary"
        onClick={() => {
          if (selectedElement) {
            handleDuplicateElement();
          } else {
            setActiveTool('text');
            setRightPanelView('properties');
          }
        }}
      >
        {selectedElement ? <ContentCopy /> : <TextIcon />}
      </FloatingActionButton>

      {/* Color Picker Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            p: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)'
          }
        }}
      >
        <Box sx={{ width: 240 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#2A2A52' }}>
            {colorPickerType === 'fill' ? t('selectFillColor') : 
             colorPickerType === 'border' ? t('selectBorderColor') :
             colorPickerType === 'text' ? t('selectTextColor') : 
             colorPickerType === 'background' ? t('selectBackgroundColor') : 
             colorPickerType === 'page' ? t('selectPageColor') :
             t('selectColor')}
          </Typography>
          <TextField
            fullWidth
            type="color"
            value={
              colorPickerType === 'border' ? (selectedElement?.borderColor || '#3A3A72') :
              colorPickerType === 'text' ? (selectedElement?.textColor || '#000000') :
              colorPickerType === 'background' ? (selectedElement?.backgroundColor || 'transparent') :
              colorPickerType === 'page' ? (pages[currentPage]?.backgroundColor || '#ffffff') :
              (selectedElement?.color || '#000000')
            }
            onChange={(e) => {
              if (colorPickerType === 'border') {
                handleChangeElementProp('borderColor', e.target.value);
              } else if (colorPickerType === 'text') {
                handleChangeElementProp('textColor', e.target.value);
              } else if (colorPickerType === 'background') {
                handleChangeElementProp('backgroundColor', e.target.value);
              } else if (colorPickerType === 'page') {
                handleChangePageBackground(e.target.value);
              } else {
                handleChangeElementProp('color', e.target.value);
              }
            }}
            size="small"
            InputProps={{
              style: {
                height: '40px',
                padding: '3px',
                borderRadius: '12px'
              }
            }}
          />
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {[
              '#FF007F', '#3A3A72', '#DDB6F2', '#FF5252', '#FFD740', '#69F0AE', 
              '#40C4FF', '#E040FB', '#FF9800', '#4CAF50', '#2196F3', '#9C27B0',
              '#000000', '#FFFFFF'
            ].map((color) => (
              <Grid item key={color}>
                <IconButton
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      transform: 'scale(1.1)'
                    },
                    transition: 'transform 0.2s ease'
                  }}
                  onClick={() => {
                    if (colorPickerType === 'border') {
                      handleChangeElementProp('borderColor', color);
                    } else if (colorPickerType === 'text') {
                      handleChangeElementProp('textColor', color);
                    } else if (colorPickerType === 'background') {
                      handleChangeElementProp('backgroundColor', color);
                    } else if (colorPickerType === 'page') {
                      handleChangePageBackground(color);
                    } else {
                      handleChangeElementProp('color', color);
                    }
                    handleCloseSettings();
                  }}
                >
                  <Box sx={{ 
                    width: 30, 
                    height: 30, 
                    bgcolor: color,
                    border: '1px solid',
                    borderColor: color === '#FFFFFF' ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    borderRadius: '6px'
                  }} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>

      {/* Gradient Dialog */}
      <Dialog 
        open={gradientDialogOpen} 
        onClose={() => setGradientDialogOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2A2A52' }}>{t('gradientFill')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined"
                startIcon={<Gradient />}
                onClick={() => applyGradient('linear')}
                size="small"
                sx={{
                  borderRadius: '12px',
                  border: '2px solid #3A3A72',
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('linear')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined"
                startIcon={<Gradient />}
                onClick={() => applyGradient('radial')}
                size="small"
                sx={{
                  borderRadius: '12px',
                  border: '2px solid #3A3A72',
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('radial')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth 
                variant="outlined"
                color="error"
                startIcon={<Close />}
                onClick={() => {
                  applyGradient('none');
                  setGradientDialogOpen(false);
                }}
                sx={{
                  borderRadius: '12px',
                  border: '2px solid #FF3D00',
                  color: '#FF3D00',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 61, 0, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('removeGradient')}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setGradientDialogOpen(false)}
            sx={{
              borderRadius: '12px',
              color: '#5A5A8A',
              '&:hover': {
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s ease'
            }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Shadow Dialog */}
      <Dialog 
        open={shadowDialogOpen} 
        onClose={() => setShadowDialogOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2A2A52' }}>{t('shadowEffects')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined"
                startIcon={<Shadow />}
                onClick={() => applyShadow('small')}
                size="small"
                sx={{
                  borderRadius: '12px',
                  border: '2px solid #3A3A72',
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('small')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined"
                startIcon={<Shadow />}
                onClick={() => applyShadow('medium')}
                size="small"
                sx={{
                  borderRadius: '1212px',
                  border: '2px solid #3A3A72',
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('medium')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined"
                startIcon={<Shadow />}
                onClick={() => applyShadow('large')}
                size="small"
                sx={{
                  borderRadius: '12px',
                  border: '2px solid #3A3A72',
                  color: '#3A3A72',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 58, 114, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('large')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined"
                color="error"
                startIcon={<Close />}
                onClick={() => {
                  applyShadow('none');
                  setShadowDialogOpen(false);
                }}
                sx={{
                  borderRadius: '12px',
                  border: '2px solid #FF3D00',
                  color: '#FF3D00',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 61, 0, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                {t('removeShadow')}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShadowDialogOpen(false)}
            sx={{
              borderRadius: '12px',
              color: '#5A5A8A',
              '&:hover': {
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s ease'
            }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Font Dialog */}
      <Dialog 
        open={fontDialogOpen} 
        onClose={() => setFontDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2A2A52' }}>{t('fontSettings')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('fontFamily')}</Typography>
              <Select
                fullWidth
                value={selectedElement?.fontFamily || 'Arial'}
                onChange={(e) => handleChangeElementProp('fontFamily', e.target.value)}
                size="small"
                sx={{
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                {fontFamilies.map((font) => (
                  <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('fontSize')}</Typography>
              <Slider
                value={selectedElement?.fontSize || 16}
                onChange={(e, value) => handleChangeElementProp('fontSize', value)}
                min={8}
                max={72}
                step={1}
                valueLabelDisplay="auto"
                size="small"
                sx={{
                  color: '#FF007F',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(255, 0, 127, 0.16)'
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('fontStyle')}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant={selectedElement?.fontWeight === 'bold' ? 'contained' : 'outlined'}
                  startIcon={<FormatBold />}
                  onClick={() => handleChangeElementProp(
                    'fontWeight', 
                    selectedElement?.fontWeight === 'bold' ? 'normal' : 'bold'
                  )}
                  size="small"
                  sx={{
                    borderRadius: '12px',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    },
                    transition: 'transform 0.2s ease',
                    ...(selectedElement?.fontWeight === 'bold' ? {
                      backgroundColor: '#FF007F',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#DDB6F2'
                      }
                    } : {
                      border: '2px solid #3A3A72',
                      color: '#3A3A72',
                      '&:hover': {
                        backgroundColor: 'rgba(58, 58, 114, 0.05)'
                      }
                    })
                  }}
                >
                  {t('bold')}
                </Button>
                <Button
                  variant={selectedElement?.fontStyle === 'italic' ? 'contained' : 'outlined'}
                  startIcon={<FormatItalic />}
                  onClick={() => handleChangeElementProp(
                    'fontStyle', 
                    selectedElement?.fontStyle === 'italic' ? 'normal' : 'italic'
                  )}
                  size="small"
                  sx={{
                    borderRadius: '12px',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    },
                    transition: 'transform 0.2s ease',
                    ...(selectedElement?.fontStyle === 'italic' ? {
                      backgroundColor: '#FF007F',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#DDB6F2'
                      }
                    } : {
                      border: '2px solid #3A3A72',
                      color: '#3A3A72',
                      '&:hover': {
                        backgroundColor: 'rgba(58, 58, 114, 0.05)'
                      }
                    })
                  }}
                >
                  {t('italic')}
                </Button>
                <Button
                  variant={selectedElement?.textDecoration === 'underline' ? 'contained' : 'outlined'}
                  startIcon={<FormatUnderlined />}
                  onClick={() => handleChangeElementProp(
                    'textDecoration', 
                    selectedElement?.textDecoration === 'underline' ? 'none' : 'underline'
                  )}
                  size="small"
                  sx={{
                    borderRadius: '12px',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    },
                    transition: 'transform 0.2s ease',
                    ...(selectedElement?.textDecoration === 'underline' ? {
                      backgroundColor: '#FF007F',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#DDB6F2'
                      }
                    } : {
                      border: '2px solid #3A3A72',
                      color: '#3A3A72',
                      '&:hover': {
                        backgroundColor: 'rgba(58, 58, 114, 0.05)'
                      }
                    })
                  }}
                >
                  {t('underline')}
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('lineHeight')}</Typography>
              <Slider
                value={selectedElement?.lineHeight || 1.5}
                onChange={(e, value) => handleChangeElementProp('lineHeight', value)}
                min={1}
                max={3}
                step={0.1}
                valueLabelDisplay="auto"
                size="small"
                sx={{
                  color: '#FF007F',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(255, 0, 127, 0.16)'
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('letterSpacing')}</Typography>
              <Slider
                value={selectedElement?.letterSpacing || 0}
                onChange={(e, value) => handleChangeElementProp('letterSpacing', value)}
                min={-2}
                max={10}
                step={0.1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                size="small"
                sx={{
                  color: '#FF007F',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(255, 0, 127, 0.16)'
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('textAlign')}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['left', 'center', 'right', 'justify'].map((align) => (
                  <Tooltip key={align} title={align.charAt(0).toUpperCase() + align.slice(1)}>
                    <Button
                      variant={selectedElement?.textAlign === align ? 'contained' : 'outlined'}
                      onClick={() => handleChangeElementProp('textAlign', align)}
                      size="small"
                      sx={{
                        borderRadius: '12px',
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        },
                        transition: 'transform 0.2s ease',
                        ...(selectedElement?.textAlign === align ? {
                          backgroundColor: '#FF007F',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#DDB6F2'
                          }
                        } : {
                          border: '2px solid #3A3A72',
                          color: '#3A3A72',
                          '&:hover': {
                            backgroundColor: 'rgba(58, 58, 114, 0.05)'
                          }
                        })
                      }}
                    >
                      {align === 'left' && <span>Left</span>}
                      {align === 'center' && <span>Center</span>}
                      {align === 'right' && <span>Right</span>}
                      {align === 'justify' && <span>Justify</span>}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setFontDialogOpen(false)}
            sx={{
              borderRadius: '12px',
              color: '#5A5A8A',
              '&:hover': {
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s ease'
            }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Template Dialog */}
      <Dialog 
        open={saveDialogOpen} 
        onClose={() => setSaveDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2A2A52' }}>{t('saveTemplate')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('templateName')}
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('templateSize')}</Typography>
              <Chip 
                label={`${canvasSize.width} × ${canvasSize.height} px`} 
                sx={{ 
                  mr: 1,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(58, 58, 114, 0.1)',
                  color: '#2A2A52'
                }} 
                size="small"
              />
              <Chip 
                label={contentType.charAt(0).toUpperCase() + contentType.slice(1)} 
                sx={{ 
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 0, 127, 0.1)',
                  color: '#FF007F'
                }}
                size="small"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2A2A52' }}>{t('elements')}</Typography>
              <Box sx={{ 
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                p: 2,
                maxHeight: 200,
                overflow: 'auto',
                background: 'rgba(0, 0, 0, 0.02)'
              }}>
                {canvasElements.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    {t('noElements')}
                  </Typography>
                ) : (
                  <List dense>
                    {canvasElements.map((el) => (
                      <ListItem key={el.id} sx={{ borderRadius: '8px' }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {el.type === 'text' && <TextIcon fontSize="small" sx={{ color: '#FF007F' }} />}
                          {el.type === 'image' && <ImageIcon fontSize="small" sx={{ color: '#FF007F' }} />}
                          {['rect', 'circle', 'pentagon', 'hexagon', 'rhombus'].includes(el.type) && (
                            <FormatShapes fontSize="small" sx={{ color: '#FF007F' }} />
                          )}
                          {el.type.includes('line') && <BorderStyle fontSize="small" sx={{ color: '#FF007F' }} />}
                        </ListItemIcon>
                        <ListItemText 
                          primary={el.type.charAt(0).toUpperCase() + el.type.slice(1)}
                          secondary={`${el.width} × ${el.height} px`}
                          primaryTypographyProps={{ color: '#2A2A52' }}
                          secondaryTypographyProps={{ color: '#5A5A8A' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setSaveDialogOpen(false)}
            sx={{
              borderRadius: '12px',
              color: '#5A5A8A',
              '&:hover': {
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s ease'
            }}
          >
            {t('cancel')}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveTemplate}
            disabled={!templateName.trim()}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#FF007F',
              color: 'white',
              '&:hover': {
                backgroundColor: '#DDB6F2',
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s ease'
            }}
          >
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog 
        open={errorDialogOpen} 
        onClose={() => setErrorDialogOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#FF3D00' }}>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#2A2A52' }}>
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setErrorDialogOpen(false)}
            sx={{
              borderRadius: '12px',
              color: '#5A5A8A',
              '&:hover': {
                transform: 'translateY(-2px)'
              },
              transition: 'transform 0.2s ease'
            }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Login Dialog */}
      <Dialog 
        open={loginDialogOpen} 
        onClose={() => setLoginDialogOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2A2A52' }}>
  {authMode === 'login' ? 'Login to Save Design' : 'Sign Up to Save Design'}
</DialogTitle>
{authMode === 'login' && designToSave && (
  <Typography variant="body2" sx={{ mb: 2, color: '#5A5A8A', textAlign: 'center' }}>
    Your design "{designToSave.name}" will be saved after login
  </Typography>
)}

{authMode === 'signup' && designToSave && (
  <Typography variant="body2" sx={{ mb: 2, color: '#5A5A8A', textAlign: 'center' }}>
    Your design "{designToSave.name}" will be saved after signup
  </Typography>
)}
        <DialogContent>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {/* Toggle between Login/Signup */}
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Button 
        onClick={() => setAuthMode('login')}
        sx={{
          fontWeight: authMode === 'login' ? 600 : 400,
          color: authMode === 'login' ? '#FF007F' : '#5A5A8A',
          borderBottom: authMode === 'login' ? '2px solid #FF007F' : 'none',
          borderRadius: 0
        }}
      >
        Login
      </Button>
      <Button 
        onClick={() => setAuthMode('signup')}
        sx={{
          fontWeight: authMode === 'signup' ? 600 : 400,
          color: authMode === 'signup' ? '#FF007F' : '#5A5A8A',
          borderBottom: authMode === 'signup' ? '2px solid #FF007F' : 'none',
          borderRadius: 0
        }}
      >
        Sign Up
      </Button>
    </Box>

    {/* Login Form */}
    {authMode === 'login' && (
      <>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained"
          fullWidth
          sx={{
            borderRadius: '12px',
            backgroundColor: '#FF007F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#DDB6F2'
            }
          }}
        >
          Login
        </Button>
      </>
    )}

    {/* Signup Form */}
    {authMode === 'signup' && (
      <>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone (Optional)"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained"
          fullWidth
          sx={{
            borderRadius: '12px',
            backgroundColor: '#FF007F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#DDB6F2'
            }
          }}
        >
          Sign Up
        </Button>
      </>
    )}
  </Box>
</DialogContent>
<DialogActions>
  <Button 
    onClick={() => setLoginDialogOpen(false)}
    sx={{
      borderRadius: '12px',
      color: '#5A5A8A',
      '&:hover': {
        transform: 'translateY(-2px)'
      },
      transition: 'transform 0.2s ease'
    }}
  >
    Close
  </Button>
</DialogActions>
      </Dialog>
    </Box>
  );
};

export default StartDesign;