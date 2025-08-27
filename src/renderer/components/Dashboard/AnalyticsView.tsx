import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Target, BarChart3, PieChart, Activity } from 'lucide-react';
import theme from '../../styles/theme';

const AnalyticsView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      <h1 style={{ 
        fontSize: isMobile ? '20px' : '24px', 
        fontWeight: 600, 
        color: theme.colors.text.primary, 
        marginBottom: theme.spacing.lg 
      }}>
        <span style={{ color: theme.colors.text.red }}>Decision</span> Analytics & Insights
      </h1>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
      }}>
        {[
          { label: 'Decision Success Rate', value: '89%', trend: '+5%', icon: Target },
          { label: 'Avg. Decision Time', value: '2.3 hrs', trend: '-45%', icon: Clock },
          { label: 'Team Alignment', value: '94%', trend: '+12%', icon: Users },
          { label: 'ROI Impact', value: '$2.5M', trend: '+180%', icon: TrendingUp },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              style={{
                background: theme.colors.backgroundWhite,
                borderRadius: theme.borderRadius.lg,
                padding: isMobile ? '16px' : '20px',
                border: `1px solid ${theme.colors.border}`,
                position: 'relative',
                overflow: 'hidden',
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
                background: theme.colors.background,
                opacity: 0.5,
              }} />
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: theme.spacing.md,
                position: 'relative',
              }}>
                <div style={{
                  width: isMobile ? '36px' : '40px',
                  height: isMobile ? '36px' : '40px',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.background,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={isMobile ? 20 : 24} color={theme.colors.text.primary} />
                </div>
                <span style={{
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: theme.borderRadius.sm,
                  background: metric.trend.startsWith('+') 
                    ? theme.colors.success + '20' 
                    : theme.colors.error + '20',
                  color: metric.trend.startsWith('+') 
                    ? theme.colors.success 
                    : theme.colors.error,
                  fontWeight: 500,
                }}>
                  {metric.trend}
                </span>
              </div>
              <div style={{ 
                fontSize: isMobile ? '20px' : '24px', 
                fontWeight: 600, 
                color: theme.colors.text.primary, 
                marginBottom: '4px' 
              }}>
                {metric.value}
              </div>
              <div style={{ 
                fontSize: isMobile ? '13px' : '14px', 
                color: theme.colors.text.secondary 
              }}>
                {metric.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
      }}>
        {/* Decision Trend Chart */}
        <div style={{
          background: theme.colors.backgroundWhite,
          borderRadius: theme.borderRadius.lg,
          padding: isMobile ? '16px' : '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              color: theme.colors.text.primary 
            }}>
              <span style={{ color: theme.colors.text.red }}>Decision</span> Velocity Trend
            </h3>
            <Activity size={20} color={theme.colors.text.secondary} />
          </div>
          
          {/* Placeholder for chart */}
          <div style={{
            height: isMobile ? '200px' : '250px',
            background: `linear-gradient(180deg, ${theme.colors.background} 0%, transparent 100%)`,
            borderRadius: theme.borderRadius.md,
            display: 'flex',
            alignItems: 'flex-end',
            padding: isMobile ? '10px' : '20px',
            gap: isMobile ? '4px' : '8px',
          }}>
            {[40, 65, 45, 70, 85, 90, 75, 88, 92, 85, 95, 89].map((height, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  background: i === 11 ? theme.colors.text.red : theme.colors.text.primary,
                  borderRadius: '4px 4px 0 0',
                  transition: 'all 0.3s ease',
                  opacity: i === 11 ? 1 : 0.3 + (i * 0.05),
                }}
              />
            ))}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: theme.spacing.lg,
            marginTop: theme.spacing.md,
            fontSize: '12px',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                background: theme.colors.text.primary,
                borderRadius: '2px' 
              }} />
              <span style={{ color: theme.colors.text.secondary }}>Past Months</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                background: theme.colors.text.red,
                borderRadius: '2px' 
              }} />
              <span style={{ color: theme.colors.text.secondary }}>Current Month</span>
            </span>
          </div>
        </div>

        {/* Decision Types Distribution */}
        <div style={{
          background: theme.colors.backgroundWhite,
          borderRadius: theme.borderRadius.lg,
          padding: isMobile ? '16px' : '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              color: theme.colors.text.primary 
            }}>
              <span style={{ color: theme.colors.text.red }}>Decision</span> Types
            </h3>
            <PieChart size={20} color={theme.colors.text.secondary} />
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.md,
          }}>
            {[
              { type: 'Strategic', value: 35, color: theme.colors.text.primary },
              { type: 'Operational', value: 28, color: theme.colors.success },
              { type: 'Tactical', value: 22, color: theme.colors.warning },
              { type: 'Emergency', value: 15, color: theme.colors.text.red },
            ].map((item) => (
              <div key={item.type}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  fontSize: '13px',
                }}>
                  <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>
                    {item.type}
                  </span>
                  <span style={{ color: theme.colors.text.secondary }}>
                    {item.value}%
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: theme.colors.background,
                  borderRadius: theme.borderRadius.sm,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                      height: '100%',
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div style={{
        background: theme.colors.backgroundWhite,
        borderRadius: theme.borderRadius.lg,
        padding: isMobile ? '16px' : '20px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: theme.colors.text.primary, 
          marginBottom: '20px' 
        }}>
          Team Performance Metrics
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: theme.spacing.md,
        }}>
          {[
            { name: 'Sarah Chen', decisions: 42, successRate: 92, responseTime: '1.2h', avatar: '👩' },
            { name: 'Mike Johnson', decisions: 38, successRate: 88, responseTime: '1.8h', avatar: '👨' },
            { name: 'Emily Davis', decisions: 35, successRate: 90, responseTime: '1.5h', avatar: '👩‍💼' },
            { name: 'James Wilson', decisions: 31, successRate: 86, responseTime: '2.1h', avatar: '👨‍💼' },
          ].map((member) => (
            <div
              key={member.name}
              style={{
                padding: theme.spacing.md,
                background: theme.colors.background,
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
                marginBottom: theme.spacing.md,
              }}>
                <div style={{
                  width: isMobile ? '36px' : '40px',
                  height: isMobile ? '36px' : '40px',
                  borderRadius: '50%',
                  background: theme.colors.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '18px' : '20px',
                }}>
                  {member.avatar}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    color: theme.colors.text.primary 
                  }}>
                    {member.name}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: theme.colors.text.secondary 
                  }}>
                    {member.decisions} <span style={{ color: theme.colors.text.red }}>decisions</span>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                padding: theme.spacing.sm,
                background: theme.colors.backgroundWhite,
                borderRadius: theme.borderRadius.sm,
              }}>
                <div>
                  <div style={{ color: theme.colors.text.secondary }}>Success</div>
                  <div style={{ 
                    color: theme.colors.success, 
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    {member.successRate}%
                  </div>
                </div>
                <div>
                  <div style={{ color: theme.colors.text.secondary }}>Avg. Time</div>
                  <div style={{ 
                    color: theme.colors.text.primary, 
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    {member.responseTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;