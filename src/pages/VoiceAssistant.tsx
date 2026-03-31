import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function VoiceAssistant() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<{ text: string; response: string }[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setListening(false);
        // Simulate AI response
        setTimeout(() => {
          const demoResponse = `I understood: "${text}". Here's a demo response. In production, this would be processed by GPT-4o.`;
          setResponse(demoResponse);
          setHistory(prev => [{ text, response: demoResponse }, ...prev].slice(0, 10));
        }, 500);
      };
      recognitionRef.current.onerror = () => setListening(false);
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      setTranscript('');
      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      <Header toggleSidebar={() => setSidebarOpen(p => !p)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'var(--bg-2)' }}>
          <h1 style={{ fontSize: '1.5rem', letterSpacing: -0.5, marginBottom: 8 }}>Voice Assistant</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 32 }}>Hands‑free commands with Whisper API integration</p>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '32px',
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            <button
              onClick={startListening}
              disabled={listening}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: listening ? 'var(--error)' : 'var(--accent)',
                border: 'none',
                cursor: 'pointer',
                marginBottom: 20,
                transition: 'all var(--tr)',
              }}
            >
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1={12} y1={19} x2={12} y2={23} />
                <line x1={8} y1={23} x2={16} y2={23} />
              </svg>
            </button>
            <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>
              {listening ? 'Listening...' : transcript ? `"${transcript}"` : 'Click the mic and speak'}
            </div>
            {response && (
              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '16px',
                  marginTop: 20,
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Response:</div>
                <p style={{ fontSize: '0.9rem' }}>{response}</p>
              </div>
            )}
          </div>

          <h3 style={{ fontSize: '1rem', marginBottom: 12 }}>Command History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No commands yet.</p>
            ) : (
              history.map((h, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>🎤 {h.text}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h.response}</div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}