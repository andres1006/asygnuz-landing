"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Player, PlayerRef } from "@remotion/player";
import { AsygnuzVSL } from "@/remotion/AsygnuzVSL";
import styles from "./VSLSection.module.css";

const TOTAL_FRAMES = 1800;
// How many viewport heights the section "sticks" to give scroll room
const SCROLL_MULTIPLIER = 3;

export default function VSLSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<PlayerRef>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        // Start counting when top of section hits top of viewport,
        // stop when bottom of sticky wrapper exits bottom of viewport
        offset: ["start start", "end end"],
    });

    // Drive frames directly from scroll position
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (!playerRef.current) return;
        const frame = Math.round(progress * (TOTAL_FRAMES - 1));
        playerRef.current.seekTo(frame);
    });

    // Pause the player — scroll drives frames, not time
    useEffect(() => {
        playerRef.current?.pause();
    }, []);

    return (
        // Tall wrapper gives scroll room; inner sticky keeps video in view
        <div
            ref={sectionRef}
            className={styles.scrollRoom}
        >
            <div className={styles.sticky}>
                <Player
                    ref={playerRef}
                    component={AsygnuzVSL}
                    durationInFrames={TOTAL_FRAMES}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={30}
                    style={{ width: "100%", height: "100%" }}
                    autoPlay={false}
                    loop={false}
                    moveToBeginningWhenEnded={false}
                    showPosterWhenUnplayed={false}
                />
            </div>
        </div>
    );
}
