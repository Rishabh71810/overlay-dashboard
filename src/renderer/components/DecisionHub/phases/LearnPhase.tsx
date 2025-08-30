import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface LearnPhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const LearnPhase: React.FC<LearnPhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext,
  onPrevious
}) => {
  const [timeframe] = useState('3 Months Later');
  const [metrics] = useState({
    revenue: { actual: '€1.2M', target: '€1.25M', status: 'on-track' },
    costs: { actual: '€1.8M', budget: '€2.1M', status: 'under-budget' },
    team: { hired: 5, target: 6, status: 'near-complete' },
    milestones: { completed: 8, total: 10, status: 'ahead' }
  });

  const [lessons] = useState([
    'Remote hiring was 40% faster than expected',
    'GDPR costs overestimated by 20% - good buffer',
    'Should include local marketing expert earlier',
    'Time zone coordination easier with async tools',
    'Partnership opportunities emerged unexpectedly'
  ]);

  const [successRate] = useState(92);
  const [improvements] = useState([
    'Template created for future expansions',
    'Risk assessment model updated',
    'Team collaboration patterns documented',
    'Decision DNA evolved with new patterns'
  ]);

  return (
    <div className="phase-container learn-phase">
      <div className="phase-header">
        <h3>📈 LEARN - Continuous evolution</h3>
        <p className="phase-description">
          Tracking outcomes and improving decision intelligence
        </p>
      </div>

      <div className="timeframe-indicator">
        <h4>{timeframe}</h4>
      </div>

      <div className="outcome-tracking">
        <h4>Actual vs Predicted</h4>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Revenue</div>
            <div className="metric-value">{metrics.revenue.actual}</div>
            <div className="metric-target">Target: {metrics.revenue.target}</div>
            <div className="metric-status">{metrics.revenue.status}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Costs</div>
            <div className="metric-value">{metrics.costs.actual}</div>
            <div className="metric-target">Budget: {metrics.costs.budget}</div>
            <div className="metric-status">{metrics.costs.status}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Team Hiring</div>
            <div className="metric-value">{metrics.team.hired}/{metrics.team.target}</div>
            <div className="metric-status">{metrics.team.status}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Milestones</div>
            <div className="metric-value">{metrics.milestones.completed}/{metrics.milestones.total}</div>
            <div className="metric-status">{metrics.milestones.status}</div>
          </div>
        </div>
      </div>

      <div className="lessons-learned">
        <h4>Lessons for Next Decision</h4>
        {lessons.map((lesson, index) => (
          <div key={index} className="lesson-item">
            • {lesson}
          </div>
        ))}
      </div>

      <div className="success-rate">
        <h4>Decision Success Rate</h4>
        <div className="success-percentage">
          {successRate}%
        </div>
        <div className="scenario-bar">
          <motion.div
            className="scenario-fill"
            initial={{ width: 0 }}
            animate={{ width: `${successRate}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="system-improvements">
        <h4>System Improvements Applied</h4>
        {improvements.map((improvement, index) => (
          <motion.div 
            key={index}
            className="improvement-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            • {improvement}
          </motion.div>
        ))}
      </div>

      <div className="next-decision-preview">
        <h4>Ready for Next Decision</h4>
        <p>The system is now smarter. Your next expansion decision will be:</p>
        <div className="preview-metrics">
          <div className="preview-metric">
            <div className="preview-value">32%</div>
            <div className="preview-label">Faster</div>
          </div>
          <div className="preview-metric">
            <div className="preview-value">18%</div>
            <div className="preview-label">More Accurate</div>
          </div>
          <div className="preview-metric">
            <div className="preview-value">€400K</div>
            <div className="preview-label">Cost Saved</div>
          </div>
        </div>
      </div>

      <button 
        className="primary-btn"
        onClick={() => window.location.reload()}
      >
        Start New Decision
      </button>

      <div className="phase-navigation">
        <button className="nav-btn" onClick={onPrevious}>
          ← Previous
        </button>
      </div>
    </div>
  );
};

export default LearnPhase;