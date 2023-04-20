import { createTheme } from "@mui/material"

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#2C2B2B'
    },
    secondary: {
      main: '#F5F5F5'
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },        
  }
})

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F5F5F5'
    },
    secondary: {
      main: '#2C2B2B'
    },
    background:{
      default: '#121212',
      paper: '#121212',
    }
  }
})