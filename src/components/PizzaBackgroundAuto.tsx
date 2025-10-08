import React, { useMemo } from "react";
import PizzaBackgroundFull from "./PizzaBackgroundFull";
import PizzaBackgroundSimple from "./PizzaBackgroundSimple";

type Props = {
    icon: React.ReactNode;
    tileSize?: number;
    zoomScale?: number;
    radius?: number;
    debounceMs?: number;
    rows?: number;
};

export default function PizzaBackgroundAuto(props: Props) {
    const isFirefox = useMemo(() => {
        if (typeof navigator === "undefined") return false;
        return navigator.userAgent.toLowerCase().includes("firefox");
    }, []);
    return isFirefox ? (
        <PizzaBackgroundFull {...props} />
    ) : (
        <PizzaBackgroundSimple rows={3} icon={props.icon} tileSize={55} />
    );
}
