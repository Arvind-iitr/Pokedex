import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AppContext = createContext();

// 2. Create the provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // example: for auth
  const [isDarkMode, setIsDarkMode] = useState(false); // example: for theme toggle

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{ user, setUser, isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAppContext = () => useContext(AppContext);
