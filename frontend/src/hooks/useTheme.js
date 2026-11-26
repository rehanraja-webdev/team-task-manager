import { useContext } from "react";
import { ThemeContext } from "../context/themeContextInstance";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
