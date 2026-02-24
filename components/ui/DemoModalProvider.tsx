"use client";

import { createContext, useContext, useState, useCallback } from "react";
import BookDemoModal from "./BookDemoModal";

type ModalVariant = "demo" | "partner";

interface DemoModalContextValue {
  openModal: (variant?: ModalVariant) => void;
}

const DemoModalContext = createContext<DemoModalContextValue>({
  openModal: () => {},
});

export function useDemoModal() {
  return useContext(DemoModalContext);
}

export default function DemoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<ModalVariant>("demo");

  const openModal = useCallback((v: ModalVariant = "demo") => {
    setVariant(v);
    setIsOpen(true);
  }, []);

  return (
    <DemoModalContext.Provider value={{ openModal }}>
      {children}
      <BookDemoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant={variant}
      />
    </DemoModalContext.Provider>
  );
}
