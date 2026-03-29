import { NavLink, useNavigate } from 'react-router-dom'

interface Props { isOpen: boolean }

const nav = [
  { id: 'dashboard', path: '/dashboard', icon: '◱', label: 'Dashboard' },
  { id: 'excel', path: '/excel', icon: '⊞', label: 'Excel Sheet', count: '2', color: 'var(--green)' },
  { id: 'documents', path: '/excel', icon: '◱', label: 'Documents', color: 'var(--blue)' },
  { id: 'files', path: '/excel', icon: '◈', label: 'File Manager', color: 'var(--purple)' },
  { id: 'workflow', path: '/excel', icon: '⌘', label: 'Workflow', color: 'var(--orange)' },
  { id: 'dev', path: '/excel', icon: '◎', label: 'Developer', badge: 'BETA', color: 'var(--teal)' },
  { id: 'settings', path: '/settings', icon: '⚙', label: 'Settings' },
]

export default function Sidebar({ isOpen }: Props) {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('gpe_user') || 'null') } catch { return null } })()

  if (!isOpen) return (
    <aside style={{ width: 44, background: 'var(--bg)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 3, flexShrink: 0 }}>
      {nav.map(item => (
        <NavLink key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <div data-tip={item.label} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 15, cursor: 'pointer', background: isActive ? 'var(--blue-dim)' : 'transparent', color: isActive ? 'var(--blue)' : 'var(--text-muted)', transition: 'all var(--tr)', border: isActive ? '1px solid var(--blue-border)' : '1px solid transparent' }}
              onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}}
              onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}}
            >{item.icon}</div>
          )}
        </NavLink>
      ))}
    </aside>
  )

  return (
    <aside style={{ width: 200, background: 'var(--bg)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {/* Workspace */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', marginBottom: 6, border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', transition: 'all var(--tr)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hi)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div style={{ width: 22, height: 22, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, borderRadius: 5, flexShrink: 0, color: '#fff' }}>
            {user?.name ? user.name[0].toUpperCase() : 'G'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Workspace'}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>⌄</span>
        </div>

        {/* Nav */}
        <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '6px 8px 3px' }}>Navigation</div>
        {nav.map(item => (
          <NavLink key={item.id} to={item.path} style={{ textDecoration: 'none', display: 'block' }}>
            {({ isActive }) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 8px', borderRadius: 7, cursor: 'pointer', background: isActive ? 'var(--blue-dim)' : 'transparent', color: isActive ? 'var(--blue)' : 'var(--text-sec)', border: isActive ? '1px solid var(--blue-border)' : '1px solid transparent', transition: 'all 0.12s', marginBottom: 1, fontSize: '0.8rem', fontWeight: isActive ? 600 : 500 }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-sec)' }}}
              >
                <span style={{ fontSize: 13, flexShrink: 0, width: 16, textAlign: 'center', color: isActive ? 'var(--blue)' : (item.color || 'var(--text-muted)') }}>{item.icon}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                {item.count && <span style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: 99, background: isActive ? 'var(--blue-dim)' : 'var(--accent-dim)', color: isActive ? 'var(--blue)' : 'var(--text-sec)' }}>{item.count}</span>}
                {item.badge && <span style={{ fontSize: '0.55rem', padding: '1px 4px', background: 'var(--teal-dim)', color: 'var(--teal)', borderRadius: 3, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{item.badge}</span>}
              </div>
            )}
          </NavLink>
        ))}

        {/* Recent */}
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '6px 8px 3px' }}>Recent</div>
          {[
            { name: 'Q4 Financial Model.xlsx', icon: '⊞', color: 'var(--green)' },
            { name: 'Sales Dashboard.xlsx', icon: '⊞', color: 'var(--green)' },
            { name: 'Project Proposal.docx', icon: '◱', color: 'var(--blue)' },
            { name: 'Customer Data.csv', icon: '⊟', color: 'var(--yellow)' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 6, cursor: 'pointer', transition: 'background var(--tr)', marginBottom: 1 }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => navigate('/excel')}
            >
              <span style={{ fontSize: 11, color: f.color, flexShrink: 0 }}>{f.icon}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-sec)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.7rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Storage</span>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>3.4 / 5 GB</span>
          </div>
          <div className="progress-track"><div className="progress-fill blue" style={{ width: '68%' }}/></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.7rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>AI Generations</span>
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>27 / 50</span>
        </div>
        <div className="progress-track" style={{ marginBottom: 10 }}><div className="progress-fill yellow" style={{ width: '54%' }}/></div>
        <button className="btn btn-blue btn-sm w-full" style={{ fontSize: '0.73rem' }} onClick={() => navigate('/settings')}>
          ↑ Upgrade to Pro
        </button>
      </div>
    </aside>
  )
}