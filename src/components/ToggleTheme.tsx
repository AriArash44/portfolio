import { useTheme } from "../contexts/themeContext/useTheme";

export default function ToggleButton() {
    const { dark, toggle } = useTheme();
    return (
      <button onClick={toggle}>
        {dark ? "Switch to Light" : "Switch to Dark"}
      </button>
    );
}