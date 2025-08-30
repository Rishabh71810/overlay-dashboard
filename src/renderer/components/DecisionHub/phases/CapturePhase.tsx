import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface CapturePhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CapturePhase: React.FC<CapturePhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext
}) => {
  const [input, setInput] = useState(decisionData.description || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedInfo, setCapturedInfo] = useState({
    decisionType: '',
    similarDecisions: [] as string[],
    stakeholders: [] as string[],
    templates: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleCapture = async () => {
    setIsProcessing(true);
    
    // Simulate API calls for intelligent capture
    setTimeout(() => {
      const mockCapturedInfo = {
        decisionType: 'Strategic Expansion',
        similarDecisions: ['US Expansion 2023', 'Asia Expansion 2022'],
        stakeholders: ['CEO', 'CFO', 'Regional Head', 'Legal Team', 'Operations'],
        templates: ['Market Entry Template', 'Expansion Checklist']
      };
      
      setCapturedInfo(mockCapturedInfo);
      
      onDataUpdate({
        ...decisionData,
        description: input,
        type: mockCapturedInfo.decisionType,
        stakeholders: mockCapturedInfo.stakeholders,
        similarDecisions: mockCapturedInfo.similarDecisions
      });
      
      setIsProcessing(false);
      
      // Auto-advance after capture
      setTimeout(() => {
        onNext();
      }, 2000);
    }, 1500);
  };

  const handleVoiceInput = () => {
    // Placeholder for voice input functionality
    console.log('Voice input activated');
  };

  return (
    <div className="phase-container capture-phase">
      <div className="phase-header">
        <h3>📝 CAPTURE - What needs deciding?</h3>
        <p className="phase-description">
          {mode === 'individual' 
            ? "Share your thoughts privately with AI assistance"
            : "Capture the team's decision requirements"}
        </p>
      </div>

      <div className="capture-input-area">
        <textarea
          className="decision-input"
          placeholder="Type your decision question... e.g., 'Should we expand to Europe?'"
          value={input}
          onChange={handleInputChange}
          rows={4}
        />
        <div className="input-actions">
          <button className="voice-btn" onClick={handleVoiceInput}>
            🎙 Voice Input
          </button>
          <button className="attach-btn">
            📎 Attach File
          </button>
        </div>
      </div>

      {!isProcessing && !capturedInfo.decisionType && (
        <button 
          className="capture-btn primary-btn"
          onClick={handleCapture}
          disabled={!input.trim()}
        >
          Start Intelligent Capture
        </button>
      )}

      {isProcessing && (
        <motion.div 
          className="processing-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="processing-header">
            <div className="processing-spinner">🔄</div>
            <span>CAPTURING YOUR DECISION...</span>
          </div>
          <div className="processing-items">
            <motion.div 
              className="processing-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ⏳ Identifying decision type...
            </motion.div>
            <motion.div 
              className="processing-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ⏳ Finding similar decisions...
            </motion.div>
            <motion.div 
              className="processing-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              ⏳ Identifying stakeholders...
            </motion.div>
            <motion.div 
              className="processing-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              ⏳ Loading relevant templates...
            </motion.div>
          </div>
        </motion.div>
      )}

      {!isProcessing && capturedInfo.decisionType && (
        <motion.div 
          className="captured-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>✅ Capture Complete</h4>
          
          <div className="result-item">
            <span className="result-label">Decision Type:</span>
            <span className="result-value">{capturedInfo.decisionType}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Similar Decisions Found:</span>
            <div className="result-list">
              {capturedInfo.similarDecisions.map((decision, index) => (
                <span key={index} className="result-tag">{decision}</span>
              ))}
            </div>
          </div>
          
          <div className="result-item">
            <span className="result-label">Stakeholders Identified:</span>
            <div className="result-list">
              {capturedInfo.stakeholders.map((stakeholder, index) => (
                <span key={index} className="result-tag">{stakeholder}</span>
              ))}
            </div>
          </div>
          
          <div className="result-item">
            <span className="result-label">Templates Available:</span>
            <div className="result-list">
              {capturedInfo.templates.map((template, index) => (
                <span key={index} className="result-tag">{template}</span>
              ))}
            </div>
          </div>
          
          <p className="auto-advance-note">Auto-advancing to Enhancement phase...</p>
        </motion.div>
      )}

      {mode === 'individual' && (
        <div className="mode-note">
          <span className="lock-icon">🔒</span>
          <span>Your input is private. Only you and the AI can see this.</span>
        </div>
      )}
    </div>
  );
};

export default CapturePhase;