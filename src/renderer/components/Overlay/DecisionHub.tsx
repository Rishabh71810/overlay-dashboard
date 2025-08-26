import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Minimize2, Settings, Move } from 'lucide-react';
import DecisionPipeline from './DecisionPipeline';
import DualModeChat from './DualModeChat';
import AIAnalysis from './AIAnalysis';
import theme from '../../styles/theme';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './overlay.css';

interface DecisionHubProps {
  isExpanded?: boolean;
}

const DecisionHub: React.FC<DecisionHubProps> = ({ isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [chatMode, setChatMode] = useState<'individual' | 'shared'>('individual');
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

            {/* Decision Pipeline */}
            <div className="glass-card" style={{ marginBottom: theme.spacing.md, padding: '12px', borderRadius: '12px' }}>
              <DecisionPipeline 
                currentPhase={2}
                totalAPIs={108}
                activeAPIs={23}
              />
            </div>

            {/* Current Decision Context */}
            <div className="glass-card" style={{
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.sm,
              marginBottom: theme.spacing.md,
            }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 500, 
                color: theme.colors.text.secondary, 
                marginBottom: theme.spacing.sm 
              }}>
                💭 Current Decision Context
              </h3>
              <input
                type="text"
                value={currentDecision}
                onChange={(e) => setCurrentDecision(e.target.value)}
                placeholder="What decision are you facing?"
                style={{
                  width: '100%',
                  padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
                  borderRadius: theme.borderRadius.md,
                  fontSize: '14px',
                  color: theme.colors.text.primary,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
            </div>

            {/* AI Analysis */}
            <AIAnalysis decision={currentDecision} />

            {/* Dual Mode Chat */}
            <DualModeChat 
              mode={chatMode}
              onModeChange={setChatMode}
            />

            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: theme.spacing.sm,
              marginTop: 'auto',
              paddingTop: theme.spacing.sm,
            }}>
              <div className="glass-card" style={{
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.sm,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: theme.colors.success }}>89%</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary }}>Confidence</div>
              </div>
              <div className="glass-card" style={{
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.sm,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: theme.colors.warning }}>Low</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary }}>Bias Risk</div>
              </div>
              <div className="glass-card" style={{
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.sm,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: theme.colors.error }}>92%</div>
                <div style={{ fontSize: '11px', color: theme.colors.text.secondary }}>Alignment</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DecisionHub;