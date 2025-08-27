import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Target, Zap, Brain } from 'lucide-react';
import theme from '../../styles/theme';

const QuickStats: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stats = [
    {
      label: 'Active Decisions',
      value: '12',
      change: '+3 this week',
      color: theme.colors.text.primary,
      bgColor: theme.colors.background,
      icon: Brain,
    },
    {
      label: 'Team Members',
      value: '24',
      change: '6 active now',
      color: theme.colors.success,
      bgColor: theme.colors.success + '20',
      icon: Users,
    },
    {
      label: 'Success Rate',
      value: '89%',
      change: '+5% vs last month',
      color: theme.colors.warning,
      bgColor: theme.colors.warning + '20',
      icon: Target,
    },
    {
      label: 'Time Saved',
      value: '73%',
      change: '~16 hours/week',
      color: theme.colors.error,
      bgColor: theme.colors.error + '20',
      icon: Clock,
    },
    {
      label: 'Decision Speed',
      value: '2.3x',
      change: 'Faster than manual',
      color: theme.colors.info,
      bgColor: theme.colors.info + '20',
      icon: Zap,
    },
    {
      label: 'ROI Impact',
      value: '14.9x',
      change: '$500K+ value created',
      color: theme.colors.success,
      bgColor: theme.colors.success + '20',
      icon: TrendingUp,
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: isMobile ? '12px' : '20px',
      marginBottom: isMobile ? '24px' : '32px',
    }}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="premium-card"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05))',
              borderRadius: '18px',
              padding: isMobile ? '12px' : '20px',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
              opacity: 0.6,
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: theme.borderRadius.md,
                background: `linear-gradient(145deg, ${stat.color}30, ${stat.color}10)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={20} color={stat.color} />
              </div>
            </div>
            
            <div style={{ marginBottom: '4px' }}>
              <div style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 600,
                color: theme.colors.text.primary,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: theme.colors.text.secondary,
                marginBottom: '8px',
              }}>
                {stat.label}
              </div>
            </div>
            
            <div style={{
              fontSize: '12px',
              color: stat.color,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <TrendingUp size={12} />
              {stat.change}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickStats;