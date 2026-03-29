import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store';

const DEMOS = [
  { email: 'admin@gptexcel.com', pass: 'admin123', name: 'Admin User', plan: 'pro' as const },
  { email: 'demo@gptexcel.com', pass: 'demo123', name: 'Demo User', plan: 'free' as const },
  { email: 'krishna@datum.com', pass: 'datum2026', name: 'Krishna Koushik', plan: 'pro' as const },
];

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }
    if (mode === 'login' && !password) {
      setError('Password is required');
      return;
    }
    if (mode === 'register' && !name) {
      setError('Full name is required');
      return;
    }
    if (mode === 'register' && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    if (mode === 'login') {
      const found = DEMOS.find(d => d.email === email && d.pass === password);
      if (!found) {
        setError('Invalid credentials. Try a demo account below.');
        setLoading(false);
        return;
      }
      dispatch(setUser({ name: found.name, email: found.email, plan: found.plan }));
      navigate('/dashboard');
    } else {
      dispatch(setUser({ name, email, plan: 'free' }));
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const fillDemo = (idx: number) => {
    setEmail(DEMOS[idx].email);
    setPassword(DEMOS[idx].pass);
    setError('');
    setMode('login');
  };

  return (
    <div
      style={{
        height: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-body)',
        position: 'relative',
        overflow: 'hidden',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <style>{`
        @keyframes float-1 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes float-2 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .auth-float-1 { animation: float-1 8s ease infinite; }
        .auth-float-2 { animation: float-2 11s ease infinite; animation-delay: -3s; }
      `}</style>

      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.3,
        }}
      />
      <div
        className="auth-float-1"
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          top: -80,
          right: -60,
          pointerEvents: 'none',
        }}
      />
      <div
        className="auth-float-2"
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          bottom: -100,
          left: -80,
          pointerEvents: 'none',
        }}
      />

      <button className="btn btn-ghost btn-sm" onClick={() => navigate('/get-started')} style={{ position: 'absolute', top: 16, left: 16 }}>
        ← Back
      </button>

      <div
        style={{
          position: 'relative',
          width: 380,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '32px 28px',
          boxShadow: 'var(--shadow-xl)',
          animation: 'scaleIn 0.2s ease',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: -0.5, color: 'var(--text)' }}>
              GPT
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: -0.5,
                background: 'var(--accent)',
                color: 'var(--bg)',
                padding: '0 8px',
                borderRadius: 4,
              }}
            >
              EXCEL
            </span>
          </div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {mode === 'login' ? 'Sign in to your workspace' : 'Start your free account'}
          </p>
        </div>

        {mode !== 'register' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                { icon: 'G', label: 'Continue with Google' },
                { icon: 'M', label: 'Continue with Microsoft' },
              ].map(b => (
                <button
                  key={b.label}
                  className="btn btn-outline w-full"
                  style={{ justifyContent: 'center', gap: 10 }}
                  onClick={() => {
                    dispatch(setUser({ name: 'Demo User', email: 'demo@google.com', plan: 'free' }));
                    navigate('/dashboard');
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: b.icon === 'G' ? '#4285f4' : '#00a4ef',
                      color: '#fff',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {b.icon}
                  </span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className="divider" style={{ flex: 1 }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>or with email</span>
              <div className="divider" style={{ flex: 1 }} />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'register' && (
            <div className="input-wrap">
              <label className="input-label">Full Name</label>
              <input className="input" type="text" placeholder="Krishna Koushik" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div className="input-wrap">
            <label className="input-label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          {mode !== 'register' && (
            <div className="input-wrap">
              <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Password</span>
                <span
                  style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 400 }}
                  onClick={() => alert('Reset link sent (demo)')}
                >
                  Forgot?
                </span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '0.7rem',
                  }}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}
          {error && (
            <div style={{ padding: '8px 12px', background: 'var(--error-dim)', border: '1px solid var(--error)', borderRadius: 7, fontSize: '0.78rem', color: 'var(--error)' }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', marginTop: 4 }} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" style={{ width: 13, height: 13 }} /> {mode === 'login' ? 'Signing in...' : 'Creating...'}
              </>
            ) : mode === 'login' ? (
              'Sign in →'
            ) : (
              'Create account →'
            )}
          </button>
        </form>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => {
              setMode(m => (m === 'login' ? 'register' : 'login'));
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              transition: 'color var(--tr)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
          <div className="divider" />
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost w-full" style={{ justifyContent: 'center', fontSize: '0.78rem' }}>
            Skip — continue as guest →
          </button>
        </div>

        {/* Demo accounts */}
        {mode === 'login' && (
          <div style={{ marginTop: 20, padding: '12px', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Demo Accounts
            </div>
            {DEMOS.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: i < DEMOS.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text)' }}>{d.email}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    pw: {d.pass} · {d.plan}
                  </div>
                </div>
                <button className="btn btn-xs btn-outline" onClick={() => fillDemo(i)}>
                  Use
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: 14, fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
        GPT-EXCEL v2.0 
      </div>
    </div>
  );
}