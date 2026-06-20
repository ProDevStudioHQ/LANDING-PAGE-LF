"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Lazy-load ContactModal: defers framer-motion + icons + crm lib from the
// initial bundle. The chunk is fetched only when the modal is first opened.
const ContactModal = dynamic(() => import("./ContactModal"));

type ContactModalContextType = {
  openModal: (subject?: string) => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextType | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}

export default function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [hasOpened, setHasOpened] = useState(false);

  const openModal = useCallback((newSubject?: string) => {
    setSubject(newSubject || "");
    setIsOpen(true);
    setHasOpened(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {hasOpened && <ContactModal isOpen={isOpen} onClose={closeModal} subject={subject} />}
    </ContactModalContext.Provider>
  );
}
