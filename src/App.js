// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SpendingForm from './SpendingForm';
import AnalyticsPage from './AnalyticsPage';
import categoriesData from './spending-category.json';
import { Box, Container, Tabs, Tab, Typography, Paper } from '@mui/material';

function LinkTab(props) {
  // Tab ที่เมื่อคลิกจะเปลี่ยน route โดยใช้ useNavigate
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
  // กำหนดค่า index ของ tab ตาม path
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
                  {/* <Dashboard /> */}
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




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import SpendingForm from './SpendingForm';
// import Dashboard from './Dashboard';
// import AnalyticsPage from './AnalyticsPage';
// import categoriesData from './spending-category.json';

// function App() {
//   React.useEffect(() => {
//     const existing = localStorage.getItem('spending-categories');
//     if (!existing) {
//       localStorage.setItem('spending-categories', JSON.stringify(categoriesData));
//     }
//   }, []);

//   const navClass = ({ isActive }) =>
//     isActive
//       ? 'bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transition font-medium'
//       : 'bg-white text-blue-600 px-6 py-3 rounded-full border border-blue-300 hover:bg-blue-50 transition font-medium';

//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 font-sans">
//         <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//           <nav className="flex justify-center gap-8 mb-10 bg-blue-100 py-5 px-8 rounded-xl shadow-inner">
//             <NavLink to="/" className={navClass}>
//               <span role="img" aria-label="tracker">🧾</span> Add
//             </NavLink>
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <NavLink to="/analytics" className={navClass}>
//               <span role="img" aria-label="chart">📊</span> Dashboard
//             </NavLink>
//           </nav>

//           <Routes>
//             <Route path="/" element={<>
//               <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">Spending Tracker 💸</h1>
//               <SpendingForm />
//               <hr className="my-8 border-gray-300" />
//               <Dashboard />
//             </>} />
//             <Route path="/analytics" element={<AnalyticsPage />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React, { useEffect } from 'react';
// import SpendingForm from './SpendingForm';
// import Dashboard from './Dashboard';
// import categoriesData from './spending-category.json';

// function App() {
//   useEffect(() => {
//     const existing = localStorage.getItem('spending-categories');
//     if (!existing) {
//       localStorage.setItem('spending-categories', JSON.stringify(categoriesData));
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 font-sans">
//       <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Spending Tracker 💸</h1>
//         <SpendingForm />
//         <hr className="my-6 border-gray-300" />
//         <Dashboard />
//       </div>
//     </div>
//   );
// }

// export default App;
