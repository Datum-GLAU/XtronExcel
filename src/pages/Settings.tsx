import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setTheme } from '..';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useSelector((state: RootState) => state.app.theme);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [exportFormat, setExportFormat] = useState('xlsx');
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 40px', background: 'var(--bg-2)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: -0.5, marginBottom: 32 }}>
            Settings
          </h1>

          <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Appearance */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Appearance</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Dark Mode</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Switch between light and dark theme</div>
                </div>
                <button onClick={handleThemeChange} className={`switch ${theme === 'dark' ? 'on' : ''}`} style={{ width: 44, height: 24 }} />
              </div>
            </div>

            {/* AI Configuration */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>AI Configuration</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="input-wrap">
                  <label className="input-label">OpenAI API Key</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                  />
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Your API key is stored locally and never shared
                  </div>
                </div>
                <div className="input-wrap">
                  <label className="input-label">Model Selection</label>
                  <select className="input" value={model} onChange={e => setModel(e.target.value)}>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4">GPT-4 Turbo</option>
                    <option value="gpt-3.5">GPT-3.5 Turbo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export Preferences */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Export Preferences</h2>
              <div className="input-wrap">
                <label className="input-label">Default Export Format</label>
                <select className="input" value={exportFormat} onChange={e => setExportFormat(e.target.value)}>
                  <option value="xlsx">Excel (.xlsx)</option>
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Auto‑save generated files</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automatically save to local storage</div>
                </div>
                <button onClick={() => setAutoSave(!autoSave)} className={`switch ${autoSave ? 'on' : ''}`} style={{ width: 44, height: 24 }} />
              </div>
            </div>

            {/* Notifications */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Notifications</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Enable notifications</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Receive alerts for completed generations</div>
                </div>
                <button onClick={() => setNotifications(!notifications)} className={`switch ${notifications ? 'on' : ''}`} style={{ width: 44, height: 24 }} />
              </div>
            </div>

            {/* About */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>About GPT-EXCEL</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 12 }}>Version 2.0.0</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Built with Electron, React, TypeScript, and Python<br />
                © 2026 Mallavarapu Krishna Koushik Reddy et al.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}