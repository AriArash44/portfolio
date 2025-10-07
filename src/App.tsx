import { Typewriter } from "react-simple-typewriter";
import PizzaBackground from "./components/PizzaBackground";
import ToggleTheme from "./components/ToggleTheme";
import PizzaIcon from "/icons/pizza.svg";
import WhitePizzaIcon from "/icons/w_pizza.svg";
import { useTheme } from "./contexts/themeContext/useTheme";

export default function App() {
  const { dark } = useTheme();
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
          <h1 className="font-bold text-custom-gold" style={{fontFamily: 'caveat'}}>&nbsp;
            <Typewriter
              words={["Arash Asghari"]}
              loop={0}
              cursor
              cursorStyle=""
              typeSpeed={120}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
        </div>
        <div className="absolute top-10 right-0 rotate-90 sm:top-6 sm:right-7 sm:rotate-0">
          <ToggleTheme />
        </div>
      </header>
      <main></main>
      <footer></footer>
    </>
  );
}