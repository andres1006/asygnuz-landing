"use client";

import { useInView } from "@/hooks/useInView";
import { Player } from "@remotion/player";
import { AsygnuzVSL } from "@/remotion/AsygnuzVSL";
import styles from "./VSLSection.module.css";

export default function VSLSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`section ${styles.vsl}`} ref={ref}>
            <div className="container">
                <div className={`${styles.card} ${isVisible ? styles.visible : ""}`}>
                    {/* Remotion Video Player */}
                    <div className={styles.videoFrame}>
                        <Player
                            component={AsygnuzVSL}
                            durationInFrames={1800}
                            compositionWidth={1920}
                            compositionHeight={1080}
                            fps={30}
                            controls
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            autoPlay={false}
                            loop={false}
                        />
                    </div>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Sales Letter */}
                    <div className={styles.letterContent}>
                        <p className={styles.stat}>
                            El <span className={styles.statHighlight}>90%</span> de las
                            empresas invierten miles de dólares en anuncios...
                        </p>
                        <p className={styles.body}>
                            ...pero los envían a páginas que tardan{" "}
                            <strong>5 segundos en cargar</strong> o a flujos de WhatsApp donde
                            los leads se enfrían. Eso es{" "}
                            <span className={styles.danger}>tirar el dinero.</span>
                        </p>
                        <blockquote className={styles.quote}>
                            En Asygnuz no hacemos &ldquo;marketing bonito&rdquo;, construimos{" "}
                            <strong>máquinas de conversión</strong>. Optimizamos los Core Web
                            Vitals, conectamos bases de datos y automatizamos el flujo para que
                            tu equipo comercial solo hable con{" "}
                            <span className={styles.quoteHighlight}>
                                personas listas para comprar.
                            </span>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
