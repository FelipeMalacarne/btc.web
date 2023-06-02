import { Navbar } from "./NavbarAndFooter/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, useMediaQuery, Theme } from "@mui/material";
import { Topbar } from "./NavbarAndFooter/Topbar";
import { useState } from "react";
import { Sidebar } from "./NavbarAndFooter/Sidebar";

interface SecureLayoutProps {
  themeMode: Theme,
  setThemeMode: React.Dispatch<React.SetStateAction<Theme>>
}
export const SecureLayout: React.FC<SecureLayoutProps> = (props) => {
  const { authState } = useAuth();
  const isMobile = !useMediaQuery('(min-width: 600px)'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  if (!authState.isLoading && !authState.isAuthenticated) {
    return <Navigate to="/signin" />
  }
  return (
    <Box display={isMobile ? "block" :"flex" } height="100%" width="100%" >
      <Sidebar
        isMobile={isMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Topbar
          themeMode={props.themeMode}
          setThemeMode={props.setThemeMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}