import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Users, Send, Mic, Paperclip, Zap } from 'lucide-react';
import theme from '../../styles/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mode: 'individual' | 'shared';
}

interface DualModeChatProps {
  mode: 'individual' | 'shared';
  onModeChange: (mode: 'individual' | 'shared') => void;
}

const DualModeChat: React.FC<DualModeChatProps> = ({ mode, onModeChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you make better decisions. What's on your mind?",
      sender: 'ai',
      timestamp: new Date(),
      mode: 'individual',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      mode,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: mode === 'individual' 
          ? `I understand you're considering "${inputValue}". Let me help you analyze this decision from multiple perspectives.`
          : `Great input! I've shared this with the team. Current consensus is forming around this approach.`,
        sender: 'ai',
        timestamp: new Date(),
        mode,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0,
      marginBottom: theme.spacing.md,
    }}>
      {/* Mode Switcher */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
      }}>
        <button
          onClick={() => onModeChange('individual')}
          style={{
            flex: 1,
            padding: theme.spacing.sm,
            border: mode === 'individual' ? 'none' : `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            background: mode === 'individual' ? theme.colors.text.primary : theme.colors.backgroundWhite,
            color: mode === 'individual' ? theme.colors.backgroundWhite : theme.colors.text.secondary,
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
        >
          <Lock size={14} />
          Individual
        </button>
        <button
          onClick={() => onModeChange('shared')}
          style={{
            flex: 1,
            padding: theme.spacing.sm,
            border: mode === 'shared' ? 'none' : `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            background: mode === 'shared' ? theme.colors.text.primary : theme.colors.backgroundWhite,
            color: mode === 'shared' ? theme.colors.backgroundWhite : theme.colors.text.secondary,
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
        >
          <Users size={14} />
          Shared
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: theme.colors.backgroundWhite,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        minHeight: '120px',
        maxHeight: '200px',
        border: `1px solid ${theme.colors.border}`,
      }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginBottom: theme.spacing.sm,
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  borderRadius: theme.borderRadius.lg,
                  background: message.sender === 'user'
                    ? theme.colors.text.primary
                    : theme.colors.background,
                  color: message.sender === 'user' 
                    ? theme.colors.backgroundWhite 
                    : theme.colors.text.primary,
                  fontSize: '13px',
                  border: message.sender === 'user' 
                    ? 'none' 
                    : `1px solid ${theme.colors.border}`,
                }}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: theme.spacing.sm,
            }}
          >
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: theme.colors.text.secondary,
              animation: 'pulse 1.5s infinite',
            }} />
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: theme.colors.text.secondary,
              animation: 'pulse 1.5s infinite 0.2s',
            }} />
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: theme.colors.text.secondary,
              animation: 'pulse 1.5s infinite 0.4s',
            }} />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.sm,
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={mode === 'individual' ? 'Type your thoughts privately...' : 'Share with your team...'}
          style={{
            flex: 1,
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            fontSize: '13px',
            background: theme.colors.backgroundWhite,
            color: theme.colors.text.primary,
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: theme.spacing.sm,
            background: theme.colors.text.primary,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.text.secondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.colors.text.primary;
          }}
        >
          <Send size={16} color="white" />
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.sm,
      }}>
        <button style={{
          padding: `4px ${theme.spacing.sm}`,
          background: theme.colors.backgroundWhite,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: theme.colors.text.secondary,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.colors.background;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.colors.backgroundWhite;
        }}>
          <Mic size={12} />
          Voice
        </button>
        <button style={{
          padding: `4px ${theme.spacing.sm}`,
          background: theme.colors.backgroundWhite,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: theme.colors.text.secondary,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.colors.background;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.colors.backgroundWhite;
        }}>
          <Paperclip size={12} />
          Attach
        </button>
        <button style={{
          padding: `4px ${theme.spacing.sm}`,
          background: theme.colors.backgroundWhite,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.md,
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: theme.colors.text.secondary,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.colors.background;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.colors.backgroundWhite;
        }}>
          <Zap size={12} />
          Quick
        </button>
      </div>
    </div>
  );
};

export default DualModeChat;