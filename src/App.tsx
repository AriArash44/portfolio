import { Typewriter } from "react-simple-typewriter";
import PizzaBackgroundAuto from "./components/PizzaBackgroundAuto";
import ToggleTheme from "./components/ToggleTheme";
import PizzaIcon from "/icons/pizza.svg";
import WhitePizzaIcon from "/icons/w_pizza.svg";
import { ToolDescription } from "./components/ToolDescription";
import { useTheme } from "./contexts/themeContext/useTheme";
import LanguageSwitcher from "./components/LanguageSwitcher";
import i18n from "./i18n/i18n";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { getToolsData } from './consts/tools';

export default function App() {
  const { dark } = useTheme();
  const { t } = useTranslation();
  const tools = getToolsData(t);
  const lang = i18n.language;
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  return (
    <>
      <header>
        <div className="flex justify-center m-2.5">
          <PizzaBackgroundAuto
            icon={<img src={dark ? WhitePizzaIcon : PizzaIcon} alt="pizza" />}
            tileSize={16}
            zoomScale={2}
            radius={30}
            rows={10}
          />
        </div>
        <div className="flex flex-col-reverse justify-center items-center sm:flex-row sm:gap-6
        absolute top-16 sm:top-[50px] w-full sm:w-auto px-12 pointer-events-none">
          <img className="w-20 h-20 mt-4 sm:mt-0 rounded-full" style={{boxShadow: "0 0 20px rgba(0,0,0,0.4)"}}
            src={`${import.meta.env.BASE_URL}images/profile.svg`} alt="Arash Asghari" />
          <h1 className="font-bold text-custom-gold" style={{fontFamily: lang === 'fa' ? 'amiri' : 'caveat'}}>&nbsp;
            <Typewriter
              words={[t('name')]}
              loop={0}
              cursor
              cursorStyle=""
              typeSpeed={120}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
        </div>
        <div className="flex gap-2 absolute top-10 end-0 sm:top-6 sm:end-8">
          <LanguageSwitcher />
          <ToggleTheme />
        </div>
      </header>
      <main className="p-12 mx-[5%] ">
        <h2 className="text-center text-custom-gray" style={{fontFamily: lang === 'fa' ? 'amiri' : 'caveat'}}>"{t("bio")}"</h2>
        <a href={lang === "fa" ? "http://drive.google.com/uc?export=download&id=1k6oIpGRI18_BLHylTr4QLcgOd1PBW4a4" : 
          "https://drive.google.com/uc?export=download&id=1hpnXTm_RBYUH497AbACkvid1Svj7hus2"}
          className="block text-center mt-3 underline text-custom-gold hover:text-custom-dark-gold dark:hover:text-custom-light-gold">
          {lang === "fa" ? "دانلود رزومه من" : "Download My Resume"}
        </a>
        <h3 className="mt-10 mb-3 text-custom-second-dark-gray dark:text-custom-second-light-gray font-bold">{t('toolTitle')}</h3>    
        {tools.map((tool, index) => (
          <ToolDescription key={index} {...tool} index={index}/>
        ))}
      </main>
      <footer></footer>
    </>
  );
}