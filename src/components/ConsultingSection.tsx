"use client";

import React from "react";
import { 
    Settings, 
    Combine, 
    Compass, 
    Bell, 
    Megaphone, 
    BarChart3, 
    AlertTriangle,
    ArrowRight
} from "lucide-react";
import styles from "./ConsultingSection.module.css";

export default function ConsultingSection() {
    const benefits = [
        {
            icon: <Settings size={32} className={styles.icon} />,
            text: "Crear y configurar tus cuentas.",
        },
        {
            icon: <Combine size={32} className={styles.icon} />,
            text: "Configuración de píxeles y conversiones.",
        },
        {
            icon: <Compass size={32} className={styles.icon} />,
            text: "Recibir orientación en tu estrategia.",
        },
        {
            icon: <Bell size={32} className={styles.icon} />,
            text: "Montaje y optimización de campañas.",
        },
        {
            icon: <Megaphone size={32} className={styles.icon} />,
            text: "Análisis detallado de campañas actuales.",
        },
        {
            icon: <Settings size={32} className={styles.icon} />, // Gear from support
            text: "Soporte técnico.",
        },
        {
            icon: <BarChart3 size={32} className={styles.icon} />,
            text: "Recomendaciones para mejorar tus anuncios.",
        },
        {
            icon: <AlertTriangle size={32} className={styles.icon} />,
            text: "Resolución de problemas.",
        },
    ];

    return (
        <section className={`section ${styles.consulting}`}>
            {/* Shapes for diagonal edges if needed via CSS */}
            <div className={styles.skewedBg} />
            
            <div className="container">
                <h2 className={styles.title}>DURANTE TUS ASESORÍAS PODRÁS:</h2>
                
                <div className={styles.grid}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {benefit.icon}
                            </div>
                            <span className={styles.text}>{benefit.text}</span>
                        </div>
                    ))}
                </div>
                
                <div className={styles.ctaWrapper}>
                    <button className={styles.ctaButton}>
                        Reserva tu asesoría ahora
                        <ArrowRight size={20} className={styles.arrow} />
                    </button>
                </div>
            </div>
        </section>
    );
}
