import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'paused';
  schedule: string;
  lastRun: string;
  runs: number;
}

const SAMPLE_WORKFLOWS: Workflow[] = [
  { id: '1', name: 'Monthly Financial Report', status: 'active', schedule: 'Every 1st day of month', lastRun: 'Mar 1, 2026', runs: 12 },
  { id: '2', name: 'Weekly Sales Dashboard', status: 'active', schedule: 'Every Monday 09:00', lastRun: 'Mar 24, 2026', runs: 8 },
  { id: '3', name: 'Daily Data Backup', status: 'paused', schedule: 'Daily 02:00', lastRun: 'Mar 20, 2026', runs: 45 },
  { id: '4', name: 'Quarterly KPI Update', status: 'active', schedule: 'Quarterly', lastRun: 'Jan 1, 2026', runs: 3 },
];

export default function Workflow() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workflows, setWorkflows] = useState<Workflow[]>(SAMPLE_WORKFLOWS);
  const [showCreate, setShowCreate] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');

  const toggleStatus = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => (w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w))
    );
  };

  const createWorkflow = () => {
    if (!newWorkflowName.trim()) return;
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: newWorkflowName,
      status: 'paused',
      schedule: 'Manual',
      lastRun: 'Never',
      runs: 0,
    };
    setWorkflows(prev => [newWorkflow, ...prev]);
    setNewWorkflowName('');
    setShowCreate(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'var(--bg-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5 }}>Workflow Automation</h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Schedule recurring tasks and AI pipelines</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>
              + Create Workflow
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {workflows.map(w => (
              <div
                key={w.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>⌘</span>
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>{w.name}</span>
                    <span className={`badge ${w.status === 'active' ? 'badge-success' : 'badge-outline'}`}>
                      {w.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: 16 }}>
                    <span>Schedule: {w.schedule}</span>
                    <span>Last run: {w.lastRun}</span>
                    <span>Total runs: {w.runs}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-sm btn-outline" onClick={() => toggleStatus(w.id)}>
                    {w.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  <button className="btn btn-sm btn-ghost">Edit</button>
                  <button className="btn btn-sm btn-ghost">Run now</button>
                </div>
              </div>
            ))}
          </div>

          {showCreate && (
            <div className="modal-backdrop" onClick={() => setShowCreate(false)}>
              <div className="modal-box" style={{ width: 400 }} onClick={e => e.stopPropagation()}>
                <div className="modal-title">Create Workflow</div>
                <div className="input-wrap" style={{ marginBottom: 16 }}>
                  <label className="input-label">Workflow Name</label>
                  <input
                    className="input"
                    placeholder="e.g., Weekly Sales Report"
                    value={newWorkflowName}
                    onChange={e => setNewWorkflowName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={createWorkflow}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}