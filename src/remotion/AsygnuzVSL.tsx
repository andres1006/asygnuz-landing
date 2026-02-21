import React from "react";
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    Easing,
} from "remotion";

/* ========================================
   Asygnuz VSL Video Composition
   60 seconds at 30fps = 1800 frames
   ======================================== */

// -- Scenes config --
const scenes = [
    {
        // Scene 1: Logo reveal (0-150 frames, 0-5s)
        start: 0,
        end: 150,
        type: "logo" as const,
    },
    {
        // Scene 2: Problem statement (150-450 frames, 5-15s)
        start: 150,
        end: 450,
        type: "text" as const,
        lines: [
            "El 90% de las empresas",
            "invierten miles en anuncios...",
        ],
        subline: "...pero sus landing pages tardan 5 segundos en cargar",
    },
    {
        // Scene 3: The cost (450-720, 15-24s)
        start: 450,
        end: 720,
        type: "text" as const,
        lines: [
            "Eso es",
            "tirar el dinero.",
        ],
        subline: "Leads fríos. Seguimientos manuales. Data ciega.",
    },
    {
        // Scene 4: The solution (720-1080, 24-36s)
        start: 720,
        end: 1080,
        type: "pillars" as const,
    },
    {
        // Scene 5: The result (1080-1440, 36-48s)
        start: 1080,
        end: 1440,
        type: "text" as const,
        lines: [
            "No hacemos marketing bonito.",
            "Construimos máquinas",
            "de conversión.",
        ],
    },
    {
        // Scene 6: CTA (1440-1800, 48-60s)
        start: 1440,
        end: 1800,
        type: "cta" as const,
    },
];

// -- Sub-components --

function AnimatedBackground() {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });
    const gridOffset = (frame * 0.5) % 60;

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #0A1628 0%, #0F2044 50%, #152B56 100%)",
                opacity,
            }}
        >
            {/* Grid pattern */}
            <div
                style={{
                    position: "absolute",
                    inset: -60,
                    backgroundImage:
                        "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    transform: `translateY(${gridOffset}px)`,
                }}
            />
            {/* Cyan glow orb */}
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)",
                    top: -100 + Math.sin(frame / 60) * 30,
                    right: -100 + Math.cos(frame / 45) * 20,
                }}
            />
        </AbsoluteFill>
    );
}

function LogoScene() {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoScale = spring({ frame, fps, config: { damping: 12 } });
    const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const lineWidth = interpolate(frame, [60, 100], [0, 200], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Logo text */}
            <div
                style={{
                    fontSize: 80,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "Georgia, serif",
                    letterSpacing: "-0.02em",
                    transform: `scale(${logoScale})`,
                }}
            >
                Asygnuz
            </div>
            {/* Underline */}
            <div
                style={{
                    width: lineWidth,
                    height: 3,
                    background: "linear-gradient(90deg, transparent, #00D4FF, transparent)",
                    marginTop: 16,
                    marginBottom: 16,
                }}
            />
            {/* Subtitle */}
            <div
                style={{
                    fontSize: 20,
                    color: "#00D4FF",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase" as const,
                    fontWeight: 600,
                    opacity: subtitleOpacity,
                }}
            >
                Ingeniería de Crecimiento
            </div>
        </AbsoluteFill>
    );
}

