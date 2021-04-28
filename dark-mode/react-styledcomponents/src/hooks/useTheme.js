import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};

const defaultTheme = () => {
  let theme = localStorage.getItem("theme");

  if (!theme) {
    // os level 의 theme 를 감지한다.
    const { matches } = window.matchMedia("(prefers-color-scheme: dark)");

    theme = matches ? "dark" : "light";
  }

  return theme;
};

export default useTheme;
