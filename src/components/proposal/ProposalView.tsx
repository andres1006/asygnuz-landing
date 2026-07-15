'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    FiActivity,
    FiAlertCircle,
    FiBarChart2,
    FiBriefcase,
    FiCalendar,
    FiCheckCircle,
    FiCompass,
    FiDollarSign,
    FiMap,
    FiTrendingUp,
    FiZap,
} from 'react-icons/fi';
import AnimatedCounter from './AnimatedCounter';

/* ──────────────────────────────────────── Types */

type ProposalViewModel = {
    id: string;
    clientName: string;
    clientCompany: string;
    clientRole?: string | null;
    clientEmail?: string | null;
    projectName: string;
    projectObjective: string;
    currentSituation: string;
    mainChallenges: string[];
    proposedSolution: string;
    expectedOutcomes: string[];
    timelineMonths: number;
    phases: { title: string; description: string; duration: string }[];
    totalInvestment: number;
    roiPercentage: number;
    costOfInaction: number;
    deliverables?: string[] | null;
    createdAt?: string | Date;
    expiresAt?: string | Date;
};

type SectionDef = { id: string; title: string; icon: IconType };

/* ──────────────────────────────────────── Constants */

const SECTIONS: SectionDef[] = [
    { id: 'hero', title: 'Resumen', icon: FiActivity },
    { id: 'diagnosis', title: 'Diagnóstico', icon: FiAlertCircle },
    { id: 'vision', title: 'Visión', icon: FiCompass },
    { id: 'roadmap', title: 'Roadmap', icon: FiMap },
    { id: 'investment', title: 'Inversión', icon: FiBarChart2 },
];

/* ──────────────────────────────────────── Helpers */

function normalize(arr: string[] | null | undefined) {
    return (arr ?? []).map((s) => s.trim()).filter(Boolean);
}

function money(v: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
        Number.isFinite(v) ? v : 0
    );
}

function fmtDate(v?: string | Date) {
    if (!v) return '—';
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

/* ──────────────────────────────────────── Hooks */

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const obs = new IntersectionObserver(
            (entries) => {
                const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (hit?.target?.id) setActive(hit.target.id);
            },
            { rootMargin: '-15% 0px -65% 0px', threshold: [0.15, 0.4] }
        );
        nodes.forEach((n) => obs.observe(n));
        return () => obs.disconnect();
    }, [ids]);
    return active;
}

/* ──────────────────────────────────────── Stat Card */

function StatCard({
    icon: Icon,
    label,
    children,
    accent = 'blue',
}: {
    icon: IconType;
    label: string;
    children: React.ReactNode;
    accent?: 'blue' | 'emerald' | 'amber' | 'violet';
}) {
    const colorMap = {
        blue: { bg: '#ffffff', border: '#e2e8f0', iconBg: '#e0f2fe', icon: '#0284c7', text: '#0f172a' },
        emerald: { bg: '#ffffff', border: '#e2e8f0', iconBg: '#d1fae5', icon: '#059669', text: '#0f172a' },
        amber: { bg: '#ffffff', border: '#e2e8f0', iconBg: '#fef3c7', icon: '#d97706', text: '#0f172a' },
        violet: { bg: '#ffffff', border: '#e2e8f0', iconBg: '#ede9fe', icon: '#7c3aed', text: '#0f172a' },
    };
    const c = colorMap[accent];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            style={{
                borderRadius: 16,
                border: `1px solid ${c.border}`,
                background: c.bg,
                padding: '18px 20px',
                display: 'grid',
                gap: 10,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: c.iconBg }}>
                    <Icon size={16} color={c.icon} />
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}>{label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: c.text, lineHeight: 1.1 }}>{children}</div>
        </motion.div>
    );
}

/* ──────────────────────────────────────── Main Component */

