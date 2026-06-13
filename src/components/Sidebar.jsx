import { Home, Calendar, Grid3X3, Users, BarChart3, UtensilsCrossed, Clock } from 'lucide-react'

const NAV = [
  { id: 'inicio',   label: 'Inicio',          icon: Home },
  { id: 'reservas', label: 'Reservas',         icon: Calendar },
  { id: 'mesas',    label: 'Mapa de Mesas',    icon: Grid3X3 },
  { id: 'gestor',   label: 'Gestor Humano',    icon: Users },
  { id: 'metricas', label: 'Métricas',         icon: BarChart3 },
  { id: 'espera',   label: 'Lista de Espera',  icon: Clock },
]

const S = {
  sidebar: {
    width: 248, minWidth: 248, height: '100vh', display: 'flex', flexDirection: 'column',
    background: 'linear-gradient(180deg, #0b1120 0%, #0d1526 100%)',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    flexShrink: 0,
  },
  logoArea: {
    padding: '20px 20px 18px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  logoIcon: {
    width: 42, height: 42, borderRadius: 12,
    background: '#00E676', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,230,118,0.35)', flexShrink: 0,
  },
  nav: { flex: 1, padding: '16px 12px', overflowY: 'auto' },
  sectionLabel: {
    fontSize: 10, color: '#9E9E9E', textTransform: 'uppercase',
    letterSpacing: '0.1em', fontWeight: 600, padding: '0 8px', marginBottom: 8,
  },
}

function NavBtn({ item, active, onClick, badge }) {
  const Icon = item.icon
  const base = {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 12px', borderRadius: 12, border: 'none',
    cursor: 'pointer', fontSize: 13, fontWeight: 500,
    transition: 'all 0.15s ease', marginBottom: 2,
  }
  const activeStyle = {
    ...base,
    background: item.id === 'espera' ? '#FFB300' : '#00E676',
    color: '#000',
    boxShadow: item.id === 'espera' ? '0 2px 12px rgba(255,179,0,0.25)' : '0 2px 12px rgba(0,230,118,0.25)',
  }
  const idleStyle = {
    ...base,
    background: 'transparent', color: '#9E9E9E',
  }

  return (
    <button
      style={active ? activeStyle : idleStyle}
      onClick={() => onClick(item.id)}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9E9E9E' } }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon size={16} />
        {item.label}
      </span>
      {badge > 0 && (
        <span style={{
          background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,82,82,0.2)',
          color: active ? '#000' : '#FF5252',
          fontSize: 10, fontWeight: 700,
          padding: '1px 6px', borderRadius: 999,
        }}>{badge}</span>
      )}
    </button>
  )
}

export default function Sidebar({ seccion, setSeccion, pendingGestor }) {
  return (
    <div style={S.sidebar}>
      {/* Logo */}
      <div style={S.logoArea}>
        <div style={S.logoIcon}>
          <UtensilsCrossed size={22} color="#000" strokeWidth={2} />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>La Mesa</div>
          <div style={{ color: '#00E676', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em' }}>Panel de Gestión</div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={S.nav}>
        <p style={S.sectionLabel}>Menú Principal</p>
        {NAV.map(item => (
          <NavBtn
            key={item.id}
            item={item}
            active={seccion === item.id}
            onClick={setSeccion}
            badge={item.id === 'gestor' ? pendingGestor : 0}
          />
        ))}
      </nav>

      {/* Status dot */}
      <div style={{ padding: '0 12px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 10,
          background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%', background: '#4CAF50',
            boxShadow: '0 0 6px #4CAF50', animation: 'pulse 2s infinite',
          }} />
          <span style={{ color: '#4CAF50', fontSize: 12, fontWeight: 500 }}>Sistema Activo</span>
        </div>
      </div>

      {/* User */}
      <div style={{ padding: '8px 12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 12, cursor: 'pointer',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(0,230,118,0.3), rgba(41,121,255,0.3))',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>AM</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin Manager</div>
            <div style={{ color: '#9E9E9E', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Gerente de Turno</div>
          </div>
        </div>
      </div>
    </div>
  )
}
