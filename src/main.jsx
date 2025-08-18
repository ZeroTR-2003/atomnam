import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Pages
import ScrollIntro from './pages/ScrollIntro';
import HomePage from './pages/Home';
import Timeline from './pages/Timeline';
import Quiz from './pages/QuizPage';
import Simulator from './pages/SimulatorPage';
import ComparePage from './pages/ComparePage';
import Deposits from './pages/DepositsPage';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScrollIntro />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/deposits" element={<Deposits />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
