import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedBackground = ({ children, className = "" }: AnimatedBackgroundProps) => {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero gradient-animated" />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-20 h-20 rounded-full opacity-10 ${
            i % 2 === 0 ? "bg-primary" : "bg-accent"
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Larger floating elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute w-40 h-40 rounded-full bg-primary opacity-5"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 2,
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};