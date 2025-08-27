import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, TrendingUp } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay } from './PickleGlass';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface MinimalOverlayProps {
  isExpanded?: boolean;
}

const MinimalOverlay: React.FC<MinimalOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [decisionScore] = useState(7.8);
  const [recommendation] = useState("Accept");

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
    <PickleGlassOverlay
      isExpanded={isExpanded}
      position={{ x: 0, y: 0 }}
      width={isExpanded ? 320 : 180}
      height={isExpanded ? 140 : 40}
    >
      {/* Minimal Collapsed State */}
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
            padding: '0 12px',
            gap: '8px',
          }}
        >
          <Brain size={16} color="var(--pg-accent)" />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            {decisionScore} | {recommendation}
          </span>
          <TrendingUp size={14} color="var(--pg-accent)" />
        </motion.div>
      )}

      {/* Minimal Expanded State */}
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
              padding: '16px',
              position: 'relative',
              borderRadius: '16px',
              background: 'transparent',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--pg-glass-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PickleGlass style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: 'transparent',
                  backdropFilter: 'blur(15px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(15px) saturate(120%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--pg-red-glass-border)',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <Brain size={12} color="var(--pg-accent)" />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Quick View
                  </h2>
                  <p style={{ 
                    fontSize: '9px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    Minimal Decision Indicator
                  </p>
                </div>
              </div>
              <PickleGlass
                isButton
                onClick={handleToggle}
                style={{
                  padding: '4px',
                  borderRadius: '6px',
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
                <span style={{ fontSize: '10px', color: 'var(--pg-accent)', fontWeight: 600 }}>×</span>
              </PickleGlass>
            </div>

            {/* Decision Score Display */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              flex: 1,
            }}>
              <PickleGlass style={{
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                background: 'transparent',
                border: '1px solid var(--pg-red-glass-border)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: 'var(--pg-accent)',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                }}>
                  {decisionScore}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '4px',
                  fontWeight: 500
                }}>
                  Score
                </div>
              </PickleGlass>

              <PickleGlass style={{
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                background: 'transparent',
                border: '1px solid var(--pg-red-glass-border)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  color: 'var(--pg-primary)',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                }}>
                  {recommendation}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '4px',
                  fontWeight: 500
                }}>
                  Recommendation
                </div>
              </PickleGlass>
            </div>

            {/* Status Badge */}
            <PickleGlass style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              padding: '6px 12px',
              marginTop: '8px',
              background: 'transparent',
              border: '1px solid var(--pg-red-glass-border)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--pg-accent)',
                marginRight: '6px',
                boxShadow: '0 0 6px var(--pg-accent)',
              }}></div>
              <span style={{ 
                color: 'var(--pg-accent)', 
                fontSize: '10px', 
                fontWeight: 600 
              }}>
                ACTIVE
              </span>
            </PickleGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </PickleGlassOverlay>
  );
};

export default MinimalOverlay;
