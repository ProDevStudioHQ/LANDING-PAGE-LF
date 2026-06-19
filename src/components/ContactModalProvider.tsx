"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import ContactModal from "./ContactModal";

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

  const openModal = useCallback((newSubject?: string) => {
    setSubject(newSubject || "");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} subject={subject} />
    </ContactModalContext.Provider>
  );
}
