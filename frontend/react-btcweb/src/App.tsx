
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { DarkTheme, Theme } from './Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SignInPage } from './layouts/SignInAndSignUp/SignInPage';
import { Outlet, RouterProvider } from 'react-router-dom';



export const App = () => {
  return (
    <ThemeProvider theme={DarkTheme} >
      <CssBaseline />
      <div className='d-flex flex-column min-vh-100' >
        <Navbar />
        <div className='flex-grow-1'>
          <Outlet />

        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
