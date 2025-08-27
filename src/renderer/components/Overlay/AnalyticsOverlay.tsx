import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Minimize2 } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay } from './PickleGlass';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface AnalyticsOverlayProps {
  isExpanded?: boolean;
}

const AnalyticsOverlay: React.FC<AnalyticsOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
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
          <BarChart3 size={16} color="var(--pg-accent)" />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Analytics
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
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <BarChart3 size={16} color="var(--pg-accent)" />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Analytics Intelligence
                  </h2>
                  <p style={{ 
                    fontSize: '11px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    Data Visualization & Metrics
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

            {/* Decision Score Card */}
            <div className="polished-glass-card blue-tint" style={{
              padding: '20px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                📊 Decision Score
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>7.8</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: 'var(--pg-secondary)', marginBottom: '8px' }}>
                    Confidence Distribution
                  </div>
                  <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                    <div style={{ flex: 2, background: 'var(--pg-accent)', borderRadius: '2px' }}></div>
                    <div style={{ flex: 1, background: '#f59e0b', borderRadius: '2px' }}></div>
                    <div style={{ flex: 0.5, background: '#ef4444', borderRadius: '2px' }}></div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--pg-secondary)', marginTop: '4px' }}>
                    78% Confidence • 32% Risk • 3 Days Timeline
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="polished-glass-card orange-tint" style={{
                padding: '16px',
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: 'var(--pg-primary)',
                  marginBottom: '8px'
                }}>
                  ⚠️ Risk Level
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>Medium</div>
                <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>32% risk factors</div>
              </div>

              <div className="polished-glass-card purple-tint" style={{
                padding: '16px',
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: 'var(--pg-primary)',
                  marginBottom: '8px'
                }}>
                  ⏱️ Timeline
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>3 Days</div>
                <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>Optimal window</div>
              </div>
            </div>

            {/* Historical Performance */}
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
                📈 Historical Performance
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--pg-secondary)' }}>Similar Decisions</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pg-accent)' }}>87% Success Rate</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', height: '4px' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      flex: 1, 
                      background: Math.random() > 0.13 ? 'var(--pg-accent)' : '#ef4444',
                      borderRadius: '1px' 
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Stakeholder Impact */}
            <div className="polished-glass-card red-tint" style={{
              flex: 1,
              padding: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                👥 Stakeholder Impact Analysis
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Team Members', impact: 'High Impact', color: '#ef4444' },
                  { name: 'Customers', impact: 'Medium Impact', color: '#f59e0b' },
                  { name: 'Budget', impact: 'Low Impact', color: 'var(--pg-accent)' },
                ].map(({ name, impact, color }) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--pg-primary)' }}>{name}</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color }}>{impact}</span>
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

export default AnalyticsOverlay;