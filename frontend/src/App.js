import React, { useState, useEffect, useCallback } from 'react';
import { taskAPI } from './api';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import ConfirmDialog from './components/ConfirmDialog';

const DEFAULT_FILTERS = { status: '', priority: '', ordering: '-created_at' };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.ordering) params.ordering = filters.ordering;
      if (search) params.search = search;
      const res = await taskAPI.getAll(params);
      setTasks(res.data.results || res.data);
      setError(null);
    } catch (e) {
      setError('Failed to load tasks. Is the Django server running?');
    } finally {
      setLoading(false);
    }
  }, [filters, search]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await taskAPI.getStats();
      setStats(res.data);
    } catch { /* non-critical */ }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, tasks]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => fetchTasks(), 300);
    return () => clearTimeout(timer);
  }, [search]); // eslint-disable-line

  const handleCreate = async (data) => {
    await taskAPI.create(data);
    await fetchTasks();
    setShowForm(false);
    showToast('Task created!');
  };

  const handleUpdate = async (data) => {
    await taskAPI.update(editingTask.id, data);
    await fetchTasks();
    setEditingTask(null);
    setShowForm(false);
    showToast('Task updated!');
  };

  const handleDelete = async () => {
    await taskAPI.delete(deleteId);
    await fetchTasks();
    setDeleteId(null);
    showToast('Task deleted.', 'info');
  };

  const handleStatusChange = async (id, newStatus) => {
    await taskAPI.patch(id, { status: newStatus });
    await fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.logo}>TASKFLOW</h1>
            <p style={styles.tagline}>Django + React CRUD</p>
          </div>
          <button
            onClick={() => { setShowForm((v) => !v); setEditingTask(null); }}
            style={styles.newBtn}
          >
            {showForm && !editingTask ? '✕ Close' : '+ New Task'}
          </button>
        </header>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Form */}
        {showForm && (
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            initialData={editingTask}
          />
        )}

        {/* Filters */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          search={search}
          onSearch={setSearch}
        />

        {/* Task Grid */}
        {loading ? (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Loading tasks...</p>
          </div>
        ) : error ? (
          <div style={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        ) : tasks.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyTitle}>No tasks yet</p>
            <p style={styles.emptySubtitle}>Create your first task to get started.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={setDeleteId}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {/* Count */}
        {!loading && !error && tasks.length > 0 && (
          <p style={styles.count}>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === 'info' ? '#333' : '#6c63ff' }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    background: '#0f0f0f',
    fontFamily: "'DM Sans', sans-serif",
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '36px',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#f0f0f0',
    margin: 0,
    letterSpacing: '-0.03em',
  },
  tagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem',
    color: '#555',
    margin: '4px 0 0',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  newBtn: {
    background: '#6c63ff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 22px',
    color: '#fff',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  center: { textAlign: 'center', padding: '60px 0' },
  spinner: {
    width: '36px', height: '36px',
    border: '3px solid #2a2a2a',
    borderTop: '3px solid #6c63ff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 16px',
  },
  loadingText: { color: '#555', fontFamily: "'DM Sans', sans-serif" },
  errorBox: {
    background: '#2a1a1a',
    border: '1px solid #5a2a2a',
    borderRadius: '10px',
    padding: '20px',
    color: '#f87171',
    fontFamily: "'DM Sans', sans-serif",
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#333',
    margin: '0 0 8px',
  },
  emptySubtitle: { color: '#555', margin: 0 },
  count: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem',
    color: '#444',
    textAlign: 'center',
    marginTop: '24px',
  },
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    borderRadius: '10px',
    padding: '12px 20px',
    color: '#fff',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 500,
    zIndex: 2000,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    animation: 'fadeInUp 0.3s ease',
  },
};

// Inject keyframes
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  * { box-sizing: border-box; }
  body { margin: 0; }
  select option { background: #1a1a1a; color: #f0f0f0; }
`;
document.head.appendChild(styleEl);
