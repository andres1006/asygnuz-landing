'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function AnimatedSection({ children, className = '', id }: { children: ReactNode, className?: string, id?: string }) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-full ${className}`}
        >
            {children}
        </motion.section>
    );
}