function TextScene({
    lines,
    subline,
    startFrame,
}: {
    lines: string[];
    subline?: string;
    startFrame: number;
}) {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    return (
        <AbsoluteFill
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 80px",
            }}
        >
            {lines.map((line, i) => {
                const lineDelay = i * 12;
                const lineScale = spring({
                    frame: Math.max(0, localFrame - lineDelay),
                    fps,
                    config: { damping: 14 },
                });
                const lineOpacity = interpolate(
                    localFrame,
                    [lineDelay, lineDelay + 15],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const lineY = interpolate(
                    localFrame,
                    [lineDelay, lineDelay + 20],
                    [30, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
                );

                const isHighlight = line.includes("tirar") || line.includes("máquinas") || line.includes("conversión");

                return (
                    <div
                        key={i}
                        style={{
                            fontSize: 56,
                            fontWeight: 700,
                            color: isHighlight ? "#00D4FF" : "#FFFFFF",
                            fontFamily: "Georgia, serif",
                            textAlign: "center" as const,
                            lineHeight: 1.2,
                            opacity: lineOpacity,
                            transform: `translateY(${lineY}px) scale(${lineScale})`,
                        }}
                    >
                        {line}
                    </div>
                );
            })}

            {subline && (
                <div
                    style={{
                        fontSize: 22,
                        color: "#94A3B8",
                        marginTop: 32,
                        textAlign: "center" as const,
                        maxWidth: 600,
                        lineHeight: 1.6,
                        opacity: interpolate(localFrame, [60, 90], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                        transform: `translateY(${interpolate(localFrame, [60, 90], [20, 0], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        })}px)`,
                    }}
                >
                    {subline}
                </div>
            )}
        </AbsoluteFill>
    );
}

function PillarsScene({ startFrame }: { startFrame: number }) {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    const pillars = [
        { label: "01", title: "Arquitectura de\nAlta Conversión", metric: "< 1s" },
        { label: "02", title: "Automatización\nHigh-Ticket", metric: "100%" },
        { label: "03", title: "Ecosistema\nde Datos", metric: "1:1" },
    ];

    const titleOpacity = interpolate(localFrame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 60px",
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#00D4FF",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase" as const,
                    marginBottom: 12,
                    opacity: titleOpacity,
                }}
            >
                Asygnuz Growth System
            </div>
            <div
                style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "Georgia, serif",
                    textAlign: "center" as const,
                    marginBottom: 48,
                    opacity: titleOpacity,
                }}
            >
                Ingeniería aplicada a tus ventas
            </div>

            <div style={{ display: "flex", gap: 24 }}>
                {pillars.map((p, i) => {
                    const cardDelay = 20 + i * 15;
                    const cardScale = spring({
                        frame: Math.max(0, localFrame - cardDelay),
                        fps,
                        config: { damping: 12 },
                    });
                    const cardOpacity = interpolate(
                        localFrame,
                        [cardDelay, cardDelay + 15],
                        [0, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );

                    return (
                        <div
                            key={i}
                            style={{
                                width: 260,
                                background: "rgba(15,32,68,0.7)",
                                border: "1px solid rgba(0,212,255,0.12)",
                                borderRadius: 20,
                                padding: "32px 24px",
                                textAlign: "center" as const,
                                opacity: cardOpacity,
                                transform: `scale(${cardScale})`,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "#00D4FF",
                                    letterSpacing: "0.15em",
                                    marginBottom: 12,
                                }}
                            >
                                PILAR {p.label}
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    marginBottom: 16,
                                    lineHeight: 1.3,
                                    whiteSpace: "pre-line" as const,
                                }}
                            >
                                {p.title}
                            </div>
                            <div
                                style={{
                                    fontSize: 36,
                                    fontWeight: 700,
                                    color: "#00D4FF",
                                    fontFamily: "Georgia, serif",
                                }}
                            >
                                {p.metric}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
}

function CTAScene({ startFrame }: { startFrame: number }) {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    const titleScale = spring({ frame: localFrame, fps, config: { damping: 12 } });
    const buttonOpacity = interpolate(localFrame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const glowPulse = Math.sin(localFrame / 15) * 0.3 + 0.7;

    return (
        <AbsoluteFill
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "Georgia, serif",
                    textAlign: "center" as const,
                    lineHeight: 1.2,
                    marginBottom: 20,
                    transform: `scale(${titleScale})`,
                }}
            >
                Construyamos tu próxima
                <br />
                <span style={{ color: "#00D4FF" }}>máquina de ventas.</span>
            </div>

            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "18px 40px",
                    background: "linear-gradient(135deg, #00D4FF, #009DB8)",
                    color: "#0A1628",
                    fontWeight: 700,
                    fontSize: 18,
                    borderRadius: 60,
                    opacity: buttonOpacity,
                    boxShadow: `0 0 ${30 + glowPulse * 30}px rgba(0,212,255,${0.15 + glowPulse * 0.2})`,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase" as const,
                }}
            >
                Aplicar para una Auditoría
            </div>
        </AbsoluteFill>
    );
}

// -- Main Composition --
export const AsygnuzVSL: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill>
            <AnimatedBackground />

            {scenes.map((scene, i) => {
                // Calculate visibility
                const fadeIn = interpolate(frame, [scene.start, scene.start + 15], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                });
                const fadeOut = interpolate(frame, [scene.end - 15, scene.end], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                });
                const opacity = Math.min(fadeIn, fadeOut);

                if (frame < scene.start - 5 || frame > scene.end + 5) return null;

                return (
                    <AbsoluteFill key={i} style={{ opacity }}>
                        {scene.type === "logo" && <LogoScene />}
                        {scene.type === "text" && (
                            <TextScene
                                lines={scene.lines || []}
                                subline={scene.subline}
                                startFrame={scene.start}
                            />
                        )}
                        {scene.type === "pillars" && (
                            <PillarsScene startFrame={scene.start} />
                        )}
                        {scene.type === "cta" && <CTAScene startFrame={scene.start} />}
                    </AbsoluteFill>
                );
            })}
        </AbsoluteFill>
    );
};
