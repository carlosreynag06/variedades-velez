// components/ConfirmDialog.tsx
'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-md rounded-[var(--radius-base)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="flex items-start gap-4">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-muted)]">
                <AlertTriangle
                  className="h-6 w-6 text-[var(--feedback-danger)]"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-[var(--text-primary)]"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-[var(--text-secondary)]">{children}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--text-primary)]"
                aria-label="Close"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 rounded-[var(--radius-base)] border border-[var(--border-soft)] bg-white px-4 text-sm font-medium shadow-sm hover:bg-[var(--color-bg-muted)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="h-10 rounded-[var(--radius-base)] bg-[var(--feedback-danger)] px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-90"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}