// Theme colors from waitlist website
export const theme = {
  colors: {
    // Primary colors from waitlist
    background: '#efeee7', // Beige background
    backgroundWhite: '#ffffff',
    text: {
      primary: '#000000', // Black text
      secondary: '#6B7280', // Gray text
      muted: '#9CA3AF',
      red: '#EF4444', // Red accent for "decisions"
    },
    
    // UI colors
    border: '#E5E7EB',
    borderDark: '#D1D5DB',
    
    // Button colors
    button: {
      primary: '#000000', // Black button
      primaryHover: '#1F2937',
      secondary: '#ffffff',
      secondaryHover: '#F9FAFB',
    },
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Glass morphism for overlay
    glass: {
      background: 'rgba(239, 238, 231, 0.95)', // Beige with transparency
      backgroundDark: 'rgba(0, 0, 0, 0.85)',
      border: 'rgba(0, 0, 0, 0.1)',
    }
  },
  
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  }
};

export default theme;