import { TextStyle } from 'react-native';

type FontWeight = TextStyle['fontWeight'];

export const theme = {
  colors: {
    // Deep charcoal black backgrounds
    background: '#0A0A0F',
    backgroundSecondary: '#121218',
    backgroundCard: '#1A1A24',

    // Purple accents
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#7C3AED',

    // White text and UI elements
    text: '#FFFFFF',
    textSecondary: '#B4B4B8',
    textTertiary: '#6B6B70',

    // Glassmorphism
    glassBackground: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',

    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as FontWeight,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as FontWeight,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as FontWeight,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as FontWeight,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as FontWeight,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as FontWeight,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as FontWeight,
      lineHeight: 24,
    },
  },

  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

export type Theme = typeof theme;
