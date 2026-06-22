"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { motion, useScroll, useTransform } from "framer-motion";
import { Player, PlayerRef } from "@remotion/player";
import { AsygnuzVSL } from "@/remotion/AsygnuzVSL";
import styles from "./VSLSection.module.css";

export default function VSLSection() {
    const { ref, isVisible } = useInView(0.25);
    const playerRef = useRef<PlayerRef>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax scroll: as user scrolls past the section, video shrinks + fades
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

    useEffect(() => {
        if (isVisible && playerRef.current) {
            playerRef.current.play();
        }
    }, [isVisible]);

    return (
        <section
            className={styles.vsl}
            ref={(el) => {
                // attach both refs: useInView's div ref + local section ref
                (ref as unknown as React.MutableRefObject<HTMLElement | null>).current = el;
                sectionRef.current = el;
            }}
        >
            <motion.div
                className={styles.videoWrap}
                style={{ scale, opacity, y }}
            >
                <Player
                    ref={playerRef}
                    component={AsygnuzVSL}
                    durationInFrames={1800}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={30}
                    controls
                    style={{ width: "100%", height: "100%" }}
                    autoPlay={false}
                    loop={false}
                    clickToPlay
                />
            </motion.div>
        </section>
    );
}
