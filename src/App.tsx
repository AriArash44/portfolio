import { Typewriter } from "react-simple-typewriter";
import PizzaBackground from "./components/PizzaBackground";
import PizzaIcon from "/icons/pizza.svg";

export default function App() {
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <PizzaBackground
          icon={<img src={PizzaIcon} alt="pizza" style={{ display: "block", width: "100%", height: "100%" }} />}
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
    </header>
  );
}