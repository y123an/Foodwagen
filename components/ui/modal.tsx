"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ModalProps, ModalSize } from "@/lib/types";

const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const overlayBase =
  "fixed inset-0 z-50 bg-white/20 backdrop-blur-[2px] transition-opacity";

const panelBase =
  "w-full rounded-2xl bg-white shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF312F]";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  hideClose,
  className,
  initialFocusRef,
  closeOnEsc = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Side effects: open/close body scroll lock and focus management
  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement | null;
      // lock scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus initial target
      const el = initialFocusRef?.current || panelRef.current;
      el?.focus();

      return () => {
        document.body.style.overflow = prev;
        lastActiveRef.current?.focus?.();
      };
    }
  }, [open, initialFocusRef]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, closeOnEsc]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className={overlayBase}
    >
      <div className="flex min-h-full items-start justify-center mt-20">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-desc" : undefined}
          ref={panelRef}
          tabIndex={-1}
          className={cn(panelBase, sizeMap[size], "mx-auto p-6 border border-primary/10", className)}
        >
          {(title || !hideClose) && (
            <div className="mb-4 flex items-center justify-center p-3">
              {title && (
                <h2 id="modal-title" className="text-2xl font-bold text-primary text-center ">
                  {title}
                </h2>
              )}
            </div>
          )}

          {description && (
            <p id="modal-desc" className="mb-5 text-sm text-gray-600">
              {description}
            </p>
          )}

          {children}

          {footer && <div className="mt-6 grid grid-cols-2 gap-3">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
