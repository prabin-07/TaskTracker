import React, { Children } from 'react';
import { Outlet } from 'react-router-dom';
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
import Home from './Home';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'tasks', title: 'Tasks', icon: <TaskIcon /> ,
    children: [
      { segment: '', title: 'Task 1', icon: <TaskIcon /> },
      { segment: '', title: 'Task 2', icon: <TaskIcon /> },
      { segment: '', title: 'Task 3', icon: <TaskIcon /> },
    ]
  },
  { segment: 'Members', title: 'Members', icon: <GroupIcon />,
    // children:[
    //   {segment: 'member1', title: 'member1' , icon: <GroupIcon />},
    //   {segment: 'member2', title: 'member2' , icon: <GroupIcon />},      
    // ]
  },
  { kind: 'divider' },
  { kind: 'header', title: 'All Projects' },
  {segment: 'project1', title: 'Project 1', icon: <LayersIcon /> },
  //   //add project db
  //   { segment: 'reports',
  //   title: 'Reports',
  //   icon: <BarChartIcon />,
  //   children: [
  //     { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
  //     { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
  //   ],
  // },
  // { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
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
  return (
    
    <ThemeProvider theme={theme}>
      <AppProvider navigation={NAVIGATION}
      branding={{
    logo: <img src="./images/dashh.png" style={{width:20, height:20}}></img>,
    title: 'DASHBOARD',
    homeUrl: '/Dashboard',}}
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