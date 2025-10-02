import PizzaBackground from "./components/PizzaBackground";
import PizzaIcon from "/icons/pizza.svg"; // or pizza.png

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <PizzaBackground
        icon={<img src={PizzaIcon} alt="pizza" style={{ display: "block", width: "100%", height: "100%" }} />}
        tileSize={40}
        zoomScale={1.4}
        radius={50}
        rows={6}
      />
    </div>
  );
}