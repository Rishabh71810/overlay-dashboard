import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecisionMode, DecisionData } from '../DecisionHub';
import './PhaseStyles.css';

interface CommitPhaseProps {
  mode: DecisionMode;
  decisionData: DecisionData;
  onDataUpdate: (data: DecisionData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface Task {
  id: string;
  phase: string;
  assignee: string;
  task: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const CommitPhase: React.FC<CommitPhaseProps> = ({
  mode,
  decisionData,
  onDataUpdate,
  onNext,
  onPrevious
}) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Simulate task generation
    setTimeout(() => {
      const generatedTasks: Task[] = [
        {
          id: '1',
          phase: 'Week 1-2: Legal Setup',
          assignee: 'John',
          task: 'Register European entity',
          deadline: 'Jan 15',
          status: 'pending'
        },
        {
          id: '2',
          phase: 'Week 1-2: Legal Setup',
          assignee: 'John',
          task: 'GDPR compliance setup',
          deadline: 'Jan 20',
          status: 'pending'
        },
        {
          id: '3',
          phase: 'Week 3-4: Team Building',
          assignee: 'Sarah',
          task: 'Post remote job listings',
          deadline: 'Jan 25',
          status: 'pending'
        },
        {
          id: '4',
          phase: 'Week 3-4: Team Building',
          assignee: 'Mike',
          task: 'Setup interview pipeline',
          deadline: 'Feb 1',
          status: 'pending'
        },
        {
          id: '5',
          phase: 'Week 5-8: Market Entry',
          assignee: 'Lisa',
          task: 'Deploy tech infrastructure',
          deadline: 'Feb 15',
          status: 'pending'
        },
        {
          id: '6',
          phase: 'Week 5-8: Market Entry',
          assignee: 'Team',
          task: 'Launch marketing campaign',
          deadline: 'March 1',
          status: 'pending'
        }
      ];
      
      setTasks(generatedTasks);
      onDataUpdate({
        ...decisionData,
        tasks: generatedTasks
      });
      
      setIsGenerating(false);
    }, 2000);
  }, []);

  const handleLockDecision = () => {
    setIsLocked(true);
    // In real app, this would save to database and notify team
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'pending' ? 'in-progress' : 'pending' }
        : task
    ));
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.phase]) {
      acc[task.phase] = [];
    }
    acc[task.phase].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="phase-container commit-phase">
      <div className="phase-header">
        <h3>📋 COMMIT - Lock & implement</h3>
        <p className="phase-description">
          Transform decision into actionable tasks with clear accountability
        </p>
      </div>

      {isGenerating ? (
        <motion.div 
          className="processing-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="processing-header">
            <div className="processing-spinner">🔄</div>
            <span>GENERATING ACTION PLAN...</span>
          </div>
          <div className="processing-items">
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              ⏳ Creating task breakdown...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
              ⏳ Assigning responsibilities...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>
              ⏳ Setting deadlines...
            </motion.div>
            <motion.div className="processing-item" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.9 }}>
              ⏳ Creating communication plan...
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="commitment-summary">
            <h4>Decision Locked: European Expansion via Remote Team</h4>
            <div className="summary-items">
              <div className="summary-item">Start Date: Q2 2025</div>
              <div className="summary-item">Budget: €2.1M</div>
              <div className="summary-item">Target: €5M revenue Year 1</div>
              <div className="summary-item">Team Size: 6 remote positions</div>
            </div>
          </div>

          <div className="action-plan">
            <h4>Auto-Generated Action Plan</h4>
            
            {Object.entries(groupedTasks).map(([phase, phaseTasks]) => (
              <motion.div 
                key={phase}
                className="phase-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h5>{phase}</h5>
                {phaseTasks.map(task => (
                  <div 
                    key={task.id}
                    className="task-item"
                  >
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      checked={task.status !== 'pending'}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    <div className="task-content">
                      <span className="task-assignee">{task.assignee}: </span>
                      <span className="task-description">{task.task}</span>
                    </div>
                    <span className="task-deadline">
                      Due: {task.deadline}
                    </span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="accountability-matrix">
            <h4>Accountability Matrix</h4>
            <div className="matrix-grid">
              <div className="matrix-item">
                <span className="matrix-name">Sarah:</span>
                <span className="matrix-responsibility">Team building, recruitment</span>
              </div>
              <div className="matrix-item">
                <span className="matrix-name">John:</span>
                <span className="matrix-responsibility">Legal, compliance</span>
              </div>
              <div className="matrix-item">
                <span className="matrix-name">Mike:</span>
                <span className="matrix-responsibility">Budget, financial planning</span>
              </div>
              <div className="matrix-item">
                <span className="matrix-name">Lisa:</span>
                <span className="matrix-responsibility">Technical infrastructure</span>
              </div>
            </div>
          </div>

          {!isLocked ? (
            <div className="commit-actions">
              <button 
                className="primary-btn"
                onClick={handleLockDecision}
              >
                Sign & Lock Decision
              </button>
              <button className="secondary-btn">
                Edit Tasks
              </button>
            </div>
          ) : (
            <motion.div
              className="decision-locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Decision Locked & Committed</h3>
              <p>All stakeholders notified. Tasks distributed.</p>
              <p className="lock-note">
                Proceeding to tracking phase...
              </p>
            </motion.div>
          )}
        </>
      )}

      <div className="phase-navigation">
        <button className="nav-btn" onClick={onPrevious}>
          ← Previous
        </button>
      </div>
    </div>
  );
};

export default CommitPhase;