import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Minimize2 } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay } from './PickleGlass';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface MeetingOverlayProps {
  isExpanded?: boolean;
}

const MeetingOverlay: React.FC<MeetingOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
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
          <Video size={16} color="var(--pg-accent)" />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Meeting
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
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <Video size={16} color="var(--pg-accent)" />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Meeting Intelligence
                  </h2>
                  <p style={{ 
                    fontSize: '11px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    Real-time Meeting Analytics
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

            {/* Meeting Status */}
            <div className="polished-glass-card red-tint" style={{
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                🎥 Meeting Intelligence
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--pg-primary)' }}>
                    Decision Meeting
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>
                    23:45 elapsed • 6 participants
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: '#ef4444', 
                    animation: 'pulse 2s infinite' 
                  }}></div>
                  <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 500 }}>LIVE</span>
                </div>
              </div>
            </div>

            {/* Speaking Time */}
            <div className="polished-glass-card blue-tint" style={{
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                🎤 Speaking Time Analysis
              </div>
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
                      background: active ? 'var(--pg-accent)' : '#6b7280',
                      boxShadow: active ? '0 0 6px var(--pg-accent)' : 'none'
                    }}></div>
                    <span style={{ fontSize: '12px', color: 'var(--pg-primary)', flex: 1 }}>{name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>{time}</span>
                    <div style={{ 
                      width: '40px', 
                      height: '4px', 
                      background: 'rgba(0,0,0,0.1)', 
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${percentage}%`, 
                        height: '100%', 
                        background: active ? 'var(--pg-accent)' : '#8b5cf6',
                        borderRadius: '2px'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Coverage */}
            <div className="polished-glass-card green-tint" style={{
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                ✅ Decision Coverage
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--pg-accent)' }}>73%</div>
                  <div style={{ fontSize: '10px', color: 'var(--pg-secondary)' }}>Topics Covered</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#f59e0b' }}>4</div>
                  <div style={{ fontSize: '10px', color: 'var(--pg-secondary)' }}>Missing Points</div>
                </div>
              </div>
            </div>

            {/* AI Meeting Notes */}
            <div className="polished-glass-card purple-tint" style={{
              flex: 1,
              padding: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                📝 AI Meeting Notes
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--pg-primary)' }}>
                  🎯 <strong>Key Point:</strong> Salary negotiation is priority
                </div>
                <div style={{ fontSize: '11px', color: 'var(--pg-primary)' }}>
                  ⚠️ <strong>Concern:</strong> Work-life balance not discussed
                </div>
                <div style={{ fontSize: '11px', color: 'var(--pg-primary)' }}>
                  💡 <strong>Suggestion:</strong> Request tech stack details
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PickleGlassOverlay>
  );
};

export default MeetingOverlay;