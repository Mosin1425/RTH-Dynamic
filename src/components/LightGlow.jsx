import React, { useState } from "react";

const LightGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) =>
        setPos({ x: e.clientX, y: e.clientY })
      }
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(circle 200px at ${pos.x}px ${pos.y}px, rgba(255,215,0,0.08), transparent 60%)`,
      }}
    />
  );
};

export default LightGlow;
