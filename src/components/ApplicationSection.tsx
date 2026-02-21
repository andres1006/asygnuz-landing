"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
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
    const { ref, isVisible } = useInView();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const isLastStep = currentStep === steps.length;

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
        <section className={`section ${styles.application}`} id="aplicar" ref={ref}>
            <div className="container">
                <div className={`${styles.wrapper} ${isVisible ? styles.visible : ""}`}>
                    <div className={styles.left}>
                        <p className="section-pretitle">Aplica ahora</p>
                        <h2 className={styles.title}>
                            Construyamos tu próxima máquina de ventas.
                        </h2>
                        <p className={styles.subtitle}>
                            Nuestro equipo es altamente especializado, por lo que solo tomamos
                            un número limitado de clientes al mes para garantizar resultados.
                        </p>
                        <div className={styles.badges}>
                            <div className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                </svg>
                                Toma 2 minutos
                            </div>
                            <div className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                100% confidencial
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        {submitted ? (
                            <div className={styles.successCard}>
                                <div className={styles.successIcon}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <h3 className={styles.successTitle}>
                                    ¡Aplicación recibida!
                                </h3>
                                <p className={styles.successText}>
                                    Nuestro equipo revisará tu información y, si eres un buen fit,
                                    te contactaremos en las próximas 24-48 horas para agendar tu
                                    Auditoría de Escalabilidad.
                                </p>
                            </div>
                        ) : (
                            <form className={styles.formCard} onSubmit={handleSubmit}>
                                {/* Progress bar */}
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className={styles.progressLabel}>
                                    Paso {currentStep + 1} de {steps.length + 1}
                                </div>

                                {currentStep < steps.length ? (
                                    <div className={styles.stepContent} key={currentStep}>
                                        <h3 className={styles.question}>
                                            {steps[currentStep].question}
                                        </h3>

                                        {steps[currentStep].type === "select" ? (
                                            <div className={styles.options}>
                                                {steps[currentStep].options?.map((opt, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className={`${styles.optionBtn} ${formData[steps[currentStep].key] === opt
                                                                ? styles.optionSelected
                                                                : ""
                                                            }`}
                                                        onClick={() => handleSelect(opt)}
                                                    >
                                                        <span className={styles.optionCircle} />
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={styles.textareaWrapper}>
                                                <textarea
                                                    className={styles.textarea}
                                                    placeholder={steps[currentStep].placeholder}
                                                    value={formData[steps[currentStep].key]}
                                                    onChange={(e) => handleTextChange(e.target.value)}
                                                    rows={4}
                                                />
                                                <button
                                                    type="button"
                                                    className={styles.nextBtn}
                                                    onClick={() =>
                                                        setCurrentStep((prev) => prev + 1)
                                                    }
                                                    disabled={!formData[steps[currentStep].key]}
                                                >
                                                    Siguiente →
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Contact info step */
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.question}>
                                            ¿Cómo te contactamos?
                                        </h3>
                                        <div className={styles.contactFields}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                placeholder="Tu nombre completo"
                                                value={formData.nombre}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        nombre: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                            <input
                                                type="email"
                                                className={styles.input}
                                                placeholder="Tu mejor email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        email: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="cta-button"
                                                style={{ width: "100%", justifyContent: "center" }}
                                                disabled={!formData.nombre || !formData.email}
                                            >
                                                Enviar mi Aplicación
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Back button */}
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        className={styles.backBtn}
                                        onClick={() => setCurrentStep((prev) => prev - 1)}
                                    >
                                        ← Anterior
                                    </button>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
