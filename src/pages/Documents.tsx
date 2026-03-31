import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Document {
  id: string;
  title: string;
  type: 'report' | 'proposal' | 'contract' | 'cv';
  content: string;
  date: string;
}

const SAMPLE_DOCS: Document[] = [
  { id: '1', title: 'Q4 Business Review', type: 'report', content: 'Quarterly performance analysis and projections...', date: 'Mar 20, 2026' },
  { id: '2', title: 'Client Proposal - Acme Corp', type: 'proposal', content: 'Strategic partnership proposal for 2026...', date: 'Mar 18, 2026' },
  { id: '3', title: 'NDA Template', type: 'contract', content: 'Standard non-disclosure agreement...', date: 'Mar 15, 2026' },
  { id: '4', title: 'Software Engineer CV', type: 'cv', content: 'Experience with React, Python, Electron...', date: 'Mar 10, 2026' },
];

export default function Documents() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [docs, setDocs] = useState<Document[]>(SAMPLE_DOCS);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const generateDoc = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1500));
    const newDoc: Document = {
      id: Date.now().toString(),
      title: prompt.slice(0, 40),
      type: 'report',
      content: 'Generated document content based on your prompt. This is a demo response.',
      date: new Date().toLocaleDateString(),
    };
    setDocs(prev => [newDoc, ...prev]);
    setPrompt('');
    setGenerating(false);
  };

  const getTypeIcon = (type: Document['type']) => {
    const map = { report: '📊', proposal: '📝', contract: '⚖️', cv: '📄' };
    return map[type];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'var(--bg-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5 }}>Documents</h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI‑generated reports, proposals, contracts, and more</p>
            </div>
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '16px',
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <textarea
                className="input"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe the document you need… e.g., 'Write a business proposal for a SaaS product'"
                style={{ flex: 1, minHeight: 80, resize: 'vertical' }}
              />
              <button className="btn btn-primary" onClick={generateDoc} disabled={generating} style={{ alignSelf: 'flex-end' }}>
                {generating ? 'Generating...' : 'Generate →'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {docs.map(doc => (
              <div
                key={doc.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all var(--tr)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                onClick={() => setSelectedDoc(doc)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{getTypeIcon(doc.type)}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.title}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>{doc.content.slice(0, 80)}…</p>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.date}</div>
              </div>
            ))}
          </div>

          {selectedDoc && (
            <div className="modal-backdrop" onClick={() => setSelectedDoc(null)}>
              <div className="modal-box" style={{ width: 500 }} onClick={e => e.stopPropagation()}>
                <div className="modal-title">{selectedDoc.title}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{selectedDoc.content}</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => setSelectedDoc(null)}>
                    Close
                  </button>
                  <button className="btn btn-primary">Export PDF</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

