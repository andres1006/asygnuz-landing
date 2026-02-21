"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./SocialProofSection.module.css";

export default function SocialProofSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`section ${styles.proof}`} ref={ref}>
            <div className="container">
                <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
                    <p className="section-pretitle">Resultados reales</p>
                    <h2 className="section-title">
                        No lo decimos nosotros, lo dicen los números.
                    </h2>
                </div>

                <div className={`${styles.caseStudy} ${isVisible ? styles.visible : ""}`}>
                    {/* Case badge */}
                    <div className={styles.caseBadge}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Caso de Estudio Confidencial
                    </div>

                    <h3 className={styles.caseTitle}>
                        Referente Financiero Top en LatAm
                    </h3>

                    {/* Timeline */}
                    <div className={styles.timeline}>
                        {/* Step 1 */}
                        <div className={styles.step}>
                            <div className={`${styles.stepDot} ${styles.dotDanger}`} />
                            <div className={styles.stepContent}>
                                <span className={styles.stepLabel}>El Problema</span>
                                <p className={styles.stepText}>
                                    Gastaban miles en pauta, pero el flujo para agendar asesorías
                                    premium era manual, desordenado y perdían leads valiosos en el
                                    proceso de transición entre agencias.
                                </p>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className={styles.connector} />

                        {/* Step 2 */}
                        <div className={styles.step}>
                            <div className={`${styles.stepDot} ${styles.dotCyan}`} />
                            <div className={styles.stepContent}>
                                <span className={styles.stepLabel}>La Intervención Asygnuz</span>
                                <p className={styles.stepText}>
                                    Rediseñamos la arquitectura técnica. Construimos nuevas landing
                                    pages ultrarrápidas enfocadas en el programa{" "}
                                    <strong>&ldquo;Money Training&rdquo;</strong> y orquestamos un flujo de
                                    agendamiento 100% automatizado.
                                </p>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className={styles.connector} />

                        {/* Step 3 */}
                        <div className={styles.step}>
                            <div className={`${styles.stepDot} ${styles.dotSuccess}`} />
                            <div className={styles.stepContent}>
                                <span className={styles.stepLabel}>El Resultado</span>
                                <p className={styles.stepText}>
                                    Cero caídas, flujo de leads organizado y un{" "}
                                    <strong>
                                        aumento drástico en la conversión de asesorías gratuitas a
                                        clientes High-Ticket.
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results bar */}
                    <div className={styles.resultsBar}>
                        <div className={styles.resultItem}>
                            <span className={styles.resultValue}>0</span>
                            <span className={styles.resultLabel}>Caídas del sistema</span>
                        </div>
                        <div className={styles.resultDivider} />
                        <div className={styles.resultItem}>
                            <span className={styles.resultValue}>100%</span>
                            <span className={styles.resultLabel}>Flujo automatizado</span>
                        </div>
                        <div className={styles.resultDivider} />
                        <div className={styles.resultItem}>
                            <span className={`${styles.resultValue} ${styles.resultUp}`}>
                                ↑ Drástico
                            </span>
                            <span className={styles.resultLabel}>Conversión High-Ticket</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
