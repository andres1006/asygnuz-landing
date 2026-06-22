"use client";

import { useState } from "react";

type FormData = {
    modelo: string;
    inversion: string;
    ticket: string;
    frustracion: string;
    equipo: string;
    nombre: string;
    email: string;
};

const initialFormData: FormData = {
    modelo: "",
    inversion: "",
    ticket: "",
    frustracion: "",
    equipo: "",
    nombre: "",
    email: "",
};

const steps = [
    {
        key: "modelo" as keyof FormData,
        question: "¿Cuál es tu modelo de negocio?",
        type: "select",
        options: [
            "Empresa B2B / Servicios profesionales",
            "Clínica de Alta Especialidad / Salud",
            "Infoproducto / Educación premium",
            "E-commerce High-Ticket",
            "Otro",
        ],
    },
    {
        key: "inversion" as keyof FormData,
        question: "¿Cuánto inviertes mensualmente en publicidad digital?",
        type: "select",
        options: [
            "Menos de $1,000 USD",
            "$1,000 - $5,000 USD",
            "$5,000 - $15,000 USD",
            "$15,000 - $50,000 USD",
            "Más de $50,000 USD",
        ],
    },
    {
        key: "ticket" as keyof FormData,
        question: "¿Cuál es tu ticket promedio de venta?",
        type: "select",
        options: [
            "Menos de $500 USD",
            "$500 - $2,000 USD",
            "$2,000 - $10,000 USD",
            "Más de $10,000 USD",
        ],
    },
    {
        key: "frustracion" as keyof FormData,
        question: "¿Cuál es tu mayor frustración con tu marketing actual?",
        type: "textarea",
        placeholder: "Cuéntanos en unas líneas qué no está funcionando...",
    },
    {
        key: "equipo" as keyof FormData,
        question: "¿Tienes equipo comercial activo?",
        type: "select",
        options: [
            "Sí, tenemos un equipo de ventas dedicado",
            "Sí, pero solo 1-2 personas",
            "No, yo manejo las ventas directamente",
            "Estamos por armar el equipo",
        ],
    },
];

export default function ApplicationSection() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (value: string) => {
        const step = steps[currentStep];
        setFormData((prev) => ({ ...prev, [step.key]: value }));
        setTimeout(() => setCurrentStep((prev) => prev + 1), 280);
    };

    const handleTextChange = (value: string) => {
        const step = steps[currentStep];
        setFormData((prev) => ({ ...prev, [step.key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const progress = (currentStep / (steps.length + 1)) * 100;

    return (
        <div className="w-full flex flex-col md:flex-row min-h-[580px] bg-white">
            {/* Left panel */}
            <div className="md:w-5/12 bg-[#F8FAFC] p-10 flex flex-col justify-center border-r border-slate-200">
                <p className="text-[#1E6FD9] font-mono text-[11px] tracking-[0.22em] uppercase font-bold mb-5">
                    Aplica ahora
                </p>
                <h2
                    className="font-bold mb-4 text-[#0F172A] leading-[1.1]"
                    style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.025em" }}
                >
                    Construyamos tu<br />
                    <span className="text-[#1E6FD9]">máquina de ventas.</span>
                </h2>
                <p className="text-[#475569] text-[15px] leading-relaxed mb-8">
                    Nuestro equipo es especializado, por lo que solo tomamos un número limitado de clientes al mes.
                </p>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-[14px] text-[#334155] font-medium bg-white p-3 rounded-xl border border-slate-200">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E6FD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Toma menos de 2 minutos
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#334155] font-medium bg-white p-3 rounded-xl border border-slate-200">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        100% confidencial y seguro
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="md:w-7/12 p-10 flex flex-col justify-center bg-white">
                {submitted ? (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[#0F172A] mb-3" style={{ letterSpacing: "-0.02em" }}>
                            ¡Aplicación recibida!
                        </h3>
                        <p className="text-[#475569] text-[15px] leading-relaxed max-w-sm mx-auto">
                            Revisaremos tu información y, si eres un buen fit, te contactaremos en las próximas 24–48 horas para agendar tu Auditoría.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                        {/* Progress */}
                        <div className="w-full bg-slate-100 h-[3px] rounded-full mb-2 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${progress}%`,
                                    background: "linear-gradient(90deg, #1E6FD9, #059669)",
                                }}
                            />
                        </div>
                        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-8">
                            Paso {currentStep + 1} de {steps.length + 1}
                        </p>

                        {currentStep < steps.length ? (
                            <div key={currentStep} className="animate-fade-in">
                                <h3
                                    className="font-bold text-[#0F172A] mb-6 leading-snug"
                                    style={{ fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.01em" }}
                                >
                                    {steps[currentStep].question}
                                </h3>

                                {steps[currentStep].type === "select" ? (
                                    <div className="flex flex-col gap-[10px]">
                                        {steps[currentStep].options?.map((opt, i) => {
                                            const selected = formData[steps[currentStep].key] === opt;
                                            return (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => handleSelect(opt)}
                                                    className={`flex items-center gap-3 w-full p-4 rounded-2xl border text-[14px] font-medium text-left transition-all duration-200 ${
                                                        selected
                                                            ? "bg-[#EFF6FF] border-[#1E6FD9] text-[#1E40AF]"
                                                            : "bg-white border-slate-200 text-[#334155] hover:bg-[#EFF6FF] hover:border-[#93C5FD] hover:text-[#1E40AF]"
                                                    }`}
                                                >
                                                    <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${selected ? "border-[#1E6FD9] bg-[#1E6FD9]" : "border-slate-300"}`} />
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <textarea
                                            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[#0F172A] placeholder-slate-400 text-[14px] leading-relaxed resize-none focus:outline-none focus:border-[#1E6FD9] focus:ring-2 focus:ring-[#1E6FD9]/10 transition-all"
                                            placeholder={steps[currentStep].placeholder}
                                            value={formData[steps[currentStep].key] as string}
                                            onChange={(e) => handleTextChange(e.target.value)}
                                            rows={4}
                                        />
                                        <button
                                            type="button"
                                            className="bg-[#183057] hover:bg-[#1E6FD9] text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed w-full text-[14px] tracking-wide"
                                            onClick={() => setCurrentStep((prev) => prev + 1)}
                                            disabled={!formData[steps[currentStep].key]}
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <h3
                                    className="font-bold text-[#0F172A] mb-6 leading-snug"
                                    style={{ fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.01em" }}
                                >
                                    ¿A dónde enviamos el diagnóstico?
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[#0F172A] placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#1E6FD9] focus:ring-2 focus:ring-[#1E6FD9]/10 transition-all"
                                        placeholder="Tu nombre completo"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                                        required
                                    />
                                    <input
                                        type="email"
                                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[#0F172A] placeholder-slate-400 text-[14px] focus:outline-none focus:border-[#1E6FD9] focus:ring-2 focus:ring-[#1E6FD9]/10 transition-all"
                                        placeholder="Tu mejor email profesional"
                                        value={formData.email}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="mt-1 bg-[#183057] hover:bg-[#1E6FD9] text-white font-bold py-4 px-6 rounded-2xl transition-all text-[15px] tracking-[0.04em] uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-[1px] hover:shadow-lg"
                                        disabled={!formData.nombre || !formData.email}
                                    >
                                        Solicitar Auditoría
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep > 0 && !submitted && (
                            <button
                                type="button"
                                className="mt-6 text-slate-400 hover:text-slate-600 transition-colors text-[13px] flex items-center gap-1"
                                onClick={() => setCurrentStep((prev) => prev - 1)}
                            >
                                ← Volver al paso anterior
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
