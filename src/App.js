// App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SpendingForm from './SpendingForm';
import AnalyticsPage from './AnalyticsPage';
import categoriesData from './spending-category.json';
import { Box, Container, Tabs, Tab, Typography, Paper } from '@mui/material';

function LinkTab(props) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(props.href);
  };

  return (
    <Tab
      component="a"
      onClick={handleClick}
      {...props}
    />
  );
}

function NavTabs() {
  const location = useLocation();
  const currentTab = location.pathname === '/analytics' ? 1 : 0;

  return (
    <Tabs
      value={currentTab}
      centered
      textColor="primary"
      indicatorColor="primary"
      sx={{ mb: 4 }}
    >
      <LinkTab label="🧾 Add" href="/" />
      <LinkTab label="📊 Dashboard" href="/analytics" />
    </Tabs>
  );
}

function App() {
  React.useEffect(() => {
    const existing = localStorage.getItem('spending-categories');
    if (!existing) {
      localStorage.setItem('spending-categories', JSON.stringify(categoriesData));
    }
  }, []);

  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          pt: 6,
          pb: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
            <NavTabs />

            <Routes>
              <Route path="/" element={
                <>
                  <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Add spending 
                  </Typography>
                  <SpendingForm />
                  <Box my={4} borderBottom={1} borderColor="divider" />
                </>
              } />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </Paper>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
