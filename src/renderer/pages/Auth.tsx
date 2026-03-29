import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store';

// ── AUTH DEMO DATA ────────────────────────────────────────────────
const DEMOS = [
  { email: 'admin@gptexcel.com', pass: 'admin123', name: 'Admin User', plan: 'pro' as const },
  { email: 'krishna@datum.com', pass: 'datum2026', name: 'Krishna Koushik', plan: 'pro' as const },
];

// ── SUBCOMPONENT: GLITCH GRID (ALWAYS ON) ────────────────────────
function InternalBoxGrid() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const COLS = 20, ROWS = 10;

  const getDist = (i: number) => {
    if (hoverIdx === null) return 99;
    const hr = Math.floor(hoverIdx / COLS), hc = hoverIdx % COLS;
    const ir = Math.floor(i / COLS), ic = i % COLS;
    return Math.sqrt((hr - ir) ** 2 + (hc - ic) ** 2);
  };

  return (
    <div 
      style={{ 
        position: 'absolute', inset: 0, 
        display: 'grid', 
        gridTemplateColumns: `repeat(${COLS}, 1fr)`, 
        gridTemplateRows: `repeat(${ROWS}, 1fr)`, 
        pointerEvents: 'all', zIndex: 1 
      }}
      onMouseLeave={() => setHoverIdx(null)}
    >
      {Array(COLS * ROWS).fill(0).map((_, i) => {
        const dist = getDist(i);
        const intensity = dist < 1 ? 1 : dist < 2.2 ? 0.4 : 0;
        const randomDur = 3 + (i % 5); 
        const randomDelay = (i % 7) * 0.8;

        return (
          <div 
            key={i} 
            onMouseEnter={() => setHoverIdx(i)}
            style={{
              border: '1px solid rgba(255,255,255,0.08)', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `gridGlitch ${randomDur}s infinite`,
              animationDelay: `${randomDelay}s`,
              background: intensity > 0 
                ? `rgba(255,255,255, ${intensity * 0.15})` 
                : 'transparent',
              borderColor: intensity > 0 
                ? `rgba(255,255,255, ${intensity * 0.6})` 
                : 'rgba(255,255,255,0.08)',
              boxShadow: intensity === 1 
                ? 'inset 0 0 20px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.1)' 
                : 'none',
              zIndex: intensity === 1 ? 2 : 1
            }}
          />
        );
      })}
    </div>
  );
}

// ── MAIN AUTH COMPONENT ───────────────────────────────────────────
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

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1000));

    if (mode === 'login') {
      const found = DEMOS.find(d => d.email === email && d.pass === password);
      if (found) {
        dispatch(setUser(found));
        navigate('/dashboard');
      } else {
        setError('ACCESS_DENIED: Critical authentication failure.');
      }
    } else {
      dispatch(setUser({ name, email, plan: 'free' }));
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      height: '100vh', background: '#020202', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      position: 'relative', overflow: 'hidden',
      opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease'
    }}>
      
      <style>{`
        @keyframes gridGlitch {
          0%, 100% { border-color: rgba(255,255,255,0.08); }
          50% { border-color: rgba(255,255,255,0.25); }
        }
        .auth-card { 
          animation: cardPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; 
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .social-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; cursor: pointer; color: #fff; font-size: 0.85rem; transition: 0.25s;
          font-weight: 500;
        }
        .social-btn:hover { 
          background: rgba(255,255,255,0.09); 
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-2px);
        }
        .google-icon { width: 18px; height: 18px; }
        .ms-icon { width: 18px; height: 18px; color: #fff; }
      `}</style>

      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.45 }}>
        <InternalBoxGrid />
      </div>

      <button 
        className="btn btn-ghost btn-sm" 
        onClick={() => navigate('/')} 
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 10, color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.05em' }}
      >
        ← RETURN_TO_HOME
      </button>

      {/* Auth Card */}
      <div className="auth-card" style={{ 
        position: 'relative', zIndex: 5, width: 420, 
        background: 'rgba(10, 10, 10, 0.85)', 
        backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.12)', 
        borderRadius: 28, padding: '44px 40px',
        boxShadow: '0 50px 120px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.03)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ fontWeight: 900, fontSize: 26, letterSpacing: -1 }}>GPT</span>
            <span style={{ fontWeight: 900, fontSize: 24, background: 'var(--blue)', color: '#fff', padding: '1px 10px', borderRadius: 6 }}>EXCEL</span>
          </div>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600 }}>{mode === 'login' ? 'System Login' : 'Register Core'}</h2>
        </div>

        {/* Social Buttons Section */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 28 }}>
          <button className="social-btn" onClick={() => navigate('/dashboard')}>
            <img 
              className="google-icon" 
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
              alt="Google" 
            />
            Google
          </button>
          <button className="social-btn" onClick={() => navigate('/dashboard')}>
            <svg className="ms-icon" viewBox="0 0 23 23">
              <path fill="currentColor" d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
            </svg>
            Microsoft
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>manual_auth</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {mode === 'register' && (
            <input style={inputStyle} type="text" placeholder="USER_FULL_NAME" value={name} onChange={e => setName(e.target.value)} required />
          )}
          
          <input style={inputStyle} type="email" placeholder="IDENTITY_EMAIL" value={email} onChange={e => setEmail(e.target.value)} required />

          <div style={{ position: 'relative' }}>
            <input 
              style={inputStyle} 
              type={showPass ? 'text' : 'password'} 
              placeholder="ACCESS_PASSWORD" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer' }}
            >
              {showPass ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          {error && <div style={{ fontSize: '0.75rem', color: '#ff5555', textAlign: 'center', background: 'rgba(255,85,85,0.1)', padding: '10px', borderRadius: 10 }}>{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-xl" 
            style={{ justifyContent: 'center', width: '100%', marginTop: 6, fontWeight: 700, letterSpacing: '0.05em' }} 
            disabled={loading}
          >
            {loading ? 'AUTHORIZING...' : mode === 'login' ? 'INITIALIZE →' : 'GENERATE →'}
          </button>
        </form>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}
          >
            {mode === 'login' ? "// CREATE_NEW_IDENTITY" : "// RETURN_TO_LOGIN"}
          </button>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 20, fontSize: '0.65rem', color: 'rgba(255,255,255,0.15)', fontFamily: 'monospace', letterSpacing: '0.15em' }}>
        GPT-EXCEL_TERMINAL_V2.0 // ENCRYPTED_AUTH
      </div>
    </div>
  );
}

const inputStyle = { 
  width: '100%', padding: '15px', background: 'rgba(255,255,255,0.03)', 
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, color: '#fff', 
  outline: 'none', fontSize: '0.9rem', fontFamily: 'monospace', transition: '0.2s'
};