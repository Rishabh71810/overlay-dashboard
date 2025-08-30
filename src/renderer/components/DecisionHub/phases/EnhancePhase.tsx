import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface EnhancePhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const EnhancePhase: React.FC<EnhancePhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext,
  onPrevious
}) => {
  const [isEnhancing, setIsEnhancing] = useState(true);
  const [enhancements, setEnhancements] = useState({
    budget: '',
    timeline: '',
    riskLevel: '',
    marketConditions: '',
    compliance: '',
    teamCapacity: ''
  });

  useEffect(() => {
    // Simulate enhancement process
    setTimeout(() => {
      const enhanced = {
        budget: '€2-5M available',
        timeline: 'Q2-Q3 2025',
        riskLevel: 'Medium',
        marketConditions: 'Favorable - Growing market',
        compliance: 'GDPR requirements (~€500K)',
        teamCapacity: '70% - Can handle with remote team'
      };
      
      setEnhancements(enhanced);
      
      onDataUpdate({
        ...decisionData,
        budget: enhanced.budget,
        timeline: enhanced.timeline,
        riskLevel: enhanced.riskLevel
      });
      
      setIsEnhancing(false);
    }, 2000);
  }, []);

  const handleAddCompliance = () => {
    onDataUpdate({
      ...decisionData,
      compliance: enhancements.compliance
    });
  };

  return (
    <div className="phase-container enhance-phase">
      <div className="phase-header">
        <h3>📊 ENHANCE - Adding context & intelligence</h3>
        <p className="phase-description">
          Enriching your decision with organizational data and market intelligence
        </p>
      </div>

      {isEnhancing ? (
        <motion.div 
          className="processing-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="processing-header">
            <div className="processing-spinner">🔄</div>
            <span>ENHANCING WITH CONTEXT...</span>
          </div>
          <div className="processing-items">
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              ⏳ Analyzing historical patterns...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
              ⏳ Checking resource availability...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>
              ⏳ Evaluating market conditions...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.9 }}>
              ⏳ Assessing compliance requirements...
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="enhancement-container">
            <h4>Your simple question is now:</h4>
            <div className="enhancement-grid">
              <div className="enhancement-item">
                <div className="enhancement-label">Budget Available</div>
                <div className="enhancement-value">{enhancements.budget}</div>
              </div>
              <div className="enhancement-item">
                <div className="enhancement-label">Timeline</div>
                <div className="enhancement-value">{enhancements.timeline}</div>
              </div>
              <div className="enhancement-item">
                <div className="enhancement-label">Risk Level</div>
                <div className="enhancement-value">{enhancements.riskLevel}</div>
              </div>
              <div className="enhancement-item">
                <div className="enhancement-label">Market Conditions</div>
                <div className="enhancement-value">{enhancements.marketConditions}</div>
              </div>
              <div className="enhancement-item">
                <div className="enhancement-label">Team Capacity</div>
                <div className="enhancement-value">{enhancements.teamCapacity}</div>
              </div>
              <div className="enhancement-item">
                <div className="enhancement-label">Compliance</div>
                <div className="enhancement-value">{enhancements.compliance}</div>
              </div>
            </div>
          </div>

          <div className="ai-suggestion">
            <div className="ai-suggestion-header">
              <span>🤖</span>
              <span>AI Suggestion</span>
            </div>
            <p>Should I add GDPR compliance costs to your analysis? This could impact your budget by approximately €500K in the first year.</p>
            <div className="suggestion-actions">
              <button className="secondary-btn" onClick={handleAddCompliance}>
                Yes, add GDPR costs
              </button>
              <button className="secondary-btn">
                Skip for now
              </button>
            </div>
          </div>

          {decisionData.similarDecisions && decisionData.similarDecisions.length > 0 && (
            <div className="similar-decisions">
              <h4>Learning from similar decisions:</h4>
              <div className="result-list">
                {decisionData.similarDecisions.map((decision, index) => (
                  <span key={index} className="result-tag">
                    {decision} ✓
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="phase-navigation">
            <button className="nav-btn" onClick={onPrevious}>
              ← Previous
            </button>
            <button className="primary-btn" onClick={onNext} style={{ width: 'auto' }}>
              Continue to Analysis →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancePhase;