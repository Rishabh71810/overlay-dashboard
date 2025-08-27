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
  Target,
  Menu
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    // Use both resize and orientationchange for better mobile detection
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkMobile, 100); // Small delay for orientation change
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

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
    <div className="dashboard-container" style={{
      display: 'flex',
      height: '100vh',
      background: theme.colors.background,
      fontFamily: theme.fonts.sans,
      position: 'relative',
      padding: '12px',
      gap: '12px',
    }}>
      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: '12px',
            left: '12px',
            width: '280px',
            height: 'calc(100vh - 24px)',
            background: theme.colors.glass.primary,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
                      border: 'none',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.35), inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Mobile Sidebar Content - same as desktop */}
          {/* Logo Container with Glassmorphic Effect */}
          <div style={{
            padding: '20px',
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.10))',
              backdropFilter: 'blur(12px) saturate(180%)',
              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '18px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
              position: 'relative',
              width: 'fit-content',
            }}>
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <img 
                  src={decisionAiLogo}
                  alt="MyDecisions Logo"
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    filter: 'brightness(1.2)',
                  }}
                />
              </motion.div>
              
              {/* Brand Text */}
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.5px',
              }}>
                My<span style={{ color: theme.colors.text.red }}>Decisions</span>
              </div>
              
              {/* Shine Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                borderRadius: '18px 18px 0 0',
              }} />
            </div>
          </div>
          
          {/* Navigation */}
          <nav style={{ flex: 1, padding: '12px' }}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id as ViewType);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '4px',
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    background: isActive ? theme.colors.glass.red : 'transparent',
                    color: theme.colors.text.primary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Sidebar - Only visible on desktop */}
      {!isMobile && (
        <motion.div
          data-sidebar="desktop"
          animate={{ 
            width: sidebarCollapsed ? 60 : 240
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
            border: 'none',
            borderRadius: theme.borderRadius.lg,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
            height: 'calc(100vh - 24px)',
          }}
        >
        {/* Logo Container with Glassmorphic Effect */}
        <div style={{
          padding: '20px',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sidebarCollapsed ? '0' : '12px',
            padding: sidebarCollapsed ? '12px' : '12px 16px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.10))',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: sidebarCollapsed ? '50%' : '18px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
            position: 'relative',
            width: sidebarCollapsed ? 'fit-content' : 'fit-content',
            transition: 'all 0.3s ease',
          }}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <img 
                src={decisionAiLogo}
                alt="MyDecisions Logo"
                style={{
                  width: '28px',
                  height: '28px',
                  objectFit: 'contain',
                  filter: 'brightness(1.2)',
                }}
              />
            </motion.div>
            
            {/* Brand Text - only show when not collapsed */}
            {!sidebarCollapsed && (
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.5px',
              }}>
                My<span style={{ color: theme.colors.text.red }}>Decisions</span>
              </div>
            )}
            
            {/* Shine Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
              borderRadius: sidebarCollapsed ? '50% 50% 0 0' : '18px 18px 0 0',
            }} />
          </div>
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
                  background: isActive ? theme.colors.glass.red : 'transparent',
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
                    e.currentTarget.style.background = theme.colors.glass.secondary;
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
          borderTop: 'none',
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
              background: theme.colors.glass.secondary,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.text.primary,
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
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
      )}

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        height: 'calc(100vh - 24px)',
      }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
          border: 'none',
          borderRadius: '24px 24px 0 0',
          padding: isMobile ? '12px 16px' : '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '24px' }}>
            <button
              onClick={() => isMobile ? setMobileMenuOpen(!mobileMenuOpen) : setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              {isMobile ? (
                <Menu size={20} color={theme.colors.text.primary} />
              ) : (
              <LayoutDashboard size={20} color={theme.colors.text.secondary} />
              )}
            </button>
            
            {/* Mobile Logo in Header with Glassmorphic Container */}
            {isMobile && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.10))',
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
                position: 'relative',
              }}>
                <img 
                  src={decisionAiLogo}
                  alt="MyDecisions Logo"
                  style={{
                    width: '24px',
                    height: '24px',
                    objectFit: 'contain',
                    filter: 'brightness(1.2)',
                  }}
                />
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '0.3px',
                }}>
                  My<span style={{ color: theme.colors.text.red }}>Decisions</span>
                </div>
                
                {/* Shine Effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                  borderRadius: '14px 14px 0 0',
                }} />
              </div>
            )}
            
            {!isMobile && (
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
                  border: 'none',
                  borderRadius: theme.borderRadius.md,
                  width: '300px',
                  fontSize: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#ffffff',
                }}
              />
            </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
            <button style={{
              padding: isMobile ? '8px' : '8px 16px',
              background: theme.colors.button.primary,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#ffffff',
              border: `1px solid ${theme.colors.glass.redBorder}`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              <Plus size={16} />
              {!isMobile && 'New Decision'}
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
          padding: isMobile ? '16px' : '24px',
          overflow: 'auto',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
          border: 'none',
          borderTop: 'none',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        }}>
          {/* Large Glass Card Container */}
          <div style={{
            width: '100%',
            minHeight: isMobile ? 'calc(100vh - 200px)' : 'calc(100vh - 180px)',
            borderRadius: '24px',
            padding: isMobile ? '20px' : '32px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
            border: 'none',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.35), inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      <h1 className={isMobile ? 'mobile-title' : ''} style={{ 
        fontSize: isMobile ? '20px' : '28px', 
        fontWeight: 600, 
        color: theme.colors.text.primary, 
        marginBottom: '8px' 
      }}>
        Welcome back, John! 👋
      </h1>
      <p className={isMobile ? 'mobile-subtitle' : ''} style={{ 
        fontSize: isMobile ? '14px' : '16px', 
        color: theme.colors.text.secondary, 
        marginBottom: isMobile ? '24px' : '32px' 
      }}>
        Your AI-powered <span style={{ color: theme.colors.text.red }}>decision</span> intelligence platform
      </p>

      <QuickStats />

      {/* Main Content Grid */}
      <div className={isMobile ? 'mobile-stack' : ''} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: isMobile ? '16px' : '24px',
        marginTop: '0px',
      }}>
        {/* Left Column - Recent Decisions */}
        <div className="premium-nested" style={{
          padding: isMobile ? '16px' : '24px',
          borderRadius: '18px',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03))',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.05)',
          position: 'relative',
        }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: theme.colors.text.primary, 
            marginBottom: '20px' 
        }}>
          Recent Decisions
        </h2>
        
        <div style={{
            display: 'flex',
            flexDirection: 'column',
          gap: '16px',
        }}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="premium-card"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05))',
                borderRadius: '18px',
                padding: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
                position: 'relative',
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
                  background: theme.colors.successGlass,
                  color: theme.colors.success,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
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

        {/* Right Column - Active Workspaces */}
        <div className="premium-nested" style={{
          padding: isMobile ? '16px' : '24px',
          borderRadius: '18px',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.03))',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.05)',
          position: 'relative',
        }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: theme.colors.text.primary, 
            marginBottom: '20px' 
        }}>
          Active Workspaces
        </h2>
        
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
        }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                borderBottom: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: i === 1 ? `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0` : i === 3 ? `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}` : '0',
                background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.text.red,
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
                        background: theme.colors.glass.secondary,
                        border: 'none',
                        marginLeft: j > 1 ? '-8px' : 0,
                      }}
                    />
                  ))}
                </div>
                <button style={{
                  padding: '6px 12px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                }}>
                  View
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;