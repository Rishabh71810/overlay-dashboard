import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import theme from '../../styles/theme';

const HistoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkMobile, 100);
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  const decisions = [
    {
      id: 1,
      title: 'Q4 Product Launch Strategy',
      date: '2024-03-15',
      status: 'completed',
      outcome: 'approved',
      participants: 12,
      confidence: 89,
      impact: 'high',
    },
    {
      id: 2,
      title: 'Budget Reallocation Proposal',
      date: '2024-03-14',
      status: 'completed',
      outcome: 'rejected',
      participants: 8,
      confidence: 67,
      impact: 'medium',
    },
    {
      id: 3,
      title: 'New Hire Approval - Engineering',
      date: '2024-03-13',
      status: 'completed',
      outcome: 'approved',
      participants: 5,
      confidence: 92,
      impact: 'medium',
    },
    {
      id: 4,
      title: 'Marketing Campaign Direction',
      date: '2024-03-12',
      status: 'in-progress',
      outcome: 'pending',
      participants: 10,
      confidence: 75,
      impact: 'high',
    },
  ];

  const getStatusIcon = (status: string, outcome: string) => {
    if (status === 'in-progress') return <Clock size={16} color={theme.colors.warning} />;
    if (outcome === 'approved') return <CheckCircle size={16} color={theme.colors.success} />;
    if (outcome === 'rejected') return <XCircle size={16} color={theme.colors.text.red} />;
    return <Clock size={16} color={theme.colors.text.secondary} />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return theme.colors.text.red;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.text.secondary;
    }
  };

  return (
    <div>
      <h1 style={{ 
        fontSize: isMobile ? '20px' : '24px', 
        fontWeight: 600, 
        color: theme.colors.text.primary, 
        marginBottom: isMobile ? '16px' : theme.spacing.lg 
      }}>
        <span style={{ color: theme.colors.text.red }}>Decision</span> History
      </h1>

      {/* Search and Filter Bar */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '12px' : theme.spacing.md,
        marginBottom: isMobile ? '20px' : theme.spacing.lg,
      }}>
        <div style={{
          flex: isMobile ? 'none' : 1,
          position: 'relative',
          width: isMobile ? '100%' : 'auto',
        }}>
          <Search size={18} color={theme.colors.text.secondary} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
          <input
            type="text"
            placeholder="Search decisions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '12px 12px 12px 40px' : '10px 12px 10px 40px',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              fontSize: isMobile ? '16px' : '14px', // Prevent zoom on iOS
              outline: 'none',
              background: theme.colors.backgroundWhite,
              color: theme.colors.text.primary,
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Mobile: Stack filters and buttons */}
        {isMobile ? (
          <>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                fontSize: '16px',
                background: theme.colors.backgroundWhite,
                color: theme.colors.text.primary,
                cursor: 'pointer',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              width: '100%',
            }}>
              <button style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid rgba(255, 255, 255, 0.2)`,
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                minHeight: '44px',
              }}>
                <Filter size={16} />
                More Filters
              </button>

              <button style={{
                flex: 1,
                padding: '12px 16px',
                background: theme.colors.text.red,
                color: '#ffffff',
                border: 'none',
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                minHeight: '44px',
              }}>
                <Download size={16} />
                Export
              </button>
            </div>
          </>
        ) : (
          <>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '10px 16px',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                fontSize: '14px',
                background: theme.colors.backgroundWhite,
                color: theme.colors.text.primary,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button style={{
              padding: '10px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#ffffff',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}>
              <Filter size={16} />
              More Filters
            </button>

            <button style={{
              padding: '10px 16px',
              background: theme.colors.text.red,
              color: '#ffffff',
              border: 'none',
              borderRadius: theme.borderRadius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              <Download size={16} />
              Export
            </button>
          </>
        )}
      </div>

      {/* Decisions Display - Cards for Mobile, Table for Desktop */}
      {isMobile ? (
        /* Mobile: Card Layout */
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {decisions.map((decision) => (
            <div
              key={decision.id}
              style={{
                background: theme.colors.backgroundWhite,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`,
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }}>
                    {getStatusIcon(decision.status, decision.outcome)}
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: theme.colors.text.primary,
                      lineHeight: '1.2',
                    }}>
                      {decision.title}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.colors.text.secondary,
                    marginBottom: '8px',
                  }}>
                    ID: <span style={{ color: theme.colors.text.red }}>DEC</span>-{decision.id.toString().padStart(4, '0')}
                  </div>
                </div>
                
                <span style={{
                  padding: '4px 8px',
                  borderRadius: theme.borderRadius.sm,
                  fontSize: '12px',
                  fontWeight: 500,
                  background: decision.status === 'completed' ? theme.colors.success + '20' : theme.colors.warning + '20',
                  color: decision.status === 'completed' ? theme.colors.success : theme.colors.warning,
                  whiteSpace: 'nowrap',
                }}>
                  {decision.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {/* Card Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px',
              }}>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.colors.text.secondary,
                    marginBottom: '4px',
                  }}>
                    Date
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: theme.colors.text.primary,
                  }}>
                    {decision.date}
                  </div>
                </div>
                
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.colors.text.secondary,
                    marginBottom: '4px',
                  }}>
                    Participants
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: theme.colors.text.primary,
                  }}>
                    {decision.participants}
                  </div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '12px',
                  color: theme.colors.text.secondary,
                  marginBottom: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span>Confidence</span>
                  <span>{decision.confidence}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: theme.colors.border,
                  borderRadius: theme.borderRadius.sm,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${decision.confidence}%`,
                    height: '100%',
                    background: decision.confidence > 80 ? theme.colors.success : decision.confidence > 60 ? theme.colors.warning : theme.colors.text.red,
                  }} />
                </div>
              </div>

              {/* Impact and Action */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getImpactColor(decision.impact),
                  }} />
                  <span style={{
                    fontSize: '14px',
                    color: theme.colors.text.secondary,
                    textTransform: 'capitalize',
                  }}>
                    {decision.impact} Impact
                  </span>
                </div>
                
                <button style={{
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid rgba(255, 255, 255, 0.2)`,
                  borderRadius: theme.borderRadius.sm,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: '#ffffff',
                  fontWeight: 500,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  minHeight: '36px',
                }}>
                  <Eye size={14} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Table Layout */
        <div style={{
          background: theme.colors.backgroundWhite,
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.border}`,
          overflow: 'hidden',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{
                background: theme.colors.background,
                borderBottom: `1px solid ${theme.colors.border}`,
              }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  <span style={{ color: theme.colors.text.red }}>Decision</span>
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  Date
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  Status
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  Participants
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  Confidence
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  Impact
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: theme.colors.text.secondary }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {decisions.map((decision, index) => (
                <tr
                  key={decision.id}
                  style={{
                    borderBottom: index < decisions.length - 1 ? `1px solid ${theme.colors.border}` : 'none',
                    background: theme.colors.backgroundWhite,
                  }}
                >
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getStatusIcon(decision.status, decision.outcome)}
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary }}>
                          {decision.title}
                        </div>
                        <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>
                          ID: <span style={{ color: theme.colors.text.red }}>DEC</span>-{decision.id.toString().padStart(4, '0')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: theme.colors.text.secondary }}>
                    {decision.date}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: theme.borderRadius.sm,
                      fontSize: '12px',
                      fontWeight: 500,
                      background: decision.status === 'completed' ? theme.colors.success + '20' : theme.colors.warning + '20',
                      color: decision.status === 'completed' ? theme.colors.success : theme.colors.warning,
                    }}>
                      {decision.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: theme.colors.text.secondary }}>
                    {decision.participants}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '100px',
                        height: '8px',
                        background: theme.colors.border,
                        borderRadius: theme.borderRadius.sm,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${decision.confidence}%`,
                          height: '100%',
                          background: decision.confidence > 80 ? theme.colors.success : decision.confidence > 60 ? theme.colors.warning : theme.colors.text.red,
                        }} />
                      </div>
                      <span style={{ fontSize: '12px', color: theme.colors.text.secondary }}>
                        {decision.confidence}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: getImpactColor(decision.impact),
                      marginRight: '8px',
                    }} />
                    <span style={{ fontSize: '14px', color: theme.colors.text.secondary, textTransform: 'capitalize' }}>
                      {decision.impact}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button style={{
                      padding: '6px 12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: `1px solid rgba(255, 255, 255, 0.2)`,
                      borderRadius: theme.borderRadius.sm,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      color: '#ffffff',
                      fontWeight: 500,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.2s ease',
                    }}>
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryView;