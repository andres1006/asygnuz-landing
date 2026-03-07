'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FiAlertTriangle, FiBarChart2, FiCheck, FiClipboard, FiCompass, FiExternalLink, FiTarget, FiUser } from 'react-icons/fi';
import { createProposalAction } from '@/app/actions/proposal.actions';
import { CreateProposalDTO } from '@/types/proposal';

const PREVIEW_EVENT_NAME = 'asygnuz-proposal-preview-update';

type StepId =
    | 'client'
    | 'overview'
    | 'problem'
    | 'solution'
    | 'execution'
    | 'business';

interface StepConfig {
    id: StepId;
    icon: IconType;
    title: string;
    subtitle: string;
}

const STEPS: StepConfig[] = [
    { id: 'client', icon: FiUser, title: 'Cliente', subtitle: 'Datos del prospecto' },
    { id: 'overview', icon: FiTarget, title: 'Proyecto', subtitle: 'Objetivo y alcance' },
    { id: 'problem', icon: FiAlertTriangle, title: 'Problema', subtitle: 'Diagnóstico actual' },
    { id: 'solution', icon: FiCompass, title: 'Solución', subtitle: 'Visión y resultados' },
    { id: 'execution', icon: FiClipboard, title: 'Ejecución', subtitle: 'Roadmap y fases' },
    { id: 'business', icon: FiBarChart2, title: 'Negocio', subtitle: 'Financiero y ROI' },
];

const inputStyle: CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#f1f5f9',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, background 0.2s',
};

const textareaStyle: CSSProperties = {
    ...inputStyle,
    minHeight: 90,
    resize: 'vertical',
};

const addBtnStyle: CSSProperties = {
    border: '1px dashed rgba(103,232,249,0.3)',
    background: 'transparent',
    color: '#67e8f9',
    borderRadius: 10,
    padding: '8px 14px',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wide">{label}</span>
            {children}
        </label>
    );
}

function validateStep(stepId: StepId, data: CreateProposalDTO): string[] {
    switch (stepId) {
        case 'client': {
            const errors: string[] = [];
            if (!data.clientName?.trim()) errors.push('Nombre Cliente');
            if (!data.clientCompany?.trim()) errors.push('Empresa');
            return errors;
        }
        case 'overview': {
            const errors: string[] = [];
            if (!data.projectName?.trim()) errors.push('Nombre del Proyecto');
            if (!data.projectObjective?.trim()) errors.push('Objetivo Principal');
            return errors;
        }
        case 'problem': {
            const errors: string[] = [];
            if (!data.currentSituation?.trim()) errors.push('Situación Actual');
            if (!data.mainChallenges?.some((x) => x.trim())) errors.push('Principales Desafíos');
            return errors;
        }
        case 'solution': {
            const errors: string[] = [];
            if (!data.proposedSolution?.trim()) errors.push('Solución / Concepto');
            if (!data.expectedOutcomes?.some((x) => x.trim())) errors.push('Resultados Esperados');
            return errors;
        }
        case 'execution': {
            const errors: string[] = [];
            if (!Number(data.timelineMonths) || Number(data.timelineMonths) < 1) errors.push('Duración Total');
            if (!data.phases?.length || data.phases.some((p) => !p.title.trim() || !p.duration.trim() || !p.description.trim())) {
                errors.push('Fases del Proyecto');
            }
            return errors;
        }
        case 'business': {
            const errors: string[] = [];
            if (Number(data.totalInvestment) < 0) errors.push('Inversión Total');
            if (Number(data.roiPercentage) < 0) errors.push('ROI Estimado');
            if (Number(data.costOfInaction) < 0) errors.push('Costo de Inacción');
            return errors;
        }
        default:
            return [];
    }
}

