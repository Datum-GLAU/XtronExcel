import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'excel' | 'doc' | 'pdf' | 'csv';
  size: string;
  modified: string;
  starred: boolean;
}

const SAMPLE_FILES: FileItem[] = [
  { id: '1', name: 'Financial Reports', type: 'folder', size: '—', modified: 'Mar 25, 2026', starred: true },
  { id: '2', name: 'Sales Data Q4.xlsx', type: 'excel', size: '1.2 MB', modified: 'Mar 24, 2026', starred: false },
  { id: '3', name: 'Project Proposal.docx', type: 'doc', size: '320 KB', modified: 'Mar 23, 2026', starred: true },
  { id: '4', name: 'Customer List.csv', type: 'csv', size: '840 KB', modified: 'Mar 22, 2026', starred: false },
  { id: '5', name: 'Annual Report 2025.pdf', type: 'pdf', size: '2.8 MB', modified: 'Mar 20, 2026', starred: false },
  { id: '6', name: 'Budget Templates', type: 'folder', size: '—', modified: 'Mar 18, 2026', starred: true },
  { id: '7', name: 'Inventory Tracker.xlsx', type: 'excel', size: '560 KB', modified: 'Mar 17, 2026', starred: false },
];

export default function FileManager() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [files, setFiles] = useState<FileItem[]>(SAMPLE_FILES);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const getIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'folder':
        return '📁';
      case 'excel':
        return '⊞';
      case 'doc':
        return '◱';
      case 'pdf':
        return 'PDF';
      case 'csv':
        return 'CSV';
      default:
        return '📄';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'var(--bg-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5 }}>File Manager</h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI‑powered organization and semantic search</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="search-bar" style={{ width: 240 }}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8} />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="btn btn-icon-sm btn-ghost" onClick={() => setViewMode(v => (v === 'list' ? 'grid' : 'list'))}>
                {viewMode === 'list' ? '⊞' : '⊟'}
              </button>
              <button className="btn btn-primary btn-sm">+ Upload</button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 40px', padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <div></div>
                <div>Name</div>
                <div>Size</div>
                <div>Modified</div>
                <div></div>
              </div>
              {filteredFiles.map(f => (
                <div
                  key={f.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 100px 120px 40px',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'background var(--tr)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onDoubleClick={() => navigate('/excel')}
                >
                  <div style={{ fontSize: 18 }}>{getIcon(f.type)}</div>
                  <div style={{ fontWeight: f.type === 'folder' ? 600 : 400, color: 'var(--text)' }}>{f.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.size}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.modified}</div>
                  <button
                    className="btn btn-icon-sm btn-ghost"
                    onClick={e => {
                      e.stopPropagation();
                      setFiles(prev => prev.map(x => (x.id === f.id ? { ...x, starred: !x.starred } : x)));
                    }}
                    style={{ color: f.starred ? 'var(--warning)' : 'var(--text-muted)' }}
                  >
                    {f.starred ? '★' : '☆'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {filteredFiles.map(f => (
                <div
                  key={f.id}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all var(--tr)',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  onDoubleClick={() => navigate('/excel')}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{getIcon(f.type)}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>{f.size}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}