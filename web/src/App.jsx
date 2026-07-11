import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { LanguageProvider } from "./pages/translations/LanguageContext";
import { useEffect } from "react";

import Hero from "./components/hero/Hero";
import Home from "./pages/Home";
import DesignStudio from "./pages/DesignStudio";
import StartDesign from "./pages/startdesign";
import AuthModal from "./pages/AuthModal";
import { AuthProvider } from "./pages/AuthContext";
import MarketingServices from "./pages/MarketingServices";
import CheckoutPage from "./pages/CheckoutPage";
import ProfessionalDesign from "./pages/ProfessionalDesign";
import Messages from "./pages/Messages";
import ContactUs from "./pages/ContactUs";
// Import the new AI Instructor component
import LiveAICourses from "./pages/LiveAICourses";

function App() {
  const [theme, colorMode] = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    document.documentElement.dir = theme.direction || 'ltr';
  }, [theme.direction]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <AuthProvider>
            <CssBaseline />
            <BrowserRouter>
              <Box 
                bgcolor={theme.palette.bg.main}
                sx={{
                  minHeight: '100vh',
                  direction: theme.direction
                }}
              >
                <Routes>
                  <Route path="/" element={<Hero isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/home" element={<Home isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/DesignStudio" element={<DesignStudio isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/start-design" element={<StartDesign isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/auth" element={<AuthModal isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/designs" element={<Designs isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/request-consultation" element={<RequestConsultation isMobile={isMobile} isTablet={isTablet} />} />
                  <Route path="/marketing" element={<MarketingServices />} />
                  <Route path="/Checkout" element={<CheckoutPage />} />
                  <Route path="/professional-design" element={<ProfessionalDesign />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/entrepreneur" element={<BecomeEntrepreneur />} />
                  <Route path="/process" element={<OurProcess />} />
                  <Route path="/contact" element={<ContactUs />} />
                  {/* NEW ROUTE FOR AI INSTRUCTOR COURSES */}
                  <Route path="/Live_Courses" element={<LiveAICourses isMobile={isMobile} isTablet={isTablet} />} />
                  {/* Add a catch-all route for 404 pages */}
                  <Route path="*" element={<div>Page not found</div>} />
                </Routes>
              </Box>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;