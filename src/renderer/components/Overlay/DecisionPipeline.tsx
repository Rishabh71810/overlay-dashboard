import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Lightbulb, Vote, CheckCircle, BookOpen, TrendingUp } from 'lucide-react';
import theme from '../../styles/theme';

interface DecisionPipelineProps {
  currentPhase: number;
  totalAPIs: number;
  activeAPIs: number;
}

const DecisionPipeline: React.FC<DecisionPipelineProps> = ({ 
  currentPhase, 
  totalAPIs, 
  activeAPIs 
}) => {
  const phases = [
    { id: 1, name: 'Frame', icon: FileText, apis: 15 },
    { id: 2, name: 'Analyze', icon: Search, apis: 23 },
    { id: 3, name: 'Options', icon: Lightbulb, apis: 19 },
    { id: 4, name: 'Vote', icon: Vote, apis: 12 },
    { id: 5, name: 'Commit', icon: CheckCircle, apis: 15 },
    { id: 6, name: 'Learn', icon: BookOpen, apis: 14 },
    { id: 7, name: 'Evolve', icon: TrendingUp, apis: 10 },
  ];

  const progress = (currentPhase / phases.length) * 100;

  return (
    <div style={{
      background: theme.colors.backgroundWhite,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      border: `1px solid ${theme.colors.border}`,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
      }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 600, 
          color: theme.colors.text.primary 
        }}>
          📊 <span style={{ color: theme.colors.text.red }}>Decision</span> Pipeline
        </h3>
        <span style={{ 
          fontSize: '11px', 
          color: theme.colors.text.secondary 
        }}>
          {activeAPIs}/{totalAPIs} APIs Active
        </span>
      </div>

      {/* Phase Icons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
      }}>
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.id <= currentPhase;
          const isCurrent = phase.id === currentPhase;
          
          return (
            <motion.div
              key={phase.id}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
              animate={{
                scale: isCurrent ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? theme.colors.text.primary : theme.colors.background,
                  border: isCurrent ? `2px solid ${theme.colors.text.red}` : `1px solid ${theme.colors.border}`,
                  boxShadow: isCurrent ? `0 0 0 4px ${theme.colors.text.red}20` : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <Icon size={14} color={isActive ? 'white' : theme.colors.text.secondary} />
              </div>
              <span style={{
                fontSize: '10px',
                marginTop: '4px',
                color: isActive ? theme.colors.text.primary : theme.colors.text.secondary,
                fontWeight: isCurrent ? 600 : 400,
              }}>
                {phase.name}
              </span>
              <span style={{
                fontSize: '9px',
                color: theme.colors.text.muted,
              }}>
                {phase.apis} APIs
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '4px',
        background: theme.colors.background,
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: theme.spacing.sm,
      }}>
        <motion.div
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${theme.colors.text.primary}, ${theme.colors.text.red})`,
            borderRadius: '2px',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Progress Text */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing.sm,
        fontSize: '11px',
        color: theme.colors.text.secondary,
      }}>
        <span>Progress: {Math.round(progress)}%</span>
        <span>Phase {currentPhase} of {phases.length}</span>
      </div>
    </div>
  );
};

export default DecisionPipeline;