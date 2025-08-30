import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface DecidePhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DecidePhase: React.FC<DecidePhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext,
  onPrevious
}) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [recommendation, setRecommendation] = useState({
    decision: '',
    confidence: 0,
    option: '',
    budget: '',
    timeline: '',
    successMetric: '',
    alternativePlan: ''
  });

  useEffect(() => {
    // Simulate decision crystallization
    setTimeout(() => {
      const finalRecommendation = {
        decision: 'Proceed with European Expansion',
        confidence: 84,
        option: 'Remote-First Europe Team',
        budget: '€2.1M total investment',
        timeline: 'Start Q2 2025',
        successMetric: '€5M revenue in Year 1',
        alternativePlan: 'Pivot to partnership model if challenges arise'
      };
      
      setRecommendation(finalRecommendation);
      onDataUpdate({
        ...decisionData,
        recommendation: finalRecommendation
      });
      
      setIsProcessing(false);
    }, 2000);
  }, []);

  const handleCommit = () => {
    onNext();
  };

  return (
    <div className="phase-container decide-phase">
      <div className="phase-header">
        <h3>🎯 DECIDE - Making the call</h3>
        <p className="phase-description">
          All intelligence crystallized into a clear recommendation
        </p>
      </div>

      {isProcessing ? (
        <motion.div 
          className="processing-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="processing-header">
            <div className="processing-spinner">🔄</div>
            <span>CRYSTALLIZING DECISION...</span>
          </div>
          <div className="processing-items">
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              ⏳ Weighing all factors...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
              ⏳ Calculating confidence score...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>
              ⏳ Generating recommendation...
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="decision-recommendation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="recommendation-header">
              <h3 className="recommendation-title">
                RECOMMENDATION: {recommendation.decision}
              </h3>
              <div className="confidence-display">
                <span>Confidence: </span>
                <strong className="confidence-value">
                  {recommendation.confidence}%
                </strong>
                <div className="scenario-bar">
                  <motion.div 
                    className="scenario-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${recommendation.confidence}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>

            <div className="decision-framework">
              <h4>Final Decision Framework:</h4>
              
              <div className="framework-item">
                <div className="framework-label">Selected Option:</div>
                <div className="framework-value">{recommendation.option}</div>
              </div>
              
              <div className="framework-item">
                <div className="framework-label">Budget:</div>
                <div className="framework-value">{recommendation.budget}</div>
              </div>
              
              <div className="framework-item">
                <div className="framework-label">Timeline:</div>
                <div className="framework-value">{recommendation.timeline}</div>
              </div>
              
              <div className="framework-item">
                <div className="framework-label">Success Metric:</div>
                <div className="framework-value">{recommendation.successMetric}</div>
              </div>
              
              <div className="framework-item">
                <div className="framework-label">Alternative if this fails:</div>
                <div className="framework-value">{recommendation.alternativePlan}</div>
              </div>
            </div>
          </motion.div>

          <div className="decision-rationale">
            <h4>Why this recommendation:</h4>
            <ul className="rationale-list">
              <li>Aligns with available budget (€2.1M &lt; €5M available)</li>
              <li>Minimizes risk through remote-first approach</li>
              <li>Leverages successful patterns from previous expansions</li>
              <li>Team consensus strongly favors expansion (75%)</li>
              <li>Market opportunity significantly outweighs risks</li>
            </ul>
          </div>

          <div className="alternatives-considered">
            <h4>Alternatives considered:</h4>
            <div className="alternatives-list">
              <div className="alternative-item">
                <span className="alternative-status">×</span>
                <span className="alternative-label">Local hiring only:</span>
                <span className="alternative-reason">Too expensive and slow (€800K, 6 months)</span>
              </div>
              <div className="alternative-item">
                <span className="alternative-status">×</span>
                <span className="alternative-label">Acquisition:</span>
                <span className="alternative-reason">Exceeds budget (€3M required)</span>
              </div>
              <div className="alternative-item">
                <span className="alternative-status">×</span>
                <span className="alternative-label">Delay expansion:</span>
                <span className="alternative-reason">Risk losing first-mover advantage</span>
              </div>
            </div>
          </div>

          <div className="decision-actions">
            <button 
              className="primary-btn" 
              onClick={handleCommit}
            >
              COMMIT TO THIS DECISION
            </button>
            <button className="secondary-btn">
              Explore More Options
            </button>
          </div>
        </>
      )}

      <div className="phase-navigation">
        <button className="nav-btn" onClick={onPrevious}>
          ← Previous
        </button>
      </div>
    </div>
  );
};

export default DecidePhase;