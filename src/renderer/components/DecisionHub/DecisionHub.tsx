import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DecisionHub.css';
import CapturePhase from './phases/CapturePhase';
import EnhancePhase from './phases/EnhancePhase';
import AnalyzePhase from './phases/AnalyzePhase';
import CollaboratePhase from './phases/CollaboratePhase';
import DecidePhase from './phases/DecidePhase';
import CommitPhase from './phases/CommitPhase';
import LearnPhase from './phases/LearnPhase';
import logo from '../../../assets/logo.png';

export type DecisionMode = 'individual' | 'team';
export type HubPosition = 'floating' | 'docked-right' | 'docked-left' | 'minimized';

export interface DecisionData {
  id: string;
  title: string;
  description: string;
  type?: string;
  stakeholders?: string[];
  budget?: string;
  timeline?: string;
  riskLevel?: string;
  similarDecisions?: any[];
  analysis?: any;
  teamInput?: any[];
  recommendation?: any;
  tasks?: any[];
  outcomes?: any;
}

interface DecisionHubProps {
  position?: HubPosition;
  onPositionChange?: (position: HubPosition) => void;
}

const DecisionHub: React.FC<DecisionHubProps> = ({ 
  position = 'floating',
  onPositionChange 
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mode, setMode] = useState<DecisionMode>('individual');
  const [isExpanded, setIsExpanded] = useState(true);
  const [decisionData, setDecisionData] = useState<DecisionData>({
    id: Date.now().toString(),
    title: '',
    description: ''
  });
  const [progress, setProgress] = useState(0);

  const phases = [
    { name: 'Capture', icon: '📝', component: CapturePhase },
    { name: 'Enhance', icon: '📊', component: EnhancePhase },
    { name: 'Analyze', icon: '🔍', component: AnalyzePhase },
    { name: 'Collaborate', icon: '👥', component: CollaboratePhase },
    { name: 'Decide', icon: '🎯', component: DecidePhase },
    { name: 'Commit', icon: '📋', component: CommitPhase },
    { name: 'Learn', icon: '📈', component: LearnPhase }
  ];

  useEffect(() => {
    // Calculate progress based on current phase
    const phaseProgress = ((currentPhase + 1) / phases.length) * 100;
    setProgress(phaseProgress);
  }, [currentPhase]);

  const handleNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const handlePreviousPhase = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const handlePhaseClick = (index: number) => {
    setCurrentPhase(index);
  };

  const handleModeToggle = () => {
    setMode(mode === 'individual' ? 'team' : 'individual');
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    if (onPositionChange) {
      onPositionChange('minimized');
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    if (onPositionChange) {
      onPositionChange('floating');
    }
  };

  const CurrentPhaseComponent = phases[currentPhase].component;

  if (!isExpanded) {
    return (
      <>
        <div className="decision-hub-background" />
        <motion.div 
          className="decision-hub-minimized"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={handleExpand}
        >
          <div className="hub-mini-icon">⚡</div>
          <div className="hub-mini-text">Quick Decision</div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <div className="decision-hub-background" />
      <motion.div 
        className={`decision-hub decision-hub-${position}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        drag={position === 'floating'}
        dragMomentum={false}
      >
      {/* Header */}
      <div className="hub-header">
        <div className="hub-title">
          <img src={logo} alt="MyDecisions" className="hub-logo" />
          <span>Decision Assistant Hub</span>
        </div>
        <div className="hub-controls">
          <button className="hub-control-btn" onClick={() => onPositionChange?.('floating')}>
            Float
          </button>
          <button className="hub-control-btn" onClick={() => onPositionChange?.('docked-right')}>
            Dock
          </button>
          <button className="hub-control-btn" onClick={handleMinimize}>
            Minimize
          </button>
        </div>
      </div>

      {/* Pipeline Progress */}
      <div className="hub-pipeline">
        <div className="pipeline-header">
          <span className="pipeline-title">Decision Pipeline</span>
          <span className="pipeline-progress">{Math.round(progress)}% Complete</span>
        </div>
        <div className="pipeline-phases">
          {phases.map((phase, index) => (
            <div 
              key={phase.name}
              className={`pipeline-phase ${index === currentPhase ? 'active' : ''} ${index < currentPhase ? 'completed' : ''}`}
              onClick={() => handlePhaseClick(index)}
            >
              <div className="phase-icon">{phase.icon}</div>
              <div className="phase-name">{phase.name}</div>
            </div>
          ))}
        </div>
        <div className="pipeline-progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Mode Selector */}
      <div className="hub-mode-selector">
        <button 
          className={`mode-btn ${mode === 'individual' ? 'active' : ''}`}
          onClick={() => setMode('individual')}
        >
          💭 Individual Mode
        </button>
        <button 
          className={`mode-btn ${mode === 'team' ? 'active' : ''}`}
          onClick={() => setMode('team')}
        >
          👥 Team Mode
        </button>
      </div>

      {/* Phase Content */}
      <div className="hub-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentPhaseComponent
              mode={mode}
              decisionData={decisionData}
              onDataUpdate={setDecisionData}
              onNext={handleNextPhase}
              onPrevious={handlePreviousPhase}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <div className="hub-actions">
        <button className="action-btn">New Decision</button>
        <button className="action-btn">View History</button>
        <button className="action-btn">Team</button>
      </div>
    </motion.div>
    </>
  );
};

export default DecisionHub;