import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2C2B2B'
    },
    secondary: {
      // main: '#F4A261',
      main: '#00B4A0',
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
      primary: '#080808',
      secondary: '#2A2A2A',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },

  },
  typography:{
    fontFamily: 'roboto',
    fontSize: 13,
    h1:{
      fontSize: 40,
    },
    h2:{
      fontSize: 32,
    },
    h3:{
      fontSize: 24,
    },
    h4:{
      fontSize: 20,
    },
    h5:{
      fontSize: 16,
    },
    h6:{
      fontSize: 14,
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
      // main: '#F4A261',
      main: '#00B4A0',
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
      secondary: '#c8c8c8',
    },
    background: {
      default: '#1F1F1F',
      paper: '#2C2B2B',
    },
  },
  typography:{
    fontFamily: 'roboto',
    fontSize: 13,
    h1:{
      fontSize: 40,
    },
    h2:{
      fontSize: 32,
    },
    h3:{
      fontSize: 24,
    },
    h4:{
      fontSize: 20,
    },
    h5:{
      fontSize: 16,
    },
    h6:{
      fontSize: 14,
    },

  }
})