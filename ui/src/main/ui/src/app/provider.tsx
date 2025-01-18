import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { Notification } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext'; // Adjust the path as needed

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <ErrorBoundary FallbackComponent={MainErrorFallback}>
            <Notification 
              notification={{ id: '1', type: 'info', title: 'Default Notification' }} 
              onDismiss={() => {}} 
            />
            {children}
          </ErrorBoundary>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </React.Suspense>
  );
};