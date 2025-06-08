import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayoutShell from './components/DashboardLayout';
import TeamMemberLayout from './components/TeamMemberLayout';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Members from './components/Members';
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Navigate to="/login" replace />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/Members" element={<Navigate to="/admin/members" replace />} />
      <Route path="/Tasks" element={<Navigate to="/admin/tasks" replace />} />
      
      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<DashboardLayoutShell/>}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/admin/tasks" element={<Tasks/>} />
        <Route path="/admin/members" element={<Members />} />
      </Route>

      {/* Team Member Dashboard Routes */}
      <Route path="/team-member" element={<TeamMemberLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/team-member/tasks" element={<Tasks/>} />
      </Route>

      <Route path="/tasks" element={<Navigate to="team-member/tasks" replace />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
