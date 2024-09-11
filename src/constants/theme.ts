import { Platform } from 'react-native';

const theme = {
  colors: {
    background: '#000C65',
    text: '#ffffff',
    primary: '#6200ee',
    secondary: '#03dac4',
    error: '#B00020',
    white: '#ffffff',
    black: '#000000',
    link: '#0a7ea4',
    gray: '#999999',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  typography: {
    base: {
      fontSize: 16,
      lineHeight: 24,
      color: '#ffffff',
    },
    semiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      color: '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
      color: '#ffffff',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: '#ffffff',
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color: '#0a7ea4',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: '#ffffff',
    },
    button: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000C65',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#6200ee',  
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    borderRadius: 8,
  },
  dottedLine: {
    width: 1,
    height: 14,
    resizeMode: 'cover',
  }, 
};

export default theme;
