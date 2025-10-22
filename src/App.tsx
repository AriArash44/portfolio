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
import { useState, useEffect, lazy, Suspense } from "react";
import { getToolsData } from './consts/tools';
import { desktopImages, mobileImages } from "./consts/frontendmentor";
import { otherDesktopImages, otherMobileImages } from "./consts/otherproject";
import type { CarouselImage } from "./components/Carousel";
import { EducationCard } from "./components/EducationCard";
import { ExpCard } from "./components/ExpCard";
import { createGregorianDate, toJalali, formatJalali, formatGregorian } from './utils/dateUtils';

const LazyCarousel = lazy(() => 
  Promise.all([
    import('./components/Carousel'),
    new Promise(resolve => setTimeout(resolve, 2000))
  ]).then(([module]) => module)
);

export default function App() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [otherImages, setOtherImages] = useState<CarouselImage[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
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
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setImages(windowWidth < 640 ? mobileImages : desktopImages);
    setOtherImages(windowWidth < 640 ? otherMobileImages : otherDesktopImages);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);
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
          className="block text-center mt-3 underline text-custom-gold hover:text-custom-dark-gold
          sm:text-xl dark:hover:text-custom-light-gold">
          {lang === "fa" ? "دانلود رزومه من" : "Download My Resume"}
        </a>
        <h3 className="mt-10 mb-3 text-custom-second-dark-gray dark:text-custom-second-light-gray font-bold">{t('toolTitle')}</h3>    
        {tools.map((tool, index) => (
          <ToolDescription key={index} {...tool} index={index}/>
        ))}
        <h3 className="mt-10 mb-3 text-custom-second-dark-gray dark:text-custom-second-light-gray font-bold">{t('projectTitle')}</h3>
        <p className="w-4/5 m-auto">{t('frontendmentorExplanation')}</p>
        <div className="w-4/5 m-auto mt-6">
          <Suspense fallback={<div className="loader m-auto my-32"></div>}>
            <LazyCarousel images={images} autoPlay={true} />
          </Suspense>
        </div>
        <a href="https://ariarash44.github.io/frontend-mentor/"
          className="block text-center mt-3 underline text-custom-gold hover:text-custom-dark-gold
          sm:text-xl dark:hover:text-custom-light-gold">
          {lang === "fa" ? "مشاهده دموی زنده" : "View Live Demo"}
        </a>
        <p className="w-4/5 m-auto mt-4">{t('otherExplanation')}</p>
        <div className="w-4/5 m-auto mt-6">
          <Suspense fallback={<div className="loader m-auto my-32"></div>}>
            <LazyCarousel images={otherImages} autoPlay={true} />
          </Suspense>
        </div>
        <a href="https://github.com/AriArash44"
          className="block text-center mt-3 underline text-custom-gold hover:text-custom-dark-gold
          sm:text-xl dark:hover:text-custom-light-gold">
          {lang === "fa" ? "مشاهده سورس کد پروژه‌ها" : "View projects source code"}
        </a>
        <h3 className="mt-10 mb-3 text-custom-second-dark-gray dark:text-custom-second-light-gray font-bold">{t('workTitle')}</h3>
        <ExpCard logo={`${import.meta.env.BASE_URL}logos/ScalesOps.svg`} title={lang === "fa" ? "شرکت ScalesOps" : "ScalesOps office"} 
        date={lang === "en" ? `${formatGregorian(createGregorianDate(2023, 8), "MMMM YYYY")} - ${formatGregorian(createGregorianDate(2024, 7), "MMMM YYYY")}` : 
        `${formatJalali(toJalali(createGregorianDate(2023, 9)), "jMMMM jYYYY")} - ${formatJalali(toJalali(createGregorianDate(2024, 8)), "jMMMM jYYYY")}`}>
          <p className="m-2 text-gray-800"><span className="font-bold">{lang === "fa" ? "سه ماه کارآموزی:" : "3-month Internship:"}</span> {t('workExp1')}</p>
          <p className="m-2 text-gray-800"><span className="font-bold">{lang === "fa" ? "نه ماه فعالیت حرفه‌ای:" : "9-month Front-End Developer Role:"}</span> {t('workExp2')}</p>
        </ExpCard>
        <h3 className="mt-8 mb-3 text-custom-second-dark-gray dark:text-custom-second-light-gray font-bold">{t('educTitle')}</h3>
        <EducationCard lang={lang} />
      </main>
      <footer className="flex flex-wrap gap-8 md:gap-16 md:px-16 p-8 shadow-[0px_-5px_15px_5px_rgba(0,0,0,0.05)] dark:shadow-gray-600/50">
        <div className="flex flex-col md:flex-row gap-3 lg:gap-6">
          <p className="font-bold">{lang === "fa" ? "آدرس پست الکترونیک" : "E-mail address"}</p>
          <div>
            <p className="opacity-60" dir="ltr">arashasghari1245@gmail.com</p>
            <p className="opacity-60" dir="ltr">arashasghari408@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 lg:gap-6">
          <p className="font-bold">{lang === "fa" ? "شماره تماس" : "Phone number"}</p>
          <div>
            <p className="opacity-60" dir="ltr">0996-6696067</p>
            <p className="opacity-60" dir="ltr">0990-5608034</p>
          </div>
        </div>
        <div className="flex-col md:flex-row gap-3 hidden lg:flex lg:gap-6">
          <p className="font-bold">{lang === "fa" ? "لینکدین" : "LinkedIn"}</p>
          <p className="opacity-60" dir="ltr">arash-ari44</p>
        </div>
      </footer>
    </>
  );
}