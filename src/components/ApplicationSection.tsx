"use client";

import { useState, useEffect } from "react";
import styles from "./ApplicationSection.module.css";

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

    // This component will be mounted inside the modal
    useEffect(() => {
        const modalRoot = document.getElementById("modal-content-root");
        if (modalRoot) {
            // It will be rendered inline in page.tsx inside the modal div, or as a portal.
            // Wait, if it's rendered normally, I just need to return null initially or return the UI.
            // Actually, better to just render the UI and let the modal container handle visibility.
        }
    }, []);

    const handleSelect = (value: string) => {
        const step = steps[currentStep];
        setFormData((prev) => ({ ...prev, [step.key]: value }));
        setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    };

    const handleTextChange = (value: string) => {
        const step = steps[currentStep];
        setFormData((prev) => ({ ...prev, [step.key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

    const progress = ((currentStep) / (steps.length + 1)) * 100;

    return (
        <div className="w-full flex flex-col md:flex-row min-h-[600px] bg-gray-900 text-white">
            <div className="md:w-5/12 bg-black p-10 flex flex-col justify-center border-r border-gray-800">
                <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Aplica ahora</p>
                <h2 className="text-3xl font-bold mb-4">Construyamos tu máquina de ventas.</h2>
                <p className="text-gray-400 mb-8">Nuestro equipo es especializado, por lo que solo tomamos un número limitado de clientes al mes.</p>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-sm text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Toma menos de 2 minutos
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        100% confidencial y seguro
                    </div>
                </div>
            </div>

            <div className="md:w-7/12 p-10 flex flex-col justify-center relative bg-gray-900">
                {submitted ? (
                    <div className="text-center animate-fade-in">
                        <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">¡Aplicación recibida!</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">
                            Revisaremos tu información. Si eres un buen fit, te contactaremos en las próximas 24-48 horas para agendar tu Auditoría.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-800 h-2 rounded-full mb-8 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="text-sm text-cyan-400 mb-2 font-mono">Paso {currentStep + 1} de {steps.length + 1}</div>
                            {currentStep < steps.length ? (
                                <div className="animate-fade-in">
                                    <h3 className="text-2xl font-semibold mb-6">{steps[currentStep].question}</h3>
                                    
                                    {steps[currentStep].type === "select" ? (
                                        <div className="flex flex-col gap-3">
                                            {steps[currentStep].options?.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={`p-4 rounded-xl border text-left transition-all ${formData[steps[currentStep].key] === opt ? 'border-cyan-400 bg-cyan-900/20' : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'}`}
                                                    onClick={() => handleSelect(opt)}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            <textarea
                                                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                                                placeholder={steps[currentStep].placeholder}
                                                value={formData[steps[currentStep].key] as string}
                                                onChange={(e) => handleTextChange(e.target.value)}
                                                rows={4}
                                            />
                                            <button
                                                type="button"
                                                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                                                onClick={() => setCurrentStep((prev) => prev + 1)}
                                                disabled={!formData[steps[currentStep].key]}
                                            >
                                                Siguiente →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="animate-fade-in">
                                    <h3 className="text-2xl font-semibold mb-6">¿A dónde enviamos el diagnóstico?</h3>
                                    <div className="flex flex-col gap-4">
                                        <input
                                            type="text"
                                            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                            placeholder="Tu nombre completo"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                                            required
                                        />
                                        <input
                                            type="email"
                                            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                                            placeholder="Tu mejor email (profesional)"
                                            value={formData.email}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="mt-2 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed w-full transform hover:scale-[1.02]"
                                            disabled={!formData.nombre || !formData.email}
                                        >
                                            Solicitar Auditoría
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Back button */}
                        {currentStep > 0 && currentStep <= steps.length && !submitted && (
                            <button
                                type="button"
                                className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2"
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