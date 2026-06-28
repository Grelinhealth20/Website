"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  onClose: () => void;
}

const SheetContext = React.createContext<SheetContextValue>({ open: false, onClose: () => {} });

interface SheetProps {
  children: React.ReactNode;
}

const Sheet = ({ children }: SheetProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, onClose: () => setOpen(false) }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ _onOpen?: () => void }>, {
            _onOpen: () => setOpen(true),
          });
        }
        return child;
      })}
    </SheetContext.Provider>
  );
};

interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  _onOpen?: () => void;
}

const SheetTrigger = ({ children, _onOpen }: SheetTriggerProps) => (
  <div onClick={_onOpen} className="cursor-pointer">
    {children}
  </div>
);

interface SheetContentProps {
  className?: string;
  children: React.ReactNode;
}

const SheetContent = ({ className, children }: SheetContentProps) => {
  const { open, onClose } = React.useContext(SheetContext);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[320px] bg-[#0B1120] border-l border-white/10 overflow-y-auto",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </>
  );
};

interface SheetHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const SheetHeader = ({ className, children }: SheetHeaderProps) => (
  <div className={cn("px-6 pt-6 pb-2", className)}>{children}</div>
);

const SheetTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-white font-semibold">{children}</div>
);

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle };
