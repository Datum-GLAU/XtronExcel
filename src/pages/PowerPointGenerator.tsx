import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Slide {
  id: number;
  title: string;
  content: string;
  chart?: string;
}

export default function PowerPointGenerator() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);

  const generateDeck = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1800));
    // Demo slides
    const demoSlides: Slide[] = [
      { id: 1, title: 'Q4 Business Review', content: 'Key highlights and performance metrics for Q4 2025.' },
      { id: 2, title: 'Revenue Growth', content: 'Revenue increased 18% YoY, driven by new product launches.', chart: 'bar' },
      { id: 3, title: 'Next Steps', content: 'Launch new features, expand into APAC, increase R&D budget.' },
    ];
    setSlides(demoSlides);
    setGenerating(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'var(--bg-2)' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5 }}>PowerPoint Generator</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI‑powered slide decks with charts and speaker notes</p>
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '20px',
              marginBottom: 24,
            }}
          >
            <textarea
              className="input"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your presentation… e.g., 'Q4 investor update with revenue charts and growth metrics'"
              style={{ width: '100%', minHeight: 100, marginBottom: 16 }}
            />
            <button className="btn btn-primary" onClick={generateDeck} disabled={generating}>
              {generating ? 'Generating...' : 'Generate Presentation →'}
            </button>
          </div>

          {slides.length > 0 && (
            <div>
              <h3 style={{ marginBottom: 16 }}>Generated Slides ({slides.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {slides.map(slide => (
                  <div
                    key={slide.id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: '16px 20px',
                    }}
                  >
                    <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>{slide.title}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{slide.content}</p>
                    {slide.chart && (
                      <div
                        style={{
                          height: 100,
                          background: 'var(--surface-2)',
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        📊 Chart placeholder – would render actual chart in production
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button className="btn btn-primary">Export as .pptx</button>
                <button className="btn btn-secondary">Export as PDF</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}