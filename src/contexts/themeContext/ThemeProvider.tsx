import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);
    const toggle = () => setDark(d => !d);
    return (
      <ThemeContext.Provider value={{ dark, toggle }}>
        {children}
      </ThemeContext.Provider>
    );
}
