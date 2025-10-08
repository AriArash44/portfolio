import { useTheme } from "../contexts/themeContext/useTheme";
import SunIcon from "/icons/sun.svg";
import MoonIcon from "/icons/moon.svg";
import i18n from "../i18n/i18n";

export default function ThemeSwitch() {
    const { dark, toggle } = useTheme();
    const lang = i18n.language;
    return (
      <button onClick={toggle} className={`relative w-20 h-9 rounded-full p-1 transition-all duration-500 flex items-center justify-between cursor-pointer rotate-90 sm:rotate-0
        ${dark ? `${lang === "fa" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-gray-300 via-gray-400 to-yellow-400` : 
        `${lang === "fa" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-yellow-400 via-yellow-300 to-gray-300`}`}>
        <img src={SunIcon} alt="sun" className="w-5 h-5" />
        <img src={MoonIcon} alt="moon" className="w-5 h-5" />
        <span className={`absolute top-1 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm shadow-md transition-all duration-500 
        ${dark ? (lang === "fa" ? "translate-x-[-2.75rem]" : "translate-x-11") : "translate-x-0"}`}/>
      </button>
    );
}
