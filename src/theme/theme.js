import { DefaultTheme } from 'react-native-paper';

// Light Theme
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    // react-native-paper required colors
    primary: '#1F7856', // Brand green (logo color)
    accent: '#F59E0B', // Amber accent (using amber as accent)
    background: '#F9FAFB', // Neutral background
    surface: '#FFFFFF', // Pure white for cards
    error: '#DC3545',
    text: '#1A1A1A', // Deep black text for maximum contrast
    onSurface: '#1A1A1A', // Text on surface
    onBackground: '#1A1A1A', // Text on background
    disabled: '#9CA3AF', // Disabled text color
    placeholder: '#9CA3AF', // Placeholder text
    backdrop: 'rgba(0, 0, 0, 0.5)', // Modal backdrop
    notification: '#1F7856', // Notification color (brand green)
    
    // Custom colors
    primaryLight: '#2D9D6F', // Light green
    primaryDark: '#155D3F', // Dark green
    secondary: '#F8F9FA', // Light gray secondary
    amber: '#F59E0B', // Amber accent color
    amberLight: '#FCD34D', // Light amber
    amberDark: '#D97706', // Dark amber
    backgroundSecondary: '#F8F9FA', // Light gray for alternate sections
    textSecondary: '#6B7280', // Professional muted text
    textTertiary: '#9CA3AF', // Very light text
    success: '#10B981', // Green for success
    warning: '#F59E0B', // Amber warning
    border: '#E5E7EB', // Subtle borders for white background
    borderLight: '#F3F4F6', // Very light borders
    card: '#FFFFFF', // White cards
    cardElevated: '#FFFFFF', // Elevated cards
    shadow: 'rgba(0, 0, 0, 0.08)', // Subtle shadows for professional depth
    shadowDark: 'rgba(0, 0, 0, 0.12)', // Darker shadows for elevation
    gradient1: '#FFFFFF', // White gradient
    gradient2: '#F8F9FA', // Light gray gradient
    brandBlue: '#3B82F6', // Brand blue color (kept for compatibility)
    brandBlueLight: '#DBEAFE', // Light blue background (kept for compatibility)
    brandGreen: '#1F7856', // Brand green color (logo color) - now primary
    brandGreenLight: '#D1FAE5', // Light green background
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlays
  },
  roundness: 16, // Rounded corners 16px
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
};

// Dark Theme
export const darkTheme = {
  ...DefaultTheme,
  colors: {
    // react-native-paper required colors
    primary: '#2D9D6F', // Lighter green for dark mode (logo color variant)
    accent: '#F59E0B', // Amber accent
    background: '#111827', // Dark background
    surface: '#1F2937', // Dark cards
    error: '#EF4444',
    text: '#F9FAFB', // Light text for dark mode
    onSurface: '#F9FAFB', // Text on surface
    onBackground: '#F9FAFB', // Text on background
    disabled: '#9CA3AF', // Disabled text color
    placeholder: '#9CA3AF', // Placeholder text
    backdrop: 'rgba(0, 0, 0, 0.7)', // Modal backdrop
    notification: '#1F7856', // Notification color (brand green)
    
    // Custom colors
    primaryLight: '#2D9D6F', // Light green
    primaryDark: '#155D3F', // Dark green
    secondary: '#1F2937', // Dark gray secondary
    amber: '#F59E0B', // Amber accent color
    amberLight: '#FCD34D', // Light amber
    amberDark: '#D97706', // Dark amber
    backgroundSecondary: '#111827', // Dark alternate sections
    textSecondary: '#D1D5DB', // Muted light text
    textTertiary: '#9CA3AF', // Very light text
    success: '#10B981', // Green for success
    warning: '#F59E0B', // Amber warning
    border: '#374151', // Subtle borders for dark background
    borderLight: '#1F2937', // Very light borders
    card: '#1F2937', // Dark cards
    cardElevated: '#374151', // Elevated dark cards
    shadow: 'rgba(0, 0, 0, 0.3)', // Stronger shadows for dark mode
    shadowDark: 'rgba(0, 0, 0, 0.5)', // Darker shadows for elevation
    gradient1: '#111827', // Dark gradient
    gradient2: '#1F2937', // Dark gray gradient
    brandBlue: '#60A5FA', // Brand blue color for dark mode (kept for compatibility)
    brandBlueLight: '#1E3A8A', // Dark blue background (kept for compatibility)
    brandGreen: '#1F7856', // Brand green color (logo color)
    brandGreenLight: '#155D3F', // Dark green background
    overlay: 'rgba(0, 0, 0, 0.7)', // Darker modal overlays
  },
  roundness: 16, // Rounded corners 16px
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
};

// Default export (light theme)
export const theme = lightTheme;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

