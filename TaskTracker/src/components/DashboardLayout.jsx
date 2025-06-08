import React, { Children } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import TaskIcon from '@mui/icons-material/Task';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import Home from './Home';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'tasks', title: 'Tasks', icon: <TaskIcon /> },
  { segment: 'members', title: 'Members', icon: <GroupIcon /> },
  { kind: 'divider' },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
});

export default function DashboardLayoutShell() {
  const navigate = useNavigate();

  const handleNavigation = (pathname) => {
    if (pathname === '/logout' || pathname === '/admin/logout') {
      navigate('/login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider 
        navigation={NAVIGATION}
        onNavigate={handleNavigation}
        branding={{
          logo: <img src="./images/dashh.png" style={{width:20, height:20}}></img>,
          title: 'DASHBOARD',
          homeUrl: '/admin',
        }}
      >
        <DashboardLayout
          slotProps={{
            header: {
              branding: (
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2196f3' }}>
                  Dashboard
                </span>
              ),
            },
          }}
        >
          <Box sx={{ p: 4 }}>
            <Outlet />
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
} 