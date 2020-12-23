import * as React from "react";
import "./styles/ThemeToggle.scss";
import Sun from "./sub-components/Sun";
import Moon from "./sub-components/Moon";

const { useEffect, useState } = React;

const ThemeToggle: React.FC = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.add(`theme--${useDarkTheme ? "dark" : "light"}`);
    document.body.classList.remove(`theme--${useDarkTheme ? "light" : "dark"}`);
  }, [useDarkTheme]);

  return (
    <div className="toggle-switch" onClick={() => setUseDarkTheme((s) => !s)}>
      <div className={`toggle-switch-inner ${useDarkTheme ? "on" : "off"}`}>
        <Sun show={!useDarkTheme} />
        <Moon show={useDarkTheme} />
      </div>
    </div>
  );
};

export default ThemeToggle;
