import { Typewriter } from "react-simple-typewriter";
import PizzaBackground from "./components/PizzaBackground";
import ToggleTheme from "./components/ToggleTheme";
import PizzaIcon from "/icons/pizza.svg";
import WhitePizzaIcon from "/icons/w_pizza.svg";
import { useTheme } from "./contexts/themeContext/useTheme";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./components/LanguageSwitcher";
import i18n from "./i18n/i18n";

export default function App() {
  const { dark } = useTheme();
  const { t } = useTranslation();
  const lang = i18n.language;
  return (
    <>
      <header>
        <div className="flex justify-center m-2.5">
          <PizzaBackground
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
      <main></main>
      <footer></footer>
    </>
  );
}