import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { value: '40M+', label: 'Formulas Generated' },
  { value: '1.4M+', label: 'Active Users' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '< 2s', label: 'Generation Speed' },
];

const FEATURES = [
  { icon: '⊞', title: 'Excel AI Engine', desc: 'Natural language to production-ready Excel files. Formulas, pivot tables, charts, and financial models.', tags: ['VLOOKUP', 'Pivot', 'Charts', 'Macros'], stat: '200+ formula types' },
  { icon: '◱', title: 'Document Intelligence', desc: 'Generate reports, proposals, contracts, CVs. Multi-doc comparison, summarization, grammar correction.', tags: ['Reports', 'Contracts', 'Research', 'CVs'], stat: '50+ templates' },
  { icon: '◈', title: 'Smart File Manager', desc: 'AI-powered file categorization with semantic embeddings. Auto-tag, cluster, deduplicate, intelligent search.', tags: ['Auto-Tag', 'Search', 'Dedup', 'Cluster'], stat: 'Embedding-based' },
  { icon: '⌘', title: 'Workflow Automation', desc: 'Build drag-and-drop automation workflows. Schedule recurring reports, automate email drafts, AI pipelines.', tags: ['Schedule', 'Automate', 'Tasks', 'AI Pipeline'], stat: 'Drag & drop builder' },
  { icon: '◎', title: 'Voice Commands', desc: 'Hands‑free with Web Speech API + Whisper. Voice‑to‑Excel, voice document creation, TTS responses.', tags: ['Whisper', 'TTS', 'Offline', 'Live'], stat: 'Real-time transcription' },
  { icon: '◬', title: 'Data Visualization', desc: 'Interactive charts, KPI dashboards, financial analytics, forecasting graphs. 20+ chart types with full customization.', tags: ['Charts', 'KPI', 'Forecast', 'Dashboard'], stat: '20+ chart types' },
  { icon: '◻', title: 'PowerPoint Generator', desc: 'Auto‑generate pitch decks, business presentations with charts. Speaker notes, custom themes.', tags: ['Slides', 'Charts', 'Notes', 'Themes'], stat: 'AI‑powered decks' },
  { icon: '🔌', title: 'Plugin Marketplace', desc: 'Extend GPT‑EXCEL with industry‑specific plugins. Automation packs, custom integrations, developer SDK.', tags: ['Plugins', 'Extensions', 'SDK', 'Integrations'], stat: '40+ plugins' },
];

const FAQS = [
  { q: 'Does it work offline?', a: 'Yes. Core Excel generation, file management, and basic voice commands work fully offline using local Python processing. AI features require internet for LLM API calls.' },
  { q: 'What AI models does it use?', a: 'Primary: OpenAI GPT-4o. Azure OpenAI for enterprise. Hugging Face for demos. Whisper for voice. You can configure your own API keys in Settings.' },
  { q: 'What file formats are supported?', a: 'Excel (.xlsx, .xls, .xlsm), CSV, PDF, Word (.docx), PowerPoint (.pptx), JSON, and plain text. Export to any of these formats.' },
  { q: 'Is there a free tier?', a: 'Yes — Free tier includes 50 AI generations/month, basic Excel features, and file manager. Pro tier ($12/mo) unlocks unlimited generations, all voice features, and advanced automation.' },
  { q: 'How secure is my data?', a: 'Files are processed locally. Only prompts are sent to AI APIs — never your raw file contents unless you explicitly upload them. Firebase handles auth securely.' },
];

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 30);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span>
      {displayed}
      <span
        style={{
          borderRight: '2px solid currentColor',
          marginLeft: 2,
          animation: 'cursor-blink 1s step-end infinite',
        }}
      />
    </span>
  );
};

