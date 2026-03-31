import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '..';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AIChatPanel from '../components/AIChatPanel';

interface FileItem {
  id: string;
  name: string;
  type: 'excel' | 'doc' | 'pdf' | 'csv' | 'pptx';
  modified: string;
  size: string;
  starred: boolean;
}

interface Activity {
  id: string;
  icon: string;
  text: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

const SAMPLE_FILES: FileItem[] = [
  { id: '1', name: 'Q4 Financial Model.xlsx', type: 'excel', modified: '2 min ago', size: '1.2 MB', starred: true },
  { id: '2', name: 'Sales Dashboard 2026.xlsx', type: 'excel', modified: '1 hr ago', size: '840 KB', starred: false },
  { id: '3', name: 'Project Proposal.docx', type: 'doc', modified: '3 hr ago', size: '320 KB', starred: true },
  { id: '4', name: 'Customer Data Export.csv', type: 'csv', modified: 'Yesterday', size: '4.1 MB', starred: false },
  { id: '5', name: 'Annual Report 2025.pdf', type: 'pdf', modified: '2 days ago', size: '2.8 MB', starred: false },
  { id: '6', name: 'Q4 Pitch Deck.pptx', type: 'pptx', modified: '3 days ago', size: '5.2 MB', starred: true },
];

const ACTIVITIES: Activity[] = [
  { id: '1', icon: '⊞', text: 'Generated "Q4 Revenue Forecast" — 12 sheets', time: '2m ago', type: 'success' },
  { id: '2', icon: '◱', text: 'Document "Project Proposal" exported as PDF', time: '1h ago', type: 'info' },
  { id: '3', icon: '◎', text: 'Voice command: "Create pivot table for sales data"', time: '2h ago', type: 'success' },
  { id: '4', icon: '◈', text: '43 files categorized and tagged automatically', time: '4h ago', type: 'success' },
  { id: '5', icon: '⌘', text: 'Workflow "Weekly Report" scheduled', time: 'Yesterday', type: 'info' },
  { id: '6', icon: '◬', text: 'API rate limit warning — 89% of free tier used', time: 'Yesterday', type: 'warning' },
];

const METRICS = [
  { label: 'Files Generated', value: '248', change: '+12 today', up: true, sparkline: [4, 6, 5, 8, 7, 9, 11, 10, 12, 14, 13, 16] },
  { label: 'Tokens Used', value: '1.2M', change: '+84k today', up: true, sparkline: [20, 22, 18, 25, 30, 28, 35, 33, 40, 38, 42, 45] },
  { label: 'Storage Used', value: '3.4 GB', change: '+120 MB', up: true, sparkline: [10, 12, 13, 14, 15, 17, 19, 20, 22, 24, 25, 27] },
  { label: 'Free Tier Left', value: '23%', change: '27 remaining', up: false, sparkline: [80, 74, 68, 62, 55, 49, 43, 38, 34, 30, 27, 23] },
];

const Sparkline = ({ data, color }: { data: number[]; color?: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const norm = (v: number) => 1 - (v - min) / (max - min || 1);
  const w = 64;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${norm(v) * h}`).join(' ');
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline points={points} fill="none" stroke={color || 'var(--accent)'} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [files, setFiles] = useState<FileItem[]>(SAMPLE_FILES);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'recent' | 'starred'>('recent');
  const [greeting, setGreeting] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const user = useSelector((state: RootState) => state.app.user);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  const filteredFiles = files
    .filter(f => (activeTab === 'starred' ? f.starred : true))
    .filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const toggleStar = (id: string) => {
    setFiles(prev => prev.map(f => (f.id === id ? { ...f, starred: !f.starred } : f)));
  };

  const handlePrompt = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1500));
    setGenerating(false);
    navigate('/excel');
  };

  const getFileIcon = (type: FileItem['type']) => {
    const map = {
      excel: { icon: 'XL', color: 'var(--success)' },
      doc: { icon: 'W', color: 'var(--accent)' },
      pdf: { icon: 'PDF', color: 'var(--error)' },
      csv: { icon: 'CSV', color: 'var(--warning)' },
      pptx: { icon: 'PPT', color: 'var(--accent)' },
    };
    return map[type];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-2)', padding: '24px 28px' }}>
          {/* Greeting + Quick Prompt */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5, marginBottom: 8 }}>
              {greeting}, {user?.name?.split(' ')[0] || 'there'}.
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              You have <span style={{ color: 'var(--accent)', fontWeight: 600 }}>23 generations</span> remaining.
            </p>
          </div>

          {/* Quick Prompt Bar */}
          <div
            className="prompt-area"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px' }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                ⊞
              </div>
              <textarea
                ref={promptRef}
                className="input"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handlePrompt();
                }}
                placeholder='Ask GPT-EXCEL anything… "Create a Q4 sales forecast" or "Build a KPI dashboard"'
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  resize: 'none',
                  minHeight: 20,
                  maxHeight: 120,
                  boxShadow: 'none',
                  fontSize: '0.875rem',
                  padding: 0,
                  lineHeight: 1.6,
                }}
                rows={1}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
                }}
              />
            </div>
            <div
              className="prompt-footer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                borderTop: '1px solid var(--border)',
                background: 'var(--bg-3)',
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                {['Excel', 'Document', 'Chart', 'Pivot', 'Dashboard'].map(t => (
                  <button
                    key={t}
                    className="btn btn-xs btn-outline"
                    onClick={() => setPrompt(p => (p ? p + ` [${t}]` : `Create a ${t.toLowerCase()}: `))}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <kbd>⌘</kbd>
                  <kbd>↵</kbd>
                </span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handlePrompt}
                  disabled={!prompt.trim() || generating}
                  style={{ minWidth: 80 }}
                >
                  {generating ? (
                    <>
                      <span className="spinner" style={{ width: 12, height: 12 }} /> Generating
                    </>
                  ) : (
                    'Generate →'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            {METRICS.map((m, i) => (
              <div key={i} className="metric-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: -0.5, color: 'var(--text)' }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{m.label}</div>
                  </div>
                  <Sparkline data={m.sparkline} color={m.up ? 'var(--success)' : 'var(--error)'} />
                </div>
                <div style={{ marginTop: 8, fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: m.up ? 'var(--success)' : 'var(--error)' }}>
                  {m.up ? '↑' : '↓'} {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* Files & Activity */}
          <div style={{ display: 'flex', gap: 20 }}>
            {/* Files Section */}
            <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                <div className="tabs" style={{ flex: 1 }}>
                  {(['recent', 'starred'] as const).map(tab => (
                    <div key={tab} className={`tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)} style={{ textTransform: 'capitalize' }}>
                      {tab}
                    </div>
                  ))}
                </div>
                <div className="search-bar" style={{ width: 180 }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/excel')}>
                  + New
                </button>
              </div>
              <div style={{ overflowY: 'auto', maxHeight: 300 }}>
                {filteredFiles.map(f => {
                  const icon = getFileIcon(f.type);
                  return (
                    <div
                      key={f.id}
                      className="file-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 14px',
                        borderBottom: '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'background var(--tr)',
                      }}
                      onDoubleClick={() => navigate('/excel')}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: icon.color,
                        }}
                      >
                        {icon.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text)' }}>{f.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {f.modified} · {f.size}
                        </div>
                      </div>
                      <div className="file-actions">
                        <button
                          className="btn btn-icon-sm btn-ghost"
                          onClick={e => {
                            e.stopPropagation();
                            toggleStar(f.id);
                          }}
                          style={{ color: f.starred ? 'var(--warning)' : 'var(--text-muted)' }}
                        >
                          {f.starred ? '★' : '☆'}
                        </button>
                        <button className="btn btn-icon-sm btn-ghost">↗</button>
                        <button className="btn btn-icon-sm btn-ghost">↓</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity */}
            <div style={{ width: 260, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div className="panel-header">Activity Feed</div>
              <div style={{ padding: '6px 0' }}>
                {ACTIVITIES.map(a => (
                  <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 14px' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                          a.type === 'success'
                            ? 'var(--success-dim)'
                            : a.type === 'warning'
                            ? 'var(--warning-dim)'
                            : 'var(--accent-dim)',
                        borderRadius: 6,
                        fontSize: 13,
                        color:
                          a.type === 'success' ? 'var(--success)' : a.type === 'warning' ? 'var(--warning)' : 'var(--accent)',
                      }}
                    >
                      {a.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text)' }}>{a.text}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <AIChatPanel />
      </div>
    </div>
  );
}