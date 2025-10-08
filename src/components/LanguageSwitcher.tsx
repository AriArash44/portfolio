import { useState, useRef } from "react";
import i18n from "../i18n/i18n";
import { useOutsideClick } from "../hooks/useOutsideClick";

const languages = [
    { code: "en", label: "En" },
    { code: "fa", label: "فا" },
];

const LanguageSwitcherDropdown = () => {
    const [open, setOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(i18n.language || "en");
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const isPersian = i18n.language === 'fa';
    useOutsideClick(dropdownRef, () => setOpen(false));
    const changeLanguage = (lng: "en" | "fa") => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
        document.documentElement.classList.remove('font-iranYekan', 'font-roboto');
        document.documentElement.classList.add(isPersian ? 'font-iranYekan' : 'font-roboto');
        setCurrentLang(lng);
        setOpen(false);
    };
    const currentLabel = languages.find((l) => l.code === currentLang)?.label || "Language";
    return (
      <div className={`relative inline-block transition-all duration-500 ${isPersian ? "translate-x-[-1.5rem]" : "translate-x-6"} sm:translate-x-0`} ref={dropdownRef}>
        <button onClick={() => setOpen((o) => !o)}
        className="px-3 py-1.5 border border-custom-dark-gold text-custom-dark-gold dark:border-custom-gold dark:text-custom-gold rounded-3xl flex items-center gap-2 cursor-pointer">
          {currentLabel}
          <span className={`ml-1 mt-1 text-[0.7rem] transition-all duration-500 ${open ? "" : "rotate-180"}`}>▲</span>
        </button>
        <div className={`absolute mt-1 w-15 bg-white dark:bg-gray-300 border border-custom-dark-gold text-custom-dark-gold dark:border-custom-gold dark:text-custom-gold rounded-xl 
        shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <ul>
            {languages.map((lang) => (
              <li key={lang.code}>
                <button onClick={() => changeLanguage(lang.code as "en" | "fa")} className={`w-full text-left px-4 py-2 cursor-pointer hover:bg-yellow-50 ${currentLang === lang.code ? "font-bold text-green" : ""}`}>
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default LanguageSwitcherDropdown;