import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  TextField,
  Avatar,
  LinearProgress,
  Tooltip,
  Fab,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Tabs,
  Tab,
  Paper
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
  Close,
  Language,
  ArrowBack,
  Mic,
  Stop,
  Send,
  Download,
  Psychology,
  EmojiEmotions,
  AutoAwesome,
  RecordVoiceOver,
  Translate,
  Lightbulb,
  Quiz,
  LiveTv,
  PictureAsPdf,
  ExpandMore,
  PlayArrow,
  Pause,
  CheckCircle,
  Assignment,
  School,
  WorkspacePremium,
  Star,
  VideoLibrary,
  Article,
  TaskAlt,
  LockOpen,
  Lock,
  Add,
  Search,
  FilterList
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LanguageContext } from './translations/LanguageContext';

// Individual Course Component
const LiveAICourseView = ({ course, onBack, language }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    messagesSent: 0,
    audioDuration: 0,
    questionsAsked: 0
  });
  const [emotionalFeedback, setEmotionalFeedback] = useState({
    emotion: 'neutral',
    intensity: 0.5
  });
  const [aiPersonality, setAiPersonality] = useState('enthusiastic');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isViewingPdf, setIsViewingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [quizResults, setQuizResults] = useState({});
  const [userProgress, setUserProgress] = useState({
    completedModules: [],
    completedLevels: [],
    scores: {}
  });
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [courseGenerationProgress, setCourseGenerationProgress] = useState({
    isGenerating: false,
    progress: 0,
    currentStep: '',
    estimatedTime: '2-5 minutes'
  });

  const websocket = useRef(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const messagesEndRef = useRef(null);
  const recordingTimer = useRef(null);
  const sessionStartTime = useRef(new Date());
  const videoRef = useRef(null);
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    connectWebSocket();
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem(`progress_${course.id}`);
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    // Check if course is still being generated
    if (course.status === 'generating') {
      simulateCourseGeneration();
    }
    
    return () => {
      disconnectWebSocket();
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem(`progress_${course.id}`, JSON.stringify(userProgress));
    
    // Check if all levels are completed
    if (course.levels && userProgress.completedLevels.length === course.levels.length) {
      setCertificateUnlocked(true);
    }
  }, [userProgress, course.id]);

  const simulateCourseGeneration = () => {
    setCourseGenerationProgress({
      isGenerating: true,
      progress: 0,
      currentStep: 'Initializing course structure...',
      estimatedTime: '2-5 minutes'
    });

    const steps = [
      'Creating course outline...',
      'Generating learning objectives...',
      'Writing module content...',
      'Creating video scripts...',
      'Generating PDF materials...',
      'Creating quizzes and exercises...',
      'Finalizing course materials...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setCourseGenerationProgress(prev => ({
          ...prev,
          progress: Math.min((currentStep / steps.length) * 100, 95),
          currentStep: steps[currentStep]
        }));
        currentStep++;
      } else {
        clearInterval(interval);
        setCourseGenerationProgress(prev => ({
          ...prev,
          progress: 100,
          currentStep: 'Course generation complete!',
          isGenerating: false
        }));
        // Add welcome message when course is ready
        setTimeout(() => {
          addSystemMessage('Your AI-generated course is ready! Start learning now.');
        }, 1000);
      }
    }, 2000);
  };

  const connectWebSocket = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const API_BASE = window._env_?.REACT_APP_API_URL || 'http://localhost:8000';
    const wsUrl = `${API_BASE.replace('http', 'ws')}/ws/instruct/${sessionId}`;
    
    try {
      console.log("Connecting to WebSocket:", wsUrl);
      websocket.current = new WebSocket(wsUrl);

      websocket.current.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        addSystemMessage('Connected to AI instructor!');
        
        // Send course info to the server
        const courseInfo = {
          id: course.id,
          title: course.title,
          description: course.description,
          language: course.language,
          level: course.level
        };
        
        websocket.current.send(JSON.stringify({
          type: 'course_info',
          data: courseInfo
        }));
      };

      websocket.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("WebSocket message received:", data);
          
          if (data.type === 'message' || data.type === 'response') {
            handleBackendResponse(data);
          } else if (data.type === 'error') {
            addSystemMessage(`Error: ${data.message}`);
          } else if (data.type === 'quiz_result') {
            handleQuizResult(data.result);
          } else if (data.type === 'course_generation_update') {
            handleCourseGenerationUpdate(data);
          }
        } catch (e) {
          console.error("Error parsing WebSocket message:", e);
        }
      };

      websocket.current.onclose = (event) => {
        console.log('WebSocket connection closed', event.code, event.reason);
        setIsConnected(false);
        addSystemMessage('Disconnected from AI instructor');
        
        if (event.code !== 1000) {
          reconnectTimeout.current = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connectWebSocket();
          }, 3000);
        }
      };

      websocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        addSystemMessage('Connection error occurred');
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      addSystemMessage('Failed to connect to AI instructor');
    }
  };

  const handleBackendResponse = (data) => {
    console.log('Backend response:', data);
    if (data.content) {
      addMessage('AI', data.content);
    }
  };

  const handleCourseGenerationUpdate = (data) => {
    setCourseGenerationProgress({
      isGenerating: data.is_generating,
      progress: data.progress,
      currentStep: data.current_step,
      estimatedTime: data.estimated_time
    });
  };

  const disconnectWebSocket = () => {
    if (websocket.current) {
      websocket.current.close(1000, 'User disconnected');
    }
    if (mediaRecorder.current && isRecording) {
      stopRecording();
    }
  };

  const handleQuizResult = (result) => {
    setQuizResults(prev => ({
      ...prev,
      [result.quizId]: result
    }));
    
    if (result.passed) {
      const updatedProgress = {
        ...userProgress,
        completedModules: [...userProgress.completedModules, result.moduleId],
        scores: {
          ...userProgress.scores,
          [result.quizId]: result.score
        }
      };
      
      setUserProgress(updatedProgress);
      
      if (course.levels && course.levels[currentLevel]) {
        const levelModules = course.levels[currentLevel].modules || [];
        const allCompleted = levelModules.every(module => 
          updatedProgress.completedModules.includes(module.id)
        );
        
        if (allCompleted && !userProgress.completedLevels.includes(currentLevel)) {
          setUserProgress(prev => ({
            ...prev,
            completedLevels: [...prev.completedLevels, currentLevel]
          }));
          
          addSystemMessage(`Congratulations! You've completed Level ${currentLevel + 1}`);
        }
      }
    }
  };

  const addMessage = (sender, text, isTyping = false) => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (isTyping && newMessages.length > 0 && newMessages[newMessages.length - 1].isTyping) {
        newMessages[newMessages.length - 1] = { sender, text, timestamp: new Date(), isTyping };
      } else {
        newMessages.push({ sender, text, timestamp: new Date(), isTyping });
      }
      return newMessages;
    });
  };

  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'System', text, timestamp: new Date() }]);
  };

  const analyzeSentiment = (text) => {
    const positiveWords = ['great', 'awesome', 'love', 'good', 'excellent', 'happy', 'interesting', 'cool', 'fantastic', 'amazing'];
    const negativeWords = ['bad', 'hate', 'terrible', 'awful', 'frustrated', 'confused', 'difficult', 'hard', 'problem', 'issue'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return { emotion: 'excited', intensity: positiveCount / words.length };
    if (negativeCount > positiveCount) return { emotion: 'frustrated', intensity: negativeCount / words.length };
    return { emotion: 'neutral', intensity: 0.5 };
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const sentiment = analyzeSentiment(inputMessage);
      setEmotionalFeedback(sentiment);
      
      if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
        websocket.current.send(JSON.stringify({
          type: 'message',
          text: inputMessage,
          language: course.language,
          course_id: course.id
        }));
      }
      
      addMessage('You', inputMessage);
      setInputMessage('');
      setSessionStats(prev => ({ ...prev, messagesSent: prev.messagesSent + 1 }));
      
      if (inputMessage.trim().endsWith('?')) {
        setSessionStats(prev => ({ ...prev, questionsAsked: prev.questionsAsked + 1 }));
      }
    }
  };

  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { echoCancellation: true, noiseSuppression: true }
        });
        
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
        };

        mediaRecorder.current.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          
          if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
            const reader = new FileReader();
            reader.onload = function() {
              const base64data = reader.result.split(',')[1];
              websocket.current.send(JSON.stringify({
                type: 'audio_input',
                data: base64data,
                language: course.language
              }));
            };
            reader.readAsDataURL(audioBlob);
          }
          
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.current.start();
        setIsRecording(true);
        recordingTimer.current = Date.now();
        addSystemMessage('Recording started... Speak now!');
      } else {
        addSystemMessage('Microphone access not supported in this browser');
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      addSystemMessage('Microphone access denied or not available');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      addSystemMessage('Recording stopped');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const navigateModule = (direction) => {
    setCurrentModule(prev => {
      let newIndex = prev + direction;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= (course.levels?.[currentLevel]?.modules?.length || 0)) newIndex = (course.levels?.[currentLevel]?.modules?.length || 1) - 1;
      return newIndex;
    });
  };

  const navigateLevel = (levelIndex) => {
    if (levelIndex >= 0 && levelIndex < (course.levels?.length || 0)) {
      if (levelIndex > 0 && !userProgress.completedLevels.includes(levelIndex - 1)) {
        addSystemMessage('Please complete the previous level first');
        return;
      }
      setCurrentLevel(levelIndex);
      setCurrentModule(0);
    }
  };

  const takeQuiz = (moduleId) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify({
        type: 'request_quiz',
        module_id: moduleId,
        level: currentLevel
      }));
      addSystemMessage('Generating quiz...');
    }
  };

  const requestPractice = (moduleId) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify({
        type: 'request_practice',
        module_id: moduleId,
        level: currentLevel
      }));
      addSystemMessage('Generating practice exercise...');
    }
  };

  const generateCertificate = () => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify({
        type: 'generate_certificate',
        course_id: course.id,
        student_name: 'User'
      }));
      addSystemMessage('Generating your certificate...');
    }
    setShowCertificate(true);
  };

  const quickActions = [
    { label: 'Explain this concept', message: 'Can you explain the current concept in more detail?', icon: <Psychology /> },
    { label: 'Give me an example', message: 'Could you provide a practical example of this?', icon: <Lightbulb /> },
    { label: 'Quiz me', message: 'Can you test my understanding with a quick quiz?', icon: <Quiz /> },
    { label: 'Practice exercise', message: 'Give me a practice exercise for this topic', icon: <Assignment /> },
    { label: 'Show resources', message: 'What additional resources would you recommend?', icon: <AutoAwesome /> }
  ];

  const personalityOptions = [
    { value: 'enthusiastic', label: 'Enthusiastic', icon: <EmojiEmotions /> },
    { value: 'patient', label: 'Patient', icon: <Psychology /> },
    { value: 'formal', label: 'Formal', icon: <RecordVoiceOver /> },
    { value: 'friendly', label: 'Friendly', icon: <AutoAwesome /> }
  ];

  const sendQuickAction = (message) => {
    setInputMessage(message);
    setTimeout(() => sendMessage(), 100);
  };

  const changePersonality = (personality) => {
    setAiPersonality(personality);
    
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify({
        type: 'set_personality',
        personality: personality
      }));
    }
    
    addSystemMessage(`AI personality changed to ${personality}`);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.sender}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${course.title}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleVideo = () => {
    setIsPlayingVideo(!isPlayingVideo);
    setIsViewingPdf(false);
  };

  const togglePdf = () => {
    setIsViewingPdf(!isViewingPdf);
    setIsPlayingVideo(false);
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'excited': return 'success.main';
      case 'frustrated': return 'error.main';
      case 'confused': return 'warning.main';
      default: return 'text.secondary';
    }
  };

  const getPersonalityColor = (personality) => {
    switch (personality) {
      case 'enthusiastic': return '#FF007F';
      case 'patient': return '#2196F3';
      case 'formal': return '#4CAF50';
      case 'friendly': return '#FF9800';
      default: return '#3A3A72';
    }
  };

  const isModuleCompleted = (moduleId) => {
    return userProgress.completedModules.includes(moduleId);
  };

  const isLevelCompleted = (levelIndex) => {
    return userProgress.completedLevels.includes(levelIndex);
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`course-tabpanel-${index}`}
        aria-labelledby={`course-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
      </div>
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ color: '#FF007F' }}
        >
          Back to Courses
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 700, flex: 1 }}>
          {course.title}
        </Typography>
        
        {/* Personality Selector */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {personalityOptions.map((option) => (
            <Tooltip key={option.value} title={option.label}>
              <IconButton
                onClick={() => changePersonality(option.value)}
                sx={{
                  backgroundColor: aiPersonality === option.value ? getPersonalityColor(option.value) : 'grey.200',
                  color: aiPersonality === option.value ? 'white' : 'grey.700',
                  '&:hover': {
                    backgroundColor: aiPersonality === option.value ? getPersonalityColor(option.value) : 'grey.300',
                  }
                }}
              >
                {option.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Course Generation Progress */}
      {courseGenerationProgress.isGenerating && (
        <Card sx={{ p: 3, mb: 4, borderRadius: '16px', bgcolor: 'primary.light' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
            🚀 Generating Your Course
          </Typography>
          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={courseGenerationProgress.progress} 
              sx={{ 
                height: 10, 
                borderRadius: 5, 
                mb: 1,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white'
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
              <Typography variant="body2">
                {courseGenerationProgress.currentStep}
              </Typography>
              <Typography variant="body2">
                {Math.round(courseGenerationProgress.progress)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
            Estimated time: {courseGenerationProgress.estimatedTime}
          </Typography>
        </Card>
      )}

      {/* Course Info */}
      <Card sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Course Details
            </Typography>
            <Typography sx={{ mb: 2 }}>{course.description}</Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Instructor:</strong> {course.instructor_name || 'AI Instructor'}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Language:</strong> {course.language?.toUpperCase() || 'EN'}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Duration:</strong> {course.duration || '10 hours'}
            </Typography>
            <Typography>
              <strong>Level:</strong> {course.level || 'beginner'}
            </Typography>

            {/* Progress Overview */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Your Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(userProgress.completedModules.length / (course.levels?.reduce((total, level) => total + (level.modules?.length || 0), 0) || 1)) * 100} 
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Typography variant="body2">
                {userProgress.completedModules.length} of {course.levels?.reduce((total, level) => total + (level.modules?.length || 0), 0) || 0} modules completed
              </Typography>
              {certificateUnlocked && (
                <Button
                  variant="contained"
                  startIcon={<WorkspacePremium />}
                  onClick={generateCertificate}
                  sx={{ mt: 2, backgroundColor: '#FFD700', color: 'black', '&:hover': { backgroundColor: '#FFC400' } }}
                >
                  Get Certificate
                </Button>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Course Materials
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Button
                variant={isPlayingVideo ? "contained" : "outlined"}
                startIcon={<LiveTv />}
                onClick={toggleVideo}
                sx={{ borderRadius: '20px' }}
                disabled={courseGenerationProgress.isGenerating}
              >
                Video {course.video_count > 0 && `(${course.video_count})`}
              </Button>
              <Button
                variant={isViewingPdf ? "contained" : "outlined"}
                startIcon={<PictureAsPdf />}
                onClick={togglePdf}
                sx={{ borderRadius: '20px' }}
                disabled={courseGenerationProgress.isGenerating}
              >
                PDF {course.pdf_count > 0 && `(${course.pdf_count})`}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Quiz />}
                sx={{ borderRadius: '20px' }}
                disabled={courseGenerationProgress.isGenerating}
              >
                Quizzes {course.quiz_count > 0 && `(${course.quiz_count})`}
              </Button>
            </Box>

            {/* AI Generation Status */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: '8px' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                AI-Generated Content
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Videos:</Typography>
                <Chip 
                  label={course.video_count > 0 ? 'Ready' : 'Generating'} 
                  size="small" 
                  color={course.video_count > 0 ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">PDFs:</Typography>
                <Chip 
                  label={course.pdf_count > 0 ? 'Ready' : 'Generating'} 
                  size="small" 
                  color={course.pdf_count > 0 ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Quizzes:</Typography>
                <Chip 
                  label={course.quiz_count > 0 ? 'Ready' : 'Generating'} 
                  size="small" 
                  color={course.quiz_count > 0 ? 'success' : 'warning'}
                />
              </Box>
            </Box>

            {/* Course Levels */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Course Levels
              </Typography>
              <Stepper activeStep={currentLevel} orientation="vertical" sx={{ mb: 2 }}>
                {course.levels?.map((level, index) => (
                  <Step key={index} completed={isLevelCompleted(index)}>
                    <StepLabel 
                      onClick={() => navigateLevel(index)}
                      sx={{ cursor: 'pointer' }}
                      StepIconComponent={() => 
                        isLevelCompleted(index) ? (
                          <CheckCircle color="success" />
                        ) : index === currentLevel ? (
                          <School color="primary" />
                        ) : (
                          <LockOpen color="action" />
                        )
                      }
                    >
                      {level.title}
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2">{level.description}</Typography>
                      <Box sx={{ mb: 2, mt: 1 }}>
                        <Button
                          variant="contained"
                          onClick={() => navigateLevel(index)}
                          sx={{ mt: 1, mr: 1 }}
                          disabled={courseGenerationProgress.isGenerating}
                        >
                          {index === currentLevel ? 'Continue' : 'Start Level'}
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Rest of the component remains the same... */}
      {/* Level Navigation, Video Player, PDF Viewer, Quiz Results, Emotional Feedback, Chat Interface */}
      
      {/* Only show course content if generation is complete */}
      {!courseGenerationProgress.isGenerating && (
        <>
          {/* Level Navigation */}
          {course.levels && course.levels.length > 0 && (
            <Card sx={{ p: 2, mb: 4, borderRadius: '16px' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentLevel} onChange={(e, newValue) => navigateLevel(newValue)}>
                  {course.levels.map((level, index) => (
                    <Tab 
                      key={index} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {isLevelCompleted(index) ? (
                            <CheckCircle color="success" sx={{ mr: 1 }} />
                          ) : (
                            <School color={index === currentLevel ? "primary" : "action"} sx={{ mr: 1 }} />
                          )}
                          {level.title}
                        </Box>
                      } 
                      disabled={index > 0 && !isLevelCompleted(index - 1)}
                    />
                  ))}
                </Tabs>
              </Box>
              
              <TabPanel value={currentLevel} index={currentLevel}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {course.levels[currentLevel].title}
                </Typography>
                <Typography sx={{ mb: 3 }}>{course.levels[currentLevel].description}</Typography>
                
                {/* Modules for current level */}
                {course.levels[currentLevel].modules?.map((module, index) => (
                  <Accordion key={module.id} expanded={currentModule === index} onChange={() => setCurrentModule(index)}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {isModuleCompleted(module.id) ? (
                          <CheckCircle color="success" sx={{ mr: 2 }} />
                        ) : (
                          <Badge badgeContent={index + 1} color="primary" sx={{ mr: 2 }}>
                            <Article color="action" />
                          </Badge>
                        )}
                        <Typography sx={{ flex: 1 }}>{module.title}</Typography>
                        <Chip 
                          label={module.duration} 
                          size="small" 
                          variant="outlined" 
                          sx={{ mr: 1 }}
                        />
                        {module.video_path && (
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleVideo(); }}>
                            <VideoLibrary />
                          </IconButton>
                        )}
                        {module.pdf_path && (
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); togglePdf(); }}>
                            <PictureAsPdf />
                          </IconButton>
                        )}
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ mb: 2 }}>{module.description}</Typography>
                      
                      {/* Module content */}
                      {module.content && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Content:
                          </Typography>
                          <ReactMarkdown
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {module.content}
                          </ReactMarkdown>
                        </Box>
                      )}
                      
                      {/* Module actions */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                        <Button
                          variant="outlined"
                          startIcon={<Quiz />}
                          onClick={() => takeQuiz(module.id)}
                        >
                          Take Quiz
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Assignment />}
                          onClick={() => requestPractice(module.id)}
                        >
                          Practice Exercise
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<LiveTv />}
                          onClick={toggleVideo}
                        >
                          Watch Video
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<PictureAsPdf />}
                          onClick={togglePdf}
                        >
                          View PDF
                        </Button>
                        {isModuleCompleted(module.id) && (
                          <Chip icon={<CheckCircle />} label="Completed" color="success" variant="outlined" />
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </TabPanel>
            </Card>
          )}

          {/* Video Player */}
          {isPlayingVideo && (
            <Card sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Course Video
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', bgcolor: 'grey.100', borderRadius: '8px' }}>
                {course.levels?.[currentLevel]?.modules?.[currentModule]?.video_path ? (
                  <video 
                    ref={videoRef}
                    controls 
                    style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
                  >
                    <source src={course.levels[currentLevel].modules[currentModule].video_path} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <LiveTv sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      Video content is being generated by AI...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This may take a few minutes. The video will appear here when ready.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          )}

          {/* PDF Viewer */}
          {isViewingPdf && (
            <Card sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Course PDF
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px', bgcolor: 'grey.100', borderRadius: '8px' }}>
                {course.levels?.[currentLevel]?.modules?.[currentModule]?.pdf_path ? (
                  <iframe 
                    src={course.levels[currentLevel].modules[currentModule].pdf_path} 
                    width="100%" 
                    height="500px" 
                    style={{ border: 'none', borderRadius: '8px' }}
                    title="Course PDF"
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <PictureAsPdf sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      PDF content is being generated by AI...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This may take a few minutes. The PDF will appear here when ready.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          )}

          {/* Quiz Results */}
          {quizResults[currentModule] && (
            <Card sx={{ p: 3, mb: 4, borderRadius: '16px', bgcolor: quizResults[currentModule].passed ? 'success.light' : 'error.light' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quiz Results
              </Typography>
              <Typography>
                Score: {quizResults[currentModule].score}% - {quizResults[currentModule].passed ? 'Passed!' : 'Try Again'}
              </Typography>
              {quizResults[currentModule].feedback && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Feedback: {quizResults[currentModule].feedback}
                </Typography>
              )}
            </Card>
          )}

          {/* Emotional Feedback */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            p: 2, 
            bgcolor: emotionalFeedback.emotion === 'excited' ? 'success.light' : 
                     emotionalFeedback.emotion === 'frustrated' ? 'error.light' : 
                     emotionalFeedback.emotion === 'confused' ? 'warning.light' : 'grey.100',
            borderRadius: '16px'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <EmojiEmotions sx={{ mr: 1, color: getEmotionColor(emotionalFeedback.emotion) }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Student sentiment: 
              </Typography>
            </Box>
            <Chip 
              label={emotionalFeedback.emotion} 
              size="small"
              color={
                emotionalFeedback.emotion === 'excited' ? 'success' :
                emotionalFeedback.emotion === 'frustrated' ? 'error' : 
                emotionalFeedback.emotion === 'confused' ? 'warning' : 'default'
              }
            />
            <Box sx={{ ml: 2, flex: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={emotionalFeedback.intensity * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getEmotionColor(emotionalFeedback.emotion)
                  }
                }} 
              />
            </Box>
          </Box>

          {/* Chat Interface */}
          <Card sx={{ p: 3, borderRadius: '16px' }}>
            <Box sx={{ height: '400px', overflowY: 'auto', mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: '8px' }} className="chat-container">
              {messages.map((msg, index) => (
                <Box key={index} sx={{ 
                  mb: 2, 
                  textAlign: msg.sender === 'You' ? 'right' : 'left',
                  direction: language === 'ar' ? 'rtl' : 'ltr'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start', mb: 0.5 }}>
                    <Avatar sx={{ 
                      width: 24, 
                      height: 24, 
                      fontSize: '0.8rem',
                      bgcolor: msg.sender === 'You' ? '#FF007F' : '#3A3A72',
                      mr: msg.sender !== 'You' ? 1 : 0,
                      ml: msg.sender === 'You' ? 1 : 0
                    }}>
                      {msg.sender === 'You' ? 'Y' : 'AI'}
                    </Avatar>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {msg.sender} • {msg.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '12px', 
                    bgcolor: msg.sender === 'You' ? '#FF007F' : 'grey.200',
                    color: msg.sender === 'You' ? 'white' : 'text.primary',
                    display: 'inline-block',
                    maxWidth: '70%'
                  }}>
                    {msg.sender === 'AI' ? (
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      <Typography>{msg.text}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
              {isTyping && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem', bgcolor: '#3A3A72', mr: 1 }}>
                    AI
                  </Avatar>
                  <Box sx={{ display: 'flex', gap: 0.5, mr: 1 }}>
                    <Box sx={{ width: 6, height: 6, bgcolor: 'grey.400', borderRadius: '50%', animation: 'typing 1.4s infinite' }} />
                    <Box sx={{ width: 6, height: 6, bgcolor: 'grey.400', borderRadius: '50%', animation: 'typing 1.4s infinite 0.2s' }} />
                    <Box sx={{ width: 6, height: 6, bgcolor: 'grey.400', borderRadius: '50%', animation: 'typing 1.4s infinite 0.4s' }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    AI is thinking...
                  </Typography>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Quick Actions */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Quick Actions:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    startIcon={action.icon}
                    onClick={() => sendQuickAction(action.message)}
                    disabled={!isConnected}
                    sx={{ borderRadius: '20px' }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Input Area */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or question..."
                disabled={!isConnected}
                size="small"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || !isConnected}
                  sx={{ minWidth: 'auto', height: '40px' }}
                >
                  <Send />
                </Button>
                <Button
                  variant="contained"
                  color={isRecording ? 'error' : 'primary'}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={!isConnected}
                  sx={{ minWidth: 'auto', height: '40px' }}
                >
                  {isRecording ? <Stop /> : <Mic />}
                </Button>
              </Box>
            </Box>

            {/* Status */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: isConnected ? 'success.main' : 'error.main',
                  mr: 1 
                }} />
                <Typography variant="body2" color={isConnected ? 'success.main' : 'error.main'}>
                  {isConnected ? 'Connected to AI Instructor' : 'Disconnected'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Messages: {sessionStats.messagesSent} • Questions: {sessionStats.questionsAsked}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Download />}
                onClick={exportChat}
              >
                Export Chat
              </Button>
            </Box>
          </Card>
        </>
      )}

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onClose={() => setShowCertificate(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
            Certificate of Completion
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 4, textAlign: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', borderRadius: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#2A2A52' }}>
              {course.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              This certifies that
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#FF007F' }}>
              User Name
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              has successfully completed the course
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              {new Date().toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Box>
                <Typography variant="body2">AI Instructor</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{course.instructor_name}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Certificate ID</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{`CERT-${course.id.slice(0, 8).toUpperCase()}`}</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCertificate(false)}>Close</Button>
          <Button variant="contained" onClick={() => window.print()}>Print Certificate</Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', md: 'none' }
        }}
        onClick={() => {
          const chatContainer = document.querySelector('.chat-container');
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }}
      >
        <Chat />
      </Fab>
    </Box>
  );
};

// Course List Component
const CourseListView = ({ courses, onCourseSelect, error, onRetry, onGenerateCourse, language }) => {
  const [newCourseTopic, setNewCourseTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');

  const handleGenerateCourse = () => {
    if (newCourseTopic.trim()) {
      setGenerating(true);
      onGenerateCourse(newCourseTopic.trim());
      setNewCourseTopic('');
      setTimeout(() => setGenerating(false), 3000);
    }
  };

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesLanguage = filterLanguage === 'all' || course.language === filterLanguage;
    
    return matchesSearch && matchesLevel && matchesLanguage;
  });

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load courses from server. Using sample data.
        </Alert>
        <Button 
          variant="contained" 
          onClick={onRetry}
          sx={{
            backgroundColor: '#FF007F',
            '&:hover': { backgroundColor: '#D6006A' }
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" sx={{ 
          fontWeight: 800,
          mb: 2,
          background: 'linear-gradient(90deg, #FF007F 0%, #3A3A72 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          AI Course Generator
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Create personalized courses with AI-powered content generation
        </Typography>
      </Box>

      {/* Generate New Course */}
      <Card sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          🚀 Generate New Course
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            value={newCourseTopic}
            onChange={(e) => setNewCourseTopic(e.target.value)}
            placeholder="Enter any topic (e.g., Python Programming, Digital Marketing, Machine Learning, Spanish for Beginners)"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerateCourse()}
            disabled={generating}
            sx={{ flex: 1, minWidth: '300px' }}
          />
          <Button
            variant="contained"
            onClick={handleGenerateCourse}
            disabled={!newCourseTopic.trim() || generating}
            sx={{
              backgroundColor: '#FF007F',
              '&:hover': { backgroundColor: '#D6006A' },
              whiteSpace: 'nowrap',
              minWidth: '140px'
            }}
            startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <Add />}
          >
            {generating ? 'Generating...' : 'Generate Course'}
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Our AI will create a comprehensive course with videos, PDFs, quizzes, and practice exercises in 2-5 minutes.
        </Typography>
      </Card>

      {/* Search and Filters */}
      <Card sx={{ p: 2, mb: 4, borderRadius: '16px' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: '200px' }}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              label="Level"
            >
              <MenuItem value="all">All Levels</MenuItem>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              label="Language"
            >
              <MenuItem value="all">All Languages</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">Arabic</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => {
              setSearchTerm('');
              setFilterLevel('all');
              setFilterLanguage('all');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Card>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No courses found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or generate a new course
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredCourses.map(course => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card sx={{ 
                p: 3,
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                },
                cursor: 'pointer',
                position: 'relative'
              }} onClick={() => onCourseSelect(course)}>
                {/* AI Generation Badge */}
                {course.status === 'generating' && (
                  <Chip 
                    label="Generating..." 
                    color="warning" 
                    size="small"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                )}
                
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2A2A52' }}>
                      {course.title}
                    </Typography>
                    <Chip 
                      label={course.level} 
                      size="small"
                      sx={{
                        backgroundColor: course.level === 'beginner' ? '#28a745' : 
                                        course.level === 'intermediate' ? '#ffc107' : '#dc3545',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {course.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Instructor: {course.instructor_name || 'AI Instructor'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Language: {course.language?.toUpperCase() || 'EN'}
                    </Typography>
                    <Typography variant="body2">
                      Duration: {course.duration || '10 hours'}
                    </Typography>
                  </Box>

                  {/* Course Stats */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                    <Chip 
                      icon={<VideoLibrary />} 
                      label={`${course.video_count || 0} videos`} 
                      size="small" 
                      variant="outlined" 
                    />
                    <Chip 
                      icon={<PictureAsPdf />} 
                      label={`${course.pdf_count || 0} PDFs`} 
                      size="small" 
                      variant="outlined" 
                    />
                    <Chip 
                      icon={<Quiz />} 
                      label={`${course.quiz_count || 0} quizzes`} 
                      size="small" 
                      variant="outlined" 
                    />
                  </Box>

                  {course.levels && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Levels:
                      </Typography>
                      {course.levels.slice(0, 3).map(level => (
                        <Typography key={level.title} variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
                          • {level.title} ({level.modules?.length || 0} modules)
                        </Typography>
                      ))}
                      {course.levels.length > 3 && (
                        <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                          • and {course.levels.length - 3} more levels...
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#FF007F',
                      '&:hover': { backgroundColor: '#D6006A' },
                      py: 1.5,
                      fontWeight: 600
                    }}
                    disabled={course.status === 'generating'}
                  >
                    {course.status === 'generating' ? 'Course Generating...' : 'Start Learning'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

// Main Component remains the same...
const LiveAICourses = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_BASE = window._env_?.REACT_APP_API_URL || 'http://localhost:8000';
      console.log("Fetching courses from:", `${API_BASE}/api/courses`);
      
      const response = await fetch(`${API_BASE}/api/courses`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Courses fetched:", data.courses?.length || 0);
      setCourses(data.courses || []);
      
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message);
      setSnackbar({
        open: true,
        message: 'Failed to load courses. Using sample data instead.',
        severity: 'warning'
      });
      
      // Enhanced sample data with AI generation features
      setCourses([
        {
          id: "1",
          title: "Machine Learning Fundamentals",
          description: "Learn the core concepts of machine learning from scratch with practical examples and real-world applications.",
          instructor_name: "Dr. Alex Johnson",
          language: "en",
          duration: "12 hours",
          level: "beginner",
          video_count: 8,
          pdf_count: 6,
          quiz_count: 12,
          status: "ready",
          levels: [
            {
              title: "Level 1: Basics",
              description: "Introduction to machine learning concepts and terminology",
              modules: [
                { id: "1", title: "Introduction to ML", duration: "1 hour", description: "Learn what machine learning is and its applications" },
                { id: "2", title: "Data Preprocessing", duration: "2 hours", description: "How to prepare data for machine learning" },
                { id: "3", title: "Supervised Learning", duration: "3 hours", description: "Understanding supervised learning algorithms" }
              ]
            },
            {
              title: "Level 2: Intermediate",
              description: "Dive deeper into algorithms and model evaluation",
              modules: [
                { id: "4", title: "Model Evaluation", duration: "2 hours", description: "How to evaluate machine learning models" },
                { id: "5", title: "Unsupervised Learning", duration: "3 hours", description: "Understanding unsupervised learning algorithms" },
                { id: "6", title: "Neural Networks", duration: "3 hours", description: "Introduction to neural networks" }
              ]
            }
          ]
        },
        {
          id: "2",
          title: "Digital Marketing Mastery",
          description: "Comprehensive guide to digital marketing strategies, SEO, social media, and analytics.",
          instructor_name: "Marketing AI",
          language: "en",
          duration: "8 hours",
          level: "intermediate",
          video_count: 0,
          pdf_count: 0,
          quiz_count: 0,
          status: "generating",
          levels: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateNewCourse = async (topic) => {
    try {
      setLoading(true);
      const API_BASE = window._env_?.REACT_APP_API_URL || 'http://localhost:8000';
      
      console.log("Generating course for topic:", topic);
      console.log("API URL:", `${API_BASE}/api/courses/generate`);
      
      const response = await fetch(`${API_BASE}/api/courses/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          language: language,
          level: 'beginner' // Default level, can be made configurable
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const newCourse = await response.json();
      console.log("Course generated successfully:", newCourse);
      
      // Add the new course to the list with generating status
      const courseWithStatus = {
        ...newCourse,
        status: 'generating',
        video_count: 0,
        pdf_count: 0,
        quiz_count: 0
      };
      
      setCourses(prev => [courseWithStatus, ...prev]);
      setSnackbar({
        open: true,
        message: `New course "${newCourse.title}" is being generated!`,
        severity: 'success'
      });
    } catch (err) {
      console.error('Error generating course:', err);
      setSnackbar({
        open: true,
        message: `Failed to generate course: ${err.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
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

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(175deg, #F8FAFF 0%, #FFFFFF 100%)'
      }}>
        <CircularProgress sx={{ color: '#FF007F' }} />
      </Box>
    );
  }

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
        p: 0,
        zIndex: 1200,
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        flexDirection: language === 'ar' ? 'row-reverse' : 'row'
      }}>
        <Box sx={{ width: "120px" }}>
          <img 
            src="/images/gg.png" 
            alt="Company Logo" 
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
              alt="Company Logo" 
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
                      fontSize: '1.1rem'
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
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
              label="Language"
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
                  English
                </Box>
              </MenuItem>
              <MenuItem value="de">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Language sx={{ mr: 1 }} />
                  Deutsch
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
        {selectedCourse ? (
          <LiveAICourseView 
            course={selectedCourse} 
            onBack={() => setSelectedCourse(null)}
            language={language}
          />
        ) : (
          <CourseListView 
            courses={courses}
            onCourseSelect={setSelectedCourse}
            error={error}
            onRetry={fetchCourses}
            onGenerateCourse={generateNewCourse}
            language={language}
          />
        )}
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

export default LiveAICourses;