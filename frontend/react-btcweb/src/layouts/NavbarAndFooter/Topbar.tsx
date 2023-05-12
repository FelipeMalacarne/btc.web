import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
  ArrowDropDownOutlined
} from "@mui/icons-material"
import { AppBar, IconButton, InputBase, Theme, Toolbar, useTheme } from "@mui/material"
import FlexBetween from "../utils/FlexBetween"
import { darkTheme, lightTheme } from "../../Theme"


interface TopbarProps {
  themeMode: Theme,
  setThemeMode: React.Dispatch<React.SetStateAction<Theme>>,
  isSidebarOpen: boolean,
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Topbar: React.FC<TopbarProps> = (props) => {
  const theme = useTheme();

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
            <MenuIcon sx={{color: theme.palette.text.primary}} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.paper}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <SearchIcon sx={{color: theme.palette.text.primary}}/>
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHTSIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={handleTheme} sx={{color: theme.palette.text.primary}}>
            {theme.palette.mode === 'dark' ? 
              <LightModeOutlined 
                sx={{fontSize: '25px'}}
              /> 
              : 
              <DarkModeOutlined 
                sx={{fontSize: '25px'}}
              />
            }
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{
              fontSize: '25px',
              color: theme.palette.text.primary
              }} />
          </IconButton>
        </FlexBetween>



      </Toolbar>

    </AppBar>
  )
}
