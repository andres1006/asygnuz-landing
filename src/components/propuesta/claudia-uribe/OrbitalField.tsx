"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────── Scroll-linked camera ─────────── */
function ScrollCamera() {
    const { camera } = useThree();
    const scrollRef = useRef(0);
    const targetRef = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useFrame(() => {
        scrollRef.current += (targetRef.current - scrollRef.current) * 0.05;
        const t = scrollRef.current;
        camera.position.x = Math.sin(t * Math.PI * 2) * 1.5;
        camera.position.y = Math.cos(t * Math.PI) * 1.0 - t * 2;
        camera.position.z = 6 - t * 1.5;
        camera.lookAt(0, -t * 2, 0);
    });

    return null;
}

/* ─────────── Main particle field ─────────── */
function ParticleField({ count = 400 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const r = 3 + Math.random() * 8;
            pos[i * 3] = Math.cos(theta) * r;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = Math.sin(theta) * r;
        }
        return pos;
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.015;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#60A5FA"
                size={0.035}
                sizeAttenuation
                depthWrite={false}
                opacity={0.3}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

/* ─────────── Blue dust cloud ─────────── */
function DustCloud({ count = 200 }) {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        return pos;
    }, [count]);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.005;
            ref.current.rotation.z += delta * 0.003;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#4A90D9"
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                opacity={0.12}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

/* ─────────── Hero Torus Ring ─────────── */
function HeroRing() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
            meshRef.current.scale.setScalar(s);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[0, 0, -2]}>
                <torusGeometry args={[2.5, 0.015, 64, 200]} />
                <meshBasicMaterial color="#183057" transparent opacity={0.15} />
            </mesh>
            <mesh position={[0, 0, -2]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <torusGeometry args={[2.2, 0.01, 64, 200]} />
                <meshBasicMaterial color="#183057" transparent opacity={0.08} />
            </mesh>
            <mesh position={[0, 0, -2]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
                <torusGeometry args={[2.8, 0.008, 64, 200]} />
                <meshBasicMaterial color="#2C4B7D" transparent opacity={0.05} />
            </mesh>
        </Float>
    );
}

/* ─────────── Wireframe Sphere (for crack section) ─────────── */
function KintsugiSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const scrollRef = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = scrollRef.current;
        const sectionStart = 0.18;
        const sectionEnd = 0.38;
        const progress = Math.max(0, Math.min(1, (t - sectionStart) / (sectionEnd - sectionStart)));
        meshRef.current.position.set(3, -t * 30 + 8, -3);
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        const scale = progress * 1.2;
        meshRef.current.scale.setScalar(scale);

        const mat = meshRef.current.material as THREE.MeshBasicMaterial;
        if (progress > 0.7) {
            const healProgress = (progress - 0.7) / 0.3;
            mat.color.lerpColors(new THREE.Color('#ffffff'), new THREE.Color('#183057'), healProgress);
            mat.opacity = 0.15 + healProgress * 0.2;
        } else {
            mat.color.set('#ffffff');
            mat.opacity = 0.08;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1.5, 2]} />
            <meshBasicMaterial wireframe transparent opacity={0.08} color="#ffffff" />
        </mesh>
    );
}

/* ─────────── Orbital nodes for A.S.C.E.N.D. ─────────── */
function AscendNodes() {
    const groupRef = useRef<THREE.Group>(null);
    const scrollRef = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const nodes = useMemo(() => {
        return ['A', 'S', 'C', 'E', 'N', 'D'].map((_, i) => ({
            position: new THREE.Vector3((i - 2.5) * 1.2, 0, Math.sin(i * 0.8) * 0.5),
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = scrollRef.current;
        const sectionStart = 0.45;
        const sectionEnd = 0.65;
        const progress = Math.max(0, Math.min(1, (t - sectionStart) / (sectionEnd - sectionStart)));
        groupRef.current.position.set(-3, -t * 30 + 16, -4);
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        const scale = progress > 0 ? 0.8 + progress * 0.4 : 0;
        groupRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.4}>
                    <mesh position={node.position}>
                        <sphereGeometry args={[0.12, 16, 16]} />
                        <meshBasicMaterial color="#183057" transparent opacity={0.6} />
                    </mesh>
                    <mesh position={node.position} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.18, 0.22, 32]} />
                        <meshBasicMaterial color="#183057" transparent opacity={0.15} side={THREE.DoubleSide} />
                    </mesh>
                </Float>
            ))}
            {nodes.slice(0, -1).map((node, i) => {
                const start = node.position;
                const end = nodes[i + 1].position;
                return (
                    <Line key={`line-${i}`} points={[start, end]} color="#183057" transparent opacity={0.1} lineWidth={1} />
                );
            })}
        </group>
    );
}

/* ─────────── Celebration Burst ─────────── */
function CelebrationBurst() {
    const ref = useRef<THREE.Points>(null);
    const scrollRef = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const positions = useMemo(() => {
        const pos = new Float32Array(60 * 3);
        for (let i = 0; i < 60; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = 0.5 + Math.random() * 2;
            pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
            pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
            pos[i * 3 + 2] = Math.cos(phi) * r;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;
        const t = scrollRef.current;
        const progress = Math.max(0, Math.min(1, (t - 0.88) / 0.12));
        ref.current.position.set(0, -t * 30 + 28, -2);
        const scale = progress * 1.5;
        ref.current.scale.setScalar(scale);
        ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#183057"
                size={0.06}
                sizeAttenuation
                depthWrite={false}
                opacity={0.7}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export default function OrbitalField() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 70 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
                <color attach="background" args={['#FFFFFF']} />
                <ScrollCamera />
                <ParticleField />
                <DustCloud />
                <HeroRing />
                <KintsugiSphere />
                <AscendNodes />
                <CelebrationBurst />
            </Canvas>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-transparent to-white/70" />
        </div>
    );
}
