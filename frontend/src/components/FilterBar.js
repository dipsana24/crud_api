import React from 'react';

export default function FilterBar({ filters, onChange, onSearch, search }) {
  return (
    <div style={styles.bar}>
      <input
        type="text"
        placeholder="🔍  Search tasks..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.filters}>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          style={styles.select}
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          style={styles.select}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={filters.ordering}
          onChange={(e) => onChange({ ...filters, ordering: e.target.value })}
          style={styles.select}
        >
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="due_date">Due Date ↑</option>
          <option value="-due_date">Due Date ↓</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  search: {
    flex: 1,
    minWidth: '200px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f0f0f0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
  },
  filters: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  select: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#aaa',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.85rem',
    cursor: 'pointer',
    outline: 'none',
  },
};
