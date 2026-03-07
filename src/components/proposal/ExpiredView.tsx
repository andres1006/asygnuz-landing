'use client';

import { motion } from 'framer-motion';

export default function ExpiredView() {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center"
            >
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Propuesta Expirada</h1>
                <p className="text-neutral-400 mb-8">
                    Esta propuesta comercial ha superado su vigencia de 15 días. Por favor contacta a tu asesor en ASYGNUZ para solicitar una actualización.
                </p>
                <a
                    href="mailto:contacto@asygnuz.com"
                    className="inline-block w-full py-3 px-4 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
                >
                    Contactar Asesor
                </a>
            </motion.div>
        </div>
    );
}
