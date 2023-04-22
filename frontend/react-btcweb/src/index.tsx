import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { SignInPage } from './layouts/SignInAndSignUp/SignInPage';
import { SignUpPage } from './layouts/SignInAndSignUp/SignUpPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {

      }
    ]
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <RouterProvider router={router}/>

  </React.StrictMode>
);
