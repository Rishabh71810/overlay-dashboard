import React, { useState } from 'react';
import GlassOverlay from './GlassOverlay';
import { MessageSquare, Brain, Lightbulb, Target } from 'lucide-react';

const OverlayDemo: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {!showOverlay && (
        <button
          onClick={() => setShowOverlay(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Open Overlay
        </button>
      )}

      {showOverlay && (
        <GlassOverlay onClose={() => setShowOverlay(false)}>
          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
              Decision Intelligence Hub
            </h2>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <MessageSquare size={24} color="#6366f1" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Chat Assistant</h3>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Get instant AI-powered guidance</p>
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Brain size={24} color="#8b5cf6" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Analysis Engine</h3>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Deep insights from your data</p>
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Lightbulb size={24} color="#f59e0b" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Recommendations</h3>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Smart suggestions for better decisions</p>
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Target size={24} color="#10b981" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Goal Tracking</h3>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Monitor your decision outcomes</p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '14px', color: '#4c1d95', fontWeight: '500' }}>
                Drag to move • Click expand button to maximize • Fully responsive
              </p>
            </div>
          </div>
        </GlassOverlay>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '60px' }}>
        <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '20px', fontWeight: '700' }}>
          Glass Morphism Overlay
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
          A beautiful, responsive glass morphism overlay component inspired by modern design systems.
          Features include dragging, resizing, and full mobile responsiveness.
        </p>
      </div>
    </div>
  );
};

export default OverlayDemo;