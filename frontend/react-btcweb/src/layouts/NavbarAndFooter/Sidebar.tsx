import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material'
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronLeftOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  InventoryOutlined,
  Inventory2Outlined,
  SouthWestOutlined,
  ArrowOutwardOutlined,
  SportsBar as SportsBarIcon,
  AppRegistrationOutlined,
  AssignmentOutlined
} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from '../utils/FlexBetween'
import { useAuth } from '../../hooks/useAuth'

interface SidebarProps {
  drawerWidth: string,
  isSidebarOpen: boolean,
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isMobile: boolean
}

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Stock and Products",
    icon: null
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Ingredients",
    icon: <InventoryOutlined />,
  },
  {
    text: "Inventory",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Deposit",
    icon: <SouthWestOutlined />,
  },
  {
    text: "Withdrawal",
    icon: <ArrowOutwardOutlined />,
  },
  
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Make Sale",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Admnistration",
    icon: null
  },
  {
    text: "Users",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Perfomance",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Registration",
    icon: null
  },
  {
    text: "Product Registration",
    icon: <AssignmentOutlined />,
  },
  {
    text: "Ingredient Registration",
    icon: <AssignmentOutlined />
  },
  {
    text: "Account Registration",
    icon: <AssignmentOutlined />
  },


]

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { pathname } = useLocation();
  const { authState, logout } = useAuth();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(8));
    console.log(pathname.substring(8))
  }, [pathname]);

  const handleListItemButtonClick = (lcText: string) => {
    navigate(`/secure/${lcText}`)
    setActive(lcText);
  }

  return (
    <Box component='nav'>
      {props.isSidebarOpen && (
        <Drawer
          open={props.isSidebarOpen}
          onClose={() => props.setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: props.drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
              boxSizing: "border-box",
              borderWidth: props.isMobile ? "2px" : 0,
              width: props.drawerWidth
            }
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.primary.contrastText}>
                <Box display="flex" alignItems='center' gap='0.5rem'>
                  <SportsBarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0 }} />
                  <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Boteco.
                  </Typography>
                </Box>
                {
                  props.isMobile && (
                    <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}>
                      <ChevronLeft sx={{
                        color: theme.palette.primary.contrastText
                      }} />
                    </IconButton>
                  )
                }
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text} sx={{
                        m: "2.25rem 0 1rem 3rem",
                        color: theme.palette.secondary.main
                      }}>
                      {text}
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase().replace(/\s/g, "-");
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => handleListItemButtonClick(lcText)}
                      sx={{
                        backgroundColor: active === lcText
                          ? theme.palette.secondary.main
                          : "transparent",

                        color: active === lcText
                          ? theme.palette.secondary.contrastText
                          : theme.palette.primary.contrastText,

                        "&:hover": {
                          backgroundColor: active === lcText
                            ? theme.palette.secondary.dark
                            : theme.palette.primary.dark
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active === lcText
                            ? theme.palette.secondary.contrastText
                            : theme.palette.primary.contrastText
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronLeftOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })
              }
            </List>
          </Box>
          
          <Box bottom="2rem">
            <Divider/>
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 1rem 3rem'>
              <Box
                component='img'
                alt='profile'
                src={require('./../../imgs/default-profile-picture.jpg')}
                height='32px'
                width='32px'
                borderRadius='50%'
                sx={{ objectFit: 'cover'}}
              />
                <Box textAlign='left'>
                  <Typography 
                    fontWeight='bold' 
                    fontSize='0.85rem'
                    sx={{color: theme.palette.secondary.light}}
                    >
                      {authState.user?.username}
                  </Typography>
                  <Typography 
                    fontWeight='bold' 
                    fontSize='0.75rem'
                    sx={{color: theme.palette.secondary.main}}
                    >
                      {authState.user?.roles[0].substring(5)}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: '25px' 
                  }}
                />
            </FlexBetween>
          </Box>

        </Drawer>
      )}
    </Box>
  )
}
