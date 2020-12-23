import "./ThemeToggle.scss";
import * as React from "react";

const { useEffect, useState } = React;

const ThemeToggle: React.FC = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.add(`theme--${useDarkTheme ? "dark" : "light"}`);
    document.body.classList.remove(`theme--${useDarkTheme ? "light" : "dark"}`);
  }, [useDarkTheme]);

  return (
    <div className="toggle-switch" onClick={() => setUseDarkTheme((s) => !s)}>
      <div
        className={`toggle-switch-inner ${useDarkTheme ? "on" : "off"}`}
      ></div>
    </div>
  );
};

export default ThemeToggle;