export default function QuoterForm() {
    const [loading, setLoading] = useState(false);
    const [resultUrl, setResultUrl] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [stepError, setStepError] = useState<string>('');
    const [isDesktop, setIsDesktop] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [formData, setFormData] = useState<CreateProposalDTO>({
        clientName: '',
        clientCompany: '',
        clientRole: '',
        clientEmail: '',
        projectName: '',
        projectObjective: '',
        currentSituation: '',
        mainChallenges: [''],
        proposedSolution: '',
        expectedOutcomes: [''],
        timelineMonths: 1,
        phases: [{ title: '', description: '', duration: '' }],
        totalInvestment: 0,
        roiPercentage: 0,
        costOfInaction: 0,
        deliverables: [''],
    });

    const activeStep = STEPS[stepIndex];
    const ActiveStepIcon = activeStep.icon;
    const progress = useMemo(() => Math.round(((stepIndex + 1) / STEPS.length) * 100), [stepIndex]);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1180px)');
        const update = () => setIsDesktop(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    const previewPayload = useMemo(() => ({
        ...formData,
        timelineMonths: Number(formData.timelineMonths) || 1,
        totalInvestment: Number(formData.totalInvestment) || 0,
        roiPercentage: Number(formData.roiPercentage) || 0,
        costOfInaction: Number(formData.costOfInaction) || 0,
    }), [formData]);

    const pushPreview = () => {
        const frameWindow = iframeRef.current?.contentWindow;
        if (!frameWindow) return;
        frameWindow.postMessage(
            { type: PREVIEW_EVENT_NAME, payload: previewPayload },
            window.location.origin
        );
    };

    useEffect(() => {
        pushPreview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [previewPayload]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (
        index: number,
        field: 'mainChallenges' | 'expectedOutcomes' | 'deliverables',
        value: string
    ) => {
        setFormData((prev) => {
            const arr = [...(prev[field] || [])];
            arr[index] = value;
            return { ...prev, [field]: arr };
        });
    };

    const addArrayItem = (field: 'mainChallenges' | 'expectedOutcomes' | 'deliverables') => {
        setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ''] }));
    };

    const handlePhaseChange = (
        index: number,
        key: keyof (typeof formData.phases)[0],
        value: string
    ) => {
        setFormData((prev) => {
            const phases = [...prev.phases];
            phases[index] = { ...phases[index], [key]: value };
            return { ...prev, phases };
        });
    };

    const addPhase = () => {
        setFormData((prev) => ({
            ...prev,
            phases: [...prev.phases, { title: '', description: '', duration: '' }],
        }));
    };

    const goNext = () => {
        const errors = validateStep(activeStep.id, formData);
        if (errors.length > 0) {
            setStepError(`Completa: ${errors.join(', ')}`);
            return;
        }
        setStepError('');
        setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    };

    const goBack = () => {
        setStepError('');
        setStepIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateStep(activeStep.id, formData);
        if (errors.length > 0) {
            setStepError(`Completa: ${errors.join(', ')}`);
            return;
        }

        setLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                timelineMonths: Number(formData.timelineMonths),
                totalInvestment: Number(formData.totalInvestment),
                roiPercentage: Number(formData.roiPercentage),
                costOfInaction: Number(formData.costOfInaction),
            };

            const result = await createProposalAction(dataToSubmit);
            if (result.success) {
                setResultUrl(`${window.location.origin}/propuesta/${result.id}`);
            } else {
                alert(result.error);
            }
        } catch {
            alert('Error al enviar');
        } finally {
            setLoading(false);
        }
    };

    function renderStepContent() {
        switch (activeStep.id) {
            case 'client':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Nombre Cliente"><input required name="clientName" value={formData.clientName} onChange={handleChange} style={inputStyle} placeholder="Juan Pérez" /></Field>
                        <Field label="Empresa"><input required name="clientCompany" value={formData.clientCompany} onChange={handleChange} style={inputStyle} placeholder="Acme Corp" /></Field>
                        <Field label="Cargo (Opcional)"><input name="clientRole" value={formData.clientRole} onChange={handleChange} style={inputStyle} placeholder="CEO / CTO" /></Field>
                        <Field label="Email (Opcional)"><input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} style={inputStyle} placeholder="juan@acme.com" /></Field>
                    </div>
                );
            case 'overview':
                return (
                    <div className="grid gap-4">
                        <Field label="Nombre del Proyecto"><input required name="projectName" value={formData.projectName} onChange={handleChange} style={inputStyle} placeholder="Transformación Digital 2026" /></Field>
                        <Field label="Objetivo Principal"><textarea required name="projectObjective" value={formData.projectObjective} onChange={handleChange} rows={3} style={textareaStyle} placeholder="Describe el objetivo principal del proyecto..." /></Field>
                    </div>
                );
            case 'problem':
                return (
                    <div className="grid gap-4">
                        <Field label="Situación Actual"><textarea required name="currentSituation" value={formData.currentSituation} onChange={handleChange} rows={3} style={textareaStyle} placeholder="Describe la situación actual del cliente..." /></Field>
                        <div>
                            <span className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Principales Desafíos</span>
                            <div className="grid gap-2">
                                {formData.mainChallenges.map((ch, i) => (
                                    <input key={i} required value={ch} onChange={(e) => handleArrayChange(i, 'mainChallenges', e.target.value)} style={inputStyle} placeholder={`Desafío ${i + 1}`} />
                                ))}
                            </div>
                            <button type="button" onClick={() => addArrayItem('mainChallenges')} style={addBtnStyle} className="mt-2">+ Añadir desafío</button>
                        </div>
                    </div>
                );
            case 'solution':
                return (
                    <div className="grid gap-4">
                        <Field label="Solución / Concepto"><textarea required name="proposedSolution" value={formData.proposedSolution} onChange={handleChange} rows={3} style={textareaStyle} placeholder="Describe la solución propuesta..." /></Field>
                        <div>
                            <span className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Resultados Esperados</span>
                            <div className="grid gap-2">
                                {formData.expectedOutcomes.map((eo, i) => (
                                    <input key={i} required value={eo} onChange={(e) => handleArrayChange(i, 'expectedOutcomes', e.target.value)} style={inputStyle} placeholder={`Resultado ${i + 1}`} />
                                ))}
                            </div>
                            <button type="button" onClick={() => addArrayItem('expectedOutcomes')} style={addBtnStyle} className="mt-2">+ Añadir resultado</button>
                        </div>
                    </div>
                );
            case 'execution':
                return (
                    <div className="grid gap-4">
                        <Field label="Duración Total (Meses)"><input type="number" required min={1} name="timelineMonths" value={formData.timelineMonths} onChange={handleChange} style={inputStyle} /></Field>
                        <div>
                            <span className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Fases del Proyecto</span>
                            <div className="grid gap-3">
                                {formData.phases.map((phase, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                                        className="p-3 rounded-xl border border-white/10 bg-white/[0.02] grid gap-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Título"><input required value={phase.title} onChange={(e) => handlePhaseChange(i, 'title', e.target.value)} style={inputStyle} /></Field>
                                            <Field label="Duración"><input required value={phase.duration} onChange={(e) => handlePhaseChange(i, 'duration', e.target.value)} style={inputStyle} placeholder="Semanas 1-2" /></Field>
                                        </div>
                                        <Field label="Descripción"><input required value={phase.description} onChange={(e) => handlePhaseChange(i, 'description', e.target.value)} style={inputStyle} /></Field>
                                    </motion.div>
                                ))}
                            </div>
                            <button type="button" onClick={addPhase} style={addBtnStyle} className="mt-2">+ Añadir fase</button>
                        </div>
                        <div>
                            <span className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide">Entregables (Opcional)</span>
                            <div className="grid gap-2">
                                {formData.deliverables?.map((del, i) => (
                                    <input key={i} value={del} onChange={(e) => handleArrayChange(i, 'deliverables', e.target.value)} style={inputStyle} placeholder={`Entregable ${i + 1}`} />
                                ))}
                            </div>
                            <button type="button" onClick={() => addArrayItem('deliverables')} style={addBtnStyle} className="mt-2">+ Añadir entregable</button>
                        </div>
                    </div>
                );
            case 'business':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Inversión Total (USD)"><input type="number" required min={0} name="totalInvestment" value={formData.totalInvestment} onChange={handleChange} style={inputStyle} /></Field>
                        <Field label="ROI Estimado (%)"><input type="number" required min={0} name="roiPercentage" value={formData.roiPercentage} onChange={handleChange} style={inputStyle} /></Field>
                        <Field label="Costo de Inacción / Mes (USD)"><input type="number" required min={0} name="costOfInaction" value={formData.costOfInaction} onChange={handleChange} style={inputStyle} /></Field>
                    </div>
                );
            default:
                return null;
        }
    }

    // Success result view
    if (resultUrl) {
        return (
            <div className="max-w-2xl mx-auto mt-12 text-center p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={28} className="text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">¡Propuesta generada!</h2>
                <p className="text-slate-400 mb-8">Copia y comparte este enlace con el cliente.</p>
                <div className="flex gap-2 items-center max-w-xl mx-auto mb-4">
                    <input type="text" readOnly value={resultUrl} style={{ ...inputStyle, fontSize: 13 }} />
                    <button
                        onClick={() => navigator.clipboard.writeText(resultUrl)}
                        className="px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-[#020a1a] text-sm font-bold whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        Copiar
                    </button>
                </div>
                <a href={resultUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors">
                    Abrir propuesta <FiExternalLink size={14} />
                </a>
                <div className="mt-8">
                    <button onClick={() => setResultUrl('')} className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                        Crear otra propuesta
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-4" style={{ gridTemplateColumns: isDesktop ? '220px minmax(0, 1fr) minmax(0, 1fr)' : '1fr' }}>

            {/* Stepper Sidebar (Desktop) */}
            {isDesktop && (
                <aside className="sticky top-20 self-start rounded-2xl border border-white/[0.08] bg-[#060f24]/80 backdrop-blur-md p-3">
                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-cyan-400/80 px-2 mb-3">
                        Progreso
                    </p>

                    {/* Progress bar */}
                    <div className="mx-2 mb-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                            initial={false}
                            animate={{ width: `${progress}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <nav className="grid gap-1">
                        {STEPS.map((step, i) => {
                            const isActive = i === stepIndex;
                            const isDone = i < stepIndex;
                            const StepIcon = step.icon;

                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    onClick={() => { setStepIndex(i); setStepError(''); }}
                                    className={`flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                                        ${isActive
                                            ? 'bg-cyan-400/[0.12] border border-cyan-400/30'
                                            : isDone
                                                ? 'border border-emerald-500/20 bg-emerald-500/[0.06]'
                                                : 'border border-transparent hover:bg-white/[0.04]'
                                        }`}
                                >
                                    <span className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 text-xs
                                        ${isActive
                                            ? 'bg-cyan-400/20 text-cyan-300'
                                            : isDone
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-white/[0.06] text-slate-500'
                                        }`}>
                                        {isDone ? <FiCheck size={13} /> : <StepIcon size={13} />}
                                    </span>
                                    <div className="min-w-0">
                                        <span className={`block text-xs font-bold truncate ${isActive ? 'text-cyan-200' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
                                            {step.title}
                                        </span>
                                        <span className="block text-[10px] text-slate-500 truncate">{step.subtitle}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </aside>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4 self-start">
                {/* Step Header */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#060f24]/80 backdrop-blur-md p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                                <ActiveStepIcon size={18} className="text-cyan-400" />
                            </span>
                            <div>
                                <p className="text-[10px] text-cyan-400/70 font-bold tracking-[0.15em] uppercase">Paso {stepIndex + 1} / {STEPS.length}</p>
                                <h2 className="text-lg font-bold text-white tracking-tight">{activeStep.title}</h2>
                            </div>
                        </div>
                        {!isDesktop && (
                            <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <motion.div initial={false} animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" transition={{ duration: 0.3 }} />
                            </div>
                        )}
                    </div>

                    {/* Mobile stepper dots */}
                    {!isDesktop && (
                        <div className="flex gap-1.5 mb-5">
                            {STEPS.map((step, i) => (
                                <button
                                    key={step.id}
                                    type="button"
                                    onClick={() => { setStepIndex(i); setStepError(''); }}
                                    className={`h-1.5 rounded-full flex-1 transition-all cursor-pointer
                                        ${i === stepIndex ? 'bg-cyan-400' : i < stepIndex ? 'bg-emerald-500/50' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderStepContent()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Error */}
                    {stepError && (
                        <div className="mt-4 px-3 py-2.5 rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 text-xs font-semibold">
                            {stepError}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/[0.06]">
                        <button
                            type="button"
                            onClick={goBack}
                            disabled={stepIndex === 0}
                            className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer
                                ${stepIndex === 0
                                    ? 'border-white/[0.06] text-slate-600 cursor-not-allowed'
                                    : 'border-white/[0.12] text-slate-300 hover:bg-white/[0.04]'
                                }`}
                        >
                            ← Anterior
                        </button>

                        {stepIndex < STEPS.length - 1 ? (
                            <button
                                type="button"
                                onClick={goNext}
                                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-[#020a1a] text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                Siguiente →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer
                                    ${loading
                                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-[#020a1a] hover:opacity-90'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                        Generando...
                                    </span>
                                ) : 'Generar propuesta'}
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* Preview Panel */}
            <motion.aside
                layout
                className="rounded-2xl border border-white/[0.08] bg-[#060f24]/80 backdrop-blur-md overflow-hidden"
                style={{ position: isDesktop ? 'sticky' : 'relative', top: isDesktop ? 80 : undefined, alignSelf: 'start' }}
            >
                <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/[0.08]">
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-cyan-400/80">Preview en vivo</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Se actualiza mientras llenas el formulario</p>
                    </div>
                    <a
                        href="/propuesta/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        Abrir <FiExternalLink size={11} />
                    </a>
                </div>

                <iframe
                    ref={iframeRef}
                    src="/propuesta/preview"
                    title="Vista previa propuesta"
                    onLoad={pushPreview}
                    style={{
                        width: '100%',
                        height: isDesktop ? '80vh' : '60vh',
                        minHeight: 500,
                        border: 'none',
                        background: '#020617',
                    }}
                />
            </motion.aside>
        </div>
    );
}
