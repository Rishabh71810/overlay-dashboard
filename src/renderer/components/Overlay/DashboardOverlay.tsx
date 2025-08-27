import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, History, Minimize2 } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay, PickleGlassInput } from './PickleGlass';
import DecisionPipeline from './DecisionPipeline';
import AIAnalysis from './AIAnalysis';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

type DashboardTab = 'decisions' | 'analytics' | 'history';

interface DashboardOverlayProps {
  isExpanded?: boolean;
}

const DashboardOverlay: React.FC<DashboardOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [activeTab, setActiveTab] = useState<DashboardTab>('decisions');
  const [currentDecision, setCurrentDecision] = useState<string>('');

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="polished-glass-card blue-tint" style={{
              padding: '20px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                📊 Analytics Overview
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>42</div>
                  <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>Decisions Made</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>89%</div>
                  <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="polished-glass-card green-tint" style={{
              padding: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                📜 Recent Decisions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { title: "Job Offer Decision", status: "Completed", time: "2h ago" },
                  { title: "Project Technology Stack", status: "In Progress", time: "1d ago" },
                  { title: "Budget Allocation", status: "Completed", time: "3d ago" },
                ].map((decision, index) => (
                  <div key={index} style={{
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--pg-primary)' }}>
                        {decision.title}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--pg-secondary)' }}>
                        {decision.time}
                      </div>
                    </div>
                    <div style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: 500,
                      background: decision.status === 'Completed' 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : 'rgba(245, 158, 11, 0.2)',
                      color: decision.status === 'Completed' ? 'var(--pg-accent)' : '#f59e0b',
                    }}>
                      {decision.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Decision Pipeline Card */}
            <div className="polished-glass-card purple-tint" style={{
              padding: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                🚀 Decision Pipeline
              </div>
              <DecisionPipeline 
                currentPhase={2}
                totalAPIs={108}
                activeAPIs={23}
              />
            </div>

            {/* Current Decision Context Card */}
            <div className="polished-glass-card orange-tint" style={{
              padding: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                💭 Decision Context
              </div>
              <PickleGlassInput
                value={currentDecision}
                onChange={(e) => setCurrentDecision(e.target.value)}
                placeholder="What decision are you facing?"
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '13px',
                  color: 'var(--pg-primary)',
                  width: '100%',
                  outline: 'none',
                  padding: '0',
                  margin: '0',
                  lineHeight: '1.4',
                  height: 'auto',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* AI Analysis Card */}
            <div className="polished-glass-card cyan-tint" style={{
              padding: '16px',
              flex: 1,
              minHeight: '120px'
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                🤖 AI Analysis
              </div>
              <AIAnalysis decision={currentDecision} />
            </div>
          </div>
        );
    }
  };

  return (
    <PickleGlassOverlay
      isExpanded={isExpanded}
      position={{ x: 0, y: 0 }}
      width={isExpanded ? 420 : 140}
      height={isExpanded ? 600 : 40}
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
            style={{ 
              width: '16px',
              height: '16px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' 
            }}
          />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Dashboard
          </span>
        </motion.div>
      )}

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="expanded-content pickle-glass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '20px',
              position: 'relative',
              borderRadius: '20px',
              background: 'transparent',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--pg-glass-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PickleGlass style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'transparent',
                  backdropFilter: 'blur(15px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(15px) saturate(120%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--pg-red-glass-border)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <img 
                    src={decisionAiLogo} 
                    alt="MyDecisions" 
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      objectFit: 'contain',
                      filter: 'hue-rotate(0deg) saturate(2) brightness(0.7)'
                    }} 
                  />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    MyDecisions Dashboard
                  </h2>
                  <p style={{ 
                    fontSize: '11px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    AI Decision Intelligence
                  </p>
                </div>
              </div>
              <PickleGlass
                isButton
                onClick={handleToggle}
                style={{
                  padding: '6px',
                  borderRadius: '8px',
                  background: 'transparent',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid var(--pg-red-glass-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Minimize2 size={14} color="var(--pg-primary)" />
              </PickleGlass>
            </div>

            {/* Tab Navigation */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              padding: '4px',
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}>
              {[
                { id: 'decisions', icon: LayoutDashboard, label: 'Decisions' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                { id: 'history', icon: History, label: 'History' },
              ].map(({ id, icon: Icon, label }) => (
                <motion.button
                  key={id}
                  className={`nav-tab ${activeTab === id ? 'active' : ''}`}
                  onClick={() => setActiveTab(id as DashboardTab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    background: activeTab === id 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: activeTab === id 
                      ? 'var(--pg-accent)' 
                      : 'var(--pg-primary)',
                    fontSize: '11px',
                    fontWeight: activeTab === id ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Dynamic Tab Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flex: 1,
              overflowY: 'auto',
              paddingRight: '2px',
            }}>
              {renderTabContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PickleGlassOverlay>
  );
};

export default DashboardOverlay;