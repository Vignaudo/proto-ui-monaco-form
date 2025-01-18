import React, { createContext } from 'react';

interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    toggleTheme: () => {},
});
