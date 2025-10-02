import React, { useRef, useState, useEffect } from "react";

type Props = {
  icon: React.ReactNode;
  tileSize?: number;
  zoomScale?: number;
  radius?: number;
  debounceMs?: number;
  cols?: number;
  rows?: number;
};

export default function PizzaBackground({
  icon,
  tileSize = 80,
  zoomScale = 2.0,
  radius = 120,
  debounceMs = 120,
  cols = 12,
  rows = 8,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const debounceRef = useRef<number | null>(null);
  const grid = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push({ r, c, x: c * tileSize, y: r * tileSize, i: r * cols + c });
    }
  }
  const updateActiveDebounced = (x: number, y: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const cIdx = Math.round(x / tileSize);
      const rIdx = Math.round(y / tileSize);
      const idx = rIdx * cols + cIdx;
      setActiveIndex(idx);
    }, debounceMs);
  };
  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setCursor({ x, y });
      updateActiveDebounced(x, y);
    });
  };
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  const cssVars: React.CSSProperties & Record<string, string | number> = {
    "--x": `${cursor.x}px`,
    "--y": `${cursor.y}px`,
    "--r": `${radius}px`,
    "--scale": zoomScale,
  };
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      style={{
        position: "relative",
        width: cols * tileSize,
        height: rows * tileSize,
        overflow: "hidden",
        cursor: "none",
        ...cssVars,
      }}
    >
      <GridLayer
        grid={grid}
        tileSize={tileSize}
        icon={icon}
        activeIndex={activeIndex}
        scale={1}
        style={{ position: "absolute", inset: 0 }}
      />
      <GridLayer
        grid={grid}
        tileSize={tileSize}
        icon={icon}
        activeIndex={activeIndex}
        scale={zoomScale}
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "var(--x) var(--y)",
          transform: "scale(var(--scale))",
          clipPath: "circle(var(--r) at var(--x) var(--y))",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "calc(var(--x) - var(--r))",
          top: "calc(var(--y) - var(--r))",
          width: "calc(var(--r) * 2)",
          height: "calc(var(--r) * 2)",
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.35)",
          boxShadow: "0 0 20px rgba(0,0,0,0.25) inset",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
function GridLayer({
  grid,
  tileSize,
  icon,
  activeIndex,
  scale,
  style,
}: {
  grid: { r: number; c: number; x: number; y: number; i: number }[];
  tileSize: number;
  icon: React.ReactNode;
  activeIndex: number | null;
  scale: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ ...style }}>
      {grid.map((cell) => {
        const isActive = activeIndex === cell.i;
        return (
          <div
            key={cell.i}
            style={{
              position: "absolute",
              left: cell.x,
              top: cell.y,
              width: tileSize,
              height: tileSize,
              display: "grid",
              placeItems: "center",
              transform: `scale(${scale})`,
              transition: isActive ? "transform 140ms ease, filter 140ms ease" : undefined,
              filter: isActive ? "drop-shadow(0 2px 8px rgba(0,0,0,0.25))" : undefined,
            }}
          >
            <div style={{ width: tileSize * 0.6, height: tileSize * 0.6 }}>{icon}</div>
          </div>
        );
      })}
    </div>
  );
}
