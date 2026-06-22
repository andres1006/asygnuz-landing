"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
      }}
      className={`w-full overflow-hidden ${className}`}
    >
      {/* Thin gradient separator between sections */}
      <div
        aria-hidden="true"
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #E2E8F0 20%, #CBD5E1 50%, #E2E8F0 80%, transparent 100%)",
        }}
      />
      {children}
    </motion.div>
  );
}
