import React, { useEffect } from 'react';
import { AlertCircle, Check, X, Loader2 } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title = "Please Confirm",
  message = "Are you sure you want to proceed?",
  details = null,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop-overlay" 
      onClick={() => {
        if (!isLoading) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmModalTitle"
    >
      <div 
        className="form-card modal-dialog-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '460px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: 'var(--brutal-yellow)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', boxShadow: '2px 2px 0px var(--shadow-color)' }}>
              <AlertCircle size={18} strokeWidth={2} />
            </div>
            <h3 id="confirmModalTitle" style={{ fontSize: 'var(--step-0)', fontWeight: 700, color: 'var(--text)' }}>
              {title}
            </h3>
          </div>
          <button 
            type="button" 
            className="btn-icon" 
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Close modal"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {message}
        </p>

        {details && (
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-medium)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem' }}>
            {Object.entries(details).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>{key}:</span>
                <strong style={{ color: 'var(--text)', textAlign: 'right' }}>{val}</strong>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check size={14} strokeWidth={2} />
                <span>{confirmLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
