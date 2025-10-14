import React, { useMemo } from "react";
import PizzaBackgroundFull from "./PizzaBackgroundFull";
import { useTheme } from "../contexts/themeContext/useTheme";

type Props = {
    icon: React.ReactNode;
    tileSize?: number;
    zoomScale?: number;
    radius?: number;
    debounceMs?: number;
    rows?: number;
};

export default function PizzaBackgroundAuto(props: Props) {
    const { dark } = useTheme();
    const isFirefox = useMemo(() => {
        if (typeof navigator === "undefined") return false;
        return navigator.userAgent.toLowerCase().includes("firefox");
    }, []);
    return isFirefox ? (
        <PizzaBackgroundFull {...props} />
    ) : (
        <div className="h-40 w-full bg-repeat-x" style={{
            backgroundImage: `url(${dark ? "/images/w_pizzaBackground.png" : "/images/pizzaBackground.png"})`,
            backgroundSize: 'auto 100%'
        }} />
    );
}
