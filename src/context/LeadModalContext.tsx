"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LeadModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (context === undefined) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
