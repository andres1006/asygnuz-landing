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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.7 },
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
