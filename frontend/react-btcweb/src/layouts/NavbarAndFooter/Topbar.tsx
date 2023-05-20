import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
  ArrowDropDownOutlined
} from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Theme, Toolbar, Typography, useTheme } from "@mui/material"
import FlexBetween from "../utils/FlexBetween"
import { darkTheme, lightTheme } from "../../Theme"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"


interface TopbarProps {
  themeMode: Theme,
  setThemeMode: React.Dispatch<React.SetStateAction<Theme>>,
  isSidebarOpen: boolean,
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Topbar: React.FC<TopbarProps> = (props) => {
  const theme = useTheme();
  const { authState, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleTheme = () => {
    if (props.themeMode === lightTheme) {
      props.setThemeMode(darkTheme);
      localStorage.setItem('theme', 'darkTheme');
    } else {
      props.setThemeMode(lightTheme);
      localStorage.setItem('theme', 'lightTheme');
    }
  }


  return (
    <AppBar
      sx={{
        position: "static",
        background: 'none',
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{
        justifyContent: "space-between",
      }} >

        {/* LEFTSIDE */}
        <FlexBetween>
          <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}>
            <MenuIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.paper}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <SearchIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHTSIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={handleTheme} sx={{ color: theme.palette.text.primary }}>
            {theme.palette.mode === 'dark' ?
              <LightModeOutlined
                sx={{ fontSize: '25px' }}
              />
              :
              <DarkModeOutlined
                sx={{ fontSize: '25px' }}
              />
            }
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{
              fontSize: '25px',
              color: theme.palette.text.primary
            }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textTransform: 'none',
                gap: '1rem'
              }}
            >
              <Box
                component='img'
                alt='profile'
                src={require('./../../imgs/default-profile-picture.jpg')}
                height='32px'
                width='32px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.85rem'
                  sx={{ color: theme.palette.text.primary }}
                >
                  {authState.user?.username}
                </Typography>
                <Typography
                  fontWeight='bold'
                  fontSize='0.75rem'
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {authState.user?.roles[0].substring(5)}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: '25px'
                }}
              />
            </Button>
            <Menu 
              anchorEl={anchorEl} 
              open={isOpen} 
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}
