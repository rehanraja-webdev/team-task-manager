import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  const applyTheme = (selectedTheme) => {
    const finalTheme =
      selectedTheme === "system" ? getSystemTheme() : selectedTheme;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(finalTheme);
  };

  const toggleTheme = () => {
    const currentTheme = theme === "system" ? getSystemTheme() : theme;

    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
