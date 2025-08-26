import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Move, Settings, Sparkles } from 'lucide-react';
import './glass-overlay.css';

interface GlassOverlayProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

const GlassOverlay: React.FC<GlassOverlayProps> = ({ 
  children, 
  title = "MyDecisions AI",
  onClose 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 20 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && isExpanded) {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isExpanded) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragStart.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 600, e.clientY - dragStart.y));
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const overlayVariants = {
    collapsed: {
      width: isMobile ? '100%' : '400px',
      height: isMobile ? '100vh' : '600px',
      borderRadius: isMobile ? '0px' : '24px',
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    expanded: {
      width: isMobile ? '100vw' : '90vw',
      height: isMobile ? '100vh' : '90vh',
      borderRadius: isMobile ? '0px' : '24px',
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`glass-overlay ${isExpanded ? 'expanded' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}
        style={{
          position: 'fixed',
          left: isMobile || isExpanded ? 'auto' : `${position.x}px`,
          top: isMobile || isExpanded ? 'auto' : `${position.y}px`,
          right: isMobile || isExpanded ? '0' : 'auto',
          bottom: isMobile || isExpanded ? '0' : 'auto',
          zIndex: 9999,
        }}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={overlayVariants}
        drag={false}
      >
        <div className="glass-container">
          <div className="glass-noise"></div>
          
          <motion.div 
            className="glass-header"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : (isMobile || isExpanded ? 'default' : 'grab') }}
          >
            <div className="header-left">
              <motion.div 
                className="logo-container"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="logo-icon" size={20} />
                <span className="title">{title}</span>
              </motion.div>
            </div>
            
            <div className="header-controls">
              {!isMobile && (
                <>
                  {!isExpanded && (
                    <motion.button
                      className="control-button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Expand"
                    >
                      <Maximize2 size={16} />
                    </motion.button>
                  )}
                  {isExpanded && (
                    <motion.button
                      className="control-button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Minimize"
                    >
                      <Minimize2 size={16} />
                    </motion.button>
                  )}
                </>
              )}
              
              <motion.button
                className="control-button settings"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                title="Settings"
              >
                <Settings size={16} />
              </motion.button>
              
              {onClose && (
                <motion.button
                  className="control-button close"
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close"
                >
                  <X size={16} />
                </motion.button>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="glass-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="content-inner">
              {children || (
                <div className="default-content">
                  <motion.div 
                    className="welcome-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <h2>Welcome to MyDecisions</h2>
                    <p>Your AI-powered decision assistant</p>
                  </motion.div>
                  
                  <div className="feature-cards">
                    {['Analyze', 'Decide', 'Execute'].map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="feature-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                        }}
                      >
                        <h3>{feature}</h3>
                        <p>Intelligent {feature.toLowerCase()} capabilities</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="glass-glow"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlassOverlay;