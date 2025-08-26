import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2, Settings, Move, Sparkles, MessageSquare, Target, Users, Lock, Send, Mic, Paperclip, Zap } from 'lucide-react';
import { PickleGlass, PickleGlassInput, PickleGlassBadge, PickleGlassOverlay } from './PickleGlass';
import DecisionPipeline from './DecisionPipeline';
import DualModeChat from './DualModeChat';
import AIAnalysis from './AIAnalysis';
import theme from '../../styles/theme';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import './pickle-glass.css';

interface DecisionHubPickleProps {
  isExpanded?: boolean;
}

const DecisionHubPickle: React.FC<DecisionHubPickleProps> = ({ isExpanded: initialExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [chatMode, setChatMode] = useState<'individual' | 'shared'>('individual');
  const [currentDecision, setCurrentDecision] = useState<string>('Enter a decision to see AI analysis');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
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
      width={isExpanded ? 420 : 72}
      height={isExpanded ? 600 : 32}
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
            padding: '0 8px',
            gap: '6px',
          }}
        >
                     <img 
                       src={decisionAiLogo} 
                       alt="MyDecisions" 
                       style={{ 
                         width: '12px',
                         height: '12px',
                         objectFit: 'contain',
                         filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' 
                       }}
                     />
                     <span style={{ 
             color: 'var(--pg-accent)', 
             fontSize: '10px', 
             fontWeight: 600,
             letterSpacing: '-0.02em'
           }}>
            MyDecisions
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
                  <img 
                    src={decisionAiLogo} 
                    alt="MyDecisions" 
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      objectFit: 'contain',
                      filter: 'hue-rotate(0deg) saturate(2) brightness(0.7)'  // Make logo red-tinted
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
                    MyDecisions Assistant
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

            {/* Decision Input */}
            <PickleGlass style={{
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '12px',
              background: 'transparent',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid var(--pg-red-glass-border)',
            }}>
              <PickleGlassInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a decision to see AI analysis"
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
                  verticalAlign: 'middle',
                }}
              />
            </PickleGlass>

            {/* Simple Decision Pipeline Indicator */}
            <PickleGlass style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '8px',
              padding: '8px 12px',
              marginBottom: '16px',
                             background: 'transparent',
              border: '1px solid var(--pg-glass-border)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--pg-primary)', fontWeight: 500 }}>📊 Decision Progress</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '65%',
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--pg-primary), var(--pg-accent))',
                    borderRadius: '2px',
                  }} />
                </div>
                <span style={{ fontSize: '10px', color: 'var(--pg-secondary)', fontWeight: 500 }}>65%</span>
              </div>
            </PickleGlass>

            {/* Dual Mode Toggle */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
            }}>
              <PickleGlass
                isButton
                onClick={() => setChatMode('individual')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                                     background: 'transparent',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  color: chatMode === 'individual' ? 'var(--pg-accent)' : 'var(--pg-primary)',
                  border: `2px solid ${chatMode === 'individual' ? 'var(--pg-red-glass-border)' : 'var(--pg-red-glass-border)'}`,
                  boxShadow: chatMode === 'individual' ? '0 4px 12px rgba(239, 68, 68, 0.2)' : 'none',
                }}
              >
                <Lock size={12} />
                Individual
              </PickleGlass>
              <PickleGlass
                isButton
                onClick={() => setChatMode('shared')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                                     background: 'transparent',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  color: chatMode === 'shared' ? 'var(--pg-accent)' : 'var(--pg-primary)',
                  border: `2px solid ${chatMode === 'shared' ? 'var(--pg-red-glass-border)' : 'var(--pg-red-glass-border)'}`,
                  boxShadow: chatMode === 'shared' ? '0 4px 12px rgba(239, 68, 68, 0.2)' : 'none',
                }}
              >
                <Users size={12} />
                Shared
              </PickleGlass>
            </div>

            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginBottom: '16px',
            }}>
              {/* Confidence */}
              <PickleGlass style={{
                borderRadius: '12px',
                padding: '12px 8px',
                textAlign: 'center',
                background: 'transparent',
                border: '2px solid var(--pg-red-glass-border)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#3B82F6',  // Blue for confidence
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
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
              </PickleGlass>
              
              {/* Bias Risk */}
              <PickleGlass style={{
                borderRadius: '12px',
                padding: '12px 8px',
                textAlign: 'center',
                background: 'transparent',
                border: '2px solid var(--pg-red-glass-border)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#06B6D4',  // Cyan for bias risk
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                }}>
                  Low
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '2px',
                  fontWeight: 500
                }}>
                  Bias Risk
                </div>
              </PickleGlass>
              
              {/* Alignment */}
              <PickleGlass style={{
                borderRadius: '12px',
                padding: '12px 8px',
                textAlign: 'center',
                background: 'transparent',
                border: '2px solid var(--pg-red-glass-border)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: '#22C55E',  // Green for alignment
                  lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                }}>
                  92%
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--pg-secondary)',
                  marginTop: '2px',
                  fontWeight: 500
                }}>
                  Alignment
                </div>
              </PickleGlass>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
            }}>
              <PickleGlass
                isButton
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                                       background: 'transparent',
                  backdropFilter: 'blur(20px) saturate(130%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(130%)',
                  color: 'var(--pg-accent)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  border: '1px solid var(--pg-red-glass-border)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
              >
                <MessageSquare size={14} />
                Start Analysis
              </PickleGlass>
              <PickleGlass
                isButton
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'transparent',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  color: 'var(--pg-primary)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  border: '1px solid var(--pg-red-glass-border)',
                }}
              >
                <Target size={14} />
                View History
              </PickleGlass>
            </div>

            {/* Chat Area */}
            <PickleGlass style={{
              flex: 1,
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '200px',
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--pg-red-glass-border)',
            }}>
              {/* Chat Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--pg-glass-border)',
              }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--pg-primary)',
                }}>
                  💬 AI Assistant
                </span>
                <span                 style={{
                  fontSize: '10px',
                  color: chatMode === 'individual' ? 'var(--pg-primary)' : 'var(--pg-accent)',
                  background: 'transparent',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  fontWeight: 500,
                  border: `1px solid var(--pg-red-glass-border)`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}>
                  {chatMode === 'individual' ? '🔒 Private' : '👥 Team'}
                </span>
              </div>

              {/* Chat Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: '12px',
              }}>
                <PickleGlass style={{
                  background: 'transparent',
                  borderRadius: '8px',
                  padding: '8px',
                  marginBottom: '8px',
                  border: '1px solid var(--pg-red-glass-border)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)',
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--pg-primary)',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    AI: Based on your decision DNA,
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--pg-secondary)',
                    lineHeight: 1.4,
                  }}>
                    this aligns with your values...
                  </div>
                </PickleGlass>
              </div>

              {/* Chat Input */}
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'stretch',
                width: '100%',
              }}>
                <div style={{
                  flex: '1 1 0%',
                  background: 'transparent',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid var(--pg-red-glass-border)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <input
                    placeholder="Type your thoughts here..."
                    style={{
                      flex: 1,
                      fontSize: '11px',
                      color: 'var(--pg-primary)',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      lineHeight: '1.4',
                      height: 'auto',
                      minHeight: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                </div>
                <PickleGlass
                  isButton
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'transparent',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--pg-red-glass-border)',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    minWidth: '32px',
                    minHeight: '32px',
                    flexShrink: 0,
                  }}
                >
                                     <Send size={12} color="var(--pg-accent)" />
                </PickleGlass>
              </div>

              {/* Quick Actions */}
              <div style={{
                display: 'flex',
                gap: '6px',
                marginTop: '8px',
              }}>
                {[
                  { icon: Mic, label: 'Voice' },
                  { icon: Paperclip, label: 'Attach' },
                  { icon: Zap, label: 'Quick' }
                ].map(({ icon: Icon, label }) => (
                  <PickleGlass
                    key={label}
                    isButton
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: 'var(--pg-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'transparent',
                      border: '1px solid var(--pg-red-glass-border)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      opacity: 0.8,
                    }}
                  >
                    <Icon size={10} />
                    {label}
                  </PickleGlass>
                ))}
              </div>
            </PickleGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </PickleGlassOverlay>
  );
};

export default DecisionHubPickle;