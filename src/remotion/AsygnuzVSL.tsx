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
                background: "#FFFFFF",
                opacity,
            }}
        >
            {/* Subtle grid pattern */}
            <div
                style={{
                    position: "absolute",
                    inset: -60,
                    backgroundImage:
                        "linear-gradient(rgba(24,48,87,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(24,48,87,0.05) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    transform: `translateY(${gridOffset}px)`,
                }}
            />
            {/* Soft blue orb */}
            <div
                style={{
                    position: "absolute",
                    width: 700,
                    height: 700,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(30,111,217,0.06), transparent 70%)",
                    top: -200 + Math.sin(frame / 60) * 30,
                    right: -200 + Math.cos(frame / 45) * 20,
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
                    fontSize: 96,
                    fontWeight: 700,
                    color: "#0F172A",
                    fontFamily: "Georgia, serif",
                    letterSpacing: "-0.03em",
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
                    background: "linear-gradient(90deg, transparent, #1E6FD9, transparent)",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            />
            {/* Subtitle */}
            <div
                style={{
                    fontSize: 22,
                    color: "#1E6FD9",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase" as const,
                    fontWeight: 700,
                    fontFamily: "system-ui, sans-serif",
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
                            fontSize: 68,
                            fontWeight: 700,
                            color: isHighlight ? "#1E6FD9" : "#0F172A",
                            fontFamily: "Georgia, serif",
                            textAlign: "center" as const,
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
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
                    fontSize: 26,
                    color: "#475569",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 400,
                        marginTop: 40,
                        textAlign: "center" as const,
                        maxWidth: 700,
                        lineHeight: 1.65,
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
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1E6FD9",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase" as const,
                    fontFamily: "system-ui, sans-serif",
                    marginBottom: 16,
                    opacity: titleOpacity,
                }}
            >
                Asygnuz Growth System
            </div>
            <div
                style={{
                    fontSize: 52,
                    fontWeight: 700,
                    color: "#0F172A",
                    fontFamily: "Georgia, serif",
                    textAlign: "center" as const,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    marginBottom: 56,
                    opacity: titleOpacity,
                }}
            >
                Ingeniería aplicada a tus ventas
            </div>

            <div style={{ display: "flex", gap: 32 }}>
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
                                width: 280,
                                background: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                borderRadius: 24,
                                padding: "36px 28px",
                                textAlign: "center" as const,
                                opacity: cardOpacity,
                                transform: `scale(${cardScale})`,
                                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: "#1E6FD9",
                                    letterSpacing: "0.18em",
                                    fontFamily: "system-ui, sans-serif",
                                    marginBottom: 14,
                                    textTransform: "uppercase" as const,
                                }}
                            >
                                PILAR {p.label}
                            </div>
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    fontFamily: "system-ui, sans-serif",
                                    marginBottom: 20,
                                    lineHeight: 1.35,
                                    whiteSpace: "pre-line" as const,
                                }}
                            >
                                {p.title}
                            </div>
                            <div
                                style={{
                                    fontSize: 44,
                                    fontWeight: 700,
                                    color: "#1E6FD9",
                                    fontFamily: "Georgia, serif",
                                    lineHeight: 1,
                                    letterSpacing: "-0.02em",
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
                    fontSize: 62,
                    fontWeight: 700,
                    color: "#0F172A",
                    fontFamily: "Georgia, serif",
                    textAlign: "center" as const,
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    marginBottom: 48,
                    transform: `scale(${titleScale})`,
                }}
            >
                Construyamos tu próxima
                <br />
                <span style={{ color: "#1E6FD9" }}>máquina de ventas.</span>
            </div>

            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "20px 48px",
                    background: "#183057",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: 20,
                    fontFamily: "system-ui, sans-serif",
                    borderRadius: 60,
                    opacity: buttonOpacity,
                    boxShadow: `0 6px ${24 + glowPulse * 12}px rgba(24,48,87,${0.22 + glowPulse * 0.14})`,
                    letterSpacing: "0.04em",
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
