import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Minimize2 } from 'lucide-react';
import { PickleGlass, PickleGlassOverlay } from './PickleGlass';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface CollaborationOverlayProps {
  isExpanded?: boolean;
}

const CollaborationOverlay: React.FC<CollaborationOverlayProps> = ({ isExpanded: initialExpanded = false }) => {
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
          <Users size={16} color="var(--pg-accent)" />
          <span style={{ 
            color: 'var(--pg-primary)', 
            fontSize: '12px', 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Team
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
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}>
                  <Users size={16} color="var(--pg-accent)" />
                </PickleGlass>
                <div>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: 'var(--pg-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Team Collaboration
                  </h2>
                  <p style={{ 
                    fontSize: '11px', 
                    color: 'var(--pg-secondary)',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    Real-time Team Features
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

            {/* Active Session Card */}
            <div className="polished-glass-card green-tint" style={{
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '8px'
              }}>
                🌐 Active Session
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--pg-primary)' }}>
                    Team Decision Room
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--pg-secondary)' }}>
                    5 participants active
                  </div>
                </div>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: 'var(--pg-accent)',
                  boxShadow: '0 0 8px var(--pg-accent)'
                }}></div>
              </div>
            </div>

            {/* Team Members */}
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
                👥 Team Members
              </div>
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
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--pg-primary)' }}>
                        {name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--pg-secondary)' }}>
                        {role}
                      </div>
                    </div>
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: status === 'active' ? 'var(--pg-accent)' : status === 'typing' ? '#f59e0b' : '#6b7280'
                    }}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Voting */}
            <div className="polished-glass-card purple-tint" style={{
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--pg-primary)',
                marginBottom: '12px'
              }}>
                🗳️ Live Voting
              </div>
              <div style={{ fontSize: '12px', color: 'var(--pg-primary)', marginBottom: '6px' }}>
                "Accept the job offer?"
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <PickleGlass
                  isButton
                  style={{
                    padding: '6px 12px',
                    background: 'transparent',
                    border: '1px solid var(--pg-red-glass-border)',
                    borderRadius: '6px',
                    color: 'var(--pg-accent)',
                    fontSize: '11px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  ✓ Yes (3)
                </PickleGlass>
                <PickleGlass
                  isButton
                  style={{
                    padding: '6px 12px',
                    background: 'transparent',
                    border: '1px solid var(--pg-red-glass-border)',
                    borderRadius: '6px',
                    color: '#ef4444',
                    fontSize: '11px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  ✗ No (1)
                </PickleGlass>
              </div>
            </div>

            {/* Shared Ideas */}
            <div className="polished-glass-card orange-tint" style={{
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
                💡 Shared Ideas
              </div>
              
              <div style={{
                flex: 1,
                overflowY: 'auto',
              }}>
                {[
                  { text: "Negotiate salary first", author: "Sarah", time: "2m ago" },
                  { text: "Consider remote work options", author: "Mike", time: "5m ago" },
                  { text: "Check their tech stack", author: "Alex", time: "8m ago" },
                ].map(({ text, author, time }, index) => (
                  <div key={index} className="polished-glass-card cyan-tint" style={{
                    padding: '12px',
                    marginBottom: '8px',
                    borderLeft: '3px solid var(--pg-accent)'
                  }}>
                    <div style={{ fontSize: '11px', color: 'var(--pg-primary)', fontWeight: 500 }}>{text}</div>
                    <div style={{ fontSize: '9px', color: 'var(--pg-secondary)', marginTop: '2px' }}>
                      {author} • {time}
                    </div>
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

export default CollaborationOverlay;