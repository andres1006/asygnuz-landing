'use client';

import { useState } from 'react';
import { loginAction } from '@/app/actions/proposal.actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await loginAction(password);

        if (result.success) {
            router.push('/admin/cotizador');
        } else {
            setError(result.error || 'Clave denegada');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[#030818]">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Primary glow */}
                <div className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[120px] animate-pulse" />
                {/* Secondary glow */}
                <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]" />
                {/* Center radial */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.04)_0%,transparent_60%)]" />
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="w-full max-w-[1100px] mx-auto relative z-10">
                <div className="w-full flex flex-col lg:flex-row rounded-[28px] border border-white/[0.08] bg-[#060e24]/80 backdrop-blur-2xl shadow-[0_32px_100px_rgba(3,8,24,0.8)] overflow-hidden">

                    {/* Left Section - Branding & Info */}
                    <section className="flex-1 flex flex-col justify-between p-10 md:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] relative overflow-hidden">
                        {/* Section background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2a5a]/50 via-[#081a3c]/30 to-transparent pointer-events-none" />
                        {/* Decorative orb */}
                        <div className="absolute -bottom-20 - w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            {/* Logo + Badge inline */}
                            <div className="flex items-center gap-4 mb-10">
                                <Image
                                    src="/logos/AsygnuzLogo1-010.png"
                                    alt="Asygnuz Ingeniería"
                                    width={160}
                                    height={52}
                                    className="brightness-0 invert opacity-90"
                                    priority
                                />
                                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-400/[0.08] border border-cyan-400/20">
                                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-cyan-400 text-[9px] font-semibold tracking-[0.12em] uppercase">
                                        Backoffice
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] font-bold tracking-tight">
                                Portal<br />
                                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                    Administrativo
                                </span>
                            </h1>
                            <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-sm">
                                Accede al motor central para crear propuestas de alto impacto y compartirlas con clientes en minutos.
                            </p>
                        </div>

                        <ul className="relative z-10 grid gap-4 text-slate-300 mt-12 list-none p-0 text-sm font-medium">
                            {[
                                'Creación de cotizaciones step-by-step',
                                'Enlaces únicos y seguros por cliente',
                                'Previsualización en tiempo real',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 group">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/20 group-hover:bg-cyan-400/20 transition-colors duration-300">
                                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-slate-300 group-hover:text-slate-200 transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Right Section - Login Form */}
                    <section className="flex-1 p-10 md:p-14 lg:p-16 flex flex-col justify-center relative">
                        {/* Decorative isotipo watermark */}
                        <div className="absolute top-8 right-8 opacity-[0.03] pointer-events-none hidden lg:block">
                            <Image
                                src="/logos/AsygnuzLogo2-09.png"
                                alt=""
                                width={120}
                                height={120}
                                className="brightness-0 invert"
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-4">
                                    Iniciar sesión
                                </h2>
                                <p className="text-slate-400 text-base md:text-lg">
                                    Ingresa la clave de seguridad para continuar.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                                <div>
                                    <label
                                        htmlFor="admin-password"
                                        className="block text-slate-300 tracking-[0.12em] uppercase text-xs font-semibold mb-4"
                                    >
                                        Clave de seguridad
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                        <input
                                            id="admin-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Introduce tu clave..."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoFocus
                                            className="relative w-full bg-white/[0.04] border border-white/[0.12] rounded-2xl py-4 pl-5 pr-20 text-white text-lg outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all duration-300 placeholder:text-white/20"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-cyan-400/70 hover:text-cyan-300 hover:bg-white/5 text-xs uppercase tracking-wider font-bold transition-all duration-200"
                                            aria-label={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
                                        >
                                            {showPassword ? 'Ocultar' : 'Ver'}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-3 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-4 py-3">
                                        <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <p className="text-red-400 text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group relative w-full mt-2 overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-500 text-[#02112b] font-bold tracking-[0.1em] uppercase text-base py-4 rounded-2xl border-none shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:shadow-[0_0_50px_rgba(56,189,248,0.35)] transition-all duration-400 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed scale-[0.98]' : ''}`}
                                >
                                    {/* Shimmer effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                    <span className="relative flex items-center justify-center gap-3">
                                        {loading ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Validando...
                                            </>
                                        ) : (
                                            <>
                                                Ingresar al panel
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>

                            <div className="mt-10 pt-8 border-t border-white/[0.06]">
                                <p className="text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Acceso restringido solo para equipo autorizado.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer branding */}
                <div className="mt-8 flex items-center justify-center gap-3 opacity-30">
                    <Image
                        src="/logos/AsygnuzLogo2-09.png"
                        alt=""
                        width={20}
                        height={20}
                        className="brightness-0 invert"
                    />
                    <span className="text-xs text-slate-500 tracking-[0.15em] uppercase font-medium">
                        Asygnuz Ingeniería
                    </span>
                </div>
            </div>
        </div>
    );
}
