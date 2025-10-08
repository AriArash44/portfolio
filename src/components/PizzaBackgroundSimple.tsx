import React, { useEffect, useState, useMemo } from "react";

type Props = {
    icon: React.ReactNode;
    tileSize?: number;
    rows?: number;
};

export default function PizzaBackgroundSimple({ icon, tileSize = 80, rows = 8 }: Props) {
    const [cols, setCols] = useState(0);
    useEffect(() => {
        const resize = () => {
            const width = window.innerWidth;
            setCols(Math.floor(width / tileSize));
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [tileSize]);
    const grid = useMemo(() => {
        const g: { x: number; y: number; i: number; rotation: number }[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const i = r * cols + c;
                g.push({
                    x: c * tileSize,
                    y: r * tileSize,
                    i,
                    rotation: Math.random() * 360,
                });
            }
        }
        return g;
    }, [rows, cols, tileSize]);
    return (
      <div style={{ height: rows * tileSize }} className="relative w-full overflow-hidden">
        {grid.map((cell) => (
          <div
            key={cell.i}
            className="absolute grid place-items-center"
            style={{
              left: cell.x,
              top: cell.y,
              width: tileSize,
              height: tileSize,
              transform: `rotate(${cell.rotation}deg)`,
            }}
          >
            <div style={{ width: tileSize * 0.8, height: tileSize * 0.8 }}>{icon}</div>
          </div>
        ))}
      </div>
    );
}
