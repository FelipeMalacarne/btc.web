import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2C2B2B'
    },
    secondary: {
      main: '#F4A261',
      // main: '#00B4A0',
      // main: '#11ff88',
    },
    error: {
      main: '#E63946',
    },
    warning: {
      main: '#EE8B00',
    },
    info: {
      main: '#1D3557',
    },
    success: {
      main: '#00B4A0',
    },
    text: {
      primary: '#2C2B2B',
      secondary: '#6B6B6B',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },

  }
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#222121',
    },
    secondary: {
      main: '#F4A261',
      // main: '#00B4A0',
      // main: '#11ff88',
    },
    error: {
      main: '#E63946',
    },
    warning: {
      main: '#EE8B00',
    },
    info: {
      main: '#1D3557',
    },
    success: {
      main: '#00B4A0',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A8A8A8',
    },
    background: {
      default: '#1F1F1F',
      paper: '#2C2B2B',
    },
  },
})