import React from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
          <button onClick={onConfirm} style={styles.confirmBtn}>Delete</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '28px 32px',
    maxWidth: '380px',
    width: '90%',
  },
  message: {
    fontFamily: "'DM Sans', sans-serif",
    color: '#f0f0f0',
    fontSize: '1rem',
    marginBottom: '24px',
    lineHeight: 1.5,
  },
  actions: { display: 'flex', gap: '12px', justifyContent: 'flex-end' },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '9px 20px',
    color: '#888',
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
  },
  confirmBtn: {
    background: '#e05555',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 20px',
    color: '#fff',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    cursor: 'pointer',
  },
};
