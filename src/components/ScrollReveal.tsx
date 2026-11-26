"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  scale?: number;
  className?: string;
  repeat?: boolean;
  float?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  scale = 0.94,
  className = "",
  repeat = false,
  float = false,
  ...props
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    scale,
    ...getInitialPosition(),
  };

  const animateIn = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 110,
      damping: 16,
      mass: 0.85,
      delay,
    },
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animateIn}
      viewport={{ once: !repeat, amount: 0.15 }}
      whileHover={{
        y: -6,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className={className}
      {...props}
    >
      {float ? (
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: delay * 1.5,
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

// Staggered Container Wrapper
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  ...props
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Pop Up Item to be used inside StaggerContainer
interface PopItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  yDistance?: number;
  hoverElevation?: number;
}

export function PopItem({
  children,
  className = "",
  yDistance = 40,
  hoverElevation = -8,
  ...props
}: PopItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yDistance, scale: 0.93 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: hoverElevation,
        scale: 1.025,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Pop Card with independent trigger
export function PopCard({
  children,
  className = "",
  delay = 0,
  yDistance = 45,
  hoverY = -10,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yDistance?: number;
  hoverY?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yDistance, scale: 0.94 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring" as const,
          stiffness: 115,
          damping: 15,
          delay,
        },
      }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{
        y: hoverY,
        scale: 1.02,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Continuous Floating Pop Badge
export function FloatingPopBadge({
  children,
  className = "",
  duration = 3.6,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
