"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  value: string | null;
  onToggle: (val: string) => void;
  type: "single" | "multiple";
  openItems: string[];
}

const AccordionContext = React.createContext<AccordionContextValue>({
  value: null,
  onToggle: () => {},
  type: "single",
  openItems: [],
});

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Accordion = ({ type = "single", className, children }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const onToggle = (val: string) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(val) ? [] : [val]));
    } else {
      setOpenItems((prev) =>
        prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ value: null, onToggle, type, openItems }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const AccordionItem = ({ value, className, children }: AccordionItemProps) => (
  <div data-value={value} className={cn("border-b", className)}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<{ _value?: string }>, { _value: value });
      }
      return child;
    })}
  </div>
);

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  _value?: string;
}

const AccordionTrigger = ({ className, children, _value }: AccordionTriggerProps) => {
  const { onToggle, openItems } = React.useContext(AccordionContext);
  const isOpen = _value ? openItems.includes(_value) : false;

  return (
    <button
      type="button"
      onClick={() => _value && onToggle(_value)}
      className={cn(
        "flex w-full items-center justify-between py-3 text-sm font-semibold transition-all",
        className
      )}
    >
      {children}
      <ChevronDown
        size={16}
        className={cn("shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
      />
    </button>
  );
};

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
  _value?: string;
}

const AccordionContent = ({ className, children, _value }: AccordionContentProps) => {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = _value ? openItems.includes(_value) : false;

  if (!isOpen) return null;

  return (
    <div className={cn("pb-3 text-sm", className)}>
      {children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
