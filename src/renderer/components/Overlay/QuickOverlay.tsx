import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Minimize2 } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay, PickleGlassInput } from './PickleGlass';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface QuickOverlayProps {
  isExpanded?: boolean;
}

const QuickOverlay: React.FC<QuickOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

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
          <Zap size={16} color="var(--pg-accent)" />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Quick
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
                  boxShadow: '0 4px 12px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <Zap size={16} color="var(--pg-accent)" />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Quick Decision
                  </h2>
                  <p style={{ 
                    fontSize: '11px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    Rapid Decision Tools
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

            {/* Quick Decision Input */}
            <div className="polished-glass-card orange-tint" style={{
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                ⚡ Quick Decision Input
              </div>
              <PickleGlassInput
                placeholder="Describe your decision quickly..."
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
                  height: '60px',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <PickleGlass
                  isButton
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'transparent',
                    backdropFilter: 'blur(20px) saturate(130%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(130%)',
                    border: '1px solid var(--pg-red-glass-border)',
                    borderRadius: '8px',
                    color: 'var(--pg-accent)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🎯 Analyze
                </PickleGlass>
                <PickleGlass
                  isButton
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'transparent',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid var(--pg-red-glass-border)',
                    borderRadius: '8px',
                    color: 'var(--pg-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🎲 Random
                </PickleGlass>
              </div>
            </div>

            {/* Instant Verdict */}
            <div className="polished-glass-card green-tint" style={{
              padding: '20px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                🎯 Instant Verdict
              </div>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--pg-accent)', marginBottom: '4px' }}>
                GO FOR IT
              </div>
              <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>
                87% confidence • Low risk
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div className="polished-glass-card blue-tint" style={{
                padding: '16px 12px',
                textAlign: 'center',
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#FFFFFF',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                }}>
                  89%
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '2px',
                  fontWeight: 500
                }}>
                  Confidence
                </div>
              </div>
              
              <div className="polished-glass-card cyan-tint" style={{
                padding: '16px 12px',
                textAlign: 'center',
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#FFFFFF',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                }}>
                  Low
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '2px',
                  fontWeight: 500
                }}>
                  Risk
                </div>
              </div>
              
              <div className="polished-glass-card purple-tint" style={{
                padding: '16px 12px',
                textAlign: 'center',
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#FFFFFF',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                }}>
                  ⚡
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '2px',
                  fontWeight: 500
                }}>
                  Speed
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div 
                className="polished-glass-card orange-tint"
                style={{
                  flex: 1,
                  padding: '14px',
                  color: 'var(--pg-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                🎲 Coin Flip
              </div>
              <div
                className="polished-glass-card purple-tint"
                style={{
                  flex: 1,
                  padding: '14px',
                  color: 'var(--pg-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                🔮 Magic 8
              </div>
            </div>

            {/* Recent Decisions */}
            <div className="polished-glass-card" style={{
              flex: 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '120px',
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--pg-primary)',
                marginBottom: '12px',
              }}>
                ⏱️ Recent Quick Decisions
              </div>
              
              <div style={{
                flex: 1,
                overflowY: 'auto',
              }}>
                {[
                  { decision: "Choose restaurant", result: "Italian", time: "2h ago" },
                  { decision: "Meeting time", result: "2 PM", time: "5h ago" },
                  { decision: "Project priority", result: "Feature A", time: "1d ago" },
                ].map(({ decision, result, time }, index) => (
                  <div key={index} className="polished-glass-card blue-tint" style={{
                    padding: '12px',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--pg-primary)', fontWeight: 500 }}>{decision}</div>
                      <div style={{ fontSize: '10px', color: 'var(--pg-accent)', fontWeight: 600 }}>{result}</div>
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--pg-secondary)' }}>{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PickleGlassOverlay>
  );
};

export default QuickOverlay;