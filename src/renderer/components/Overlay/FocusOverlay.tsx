import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronRight } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay } from './PickleGlass';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface FocusOverlayProps {
  isExpanded?: boolean;
}

const FocusOverlay: React.FC<FocusOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [currentDecision] = useState("Job Offer Analysis");
  const [progress] = useState(73);

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

  const handleView = () => {
    // Navigate to full overlay
    console.log('Navigate to full overlay');
  };

  const handleDismiss = () => {
    setIsExpanded(false);
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.toggleOverlay();
    }
  };

  return (
    <PickleGlassOverlay
      isExpanded={isExpanded}
      position={{ x: 0, y: 0 }}
      width={isExpanded ? 340 : 120}
      height={isExpanded ? 220 : 40}
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
            padding: '0 12px',
            gap: '8px',
          }}
        >
          <Eye size={16} color="var(--pg-accent)" />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Focus
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
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <Eye size={12} color="var(--pg-accent)" />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Current Decision
                  </h2>
                  <p style={{ 
                    fontSize: '9px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    Focus Mode
                  </p>
                </div>
              </div>
              <PickleGlass
                isButton
                onClick={handleDismiss}
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
                <X size={12} color="var(--pg-primary)" />
              </PickleGlass>
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Decision Title */}
              <PickleGlass style={{
                borderRadius: '12px',
                padding: '12px',
                background: 'transparent',
                border: '1px solid var(--pg-red-glass-border)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
              }}>
                <h3 style={{
                  color: 'var(--pg-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  margin: 0,
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}>
                  {currentDecision}
                </h3>
                
                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginBottom: '8px',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--pg-primary), var(--pg-accent))',
                      borderRadius: '2px',
                    }}
                  />
                </div>
                
                <div style={{
                  fontSize: '11px',
                  color: 'var(--pg-secondary)',
                  fontWeight: 500
                }}>
                  Analysis {progress}% complete
                </div>
              </PickleGlass>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: 'auto',
              }}>
                <PickleGlass
                  isButton
                  onClick={handleView}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    background: 'transparent',
                    backdropFilter: 'blur(20px) saturate(130%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(130%)',
                    color: 'var(--pg-accent)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: '1px solid var(--pg-red-glass-border)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  View
                  <ChevronRight size={12} />
                </PickleGlass>
                <PickleGlass
                  isButton
                  onClick={handleDismiss}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    background: 'transparent',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    color: 'var(--pg-primary)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: '1px solid var(--pg-red-glass-border)',
                  }}
                >
                  Dismiss
                </PickleGlass>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PickleGlassOverlay>
  );
};

export default FocusOverlay;
