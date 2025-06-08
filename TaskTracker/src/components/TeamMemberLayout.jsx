import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Define navigation items for Team Member section
const NAVIGATION = [
  { kind: 'header', title: 'Team Member' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'assigned-tasks', title: 'My Tasks', icon: <TaskIcon /> },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

// Custom Material-UI theme with light/dark modes
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    light: {
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#f0f2f5',
        paper: '#ffffff',
      },
      text: {
        primary: '#333',
        secondary: '#666',
      },
    },
    dark: {
      primary: {
        main: '#42a5f5',
      },
      background: {
        default: '#1e1e1e',
        paper: '#2d2d2d',
      },
      text: {
        primary: '#ffffff',
        secondary: '#bbbbbb',
      },
    },
  },
});

const TeamMemberLayout = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const handleNavigation = (pathname) => {
    if (pathname === '/logout') {
      navigate('/login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src="./images/dashh.png" style={{ width: 20, height: 20 }} alt="Dashboard Logo" />,
          title: 'TEAM MEMBER',
        }}
        onNavigate={handleNavigation}
      >
        <DashboardLayout
          slotProps={{
            header: {
              branding: (
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2196f3' }}>
                  Team Member Dashboard
                </span>
              ),
            },
          }}
        >
          <Box sx={{ p: 4 }}>
            <Outlet context={{ user }} />
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default TeamMemberLayout;