"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

export default function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop with pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const particles: Particle[] = [];
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Spawn golden particles occasionally
      if (Math.random() < 0.4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2.5 + 1,
          alpha: 0.8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      if (mouse.x > 0 && mouse.y > 0) {
        // Ambient soft golden glow around cursor
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          45
        );
        gradient.addColorStop(0, "rgba(212, 175, 99, 0.18)");
        gradient.addColorStop(0.5, "rgba(212, 175, 99, 0.05)");
        gradient.addColorStop(1, "rgba(212, 175, 99, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.fill();

        // Small sharp golden center core
        ctx.fillStyle = "rgba(243, 229, 171, 0.7)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render floating particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        p.size *= 0.98;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(212, 175, 99, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Limit particle array
      if (particles.length > 50) {
        particles.splice(0, particles.length - 50);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
