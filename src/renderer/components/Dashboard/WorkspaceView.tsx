import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Video, MessageSquare, FileText, Vote, Lock, Globe } from 'lucide-react';
import theme from '../../styles/theme';

const WorkspaceView: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const workspaces = [
    {
      id: 1,
      name: 'Product Launch Q4',
      description: 'Strategic planning for Q4 product launch',
      members: 12,
      activeDecisions: 3,
      status: 'active',
      privacy: 'shared',
      lastActivity: '2 minutes ago',
    },
    {
      id: 2,
      name: 'Budget Allocation 2024',
      description: 'Annual budget planning and resource allocation',
      members: 8,
      activeDecisions: 5,
      status: 'voting',
      privacy: 'private',
      lastActivity: '1 hour ago',
    },
    {
      id: 3,
      name: 'Engineering Roadmap',
      description: 'Technical architecture and development priorities',
      members: 15,
      activeDecisions: 7,
      status: 'active',
      privacy: 'shared',
      lastActivity: '3 hours ago',
    },
  ];

  const activities = [
    { user: 'Sarah Chen', action: 'started a vote', target: 'Feature Priority Matrix', time: '2 min ago' },
    { user: 'Mike Johnson', action: 'added analysis', target: 'Market Research Doc', time: '15 min ago' },
    { user: 'Emily Davis', action: 'invited 3 members to', target: 'Budget Discussion', time: '1 hour ago' },
    { user: 'AI Assistant', action: 'completed analysis for', target: 'Risk Assessment', time: '2 hours ago' },
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? theme.spacing.md : 0,
        marginBottom: theme.spacing.lg,
      }}>
        <h1 style={{ 
          fontSize: isMobile ? '20px' : '24px', 
          fontWeight: 600, 
          color: theme.colors.text.primary 
        }}>
          Collaborative <span style={{ color: theme.colors.text.red }}>Workspaces</span>
        </h1>
        <button style={{
          padding: isMobile ? '12px 20px' : '10px 20px',
          background: theme.colors.text.red,
          color: '#ffffff',
          border: 'none',
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          fontSize: '14px',
          fontWeight: 600,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        }}>
          <Plus size={16} />
          Create Workspace
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 300px',
        gap: theme.spacing.lg,
      }}>
        {/* Workspaces List */}
        <div style={{
          order: isMobile ? 1 : 0,
        }}>
          <div style={{
            display: 'grid',
            gap: theme.spacing.md,
          }}>
            {workspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveWorkspace(index)}
                style={{
                  background: theme.colors.backgroundWhite,
                  borderRadius: theme.borderRadius.lg,
                  padding: '20px',
                  border: activeWorkspace === index 
                    ? `2px solid ${theme.colors.text.red}` 
                    : `1px solid ${theme.colors.border}`,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* Status Badge */}
                <div style={{
                  position: isMobile ? 'static' : 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '4px 8px',
                  background: workspace.status === 'voting' 
                    ? theme.colors.warning + '20' 
                    : theme.colors.success + '20',
                  color: workspace.status === 'voting' 
                    ? theme.colors.warning 
                    : theme.colors.success,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: '12px',
                  fontWeight: 500,
                  display: 'inline-block',
                  marginBottom: isMobile ? '12px' : 0,
                  width: 'fit-content',
                }}>
                  {workspace.status === 'voting' ? 'Voting in Progress' : 'Active'}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: theme.spacing.md,
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Users size={24} color="white" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      marginBottom: '4px',
                    }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: 600, 
                        color: theme.colors.text.primary 
                      }}>
                        {workspace.name}
                      </h3>
                      {workspace.privacy === 'private' ? (
                        <Lock size={14} color={theme.colors.text.secondary} />
                      ) : (
                        <Globe size={14} color={theme.colors.text.secondary} />
                      )}
                    </div>
                    
                    <p style={{ 
                      fontSize: '14px', 
                      color: theme.colors.text.secondary, 
                      marginBottom: theme.spacing.md 
                    }}>
                      {workspace.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: isMobile ? '12px' : '20px',
                      fontSize: isMobile ? '12px' : '13px',
                      color: theme.colors.text.secondary,
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={14} />
                        {workspace.members} members
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={14} />
                        {workspace.activeDecisions} <span style={{ color: theme.colors.text.red }}>decisions</span>
                      </span>
                      <span>
                        Last activity: {workspace.lastActivity}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      flexWrap: isMobile ? 'wrap' : 'nowrap',
                      gap: theme.spacing.sm,
                      marginTop: theme.spacing.md,
                    }}>
                      <button style={{
                        padding: '6px 12px',
                        background: theme.colors.text.red,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: theme.borderRadius.md,
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                      }}>
                        Enter Workspace
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        borderRadius: theme.borderRadius.md,
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      }}>
                        <Video size={14} />
                        Join Meeting
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        borderRadius: theme.borderRadius.md,
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      }}>
                        <MessageSquare size={14} />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{
          background: theme.colors.backgroundWhite,
          borderRadius: theme.borderRadius.lg,
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
          height: 'fit-content',
          order: isMobile ? 0 : 1,
          marginBottom: isMobile ? theme.spacing.md : 0,
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}>
            Recent Activity
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
            {activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  paddingBottom: theme.spacing.md,
                  borderBottom: index < activities.length - 1 
                    ? `1px solid ${theme.colors.border}` 
                    : 'none',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: theme.spacing.sm,
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: activity.user === 'AI Assistant' 
                      ? theme.colors.text.primary
                      : theme.colors.background,
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '13px',
                      color: theme.colors.text.primary,
                      lineHeight: 1.5,
                    }}>
                      <strong>{activity.user}</strong> {activity.action}{' '}
                      <strong>{activity.target}</strong>
                    </p>
                    <span style={{
                      fontSize: '12px',
                      color: theme.colors.text.muted,
                    }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Decisions in Selected Workspace */}
      {activeWorkspace !== null && (
        <div style={{
          marginTop: theme.spacing.xl,
          background: theme.colors.backgroundWhite,
          borderRadius: theme.borderRadius.lg,
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}>
            Active <span style={{ color: theme.colors.text.red }}>Decisions</span> in {workspaces[activeWorkspace].name}
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: theme.spacing.md,
          }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
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
                  gap: theme.spacing.sm,
                  marginBottom: theme.spacing.sm,
                }}>
                  <Vote size={16} color={theme.colors.text.red} />
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    color: theme.colors.text.primary 
                  }}>
                    Decision #{i}
                  </h4>
                </div>
                <p style={{ 
                  fontSize: '13px', 
                  color: theme.colors.text.secondary, 
                  marginBottom: theme.spacing.md 
                }}>
                  Critical <span style={{ color: theme.colors.text.red }}>decision</span> requiring team input
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: theme.colors.text.muted 
                  }}>
                    3/5 votes
                  </span>
                  <button style={{
                    padding: '4px 8px',
                    background: theme.colors.text.red,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: theme.borderRadius.sm,
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                  }}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceView;