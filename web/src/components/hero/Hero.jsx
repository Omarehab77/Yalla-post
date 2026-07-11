import React, { useEffect, useContext, useState } from "react";
import { Box, Typography, Button, Container, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { LanguageContext } from "../../pages/translations/LanguageContext";

const Hero = ({ isMobile, isTablet }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const { t, language, direction } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Content management themed shapes with continuous animations
  const contentShapes = [
    {
      icon: "📚",
      size: 90,
      color: "rgba(255, 0, 127, 0.3)",
      position: { top: "15%", left: "10%" },
      animation: {
        y: [0, -25, 0],
        rotate: [-5, 5, -5],
        transition: { 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop" 
        }
      }
    },
    {
      icon: "📤",
      size: 80,
      color: "rgba(100, 200, 255, 0.3)",
      position: { top: "5%", right: "15%" },
      animation: {
        y: [0, -15, 0],
        scale: [1, 1.1, 1],
        transition: { 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }
      }
    },
    {
      icon: "📊",
      size: 100,
      color: "rgba(221, 182, 242, 0.35)",
      position: { bottom: "20%", left: "5%" },
      animation: {
        y: [0, 20, 0],
        rotate: [0, 5, 0],
        transition: { 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }
      }
    },
    {
      icon: "📅",
      size: 85,
      color: "rgba(255, 200, 100, 0.3)",
      position: { bottom: "10%", right: "10%" },
      animation: {
        y: [0, 15, 0],
        transition: { 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }
      }
    },
    {
      icon: "🖼️",
      size: 75,
      color: "rgba(100, 255, 200, 0.3)",
      position: { top: "25%", right: "5%" },
      animation: {
        y: [0, -20, 0],
        rotate: [0, 10, 0],
        transition: { 
          duration: 9, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }
      }
    },
    {
      icon: "⚙️",
      size: 70,
      color: "rgba(150, 150, 255, 0.3)",
      position: { bottom: "30%", right: "20%" },
      animation: {
        rotate: [0, 360],
        transition: { 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }
      }
    },
    {
      icon: "🔗",
      size: 65,
      color: "rgba(255, 150, 150, 0.3)",
      position: { top: "40%", left: "20%" },
      animation: {
        y: [0, -15, 0],
        scale: [1, 1.2, 1],
        transition: { 
          duration: 5.5, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }
      }
    }
  ];

  // Enhanced background elements with extremely strong colors
  const bgElements = [
    {
      type: "blob",
      size: 350,
      color: "rgba(255, 200, 100, 0.25)",
      position: { top: "10%", left: "5%" },
      animation: {
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      type: "blob",
      size: 250,
      color: "rgba(100, 200, 255, 0.25)",
      position: { bottom: "15%", right: "10%" },
      animation: {
        x: [0, -40, 0],
        y: [0, -20, 0],
        scale: [1, 0.9, 1],
        transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      type: "triangle",
      size: 150,
      color: "rgba(221, 182, 242, 0.25)",
      position: { top: "30%", right: "20%" },
      animation: {
        rotate: [0, 180, 360],
        transition: { duration: 20, repeat: Infinity, ease: "linear" }
      }
    },
    {
      type: "hexagon",
      size: 100,
      color: "rgba(255, 100, 150, 0.25)",
      position: { bottom: "30%", left: "20%" },
      animation: {
        y: [0, 20, 0],
        transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      type: "diamond",
      size: 80,
      color: "rgba(100, 255, 200, 0.25)",
      position: { top: "60%", left: "15%" },
      animation: {
        rotate: [0, 45, 90, 135, 180],
        transition: { duration: 16, repeat: Infinity, ease: "linear" }
      }
    },
    {
      type: "pentagon",
      size: 90,
      color: "rgba(200, 150, 255, 0.25)",
      position: { top: "20%", left: "70%" },
      animation: {
        y: [0, -15, 0],
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
      }
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      type: "particle",
      size: 10 + Math.random() * 15,
      color: `hsla(${Math.floor(Math.random() * 360)}, 100%, 70%, ${0.7 + Math.random() * 0.25})`,
      position: { 
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      },
      animation: {
        x: [0, (Math.random() - 0.5) * 100],
        y: [0, (Math.random() - 0.5) * 50],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration: 10 + Math.random() * 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    })),
    {
      type: "line",
      points: ["15% 25%", "25% 35%", "20% 55%"],
      color: "rgba(255, 0, 127, 0.3)",
      width: 5,
      animation: {
        pathOffset: [0, 1, 0],
        transition: { duration: 8, repeat: Infinity, ease: "linear" }
      }
    },
    {
      type: "line",
      points: ["70% 15%", "85% 25%", "80% 45%"],
      color: "rgba(221, 182, 242, 0.3)",
      width: 5,
      animation: {
        pathOffset: [1, 0, 1],
        transition: { duration: 10, repeat: Infinity, ease: "linear" }
      }
    },
    {
      type: "line",
      points: ["40% 70%", "50% 80%", "45% 90%"],
      color: "rgba(100, 200, 255, 0.3)",
      width: 5,
      animation: {
        pathOffset: [0, 1, 0],
        transition: { duration: 12, repeat: Infinity, ease: "linear" }
      }
    }
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `
          linear-gradient(175deg, #F8FAFF 0%, #FFFFFF 100%),
          radial-gradient(circle at 70% 30%, rgba(255, 0, 127, 0.25) 0%, transparent 30%),
          radial-gradient(circle at 30% 70%, rgba(221, 182, 242, 0.25) 0%, transparent 30%),
          radial-gradient(circle at center, rgba(100, 200, 255, 0.2) 0%, transparent 50%),
          linear-gradient(45deg, transparent 65%, rgba(255,200,100,0.15) 66%, transparent 67%),
          linear-gradient(-45deg, transparent 65%, rgba(200,150,255,0.15) 66%, transparent 67%)
        `,
        backgroundSize: "40px 40px",
        position: "relative",
        overflow: "hidden",
        direction: direction
      }}
    >
      {/* Video Demo Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="demo-video-modal"
        aria-describedby="demo-video-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '95vw', md: '900px' },
            height: { xs: '60vh', md: '600px' },
            maxWidth: '95vw',
            maxHeight: '95vh',
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
            p: 0,
            outline: 'none',
            overflow: 'hidden',
          }}
        >
          <Box
            component="video"
            autoPlay
            controls
            loop
            muted
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            <source src="/images/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
              zIndex: 1,
            }}
          >
            ✕
          </Button>
        </Box>
      </Modal>

      {/* Animated background elements */}
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
                filter: "blur(1px)"
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
            element.type === "diamond" ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" :
            element.type === "pentagon" ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" :
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
                filter: "blur(3px)",
                borderRadius: element.type === "blob" ? "50%" : "none"
              }}
            />
          );
        }
      })}

      {/* Header */}
      <Box
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          position: "relative",
          zIndex: 10,
          flexDirection: direction === 'rtl' ? 'row-reverse' : 'row'
        }}
      >
        <Box sx={{ width: "120px" }}>
          <img 
            src="/images/gg.png" 
            alt="Logo" 
            style={{ 
              width: "100%", 
              height: "auto",
              transform: 'none',
            }}
          />
        </Box>
        <Box>
          <Button 
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{
              borderRadius: "12px",
              border: "2px solid #3A3A72",
              color: "#3A3A72",
              fontWeight: 700,
              px: 3,
              py: 1,
              mr: direction === 'rtl' ? 0 : 2,
              ml: direction === 'rtl' ? 2 : 0,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#3A3A72",
                color: "white",
                transform: "translateY(-2px)",
              }
            }}
          >
            {/* {t('signIn')} */}
          </Button>
          <Button 
            variant="contained"
            onClick={() => navigate("/home")}  
            sx={{
              borderRadius: "12px",
              backgroundColor: "#FF007F",
              color: "white",
              fontWeight: 700,
              px: 3,
              py: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#E0006F",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(255, 0, 127, 0.4)",
              }
            }}
          >
            {t('getStarted')}
          </Button>
        </Box>
      </Box>

      {/* Main content area */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flex: 1,
          position: "relative",
          zIndex: 1,
          py: 0,
          px: { xs: 2, md: 4 },
          overflow: "hidden",
        }}
      >
        <Box
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: direction === 'rtl' ? 'row-reverse' : 'row' },
            alignItems: "center",
            width: "100%",
            gap: { xs: 2, lg: 4 },
          }}
        >
          {/* Left text content */}
          <Box
            component={motion.div}
            variants={fadeInUp}
            sx={{
              flex: 1,
              textAlign: { xs: "center", lg: direction === 'rtl' ? 'right' : 'left' },
              alignSelf: "center",
              pt: { xs: 0, lg: 2 },
              pl: { lg: direction === 'rtl' ? 0 : 2 },
              pr: { lg: direction === 'rtl' ? 2 : 0 }
            }}
          >
            <Typography
              component={motion.div}
              variants={fadeInUp}
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
                fontWeight: 900,
                color: "#2A2A52",
                mb: 2,
                lineHeight: 1.1,
                textAlign: { xs: "center", lg: direction === 'rtl' ? 'right' : 'left' },
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: "#FF007F",
                  display: "inline-block",
                }}
              >
                {t('unify')}
              </Box>{" "}
              {t('yourDigitalAssets')} <Box component="br" sx={{ display: { xs: "none", lg: "block" } }} />
              <Box 
                component="span" 
                sx={{ 
                  background: "linear-gradient(45deg, #FF007F, #DDB6F2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {t('enterpriseControl')}
              </Box>
            </Typography>

            <Typography
              component={motion.div}
              variants={fadeInUp}
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                fontWeight: 400,
                color: "#5A5A8A",
                mb: 3,
                maxWidth: "600px",
                lineHeight: 1.5,
                mx: { xs: "auto", lg: 0 },
                textAlign: { xs: "center", lg: direction === 'rtl' ? 'right' : 'left' },
              }}
            >
              {t('heroDescription')}
            </Typography>

            <Box
              component={motion.div}
              variants={fadeInUp}
              sx={{ 
                display: "flex", 
                gap: 2,
                justifyContent: { xs: "center", lg: direction === 'rtl' ? 'flex-end' : 'flex-start' },
                mb: 4,
                flexDirection: direction === 'rtl' ? 'row-reverse' : 'row'
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/home")}  
                size="large"
                sx={{
                  px: 3,
                  py: 1,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  background: "linear-gradient(45deg, #FF007F 0%, #DDB6F2 100%)",
                  color: "white",
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(255, 0, 127, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 25px rgba(255, 0, 127, 0.5)",
                  },
                }}
              >
                {t('startFreeTrial')}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleOpen}
                size="large"
                sx={{
                  px: 3,
                  py: 1,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  border: "2px solid #3A3A72",
                  color: "#3A3A72",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(58, 58, 114, 0.05)",
                    border: "2px solid #3A3A72",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {t('watchDemo')}
              </Button>
            </Box>
          </Box>

          {/* Right side - Animated content ecosystem */}
          <Box
            component={motion.div}
            variants={fadeInUp}
            sx={{
              flex: 1,
              position: "relative",
              minHeight: { xs: "300px", lg: "500px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Animated content shapes with continuous loops */}
            {contentShapes.map((shape, index) => (
              <Box
                key={index}
                component={motion.div}
                initial={{ opacity: 1, ...shape.position }}
                animate={shape.animation}
                sx={{
                  position: "absolute",
                  width: shape.size * 0.9,
                  height: shape.size * 0.9,
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${shape.size * 0.45}px`,
                  background: shape.color,
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
                  zIndex: 2,
                }}
              >
                {shape.icon}
              </Box>
            ))}

            {/* Central hub element with continuous pulse */}
            <Box
              component={motion.div}
              initial={{ scale: 1 }}
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0px rgba(255, 0, 127, 0.4)",
                  "0 0 0 15px rgba(255, 0, 127, 0)",
                  "0 0 0 0px rgba(255, 0, 127, 0.4)"
                ]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Infinity }
              }}
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #FF007F, #DDB6F2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                color: "white",
                zIndex: 3,
              }}
            >
              ✨
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Global styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        body {
          overflow: hidden;
        }
      `}</style>
    </Box>
  );
};

export default Hero;