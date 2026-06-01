import { CalendarCheck, TableProperties, Clock, XCircle, ArrowRight, TrendingUp } from 'lucide-react'

const CARD = { background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: 20 }

const ESTADO_STYLE = {
  confirmada: { bg: 'rgba(76,175,80,0.12)',  text: '#4CAF50', border: 'rgba(76,175,80,0.25)',  label: 'Confirmada' },
  pendiente:  { bg: 'rgba(41,121,255,0.12)', text: '#2979FF', border: 'rgba(41,121,255,0.25)', label: 'Pendiente'  },
  cancelada:  { bg: 'rgba(255,82,82,0.12)',  text: '#FF5252', border: 'rgba(255,82,82,0.25)',  label: 'Cancelada'  },
}

function MetricCard({ icon, label, value, sub, accent, accentBg }) {
  return (
    <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: accentBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
        boxShadow: `0 0 16px ${accentBg}`,
      }}>
        {icon}
      </div>
      <div style={{ color: accent, fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{label}</div>
      <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 2 }}>{sub}</div>
    </div>
  )
}

function ReservaRow({ r }) {
  const s = ESTADO_STYLE[r.estado]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
      borderRadius: 12, transition: 'background 0.15s', cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        width: 52, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{r.hora}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.cliente}</div>
        <div style={{ color: '#9E9E9E', fontSize: 11, marginTop: 2 }}>{r.ambiente} · Mesa {r.mesa} · {r.personas} pers.</div>
      </div>
      <span style={{
        background: s.bg, color: s.text, border: `1px solid ${s.border}`,
        fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, flexShrink: 0,
      }}>{s.label}</span>
    </div>
  )
}

function AmbienteBar({ nombre, mesasArr }) {
  const occ = mesasArr.filter(m => m.estado === 'ocupada').length
  const res = mesasArr.filter(m => m.estado === 'reservada').length
  const total = mesasArr.length
  const pct = Math.round(((occ + res) / total) * 100)
  const barColor = pct > 80 ? '#FF5252' : '#00E676'
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{nombre}</span>
        <span style={{ color: '#9E9E9E', fontSize: 12 }}>{occ + res}/{total}</span>
      </div>
      <div style={{ height: 6, background: '#37474F', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: 4, transition: 'width 0.5s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
        <span style={{ color: '#4CAF50', fontSize: 11 }}>{occ} ocup.</span>
        <span style={{ color: '#00E676', fontSize: 11 }}>{res} res.</span>
        <span style={{ color: '#9E9E9E', fontSize: 11 }}>{mesasArr.filter(m => m.estado === 'disponible').length} disp.</span>
      </div>
    </div>
  )
}

export default function Dashboard({ reservas, mesas, setSeccion }) {
  const total       = reservas.length
  const confirmadas = reservas.filter(r => r.estado === 'confirmada').length
  const pendientes  = reservas.filter(r => r.estado === 'pendiente').length
  const canceladas  = reservas.filter(r => r.estado === 'cancelada').length

  const allMesas        = [...mesas.salon, ...mesas.terraza, ...mesas.vip]
  const mesasOcupadas   = allMesas.filter(m => m.estado === 'ocupada').length
  const mesasDisponibles = allMesas.filter(m => m.estado === 'disponible').length
  const totalMesas      = allMesas.length

  const proximas = [...reservas].filter(r => r.estado !== 'cancelada').sort((a, b) => a.hora.localeCompare(b.hora)).slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <MetricCard icon={<CalendarCheck size={20} color="#000" />}  label="Reservas Hoy"    value={total}                    sub={`${confirmadas} confirmadas`}    accent="#00E676" accentBg="#00E676" />
        <MetricCard icon={<TableProperties size={20} color="#000" />} label="Mesas en Uso"    value={`${mesasOcupadas}/${totalMesas}`} sub={`${mesasDisponibles} disponibles`} accent="#4CAF50" accentBg="rgba(76,175,80,0.9)" />
        <MetricCard icon={<Clock size={20} color="#fff" />}           label="Pendientes"       value={pendientes}              sub="Requieren acción"                accent="#2979FF" accentBg="#2979FF" />
        <MetricCard icon={<XCircle size={20} color="#fff" />}         label="Cancelaciones"    value={canceladas}              sub="Hoy"                             accent="#FF5252" accentBg="#FF5252" />
      </div>

      {/* Middle row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Próximas reservas */}
        <div style={CARD}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Próximas Reservas</span>
            <button
              onClick={() => setSeccion('reservas')}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
                color: '#00E676', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
              }}
            >
              Ver todas <ArrowRight size={14} />
            </button>
          </div>
          {proximas.map(r => <ReservaRow key={r.id} r={r} />)}
        </div>

        {/* Ambientes */}
        <div style={CARD}>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 20 }}>Estado de Ambientes</div>
          <AmbienteBar nombre="Salón"     mesasArr={mesas.salon}   />
          <AmbienteBar nombre="Terraza"   mesasArr={mesas.terraza} />
          <AmbienteBar nombre="Zona VIP"  mesasArr={mesas.vip}     />
          <button
            onClick={() => setSeccion('mesas')}
            style={{
              width: '100%', padding: '10px 0', borderRadius: 10, marginTop: 4,
              border: '1px solid rgba(0,230,118,0.3)', background: 'rgba(0,230,118,0.06)',
              color: '#00E676', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(0,230,118,0.12)'}
            onMouseLeave={e => e.target.style.background = 'rgba(0,230,118,0.06)'}
          >
            Ver mapa completo
          </button>
        </div>
      </div>

      {/* Turnos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {['almuerzo', 'cena'].map(turno => {
          const items = reservas.filter(r => r.turno === turno)
          const conf  = items.filter(r => r.estado === 'confirmada').length
          const pend  = items.filter(r => r.estado === 'pendiente').length
          const pers  = items.filter(r => r.estado !== 'cancelada').reduce((a, r) => a + r.personas, 0)
          return (
            <div key={turno} style={CARD}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>
                  {turno === 'almuerzo' ? '☀️ Almuerzo' : '🌙 Cena'}
                </span>
                <span style={{ color: '#9E9E9E', fontSize: 12 }}>{turno === 'almuerzo' ? '12:00 – 16:00' : '19:00 – 23:00'}</span>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[
                  { label: 'Reservas',    val: items.length, color: '#fff'    },
                  { label: 'Confirmadas', val: conf,          color: '#4CAF50' },
                  { label: 'Pendientes',  val: pend,          color: '#2979FF' },
                  { label: 'Comensales',  val: pers,          color: '#00E676' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ color, fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{val}</div>
                    <div style={{ color: '#9E9E9E', fontSize: 11, marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
