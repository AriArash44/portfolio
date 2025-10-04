import React, { useRef, useState, useEffect } from "react";

type Props = {
  icon: React.ReactNode;
  tileSize?: number;
  zoomScale?: number;
  radius?: number;
  debounceMs?: number;
  rows?: number;
};

export default function PizzaBackground({
  icon,
  tileSize = 80,
  zoomScale = 2.0,
  radius = 120,
  debounceMs = 120,
  rows = 8,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const debounceRef = useRef<number | null>(null);
  const [cols, setCols] = useState(0);
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setCols(Math.floor(width / tileSize));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [tileSize]);
  const grid: { r: number; c: number; x: number; y: number; i: number, rotation: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push({ r, c, x: c * tileSize, y: r * tileSize, i: r * cols + c, rotation: Math.random() * 360 });
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
      style={{ height: rows * tileSize, ...cssVars }}
      className="relative w-full overflow-hidden cursor-none"
    >
      <GridLayer
        grid={grid}
        tileSize={tileSize}
        icon={icon}
        activeIndex={activeIndex}
        scale={1}
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 99%, black 100%)",
          WebkitMaskComposite: "destination-out",
          maskImage: "radial-gradient(circle var(--r) at var(--x) var(--y), transparent 99%, black 100%)",
          maskComposite: "exclude",
        }}
      />
      <GridLayer
        grid={grid}
        tileSize={tileSize}
        icon={icon}
        activeIndex={activeIndex}
        scale={zoomScale}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transformOrigin: "var(--x) var(--y)",
          clipPath: "circle(var(--r) at var(--x) var(--y))",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: "calc(var(--x) - var(--r))",
          top: "calc(var(--y) - var(--r))",
          width: "calc(var(--r) * 2)",
          height: "calc(var(--r) * 2)",
          boxShadow: "0 0 20px rgba(0,0,0,0.35)",
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
  className,
  style,
}: {
  grid: { r: number; c: number; x: number; y: number; i: number; rotation: number }[];
  tileSize: number;
  icon: React.ReactNode;
  activeIndex: number | null;
  scale: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {grid.map((cell) => {
        const isActive = activeIndex === cell.i;
        return (
          <div
            key={cell.i}
            className="absolute grid place-items-center"
            style={{
              left: cell.x,
              top: cell.y,
              width: tileSize,
              height: tileSize,
              transform: `scale(${scale}) rotate(${cell.rotation}deg)`,
              transition: isActive
                ? "transform 140ms ease, filter 140ms ease"
                : undefined,
              filter: isActive
                ? "drop-shadow(0 2px 8px rgba(0,0,0,0.25))"
                : undefined,
            }}
          >
            <div style={{ width: tileSize * 0.8, height: tileSize * 0.8 }}>
              {icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}
