import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import DecisionHub from './components/Overlay/DecisionHub';
import DecisionHubPickle from './components/Overlay/DecisionHubPickle';
import MinimalOverlay from './components/Overlay/MinimalOverlay';
import FocusOverlay from './components/Overlay/FocusOverlay';
import DashboardOverlay from './components/Overlay/DashboardOverlay';
import AnalyticsOverlay from './components/Overlay/AnalyticsOverlay';
import CollaborationOverlay from './components/Overlay/CollaborationOverlay';
import MeetingOverlay from './components/Overlay/MeetingOverlay';
import QuickOverlay from './components/Overlay/QuickOverlay';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/overlay" element={
          <div style={{
            width: '100vw',
            height: '100vh',
            background: `
              linear-gradient(45deg, #FF6B6B, #4ECDC4),
              linear-gradient(135deg, #45B7D1, #96CEB4),
              linear-gradient(225deg, #FFECD2, #FCB69F),
              radial-gradient(circle at 20% 80%, #667eea 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #f093fb 0%, transparent 50%)
            `,
            backgroundSize: '400% 400%, 300% 300%, 200% 200%, 150% 150%, 120% 120%',
            animation: 'gradientShift 15s ease infinite',
            position: 'relative'
          }}>
            <style>
              {`
                @keyframes gradientShift {
                  0%, 100% {
                    background-position: 0% 50%, 0% 50%, 0% 50%, 0% 0%, 100% 100%;
                  }
                  25% {
                    background-position: 100% 50%, 25% 75%, 50% 0%, 50% 50%, 0% 0%;
                  }
                  50% {
                    background-position: 50% 100%, 75% 25%, 100% 50%, 100% 100%, 50% 50%;
                  }
                  75% {
                    background-position: 0% 0%, 50% 100%, 25% 75%, 0% 50%, 100% 0%;
                  }
                }
              `}
            </style>
            <DecisionHubPickle />
          </div>
        } />
        <Route path="/overlay-old" element={<DecisionHub />} />
        <Route path="/overlay-minimal" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <MinimalOverlay />
            </div>
          </div>
        } />
        <Route path="/overlay-focus" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <FocusOverlay />
            </div>
          </div>
        } />
        <Route path="/overlay-dashboard" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <DashboardOverlay />
            </div>
          </div>
        } />
        <Route path="/overlay-analytics" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <AnalyticsOverlay />
            </div>
          </div>
        } />
        <Route path="/overlay-collaboration" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <CollaborationOverlay />
            </div>
          </div>
        } />
        <Route path="/overlay-meeting" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <MeetingOverlay />
            </div>
          </div>
        } />
        <Route path="/overlay-quick" element={
          <div className="dark-overlay-background">
            <div className="dark-overlay-container">
              <QuickOverlay />
            </div>
          </div>
        } />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;