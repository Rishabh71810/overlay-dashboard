import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  History, 
  Settings,
  Bell,
  Search,
  Plus,
  Clock,
  Target
} from 'lucide-react';
import decisionAiLogo from '../../../assets/decision-ai-logo.png';
import WorkspaceView from './WorkspaceView';
import AnalyticsView from './AnalyticsView';
import HistoryView from './HistoryView';
import SettingsView from './SettingsView';
import QuickStats from './QuickStats';
import theme from '../../styles/theme';

type ViewType = 'dashboard' | 'workspace' | 'analytics' | 'history' | 'settings';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workspace', label: 'Workspace', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'workspace':
        return <WorkspaceView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: theme.colors.background,
      fontFamily: theme.fonts.sans,
    }}>
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarCollapsed ? 60 : 240 }}
        transition={{ duration: 0.3 }}
        style={{
          background: theme.colors.backgroundWhite,
          borderRight: `1px solid ${theme.colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${theme.colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <img 
            src={decisionAiLogo}
            alt="MyDecisions Logo"
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'contain'
            }}
          />
          {!sidebarCollapsed && (
            <span style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary }}>
              My<span style={{ color: theme.colors.text.red }}>Decisions</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px' }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '4px',
                  border: 'none',
                  borderRadius: theme.borderRadius.md,
                  background: isActive ? theme.colors.background : 'transparent',
                  color: isActive ? theme.colors.text.primary : theme.colors.text.secondary,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = theme.colors.background;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon size={20} />
                {!sidebarCollapsed && item.label}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div style={{
          padding: '16px',
          borderTop: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: theme.colors.button.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              JD
            </div>
            {!sidebarCollapsed && (
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary }}>
                  John Doe
                </div>
                <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>
                  Pro Plan
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          background: theme.colors.backgroundWhite,
          borderBottom: `1px solid ${theme.colors.border}`,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <LayoutDashboard size={20} color={theme.colors.text.secondary} />
            </button>
            
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}>
              <Search size={18} color={theme.colors.text.secondary} style={{
                position: 'absolute',
                left: '12px',
              }} />
              <input
                type="text"
                placeholder="Search decisions..."
                style={{
                  padding: '8px 12px 8px 36px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.md,
                  width: '300px',
                  fontSize: '14px',
                  background: theme.colors.backgroundWhite,
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              padding: '8px 16px',
              background: theme.colors.button.primary,
              color: theme.colors.backgroundWhite,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              <Plus size={16} />
              New Decision
            </button>
            
            <button style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}>
              <Bell size={20} color={theme.colors.text.secondary} />
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: theme.colors.text.red,
                borderRadius: '50%',
                border: `2px solid ${theme.colors.backgroundWhite}`,
              }} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={{
          flex: 1,
          padding: '24px',
          overflow: 'auto',
          background: theme.colors.background,
        }}>
          {renderView()}
        </main>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC = () => {
  return (
    <div>
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: 600, 
        color: theme.colors.text.primary, 
        marginBottom: '8px' 
      }}>
        Welcome back, John! 👋
      </h1>
      <p style={{ 
        fontSize: '16px', 
        color: theme.colors.text.secondary, 
        marginBottom: '32px' 
      }}>
        Your AI-powered <span style={{ color: theme.colors.text.red }}>decision</span> intelligence platform
      </p>

      <QuickStats />

      {/* Recent Decisions */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: theme.colors.text.primary, 
          marginBottom: '16px' 
        }}>
          Recent Decisions
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              style={{
                background: theme.colors.backgroundWhite,
                borderRadius: theme.borderRadius.lg,
                padding: '16px',
                border: `1px solid ${theme.colors.border}`,
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '12px',
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: 500, 
                  color: theme.colors.text.primary 
                }}>
                  Product Launch Strategy
                </h3>
                <span style={{
                  padding: '4px 8px',
                  background: theme.colors.success + '20',
                  color: theme.colors.success,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  Completed
                </span>
              </div>
              
              <p style={{ 
                fontSize: '14px', 
                color: theme.colors.text.secondary, 
                marginBottom: '12px' 
              }}>
                Q4 2024 product launch <span style={{ color: theme.colors.text.red }}>decision</span> with marketing and sales alignment
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: theme.colors.text.muted,
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  2 hours ago
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} />
                  8 participants
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Workspaces */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: theme.colors.text.primary, 
          marginBottom: '16px' 
        }}>
          Active Workspaces
        </h2>
        
        <div style={{
          background: theme.colors.backgroundWhite,
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.border}`,
          overflow: 'hidden',
        }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                borderBottom: i < 3 ? `1px solid ${theme.colors.border}` : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.button.primary,
                }} />
                <div>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    color: theme.colors.text.primary 
                  }}>
                    {['Engineering Team', 'Marketing Strategy', 'Budget Planning'][i-1]}
                  </h4>
                  <p style={{ 
                    fontSize: '12px', 
                    color: theme.colors.text.secondary 
                  }}>
                    {[
                      '3 active decisions, 12 members',
                      '2 active decisions, 8 members',
                      '5 active decisions, 6 members'
                    ][i-1]}
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: theme.colors.border,
                        border: `2px solid ${theme.colors.backgroundWhite}`,
                        marginLeft: j > 1 ? '-8px' : 0,
                      }}
                    />
                  ))}
                </div>
                <button style={{
                  padding: '6px 12px',
                  background: 'transparent',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: theme.colors.text.secondary,
                }}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;