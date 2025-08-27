import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Minimize2, Settings, Move, BarChart3, Users, Video, Zap, Home } from 'lucide-react';
import DecisionPipeline from './DecisionPipeline';
import DualModeChat from './DualModeChat';
import AIAnalysis from './AIAnalysis';
import theme from '../../styles/theme';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './overlay.css';

export type OverlayMode = 'dashboard' | 'analytics' | 'collaboration' | 'meeting' | 'quick';

interface DecisionHubProps {
  isExpanded?: boolean;
  initialMode?: OverlayMode;
}

const DecisionHub: React.FC<DecisionHubProps> = ({ isExpanded: initialExpanded = false, initialMode = 'dashboard' }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [chatMode, setChatMode] = useState<'individual' | 'shared'>('individual');
  const [currentDecision, setCurrentDecision] = useState<string>('');
  const [overlayMode, setOverlayMode] = useState<OverlayMode>(initialMode);

  useEffect(() => {
    // Listen for overlay toggle from main process
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.onOverlayToggle((expanded: boolean) => {
        setIsExpanded(expanded);
      });
    }
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.toggleOverlay();
    }
  };

  // Render functions for different overlay modes
  const renderDashboardMode = () => (
    <>
      {/* Decision Pipeline Card */}
      <motion.div 
        className="polished-card pipeline-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🚀 Decision Pipeline</span>
        </div>
        <div className="card-content">
          <DecisionPipeline 
            currentPhase={2}
            totalAPIs={108}
            activeAPIs={23}
          />
        </div>
      </motion.div>

      {/* Current Decision Context Card */}
      <motion.div 
        className="polished-card context-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">💭 Decision Context</span>
        </div>
        <div className="card-content">
          <input
            type="text"
            value={currentDecision}
            onChange={(e) => setCurrentDecision(e.target.value)}
            placeholder="What decision are you facing?"
            className="polished-input"
          />
        </div>
      </motion.div>

      {/* AI Analysis Card */}
      <motion.div 
        className="polished-card analysis-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🤖 AI Analysis</span>
        </div>
        <div className="card-content">
          <AIAnalysis decision={currentDecision} />
        </div>
      </motion.div>

      {/* Chat Interface Card */}
      <motion.div 
        className="polished-card chat-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">💬 Smart Assistant</span>
        </div>
        <div className="card-content">
          <DualModeChat 
            mode={chatMode}
            onModeChange={setChatMode}
          />
        </div>
      </motion.div>

      {/* Key Metrics Cards Row */}
      <div className="metrics-row" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}>
        <motion.div 
          className="polished-card metric-card confidence-card"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="metric-value confidence">89%</div>
          <div className="metric-label">Confidence</div>
        </motion.div>

        <motion.div 
          className="polished-card metric-card bias-card"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="metric-value bias">Low</div>
          <div className="metric-label">Bias Risk</div>
        </motion.div>

        <motion.div 
          className="polished-card metric-card alignment-card"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="metric-value alignment">92%</div>
          <div className="metric-label">Alignment</div>
        </motion.div>
      </div>
    </>
  );

  const renderAnalyticsMode = () => (
    <>
      {/* Decision Score Card */}
      <motion.div 
        className="polished-card analytics-primary-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">📊 Decision Score</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#10b981' }}>7.8</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                Confidence Distribution
              </div>
              <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                <div style={{ flex: 2, background: '#10b981', borderRadius: '2px' }}></div>
                <div style={{ flex: 1, background: '#f59e0b', borderRadius: '2px' }}></div>
                <div style={{ flex: 0.5, background: '#ef4444', borderRadius: '2px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Assessment Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <motion.div 
          className="polished-card risk-card"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="card-header">
            <span className="card-title">⚠️ Risk Level</span>
          </div>
          <div className="card-content">
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#f59e0b' }}>Medium</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>32% risk factors</div>
          </div>
        </motion.div>

        <motion.div 
          className="polished-card timeline-card"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="card-header">
            <span className="card-title">⏱️ Timeline</span>
          </div>
          <div className="card-content">
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#8b5cf6' }}>3 Days</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Optimal window</div>
          </div>
        </motion.div>
      </div>

      {/* Historical Performance */}
      <motion.div 
        className="polished-card history-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">📈 Historical Performance</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Similar Decisions</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>87% Success Rate</span>
          </div>
          <div style={{ display: 'flex', gap: '2px', height: '4px' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div 
                key={i} 
                style={{ 
                  flex: 1, 
                  background: Math.random() > 0.13 ? '#10b981' : '#ef4444',
                  borderRadius: '1px' 
                }}
              ></div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stakeholder Impact */}
      <motion.div 
        className="polished-card stakeholder-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">👥 Stakeholder Impact</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Team Members', impact: 'High', color: '#ef4444' },
              { name: 'Customers', impact: 'Medium', color: '#f59e0b' },
              { name: 'Budget', impact: 'Low', color: '#10b981' },
            ].map(({ name, impact, color }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{name}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color }}>{impact}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderCollaborationMode = () => (
    <>
      {/* Active Session Card */}
      <motion.div 
        className="polished-card session-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🌐 Active Session</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                Team Decision Room
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                5 participants active
              </div>
            </div>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }}></div>
          </div>
        </div>
      </motion.div>

      {/* Team Members */}
      <motion.div 
        className="polished-card members-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">👥 Team Members</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Sarah K.', role: 'Lead', status: 'active', avatar: '👩‍💼' },
              { name: 'Mike R.', role: 'Analyst', status: 'typing', avatar: '👨‍💻' },
              { name: 'Alex T.', role: 'Designer', status: 'active', avatar: '👨‍🎨' },
              { name: 'Emma L.', role: 'PM', status: 'away', avatar: '👩‍🚀' },
            ].map(({ name, role, status, avatar }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>{avatar}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                    {name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
                    {role}
                  </div>
                </div>
                <div style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  background: status === 'active' ? '#10b981' : status === 'typing' ? '#f59e0b' : '#6b7280'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Live Voting */}
      <motion.div 
        className="polished-card voting-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🗳️ Live Voting</span>
        </div>
        <div className="card-content">
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>
              "Accept the job offer?"
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '6px 12px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '6px',
                color: '#10b981',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                ✓ Yes (3)
              </button>
              <button style={{
                padding: '6px 12px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                color: '#ef4444',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                ✗ No (1)
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shared Ideas */}
      <motion.div 
        className="polished-card ideas-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">💡 Shared Ideas</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { text: "Negotiate salary first", author: "Sarah", time: "2m ago" },
              { text: "Consider remote work options", author: "Mike", time: "5m ago" },
              { text: "Check their tech stack", author: "Alex", time: "8m ago" },
            ].map(({ text, author, time }, index) => (
              <div key={index} style={{ 
                padding: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '6px',
                borderLeft: '2px solid #8b5cf6'
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>{text}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  {author} • {time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderMeetingMode = () => (
    <>
      {/* Meeting Status */}
      <motion.div 
        className="polished-card meeting-status-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🎥 Meeting Intelligence</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                Decision Meeting
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                23:45 elapsed • 6 participants
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 500 }}>LIVE</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Speaking Time */}
      <motion.div 
        className="polished-card speaking-time-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🎤 Speaking Time</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Sarah', time: '8m 32s', percentage: 65, active: true },
              { name: 'Mike', time: '4m 15s', percentage: 25, active: false },
              { name: 'Alex', time: '1m 48s', percentage: 10, active: false },
            ].map(({ name, time, percentage, active }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  background: active ? '#10b981' : '#6b7280',
                  boxShadow: active ? '0 0 6px #10b981' : 'none'
                }}></div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', flex: 1 }}>{name}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{time}</span>
                <div style={{ 
                  width: '40px', 
                  height: '4px', 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${percentage}%`, 
                    height: '100%', 
                    background: active ? '#10b981' : '#8b5cf6',
                    borderRadius: '2px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decision Coverage */}
      <motion.div 
        className="polished-card coverage-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">✅ Decision Coverage</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#10b981' }}>73%</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Topics Covered</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#f59e0b' }}>4</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Missing Points</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Meeting Notes */}
      <motion.div 
        className="polished-card notes-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">📝 AI Meeting Notes</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              🎯 <strong>Key Point:</strong> Salary negotiation is priority
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              ⚠️ <strong>Concern:</strong> Work-life balance not discussed
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              💡 <strong>Suggestion:</strong> Request tech stack details
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderQuickMode = () => (
    <>
      {/* Quick Decision Input */}
      <motion.div 
        className="polished-card quick-input-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">⚡ Quick Decision</span>
        </div>
        <div className="card-content">
          <textarea
            placeholder="Describe your decision quickly..."
            className="polished-input"
            style={{ 
              minHeight: '60px', 
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button style={{
              flex: 1,
              padding: '8px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              color: '#10b981',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              🎯 Analyze
            </button>
            <button style={{
              flex: 1,
              padding: '8px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.1))',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '8px',
              color: '#a855f7',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              🎲 Random
            </button>
          </div>
        </div>
      </motion.div>

      {/* Instant Verdict */}
      <motion.div 
        className="polished-card verdict-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">🎯 Instant Verdict</span>
        </div>
        <div className="card-content">
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981', marginBottom: '4px' }}>
              GO FOR IT
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
              87% confidence • Low risk
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <motion.div 
          className="polished-card action-card"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>🎲</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              Coin Flip
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="polished-card action-card"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>🔮</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              Magic 8
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Quick Decisions */}
      <motion.div 
        className="polished-card recent-card"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          <span className="card-title">⏱️ Recent Decisions</span>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { decision: "Choose restaurant", result: "Italian", time: "2h ago" },
              { decision: "Meeting time", result: "2 PM", time: "5h ago" },
              { decision: "Project priority", result: "Feature A", time: "1d ago" },
            ].map(({ decision, result, time }, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '6px 8px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '4px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>{decision}</div>
                  <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 500 }}>{result}</div>
                </div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>{time}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderCurrentMode = () => {
    switch (overlayMode) {
      case 'analytics':
        return renderAnalyticsMode();
      case 'collaboration':
        return renderCollaborationMode();
      case 'meeting':
        return renderMeetingMode();
      case 'quick':
        return renderQuickMode();
      default:
        return renderDashboardMode();
    }
  };

  return (
    <motion.div
      className={`decision-hub ${isExpanded ? 'expanded' : 'collapsed'}`}
      initial={false}
      animate={{
        width: isExpanded ? 420 : 120,
        height: isExpanded ? 600 : 40,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        overflow: 'hidden',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 10000,
        borderRadius: isExpanded ? '20px' : '24px',
      }}
    >
      {/* Collapsed State */}
      {!isExpanded && (
        <motion.div
          className="collapsed-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            cursor: 'pointer',
            padding: '0 16px',
            gap: '8px',
          }}
        >
          <img 
            src={decisionAiLogo} 
            alt="MyDecisions" 
            style={{ height: '24px', width: 'auto' }}
          />
          <span style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
            MyDecisions
          </span>
        </motion.div>
      )}

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="expanded-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: theme.spacing.md,
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
              paddingBottom: theme.spacing.sm,
              borderBottom: `1px solid ${theme.colors.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                <img 
                  src={decisionAiLogo} 
                  alt="MyDecisions" 
                  style={{ height: '32px', width: 'auto' }}
                />
              </div>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <button
                  onClick={() => {/* Handle drag */}}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'move',
                    padding: '4px',
                  }}
                >
                  <Move size={16} color={theme.colors.text.secondary} />
                </button>
                <button
                  onClick={() => {/* Settings */}}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <Settings size={16} color={theme.colors.text.secondary} />
                </button>
                <button
                  onClick={handleToggle}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <Minimize2 size={16} color={theme.colors.text.secondary} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="overlay-nav-tabs" style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              padding: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}>
              {[
                { id: 'dashboard', icon: Home, label: 'Dashboard' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                { id: 'collaboration', icon: Users, label: 'Team' },
                { id: 'meeting', icon: Video, label: 'Meeting' },
                { id: 'quick', icon: Zap, label: 'Quick' },
              ].map(({ id, icon: Icon, label }) => (
                <motion.button
                  key={id}
                  className={`nav-tab ${overlayMode === id ? 'active' : ''}`}
                  onClick={() => setOverlayMode(id as OverlayMode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    background: overlayMode === id 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: overlayMode === id 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '11px',
                    fontWeight: overlayMode === id ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Dynamic Cards Container */}
            <div className="cards-container" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flex: 1,
              overflowY: 'auto',
              paddingRight: '2px',
            }}>
              {renderCurrentMode()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DecisionHub;