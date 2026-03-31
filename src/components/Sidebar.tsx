import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface Props {
  isOpen: boolean;
}

const navItems = [
  { id: 'dashboard', path: '/dashboard', icon: '◱', label: 'Dashboard' },
  { id: 'excel', path: '/excel', icon: '⊞', label: 'Excel Sheet' },
  { id: 'documents', path: '/documents', icon: '◱', label: 'Documents' },
  { id: 'file-manager', path: '/file-manager', icon: '◈', label: 'File Manager' },
  { id: 'workflow', path: '/workflow', icon: '⌘', label: 'Workflow' },
  { id: 'voice', path: '/voice', icon: '◎', label: 'Voice Assistant' },
  { id: 'powerpoint', path: '/powerpoint', icon: '◻', label: 'PPT Generator' },
  { id: 'plugins', path: '/plugins', icon: '🔌', label: 'Plugins' },
  { id: 'settings', path: '/settings', icon: '⚙', label: 'Settings' },
];

export default function Sidebar({ isOpen }: Props) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.app.user);

  if (!isOpen) {
    return (
      <aside
        style={{
          width: 44,
          background: 'var(--bg)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 8,
          gap: 4,
          flexShrink: 0,
        }}
      >
        {navItems.map(item => (
          <NavLink key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div
                data-tooltip={item.label}
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'all var(--tr)',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {item.icon}
              </div>
            )}
          </NavLink>
        ))}
      </aside>
    );
  }

  return (
    <aside
      style={{
        width: 200,
        background: 'var(--bg)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {/* Workspace selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 8px',
            marginBottom: 12,
            border: '1px solid var(--border)',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all var(--tr)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.6rem',
              fontWeight: 800,
              borderRadius: 5,
              flexShrink: 0,
              color: 'var(--bg)',
            }}
          >
            {user?.name ? user.name[0].toUpperCase() : 'G'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'Workspace'}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>⌄</span>
        </div>

        {/* Navigation */}
        <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 6px' }}>
          Navigation
        </div>
        {navItems.map(item => (
          <NavLink key={item.id} to={item.path} style={{ textDecoration: 'none', display: 'block' }}>
            {({ isActive }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '6px 8px',
                  borderRadius: 7,
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  transition: 'all 0.12s',
                  marginBottom: 2,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0, width: 16, textAlign: 'center' }}>{item.icon}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}

        {/* Recent files */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 6px' }}>
            Recent
          </div>
          {[
            { name: 'Q4 Financial Model.xlsx', icon: '⊞' },
            { name: 'Sales Dashboard.xlsx', icon: '⊞' },
            { name: 'Project Proposal.docx', icon: '◱' },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 8px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background var(--tr)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => navigate('/excel')}
            >
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{f.icon}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {f.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: storage & upgrade */}
      <div style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.7rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Storage</span>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>3.4 / 5 GB</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '68%' }} />
          </div>
        </div>
        <button className="btn btn-outline btn-sm w-full" style={{ fontSize: '0.72rem' }} onClick={() => navigate('/settings')}>
          ↑ Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}