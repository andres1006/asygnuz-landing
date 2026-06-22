"use client";

import ApplicationSection from "./ApplicationSection";
import { useLeadModal } from "@/context/LeadModalContext";

export default function LeadModal() {
    const { isOpen, closeModal } = useLeadModal();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto animate-fade-in-up">
                <button 
                    onClick={closeModal}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 z-10 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <ApplicationSection />
            </div>
        </div>
    );
}
