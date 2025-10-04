import PizzaBackground from "./components/PizzaBackground";
import PizzaIcon from "/icons/pizza.svg"; // or pizza.png

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
      <PizzaBackground
        icon={<img src={PizzaIcon} alt="pizza" style={{ display: "block", width: "100%", height: "100%" }} />}
        tileSize={16}
        zoomScale={2}
        radius={30}
        rows={10}
      />
    </div>
  );
}