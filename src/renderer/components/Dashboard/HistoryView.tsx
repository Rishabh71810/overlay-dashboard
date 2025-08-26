import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import theme from '../../styles/theme';

const HistoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
      <h1 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.lg }}>
        <span style={{ color: theme.colors.text.red }}>Decision</span> History
      </h1>

      {/* Search and Filter Bar */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
      }}>
        <div style={{
          flex: 1,
          position: 'relative',
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
              padding: '10px 12px 10px 40px',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              fontSize: '14px',
              outline: 'none',
              background: theme.colors.backgroundWhite,
              color: theme.colors.text.primary,
            }}
          />
        </div>

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
          background: theme.colors.backgroundWhite,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: theme.colors.text.primary,
        }}>
          <Filter size={16} />
          More Filters
        </button>

        <button style={{
          padding: '10px 16px',
          background: theme.colors.text.primary,
          color: theme.colors.backgroundWhite,
          border: 'none',
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
        }}>
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Decisions Table */}
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
                    background: 'transparent',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.sm,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    color: theme.colors.text.secondary,
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
    </div>
  );
};

export default HistoryView;