import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(`'useTheme' must be used within a ThemeProvider!`);
  }

  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <>
        <button
          onClick={() => setTheme((s) => (s === "light" ? "dark" : "light"))}
        >
          Toggle theme
        </button>
        {children}
      </>
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
