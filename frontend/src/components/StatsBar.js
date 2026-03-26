import React from 'react';

export default function StatsBar({ stats }) {
  if (!stats) return null;

  const items = [
    { label: 'Total', value: stats.total, color: '#6c63ff' },
    { label: 'To Do', value: stats.by_status?.todo || 0, color: '#6c63ff' },
    { label: 'In Progress', value: stats.by_status?.in_progress || 0, color: '#f59e0b' },
    { label: 'Done', value: stats.by_status?.done || 0, color: '#34d399' },
    { label: 'High Priority', value: stats.by_priority?.high || 0, color: '#f87171' },
  ];

  return (
    <div style={styles.bar}>
      {items.map((item) => (
        <div key={item.label} style={styles.stat}>
          <span style={{ ...styles.value, color: item.color }}>{item.value}</span>
          <span style={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  bar: {
    display: 'flex',
    gap: '0',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    marginBottom: '28px',
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 12px',
    borderRight: '1px solid #2a2a2a',
    gap: '4px',
  },
  value: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.6rem',
    fontWeight: 800,
    lineHeight: 1,
  },
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.72rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 500,
  },
};
