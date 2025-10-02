import Background from "./components/Background";
import PizzaIcon from "/icons/pizza.png";

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Background
        icon={<img src={PizzaIcon} alt="pizza" style={{ display: "block", width: "100%", height: "100%" }} />}
        tileSize={80}
        zoomScale={2.2}
        radius={120}
        cols={10}
        rows={6}
      />
    </div>
  );
}
