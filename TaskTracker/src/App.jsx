import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayoutShell from './components/DashboardLayout';
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
      <Route path="/" element={<DashboardLayoutShell/>}>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route path="/Tasks" element={<Tasks/>} />
      <Route path="Members" element={<Members />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
