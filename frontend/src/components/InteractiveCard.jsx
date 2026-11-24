import React, { useState, useRef } from 'react';

/**
 * Interactive 3D Card with live physics: mouse-tracking tilt, specular glint, and depth transform
 */
export function InteractiveCard({ children, className = '', intensity = 15, isFloating = true }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCoords({ x: rotateX, y: rotateY, active: true });
    setGlarePos({ x: glareX, y: glareY, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, active: false });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 cursor-pointer select-none ${className}`}
    >
      <div
        className={`relative transition-all ease-out duration-200 preserve-3d ${
          !coords.active && isFloating ? 'animate-float-hero' : ''
        }`}
        style={{
          transform: coords.active
            ? `rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.04, 1.04, 1.04)`
            : undefined,
        }}
      >
        {children}

        {/* Dynamic Specular Reflection Glare */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Ambient Sheen Sweep Bar */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-metal-sheen" />
        </div>
      </div>
    </div>
  );
}

