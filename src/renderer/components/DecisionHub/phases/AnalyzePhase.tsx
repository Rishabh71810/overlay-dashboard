import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface AnalyzePhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AnalyzePhase: React.FC<AnalyzePhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext,
  onPrevious
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState({
    risks: [] as string[],
    opportunities: [] as string[],
    scenarios: {
      best: { label: 'Best Case', roi: 340, probability: 25 },
      likely: { label: 'Likely', roi: 180, probability: 60 },
      worst: { label: 'Worst Case', roi: -20, probability: 15 }
    },
    blindSpots: [] as string[],
    confidence: 0
  });

  useEffect(() => {
    // Simulate analysis process
    setTimeout(() => {
      const analysisResult = {
        risks: [
          'GDPR compliance: €500K',
          'Talent acquisition: 6 months',
          'Currency fluctuation risk'
        ],
        opportunities: [
          'Market size: €50M potential',
          'First-mover advantage',
          'Brand expansion opportunity'
        ],
        scenarios: {
          best: { label: 'Best Case', roi: 340, probability: 25 },
          likely: { label: 'Likely', roi: 180, probability: 60 },
          worst: { label: 'Worst Case', roi: -20, probability: 15 }
        },
        blindSpots: ['Brexit impact not considered', 'Local competition analysis missing'],
        confidence: 73
      };
      
      setAnalysis(analysisResult);
      onDataUpdate({
        ...decisionData,
        analysis: analysisResult
      });
      
      setIsAnalyzing(false);
    }, 2500);
  }, []);

  return (
    <div className="phase-container analyze-phase">
      <div className="phase-header">
        <h3>🔍 ANALYZE - Deep intelligence</h3>
        <p className="phase-description">
          Running multiple analysis engines to provide comprehensive insights
        </p>
      </div>

      {isAnalyzing ? (
        <motion.div 
          className="processing-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="processing-header">
            <div className="processing-spinner">🔄</div>
            <span>ANALYZING DECISION...</span>
          </div>
          <div className="processing-items">
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              ⏳ Running risk assessment models...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
              ⏳ Calculating opportunity scores...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>
              ⏳ Modeling scenarios...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.9 }}>
              ⏳ Detecting blind spots...
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-card-header">
                <span>📉</span>
                <span>RISKS</span>
              </div>
              {analysis.risks.map((risk, index) => (
                <div key={index} className="risk-item">• {risk}</div>
              ))}
            </div>
            
            <div className="analysis-card">
              <div className="analysis-card-header">
                <span>📈</span>
                <span>OPPORTUNITIES</span>
              </div>
              {analysis.opportunities.map((opportunity, index) => (
                <div key={index} className="opportunity-item">• {opportunity}</div>
              ))}
            </div>
          </div>

          <div className="scenario-modeling">
            <h4>Scenario Modeling:</h4>
            {Object.entries(analysis.scenarios).map(([key, scenario]) => (
              <div key={key} className="scenario-item">
                <span className="scenario-label">{scenario.label}:</span>
                <div className="scenario-bar">
                  <motion.div 
                    className={`scenario-fill ${key}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.abs(scenario.roi) / 4)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <span>ROI {scenario.roi}%</span>
              </div>
            ))}
          </div>

          {analysis.blindSpots.length > 0 && (
            <div className="blind-spot-alert">
              <span>⚠️</span>
              <div>
                <strong>Blind spots detected:</strong>
                {analysis.blindSpots.map((spot, index) => (
                  <div key={index}>{spot}</div>
                ))}
              </div>
            </div>
          )}

          <div className="confidence-meter">
            <div className="confidence-header">
              <span>Analysis Confidence:</span>
              <span>{analysis.confidence}%</span>
            </div>
            <div className="scenario-bar">
              <motion.div 
                className="scenario-fill"
                initial={{ width: 0 }}
                animate={{ width: `${analysis.confidence}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="phase-navigation">
            <button className="nav-btn" onClick={onPrevious}>
              ← Previous
            </button>
            <button className="primary-btn" onClick={onNext} style={{ width: 'auto' }}>
              Continue to Collaboration →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyzePhase;