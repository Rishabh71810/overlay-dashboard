import React from 'react';
import { motion } from 'framer-motion';
import theme from '../../styles/theme';

interface AIAnalysisProps {
  decision: string;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ decision }) => {
  const agents = [
    { 
      name: 'Optimist', 
      opinion: 'Great growth opportunity with high potential returns',
      confidence: 85
    },
    { 
      name: 'Analyst', 
      opinion: 'ROI positive after 18 months based on market data',
      confidence: 78
    },
    { 
      name: 'Pragmatist', 
      opinion: 'Consider negotiating 15% higher before accepting',
      confidence: 92
    },
  ];

  if (!decision) {
    return (
      <div className="glass-card" style={{
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        fontSize: '13px',
        color: theme.colors.text.muted,
        textAlign: 'center',
      }}>
        Enter a <span style={{ color: theme.colors.text.red }}>decision</span> to see AI analysis
      </div>
    );
  }

  return (
    <div className="glass-card" style={{
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    }}>
      <h3 style={{ 
        fontSize: '14px', 
        fontWeight: 600, 
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        🤖 Multi-Agent AI <span style={{ color: theme.colors.text.red }}>Debate</span>
      </h3>

      {agents.map((agent, index) => (
        <motion.div
          key={agent.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            marginBottom: theme.spacing.sm,
            padding: theme.spacing.sm,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: theme.borderRadius.md,
            borderLeft: `3px solid ${theme.colors.text.primary}`,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: theme.colors.text.primary,
            }}>
              {agent.name}
            </span>
            <span style={{
              fontSize: '10px',
              color: theme.colors.text.secondary,
              background: theme.colors.backgroundWhite,
              padding: '2px 6px',
              borderRadius: theme.borderRadius.sm,
              border: `1px solid ${theme.colors.border}`,
            }}>
              {agent.confidence}% confident
            </span>
          </div>
          <p style={{
            fontSize: '11px',
            color: theme.colors.text.secondary,
            margin: 0,
            lineHeight: 1.4,
          }}>
            {agent.opinion}
          </p>
        </motion.div>
      ))}

      {/* Consensus Summary */}
      <div style={{
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: theme.borderRadius.md,
        fontSize: '12px',
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.text.red}20`,
        borderLeft: `3px solid ${theme.colors.text.red}`,
      }}>
        <strong>Consensus:</strong> Proceed with caution, negotiate terms first
      </div>
    </div>
  );
};

export default AIAnalysis;