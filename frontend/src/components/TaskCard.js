import React from 'react';

const PRIORITY_COLORS = { low: '#4ade80', medium: '#fbbf24', high: '#f87171' };
const STATUS_COLORS = { todo: '#6c63ff', in_progress: '#f59e0b', done: '#34d399' };
const STATUS_LABELS = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priorityColor = PRIORITY_COLORS[task.priority] || '#888';
  const statusColor = STATUS_COLORS[task.status] || '#888';

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const isOverdue = task.due_date && task.status !== 'done' &&
    new Date(task.due_date) < new Date();

  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ ...styles.badge, background: `${priorityColor}22`, color: priorityColor, border: `1px solid ${priorityColor}44` }}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            style={{ ...styles.statusSelect, color: statusColor, borderColor: `${statusColor}44`, background: `${statusColor}11` }}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div style={styles.actions}>
          <button onClick={() => onEdit(task)} style={styles.editBtn} title="Edit">✏️</button>
          <button onClick={() => onDelete(task.id)} style={styles.deleteBtn} title="Delete">🗑️</button>
        </div>
      </div>

      <h3 style={{ ...styles.title, textDecoration: task.status === 'done' ? 'line-through' : 'none', opacity: task.status === 'done' ? 0.5 : 1 }}>
        {task.title}
      </h3>

      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}

      <div style={styles.footer}>
        {task.due_date && (
          <span style={{ ...styles.date, color: isOverdue ? '#f87171' : '#888' }}>
            {isOverdue ? '⚠️ ' : '📅 '}{formatDate(task.due_date)}
          </span>
        )}
        <span style={styles.createdAt}>
          Created {new Date(task.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '20px',
    transition: 'border-color 0.2s, transform 0.15s',
    cursor: 'default',
  },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  badge: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statusSelect: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '3px 8px',
    borderRadius: '20px',
    border: '1px solid',
    cursor: 'pointer',
    outline: 'none',
  },
  actions: { display: 'flex', gap: '6px' },
  editBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '4px',
    borderRadius: '6px',
    transition: 'background 0.15s',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '4px',
    borderRadius: '6px',
    transition: 'background 0.15s',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1rem',
    fontWeight: 600,
    color: '#f0f0f0',
    margin: '0 0 8px',
    lineHeight: 1.3,
  },
  description: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.875rem',
    color: '#888',
    margin: '0 0 12px',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' },
  date: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem' },
  createdAt: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#555' },
};
