import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const HeroBackground = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animaciones lentas y fluidas para un fondo "tech/luxury"
  const rotation = frame * 0.05;
  const scale = interpolate(Math.sin(frame / 60), [-1, 1], [1, 1.2]);

  // Generamos un patrón de partículas sutil
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const startX = (i * 27) % width;
    const startY = (i * 43) % height;
    
    // Movimiento vertical lento
    const yOffset = (frame * (i % 3 + 1)) % height;
    
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: startX,
          top: startY - yOffset + height, // Sube desde abajo
          width: i % 2 === 0 ? 3 : 1.5,
          height: i % 2 === 0 ? 3 : 1.5,
          backgroundColor: i % 3 === 0 ? "rgba(0, 212, 255, 0.4)" : "rgba(0, 230, 138, 0.2)",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(0, 212, 255, 0.8)",
          opacity: Math.sin((frame + i * 10) / 30) * 0.5 + 0.5,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      {/* Luz ambiental en movimiento (Cyan/Emerald) */}
      <div
        style={{
          position: "absolute",
          width: "150%",
          height: "150%",
          left: "-25%",
          top: "-25%",
          background: "radial-gradient(circle at center, rgba(0,212,255,0.08) 0%, rgba(0,230,138,0.03) 30%, transparent 60%)",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transformOrigin: "center center",
        }}
      />
      
      {/* Grilla muy sutil estática */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5
        }}
      />

      {/* Partículas tecnológicas ascendentes */}
      {particles}
    </AbsoluteFill>
  );
};
