import * as React from 'react'

const { createContext, useContext, useEffect, useState } = React

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

  useEffect(() => {
    document.body.classList.add(
      theme === "light" ? "theme--light" : "theme--dark"
    );
    document.body.classList.remove(
      theme === "light" ? "theme--dark" : "theme--light"
    );
  }, [theme]);

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
