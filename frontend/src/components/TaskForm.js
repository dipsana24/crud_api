import React, { useState, useEffect } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  due_date: '',
};

export default function TaskForm({ onSubmit, onCancel, initialData = null }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        status: initialData.status || 'todo',
        due_date: initialData.due_date || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (form.title.length > 255) errs.title = 'Title must be under 255 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.due_date) delete payload.due_date;
      await onSubmit(payload);
      setForm(EMPTY_FORM);
    } catch (err) {
      const data = err.response?.data;
      if (data) setErrors(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>{initialData ? 'Edit Task' : 'New Task'}</h2>

      <div style={styles.field}>
        <label style={styles.label}>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          style={{ ...styles.input, ...(errors.title ? styles.inputError : {}) }}
        />
        {errors.title && <span style={styles.errorText}>{errors.title}</span>}
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add details..."
          rows={3}
          style={styles.textarea}
        />
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} style={styles.select}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Due Date</label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '28px',
    marginBottom: '32px',
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#f0f0f0',
    margin: '0 0 24px',
  },
  field: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' },
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  input: {
    background: '#111',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f0f0f0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputError: { borderColor: '#e05555' },
  textarea: {
    background: '#111',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f0f0f0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    resize: 'vertical',
    outline: 'none',
  },
  select: {
    background: '#111',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f0f0f0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    cursor: 'pointer',
    outline: 'none',
  },
  row: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  errorText: { color: '#e05555', fontSize: '0.8rem' },
  actions: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '10px 20px',
    color: '#888',
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  submitBtn: {
    background: '#6c63ff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 24px',
    color: '#fff',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'opacity 0.2s',
  },
};
