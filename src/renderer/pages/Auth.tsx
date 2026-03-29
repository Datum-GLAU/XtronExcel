import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Mode = 'login' | 'register' | 'forgot'
const DEMOS = [
  { email: 'admin@gptexcel.com', pass: 'admin123', name: 'Admin User', plan: 'pro' },
  { email: 'demo@gptexcel.com', pass: 'demo123', name: 'Demo User', plan: 'free' },
  { email: 'krishna@datum.com', pass: 'datum2026', name: 'Krishna Koushik', plan: 'pro' },
]

export default function Auth() {
  const nav = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dark, setDark] = useState(() => !document.documentElement.classList.contains('light'))
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  const toggleTheme = () => {
    const nd = !dark; setDark(nd)
    if (nd) { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light') }
    else { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark') }
    localStorage.setItem('theme', nd ? 'dark' : 'light')
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccess('')
    if (!email) { setError('Email is required'); return }
    if (!pass && mode !== 'forgot') { setError('Password is required'); return }
    if (mode === 'register' && !name) { setError('Full name is required'); return }
    if (mode === 'register' && pass.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); await new Promise(r => setTimeout(r, 900))
    if (mode === 'login') {
      const found = DEMOS.find(d => d.email === email && d.pass === pass)
      if (!found) { setError('Invalid credentials. Try a demo account below.'); setLoading(false); return }
      localStorage.setItem('gpe_user', JSON.stringify({ name: found.name, email: found.email, plan: found.plan }))
      setSuccess(`Welcome back, ${found.name}!`)
      setTimeout(() => nav('/dashboard'), 700)
    } else if (mode === 'register') {
      localStorage.setItem('gpe_user', JSON.stringify({ name, email, plan: 'free' }))
      setSuccess(`Account created! Welcome, ${name}!`)
      setTimeout(() => nav('/dashboard'), 700)
    } else { setSuccess('Reset link sent! (demo — no actual email)') }
    setLoading(false)
  }

  const fill = (idx: number) => { setEmail(DEMOS[idx].email); setPass(DEMOS[idx].pass); setError(''); setMode('login') }

  return (
    <div style={{ height: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden', opacity: mounted ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      <style>{`
        @keyframes float-1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(3deg)} }
        @keyframes float-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .auth-blob-1 { animation: float-1 9s ease infinite; }
        .auth-blob-2 { animation: float-2 12s ease infinite; animation-delay:-4s; }
      `}</style>

      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: '32px 32px', opacity: 0.3, pointerEvents: 'none' }}/>
      <div className="auth-blob-1" style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, var(--blue-dim) 0%, transparent 70%)', top: -100, right: -80, pointerEvents: 'none' }}/>
      <div className="auth-blob-2" style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, var(--purple-dim) 0%, transparent 70%)', bottom: -140, left: -100, pointerEvents: 'none' }}/>

      {/* Theme toggle */}
      <button className="btn btn-ghost btn-sm" onClick={toggleTheme} style={{ position: 'absolute', top: 16, right: 16, gap: 6, color: 'var(--text-sec)' }}>
        {dark ? (
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={5}/><line x1={12} y1={1} x2={12} y2={3}/><line x1={12} y1={21} x2={12} y2={23}/><line x1={1} y1={12} x2={3} y2={12}/><line x1={21} y1={12} x2={23} y2={12}/><line x1={4.22} y1={4.22} x2={5.64} y2={5.64}/><line x1={18.36} y1={18.36} x2={19.78} y2={19.78}/><line x1={4.22} y1={19.78} x2={5.64} y2={18.36}/><line x1={18.36} y1={5.64} x2={19.78} y2={4.22}/></svg>
        ) : (
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        )}
        <span style={{ fontSize: '0.75rem' }}>{dark ? 'Light' : 'Dark'}</span>
      </button>

      <button className="btn btn-ghost btn-sm" onClick={() => nav('/get-started')} style={{ position: 'absolute', top: 16, left: 16, color: 'var(--text-sec)' }}>
        ← Back
      </button>

      {/* Card */}
      <div style={{ position: 'relative', width: 390, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px', boxShadow: 'var(--shadow-xl)', animation: 'scaleIn 0.2s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: -0.5, color: 'var(--text)' }}>GPT</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: -0.5, background: 'var(--blue)', color: '#fff', padding: '0 8px', borderRadius: 4 }}>EXCEL</span>
          </div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 4, color: 'var(--text)' }}>
            {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create account' : 'Reset password'}
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {mode === 'login' ? 'Sign in to your workspace' : mode === 'register' ? 'Start your free account' : 'Enter your email to reset'}
          </p>
        </div>

        {mode !== 'forgot' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[{ icon: 'G', label: 'Continue with Google', bg: '#4285f4' }, { icon: 'M', label: 'Continue with Microsoft', bg: '#00a4ef' }].map(b => (
                <button key={b.label} className="btn btn-outline w-full" style={{ justifyContent: 'center', gap: 10, color: 'var(--text)' }} onClick={() => { localStorage.setItem('gpe_user', JSON.stringify({ name: 'Demo User', email: 'demo@google.com', plan: 'free' })); nav('/dashboard') }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: b.bg, color: '#fff', fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{b.icon}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className="divider" style={{ flex: 1 }}/><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>or with email</span><div className="divider" style={{ flex: 1 }}/>
            </div>
          </>
        )}

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'register' && (
            <div className="input-wrap">
              <label className="input-label">Full Name</label>
              <input className="input" type="text" placeholder="Krishna Koushik" value={name} onChange={e => setName(e.target.value)}/>
            </div>
          )}
          <div className="input-wrap">
            <label className="input-label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }}/>
          </div>
          {mode !== 'forgot' && (
            <div className="input-wrap">
              <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Password</span>
                {mode === 'login' && <span style={{ color: 'var(--blue)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 400 }} onClick={() => { setMode('forgot'); setError('') }}>Forgot?</span>}
              </label>
              <div style={{ position: 'relative' }}>
                <input className="input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={pass} onChange={e => { setPass(e.target.value); setError('') }} style={{ paddingRight: 42 }}/>
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.72rem', padding: '2px 4px' }}>{showPass ? 'Hide' : 'Show'}</button>
              </div>
            </div>
          )}

          {error && <div style={{ padding: '8px 12px', background: 'var(--red-dim)', border: '1px solid var(--red-border)', borderRadius: 7, fontSize: '0.78rem', color: 'var(--red)' }}>{error}</div>}
          {success && <div style={{ padding: '8px 12px', background: 'var(--green-dim)', border: '1px solid var(--green-border)', borderRadius: 7, fontSize: '0.78rem', color: 'var(--green)' }}>{success}</div>}

          <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', marginTop: 4 }} disabled={loading}>
            {loading ? <><span className="spinner" style={{ width: 13, height: 13 }}/> {mode === 'login' ? 'Signing in...' : mode === 'register' ? 'Creating...' : 'Sending...'}</> : mode === 'login' ? 'Sign in →' : mode === 'register' ? 'Create account →' : 'Send reset link →'}
          </button>
        </form>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); setSuccess('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-muted)', transition: 'color var(--tr)', textAlign: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >{mode === 'login' ? "Don't have an account? Sign up" : mode === 'forgot' ? '← Back to sign in' : 'Already have an account? Sign in'}</button>
          <div className="divider"/>
          <button onClick={() => nav('/dashboard')} className="btn btn-ghost w-full" style={{ justifyContent: 'center', fontSize: '0.78rem' }}>
            Skip — explore as guest →
          </button>
        </div>

        {/* Demo accounts */}
        {mode === 'login' && (
          <div style={{ marginTop: 14, padding: '11px', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.67rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Demo Accounts</div>
            {DEMOS.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < DEMOS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text)' }}>{d.email}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>pw: {d.pass} · <span className={`badge badge-${d.plan === 'pro' ? 'blue' : 'green'}`} style={{ fontSize: '0.6rem', padding: '1px 5px' }}>{d.plan}</span></div>
                </div>
                <button className="btn btn-xs btn-blue" onClick={() => fill(i)}>Use</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: 14, fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
        GPT-EXCEL v2.0 · Powered by Datum_GLAU · © 2026
      </div>
    </div>
  )
}