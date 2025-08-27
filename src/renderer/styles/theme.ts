// Glassmorphic Black & Red Theme
export const theme = {
  colors: {
    // Dark gradient background
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a0a0a 50%, #1a0505 75%, #0a0a0a 100%)',
    backgroundSolid: '#0a0a0a',
    backgroundWhite: 'rgba(255, 255, 255, 0.05)',
    
    text: {
      primary: '#ffffff', // White text for dark background
      secondary: '#a1a1aa', // Light gray
      muted: '#71717a',
      red: '#dc2626', // Darker red for better contrast
      orange: '#f97316',
    },
    
    // Enhanced Glossy Glass morphism colors
    glass: {
      primary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
      secondary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
      border: 'rgba(255, 255, 255, 0.25)',
      borderSoft: 'rgba(255, 255, 255, 0.15)',
      red: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(239, 68, 68, 0.08))',
      redBorder: 'rgba(239, 68, 68, 0.4)',
    },
    
    // UI colors
    border: 'rgba(255, 255, 255, 0.1)',
    borderDark: 'rgba(255, 255, 255, 0.05)',
    
    // Button colors
    button: {
      primary: '#dc2626', // Darker red for better contrast
      primaryHover: '#b91c1c',
      secondary: 'rgba(255, 255, 255, 0.15)',
      secondaryHover: 'rgba(255, 255, 255, 0.25)',
    },
    
    // Status colors with glass effect
    success: '#10b981',
    successGlass: 'rgba(16, 185, 129, 0.2)',
    warning: '#f59e0b',
    warningGlass: 'rgba(245, 158, 11, 0.2)',
    error: '#ef4444',
    errorGlass: 'rgba(239, 68, 68, 0.2)',
    info: '#3b82f6',
    infoGlass: 'rgba(59, 130, 246, 0.2)',
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