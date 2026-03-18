'use client';

import QuoterForm from '@/components/admin/QuoterForm';
import { logoutAction } from '@/app/actions/proposal.actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CotizadorPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#020a1a] text-white">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] rounded-full blur-[100px]" />
            </div>

            {/* Top Header */}
            <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#020a1a]/80 backdrop-blur-xl">
                <div className="max-w-[1480px] mx-auto px-5 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logos/AsygnuzLogo1-010.png"
                            alt="Asygnuz"
                            width={120}
                            height={40}
                            className="brightness-0 invert opacity-80"
                            priority
                        />
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-400/[0.08] border border-cyan-400/20">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-cyan-400 text-[9px] font-semibold tracking-[0.12em] uppercase">
                                Backoffice
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h1 className="text-sm font-bold text-white/70 tracking-tight hidden sm:block">
                            Generador de Propuestas
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 text-xs font-semibold hover:bg-red-500/20 transition-colors cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-[1480px] mx-auto p-5">
                <QuoterForm />
            </main>
        </div>
    );
}
