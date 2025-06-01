import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayoutShell from './components/DashboardLayout';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Members from './components/Members';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardLayoutShell/>}>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route path="/task1" element={<Tasks/>} />
      <Route path="Members" element={<Members />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
