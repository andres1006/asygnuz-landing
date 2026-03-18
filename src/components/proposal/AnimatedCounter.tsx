'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) {
    const [inView, setInView] = useState(false);

    // Spring for smooth animation
    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 15,
        mass: 1,
    });

    const displayValue = useTransform(springValue, (current) => {
        return Math.floor(current).toLocaleString('en-US'); // Formato con comas
    });

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    return (
        <motion.span
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true }}
            className="inline-block"
        >
            {prefix}<motion.span>{displayValue}</motion.span>{suffix}
        </motion.span>
    );
}