export default function GetStarted() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [activeFeat, setActiveFeat] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    const interval = setInterval(() => setActiveFeat(p => (p + 1) % FEATURES.length), 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .hero-gradient {
          background: linear-gradient(90deg, var(--text) 0%, var(--text-secondary) 50%, var(--text) 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          height: 52,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: 'var(--text)' }}>
            GPT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: -0.5,
              background: 'var(--accent)',
              color: 'var(--bg)',
              padding: '1px 8px',
              borderRadius: 4,
            }}
          >
            EXCEL
          </span>
        </div>
        <div style={{ display: 'flex', gap: 2, marginLeft: 32 }}>
          {['Features', 'Pricing', 'Docs', 'About'].map(l => (
            <span key={l} className="nav-link">
              {l}
            </span>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/auth')}>
            Sign in
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/auth')}>
            Get Started →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: '80px 0 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.3,
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 24px', maxWidth: 720 }}>
          <div style={{ marginBottom: 20 }}>
            <span className="badge badge-outline" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>
              ● NEW — AI-Powered Excel v2.0
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            <span style={{ color: 'var(--text)' }}>Turn any idea into a </span><br></br>
            <span className="hero-gradient">
              <TypewriterText
                texts={['spreadsheet', 'financial model', 'pivot table', 'data report', 'KPI dashboard']}
              />
            </span>
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            GPT-EXCEL combines LLM intelligence with Python automation to generate Excel files, documents, and
            data visualizations from natural language  in under 2 seconds.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-xl" onClick={() => navigate('/auth')}>
              Start for free →
            </button>
            <button className="btn btn-outline btn-xl" onClick={() => navigate('/dashboard')}>
              View demo
            </button>
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            {['No credit card', '50 free generations/mo', 'Offline capable'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: 'var(--success)' }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '28px 24px',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, letterSpacing: -2, color: 'var(--text)' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.03em' }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="section-label">Features</div>
          <h2 style={{ marginBottom: 8 }}>Everything you need. Nothing you don't.</h2>
          <p style={{ marginBottom: 40, maxWidth: 480 }}>A complete AI productivity suite built for analysts, developers, and business teams.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`feat-card${activeFeat === i ? ' active' : ''}`}
                onClick={() => setActiveFeat(i)}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-3)',
                    marginBottom: 12,
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ marginBottom: 6, fontSize: '0.9rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.6, marginBottom: 12, color: 'var(--text-secondary)' }}>{f.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                  {f.tags.map(t => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  → {f.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        style={{
          padding: '64px 28px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-2)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="section-label">How it works</div>
          <h2 style={{ marginBottom: 40 }}>Three steps to your spreadsheet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: '16.5%',
                right: '16.5%',
                height: 1,
                background: 'var(--border)',
                zIndex: 0,
              }}
            />
            {[
              {
                step: '01',
                title: 'Write your prompt',
                desc: 'Describe what you want in plain English. "Create a monthly budget tracker with categories and charts."',
              },
              {
                step: '02',
                title: 'AI generates code',
                desc: 'GPT-4o generates Python code. Our engine validates, tests, and executes it locally on your machine.',
              },
              {
                step: '03',
                title: 'Preview & export',
                desc: 'See a live preview before downloading. Export as .xlsx, .csv, .pdf, or .docx in one click.',
              },
            ].map((s, i) => (
              <div key={i} style={{ padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    background: 'var(--bg-2)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ marginBottom: 8, fontSize: '0.875rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="section-label">FAQ</div>
          <h2 style={{ marginBottom: 32 }}>Common questions</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span
                  style={{
                    color: 'var(--text-muted)',
                    transition: 'transform 0.2s',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    display: 'inline-block',
                    fontSize: 18,
                  }}
                >
                  +
                </span>
              </div>
              <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 28px',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="section-label" style={{ marginBottom: 16 }}>
          Get started today
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: 12, letterSpacing: -1 }}>Build smarter spreadsheets with AI.</h2>
        <p style={{ marginBottom: 32, color: 'var(--text-secondary)' }}>50 free generations per month. No credit card required.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-primary btn-xl" onClick={() => navigate('/auth')}>
            Start for free →
          </button>
          <button className="btn btn-outline btn-xl" onClick={() => navigate('/dashboard')}>
            Skip to dashboard
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13 }}>GPT-EXCEL</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>© 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'Docs', 'GitHub', 'Contact'].map(l => (
            <span
              key={l}
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {l}
            </span>
          ))}
        </div>
        <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          Powerd by Datum
        </div>
      </footer>
    </div>
  );
}