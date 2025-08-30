import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface CollaboratePhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface TeamMember {
  name: string;
  status: 'active' | 'idle' | 'offline';
  contribution: number;
}

interface Discussion {
  author: string;
  message: string;
  replies?: Discussion[];
}

const CollaboratePhase: React.FC<CollaboratePhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext,
  onPrevious
}) => {
  const [teamMembers] = useState<TeamMember[]>([
    { name: 'Sarah', status: 'active', contribution: 45 },
    { name: 'John', status: 'active', contribution: 30 },
    { name: 'You', status: 'active', contribution: 15 },
    { name: 'Mike', status: 'idle', contribution: 8 },
    { name: 'Lisa', status: 'offline', contribution: 0 }
  ]);

  const [discussions] = useState<Discussion[]>([
    {
      author: 'Sarah',
      message: 'Europe expansion could 2x our revenue',
      replies: [
        {
          author: 'John',
          message: 'But GDPR compliance?',
          replies: [
            {
              author: 'You',
              message: '@John estimated cost is ~€500K first year'
            }
          ]
        }
      ]
    }
  ]);

  const [alignment] = useState({ agree: 75, disagree: 25 });
  const [inputValue, setInputValue] = useState('');

  const renderDiscussion = (discussion: Discussion, isNested = false) => (
    <div key={discussion.message} className={`discussion-message ${isNested ? 'nested' : ''}`}>
      <div className="message-author">{discussion.author}:</div>
      <div className="message-content">{discussion.message}</div>
      {discussion.replies && discussion.replies.map(reply => renderDiscussion(reply, true))}
    </div>
  );

  const handleShareThoughts = () => {
    if (inputValue.trim()) {
      // Add to discussion
      setInputValue('');
    }
  };

  return (
    <div className="phase-container collaborate-phase">
      <div className="phase-header">
        <h3>👥 COLLABORATE - Team alignment</h3>
        <p className="phase-description">
          {mode === 'individual' 
            ? "Private workspace - Refine your thoughts before sharing"
            : "Team collaboration space - Building collective intelligence"}
        </p>
      </div>

      {mode === 'individual' ? (
        <>
          <div className="collaboration-space">
            <div className="ai-suggestion">
              <div className="ai-suggestion-header">
                <span>💭</span>
                <span>PRIVATE WORKSPACE (Only you & AI)</span>
              </div>
              <div className="private-thoughts">
                <textarea
                  className="decision-input"
                  placeholder="Share your concerns privately... e.g., 'Worried about technical talent'"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="ai-response">
              <div className="ai-suggestion-header">
                <span>🤖</span>
                <span>AI Helper</span>
              </div>
              <p>Let me help structure your thoughts:</p>
              <div className="structured-options">
                <div className="option-item">A) Hire locally (6 months, €800K)</div>
                <div className="option-item">B) Remote team (2 months, €400K)</div>
                <div className="option-item">C) Acquisition (immediate, €3M)</div>
              </div>
              <p className="ai-question">Which option aligns best with your timeline?</p>
            </div>

            <div className="draft-area">
              <h4>Your draft thoughts:</h4>
              <div className="draft-content">
                <p>Prefer Option B - Remote team</p>
                <p>Key concern: Time zone coordination</p>
              </div>
              <div className="suggestion-actions">
                <button className="secondary-btn">Keep Private</button>
                <button className="primary-btn" style={{ width: 'auto' }}>
                  Share with Team →
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="collaboration-space">
            <div className="active-participants">
              <span className="participants-label">Active Now:</span>
              {teamMembers.map((member, index) => (
                <span 
                  key={index} 
                  className={`participant ${member.status === 'idle' ? 'idle' : ''}`}
                >
                  {member.name} {member.status === 'offline' && '(offline)'}
                </span>
              ))}
            </div>

            <div className="discussion-thread">
              {discussions.map(discussion => renderDiscussion(discussion))}
            </div>

            <div className="team-alignment">
              <h4>Team Alignment</h4>
              <div className="alignment-bar">
                <div 
                  className="alignment-segment agree" 
                  style={{ width: `${alignment.agree}%` }}
                >
                  Expand {alignment.agree}%
                </div>
                <div 
                  className="alignment-segment disagree" 
                  style={{ width: `${alignment.disagree}%` }}
                >
                  Wait {alignment.disagree}%
                </div>
              </div>
            </div>

            <div className="ai-suggestion">
              <div className="ai-suggestion-header">
                <span>🤖</span>
                <span>AI Facilitator</span>
              </div>
              <p>Mike hasn't shared his perspective yet. @Mike, what are your thoughts on the budget implications?</p>
              <div className="suggestion-actions">
                <button className="secondary-btn">Prompt Mike</button>
                <button className="secondary-btn">Start Poll</button>
                <button className="secondary-btn">Schedule Meeting</button>
              </div>
            </div>

            <div className="participation-monitor">
              <h4>Participation Monitor</h4>
              {teamMembers.map((member, index) => (
                <div key={index} className="participation-item">
                  <span className="member-name">{member.name}</span>
                  <div className="participation-bar">
                    <motion.div 
                      className="participation-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${member.contribution}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="contribution-percent">{member.contribution}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="collaboration-input">
            <textarea
              className="decision-input"
              placeholder="Add your thoughts to the discussion..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={2}
            />
            <button className="primary-btn" onClick={handleShareThoughts} style={{ marginTop: '10px' }}>
              Share Thoughts
            </button>
          </div>
        </>
      )}

      <div className="phase-navigation">
        <button className="nav-btn" onClick={onPrevious}>
          ← Previous
        </button>
        <button className="primary-btn" onClick={onNext} style={{ width: 'auto' }}>
          Continue to Decision →
        </button>
      </div>
    </div>
  );
};

export default CollaboratePhase;