export default function ProposalView({ proposal }: { proposal: ProposalViewModel }) {
    const { scrollYProgress } = useScroll();
    const activeSection = useActiveSection(SECTIONS.map((s) => s.id));

    const challenges = normalize(proposal.mainChallenges);
    const outcomes = normalize(proposal.expectedOutcomes);
    const deliverables = normalize(proposal.deliverables);
    const phases = proposal.phases ?? [];
    const timeLabel = `${proposal.timelineMonths} ${proposal.timelineMonths === 1 ? 'mes' : 'meses'}`;

    const costRatio = proposal.totalInvestment > 0 && proposal.costOfInaction > 0
        ? Math.min((proposal.costOfInaction * 12) / proposal.totalInvestment, 5)
        : 0;

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#f8fafc',
                color: '#334155',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
        >
            {/* Progress bar */}
            <motion.div
                style={{
                    position: 'fixed', top: 0, left: 0, height: 3, width: '100%',
                    transformOrigin: '0%', scaleX: scrollYProgress,
                    background: 'linear-gradient(90deg, #1D85C4, #38bdf8)',
                    zIndex: 120,
                }}
            />

            {/* Header */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 100,
                borderBottom: '1px solid #e2e8f0',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
            }}>
                <div style={{
                    maxWidth: 1280, margin: '0 auto', padding: '10px 20px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                }}>
                    <div>
                        <p style={{ margin: 0, color: '#1D85C4', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                            Propuesta Asygnuz
                        </p>
                        <h1 style={{ margin: '1px 0 0', fontSize: 18, color: '#0f172a', fontWeight: 800 }}>
                            {proposal.projectName || proposal.clientCompany}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                            padding: '5px 10px', borderRadius: 999, fontSize: 11,
                            border: '1px solid #bbf7d0', background: '#f0fdf4',
                            color: '#166534', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5,
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                            Activa
                        </span>
                        <span style={{ fontSize: 11, color: '#64748b' }}>Vence: {fmtDate(proposal.expiresAt)}</span>
                    </div>
                </div>
            </header>

            {/* Layout */}
            <div style={{
                maxWidth: 1280, margin: '0 auto', padding: '24px 20px 60px',
                display: 'grid', gridTemplateColumns: '200px minmax(0, 1fr)', gap: 20,
            }}>
                {/* Sidebar Nav */}
                <aside style={{
                    position: 'sticky', top: 72, alignSelf: 'start',
                    borderRadius: 14, border: '1px solid #e2e8f0',
                    background: '#ffffff', padding: 10,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                    <div style={{ display: 'grid', gap: 4 }}>
                        {SECTIONS.map((sec) => {
                            const isActive = activeSection === sec.id;
                            const Icon = sec.icon;
                            return (
                                <button
                                    key={sec.id}
                                    type="button"
                                    onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                                        padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                                        border: isActive ? '1px solid #bae6fd' : '1px solid transparent',
                                        background: isActive ? '#f0f9ff' : 'transparent',
                                        color: isActive ? '#0369a1' : '#64748b',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Icon size={14} />
                                    <span style={{ fontSize: 12, fontWeight: 700 }}>{sec.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ display: 'grid', gap: 20 }}>

                    {/* ── HERO SECTION ── */}
                    <section id="hero" style={{ scrollMarginTop: 80, display: 'grid', gap: 16 }}>
                        {/* Client info + Objective */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                borderRadius: 20, padding: '28px 28px 24px',
                                border: '1px solid #e2e8f0',
                                background: '#ffffff',
                                position: 'relative', overflow: 'hidden',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                            }}
                        >
                            {/* Decorative glow */}
                            <div style={{
                                position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                                borderRadius: '50%', background: '#e0f2fe', filter: 'blur(60px)', pointerEvents: 'none',
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1D85C4', fontWeight: 700 }}>
                                            Preparado para
                                        </p>
                                        <h2 style={{ margin: '4px 0 2px', fontSize: 30, fontWeight: 800, color: '#0f172a' }}>
                                            {proposal.clientName}
                                        </h2>
                                        <p style={{ margin: 0, fontSize: 15, color: '#64748b' }}>
                                            {proposal.clientCompany}{proposal.clientRole ? ` · ${proposal.clientRole}` : ''}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                                            border: '1px solid #e2e8f0', background: '#f8fafc',
                                            color: '#475569', display: 'flex', alignItems: 'center', gap: 5,
                                        }}>
                                            <FiCalendar size={12} color="#94a3b8" /> {fmtDate(proposal.createdAt)}
                                        </span>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                                            border: '1px solid #e2e8f0', background: '#f8fafc',
                                            color: '#475569', display: 'flex', alignItems: 'center', gap: 5,
                                        }}>
                                            <FiMap size={12} color="#94a3b8" /> {timeLabel}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ borderRadius: 14, border: '1px solid #e2e8f0', background: '#f8fafc', padding: '16px 18px' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0284c7', fontWeight: 700, marginBottom: 6 }}>Objetivo</p>
                                    <p style={{ margin: 0, color: '#334155', fontSize: 15, lineHeight: 1.65 }}>{proposal.projectObjective}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* KPI Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                            <StatCard icon={FiDollarSign} label="Inversión" accent="blue">
                                <AnimatedCounter value={proposal.totalInvestment} prefix="$" />
                            </StatCard>
                            <StatCard icon={FiTrendingUp} label="ROI Estimado" accent="emerald">
                                <AnimatedCounter value={proposal.roiPercentage} suffix="%" />
                            </StatCard>
                            <StatCard icon={FiZap} label="Costo Inacción / Mes" accent="amber">
                                <AnimatedCounter value={proposal.costOfInaction} prefix="$" />
                            </StatCard>
                            <StatCard icon={FiBriefcase} label="Timeline" accent="violet">
                                {timeLabel}
                            </StatCard>
                        </div>
                    </section>

                    {/* ── DIAGNOSIS ── */}
                    <section id="diagnosis" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid #e2e8f0',
                                background: '#ffffff',
                                padding: 24, display: 'grid', gap: 16,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#fee2e2', border: '1px solid #fca5a5' }}>
                                    <FiAlertCircle size={17} color="#dc2626" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#0f172a', fontWeight: 800 }}>Diagnóstico Actual</h2>
                                    <p style={{ margin: '1px 0 0', color: '#64748b', fontSize: 12 }}>Puntos de fricción identificados</p>
                                </div>
                            </div>

                            <p style={{ margin: 0, color: '#475569', lineHeight: 1.65, fontSize: 14 }}>{proposal.currentSituation}</p>

                            <div style={{ display: 'grid', gap: 8 }}>
                                {challenges.map((item, i) => (
                                    <motion.div
                                        key={`c-${i}`}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                            padding: '12px 14px', borderRadius: 12,
                                            border: '1px solid #fecaca', background: '#fef2f2',
                                        }}
                                    >
                                        <span style={{
                                            width: 22, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center',
                                            background: '#fecaca', flexShrink: 0, marginTop: 1,
                                        }}>
                                            <FiAlertCircle size={12} color="#dc2626" />
                                        </span>
                                        <span style={{ color: '#991b1b', fontSize: 14 }}>{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Cost gauge */}
                            {costRatio > 0 && (
                                <div style={{ borderRadius: 12, border: '1px solid #fde68a', background: '#fffbeb', padding: '14px 16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#b45309', fontWeight: 700 }}>Costo anual de inacción vs inversión</span>
                                        <span style={{ fontSize: 13, color: '#92400e', fontWeight: 800 }}>
                                            <AnimatedCounter value={proposal.costOfInaction * 12} prefix="$" /> / año
                                        </span>
                                    </div>
                                    <div style={{ height: 8, borderRadius: 999, background: '#fef3c7', overflow: 'hidden' }}>
                                        <motion.div
                                            animate={{ width: `${Math.min(costRatio / 5 * 100, 100)}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}
                                        />
                                    </div>
                                    <p style={{ margin: '6px 0 0', fontSize: 11, color: '#b45309' }}>
                                        {costRatio.toFixed(1)}x más costoso que la inversión propuesta
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </section>

                    {/* ── VISION ── */}
                    <section id="vision" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid #e2e8f0',
                                background: '#ffffff',
                                padding: 24, display: 'grid', gap: 16,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#d1fae5', border: '1px solid #a7f3d0' }}>
                                    <FiCompass size={17} color="#059669" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#0f172a', fontWeight: 800 }}>Visión Objetivo</h2>
                                    <p style={{ margin: '1px 0 0', color: '#64748b', fontSize: 12 }}>Escenario deseado tras implementación</p>
                                </div>
                            </div>

                            <p style={{ margin: 0, color: '#475569', lineHeight: 1.65, fontSize: 14 }}>{proposal.proposedSolution}</p>

                            <div style={{ display: 'grid', gap: 8 }}>
                                {outcomes.map((item, i) => (
                                    <motion.div
                                        key={`o-${i}`}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                            padding: '12px 14px', borderRadius: 12,
                                            border: '1px solid #bbf7d0', background: '#f0fdf4',
                                        }}
                                    >
                                        <span style={{
                                            width: 22, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center',
                                            background: '#bbf7d0', flexShrink: 0, marginTop: 1,
                                        }}>
                                            <FiCheckCircle size={12} color="#16a34a" />
                                        </span>
                                        <span style={{ color: '#166534', fontSize: 14 }}>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* ── ROADMAP ── */}
                    <section id="roadmap" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid #e2e8f0',
                                background: '#ffffff',
                                padding: 24, display: 'grid', gap: 20,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#e0e7ff', border: '1px solid #c7d2fe' }}>
                                    <FiMap size={17} color="#4f46e5" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#0f172a', fontWeight: 800 }}>Roadmap de Ejecución</h2>
                                    <p style={{ margin: '1px 0 0', color: '#64748b', fontSize: 12 }}>Plan por fases con entregables claros</p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div style={{ position: 'relative', paddingLeft: 28 }}>
                                {/* Vertical line */}
                                <div style={{
                                    position: 'absolute', left: 8, top: 4, bottom: 4, width: 2,
                                    background: 'linear-gradient(180deg, #818cf8, #38bdf8)',
                                    borderRadius: 2,
                                }} />

                                <div style={{ display: 'grid', gap: 16 }}>
                                    {phases.map((phase, i) => (
                                        <motion.div
                                            key={`p-${i}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            style={{ position: 'relative' }}
                                        >
                                            {/* Dot */}
                                            <div style={{
                                                position: 'absolute', left: -24, top: 14, width: 12, height: 12,
                                                borderRadius: '50%', background: '#4f46e5', border: '2px solid #ffffff',
                                                boxShadow: '0 0 8px rgba(79,70,229,0.4)',
                                            }} />

                                            <div style={{
                                                borderRadius: 14, padding: '16px 18px',
                                                border: '1px solid #e0e7ff', background: '#f5f7ff',
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                                                    <h3 style={{ margin: 0, fontSize: 15, color: '#0f172a', fontWeight: 700 }}>
                                                        <span style={{ color: '#4f46e5', fontSize: 12, fontWeight: 800, marginRight: 6 }}>Fase {i + 1}</span>
                                                        {phase.title}
                                                    </h3>
                                                    <span style={{ fontSize: 11, color: '#4338ca', fontWeight: 700, padding: '3px 8px', borderRadius: 999, border: '1px solid #c7d2fe', background: '#e0e7ff' }}>
                                                        {phase.duration}
                                                    </span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.55 }}>{phase.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Deliverables */}
                            {deliverables.length > 0 && (
                                <div>
                                    <p style={{ margin: '0 0 8px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0284c7', fontWeight: 700 }}>Entregables clave</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {deliverables.map((item, i) => (
                                            <span key={`d-${i}`} style={{
                                                borderRadius: 999, padding: '5px 10px', fontSize: 12, fontWeight: 600,
                                                border: '1px solid #bae6fd', background: '#f0f9ff', color: '#0369a1',
                                            }}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </section>

                    {/* ── INVESTMENT ── */}
                    <section id="investment" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid #e2e8f0',
                                background: '#ffffff',
                                padding: 24, display: 'grid', gap: 20,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#e0f2fe', border: '1px solid #bae6fd' }}>
                                    <FiTrendingUp size={17} color="#0284c7" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#0f172a', fontWeight: 800 }}>Inversión y Caso de Negocio</h2>
                                    <p style={{ margin: '1px 0 0', color: '#64748b', fontSize: 12 }}>Métricas para toma de decisión ejecutiva</p>
                                </div>
                            </div>

                            {/* Main investment cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                                <div style={{ borderRadius: 14, padding: '18px 20px', border: '1px solid #bae6fd', background: '#f0f9ff' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7', fontWeight: 700 }}>Inversión Total</p>
                                    <p style={{ margin: '8px 0 0', fontSize: 32, color: '#0f172a', fontWeight: 800, lineHeight: 1 }}>
                                        <AnimatedCounter value={proposal.totalInvestment} prefix="$" />
                                    </p>
                                    <p style={{ margin: '6px 0 0', fontSize: 12, color: '#64748b' }}>Pago único</p>
                                </div>
                                <div style={{ borderRadius: 14, padding: '18px 20px', border: '1px solid #a7f3d0', background: '#ecfdf5' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669', fontWeight: 700 }}>Retorno de Inversión</p>
                                    <p style={{ margin: '8px 0 0', fontSize: 32, color: '#0f172a', fontWeight: 800, lineHeight: 1 }}>
                                        <AnimatedCounter value={proposal.roiPercentage} suffix="%" />
                                    </p>
                                    <p style={{ margin: '6px 0 0', fontSize: 12, color: '#64748b' }}>ROI estimado</p>
                                </div>
                                <div style={{ padding: '24px', borderRadius: 12, border: '1px solid #fef3c7', background: '#fffbeb', flex: '1 1 250px' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#d97706', letterSpacing: '0.05em' }}>PÉRDIDA POR NO ACTUAR</span>
                                    <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', margin: '8px 0 4px', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#d97706', marginRight: 2 }}>$</span>
                                        <AnimatedCounter value={proposal.costOfInaction} />
                                    </div>
                                    <span style={{ fontSize: 12, color: '#64748b' }}>Dinero que se pierde cada mes</span>
                                </div>
                            </div>

                            {/* ROI visual gauge */}
                            {proposal.roiPercentage > 0 && (
                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ borderRadius: 14, border: '1px solid #d1fae5', background: '#f0fdf4', padding: '16px 18px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                            <span style={{ fontSize: 12, color: '#059669', fontWeight: 700 }}>Gauge de ROI</span>
                                            <span style={{ fontSize: 14, color: '#047857', fontWeight: 800 }}>
                                                <AnimatedCounter value={proposal.roiPercentage} suffix="%" />
                                            </span>
                                        </div>
                                        <div style={{ height: 10, borderRadius: 999, background: '#e2e8f0', overflow: 'hidden' }}>
                                            <motion.div
                                                animate={{ width: `${Math.min(proposal.roiPercentage, 500) / 5}%` }}
                                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                                style={{
                                                    height: '100%', borderRadius: 999,
                                                    background: 'linear-gradient(90deg, #10b981, #0ea5e9, #3b82f6)',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Gráfica comparativa Tiempo vs Inversión / Costo Inacción */}
                                    <div style={{ borderRadius: 14, border: '1px solid #e2e8f0', background: '#f8fafc', padding: '20px 20px 24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: 14, color: '#0f172a', fontWeight: 700 }}>Proyección Acumulada a {proposal.timelineMonths} Meses</h3>
                                                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>Pérdida por no hacer nada vs. Retorno estimado</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 12, fontSize: 11, fontWeight: 700 }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#d97706' }}>
                                                    <span style={{ width: 10, height: 10, borderRadius: 3, background: '#f59e0b' }} /> Pérdida
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#059669' }}>
                                                    <span style={{ width: 10, height: 10, borderRadius: 3, background: '#10b981' }} /> Ganancia
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 160, paddingBottom: 24, borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
                                            {/* Línea base */}
                                            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 23, height: 1, background: '#cbd5e1', borderStyle: 'dashed' }} />
                                            
                                            {Array.from({ length: Math.min(proposal.timelineMonths, 12) }).map((_, i) => {
                                                const mes = i + 1;
                                                
                                                // La pérdida se acumula linealmente
                                                const perdidaMensual = proposal.costOfInaction * mes;
                                                
                                                // El beneficio extra generado puramente por el ROI
                                                const beneficioRoiTotal = proposal.totalInvestment * (proposal.roiPercentage / 100);
                                                
                                                // Curva de aceleración (lento al principio, rápido al final)
                                                const factorAceleracion = Math.pow(mes / proposal.timelineMonths, 2);
                                                
                                                // La ganancia total es la suma de:
                                                // 1. La pérdida que logramos evitar (Savings)
                                                // 2. El beneficio extra (ROI)
                                                const gananciaMensual = (perdidaMensual + beneficioRoiTotal) * factorAceleracion;
                                                
                                                const maxValue = Math.max(
                                                    proposal.costOfInaction * proposal.timelineMonths, 
                                                    (proposal.costOfInaction * proposal.timelineMonths) + beneficioRoiTotal
                                                ) || 1;

                                                const heightPerdida = Math.min((perdidaMensual / maxValue) * 100, 100);
                                                const heightGanancia = Math.min((gananciaMensual / maxValue) * 100, 100);

                                                return (
                                                    <div key={`chart-m-${i}`} style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', height: '100%' }}>
                                                        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', maxWidth: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 2 }}>
                                                            {/* Barra Pérdida */}
                                                            <motion.div
                                                                title={`Mes ${mes} - Pérdida acumulada: $${Math.round(perdidaMensual).toLocaleString()}`}
                                                                animate={{ height: `${heightPerdida}%` }}
                                                                transition={{ duration: 0.8 }}
                                                                style={{ width: '45%', background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)', borderRadius: '4px 4px 0 0', cursor: 'pointer' }}
                                                            />
                                                            {/* Barra Ganancia */}
                                                            <motion.div
                                                                title={`Mes ${mes} - Ganancia acumulada: $${Math.round(gananciaMensual).toLocaleString()}`}
                                                                animate={{ height: `${heightGanancia}%` }}
                                                                transition={{ duration: 0.8, delay: 0.1 }}
                                                                style={{ width: '45%', background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)', borderRadius: '4px 4px 0 0', cursor: 'pointer' }}
                                                            />
                                                        </div>
                                                        <span style={{ position: 'absolute', bottom: -20, fontSize: 10, color: '#64748b', fontWeight: 600 }}>M{mes}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </section>

                </main>
            </div>
        </div>
    );
}
