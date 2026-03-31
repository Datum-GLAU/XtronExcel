import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  downloads: number;
  installed: boolean;
}

const SAMPLE_PLUGINS: Plugin[] = [
  { id: '1', name: 'Advanced Formula Builder', description: 'Generate complex Excel formulas with AI', category: 'Excel', downloads: 1240, installed: false },
  { id: '2', name: 'PDF to Excel Converter', description: 'Extract tables from PDFs into spreadsheets', category: 'Conversion', downloads: 890, installed: true },
  { id: '3', name: 'Financial Model Templates', description: 'Pre‑built templates for startups', category: 'Templates', downloads: 2100, installed: false },
  { id: '4', name: 'Email Automation', description: 'Send reports via email automatically', category: 'Automation', downloads: 560, installed: false },
  { id: '5', name: 'SQL Query Runner', description: 'Run SQL queries on Excel data', category: 'Data', downloads: 430, installed: false },
];

export default function PluginMarketplace() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [plugins, setPlugins] = useState<Plugin[]>(SAMPLE_PLUGINS);
  const [search, setSearch] = useState('');

  const toggleInstall = (id: string) => {
    setPlugins(prev =>
      prev.map(p => (p.id === id ? { ...p, installed: !p.installed } : p))
    );
  };

  const filteredPlugins = plugins.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'var(--bg-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5 }}>Plugin Marketplace</h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Extend GPT‑EXCEL with community plugins</p>
            </div>
            <div className="search-bar" style={{ width: 240 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input placeholder="Search plugins..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {filteredPlugins.map(plugin => (
              <div
                key={plugin.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{plugin.name}</div>
                    <span className="badge badge-outline" style={{ fontSize: '0.65rem' }}>
                      {plugin.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⬇ {plugin.downloads}</div>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{plugin.description}</p>
                <button
                  className={`btn btn-sm ${plugin.installed ? 'btn-secondary' : 'btn-primary'} w-full`}
                  onClick={() => toggleInstall(plugin.id)}
                >
                  {plugin.installed ? 'Uninstall' : 'Install'}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}