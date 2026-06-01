import { useState } from 'react'
import { Phone, Users, MapPin, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

const CARD = { background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 20 }

const EST = {
  confirmada: { bg: 'rgba(76,175,80,0.12)',  text: '#4CAF50', border: 'rgba(76,175,80,0.25)',  dot: '#4CAF50', label: 'Confirmada', Icon: CheckCircle },
  pendiente:  { bg: 'rgba(41,121,255,0.12)', text: '#2979FF', border: 'rgba(41,121,255,0.25)', dot: '#2979FF', label: 'Pendiente',  Icon: AlertCircle },
  cancelada:  { bg: 'rgba(255,82,82,0.12)',  text: '#FF5252', border: 'rgba(255,82,82,0.25)',  dot: '#FF5252', label: 'Cancelada',  Icon: XCircle },
}

function Badge({ estado }) {
  const s = EST[estado]
  const Icon = s.Icon
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
    }}>
      <Icon size={12} /> {s.label}
    </span>
  )
}

function ReservaCard({ r, onCambiar }) {
  const s = EST[r.estado]
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Hora */}
      <div style={{ width: 52, textAlign: 'center', flexShrink: 0 }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{r.hora}</div>
        <div style={{ color: s.text, fontSize: 10, fontWeight: 500, textTransform: 'capitalize' }}>{r.turno}</div>
      </div>

      {/* Barra de color */}
      <div style={{ width: 3, height: 48, borderRadius: 2, background: s.dot, flexShrink: 0, opacity: 0.8 }} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{r.cliente}</span>
          {r.nota && (
            <span style={{
              background: 'rgba(255,193,7,0.12)', color: '#FFB300', border: '1px solid rgba(255,193,7,0.2)',
              fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4,
            }}>Nota</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#9E9E9E', fontSize: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {r.ambiente}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Mesa {r.mesa}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} /> {r.personas} pers.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={11} /> {r.telefono}</span>
        </div>
        {r.nota && (
          <div style={{ color: '#FFB300', fontSize: 11, marginTop: 4, fontStyle: 'italic' }}>"{r.nota}"</div>
        )}
      </div>

      {/* Estado badge */}
      <Badge estado={r.estado} />

      {/* Acciones */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        {r.estado === 'pendiente' && (
          <button
            onClick={() => onCambiar(r.id, 'confirmada')}
            style={{
              padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(76,175,80,0.22)'}
            onMouseLeave={e => e.target.style.background = 'rgba(76,175,80,0.12)'}
          >Confirmar</button>
        )}
        {r.estado !== 'cancelada' && (
          <button
            onClick={() => onCambiar(r.id, 'cancelada')}
            style={{
              padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: 'rgba(255,82,82,0.1)', color: '#FF5252', border: '1px solid rgba(255,82,82,0.2)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,82,82,0.2)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,82,82,0.1)'}
          >Cancelar</button>
        )}
      </div>
    </div>
  )
}

export default function Reservas({ reservas, setReservas }) {
  const [filtro, setFiltro] = useState('todos')

  const cambiarEstado = (id, estado) =>
    setReservas(prev => prev.map(r => r.id === id ? { ...r, estado } : r))

  const filtrar = arr => filtro === 'todos' ? arr : arr.filter(r => r.estado === filtro)

  const FILTROS = [
    { key: 'todos',      label: 'Todos' },
    { key: 'confirmada', label: 'Confirmadas' },
    { key: 'pendiente',  label: 'Pendientes' },
    { key: 'cancelada',  label: 'Canceladas' },
  ]

  const total = reservas.filter(r => filtro === 'todos' || r.estado === filtro).length

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        {FILTROS.map(f => {
          const active = filtro === f.key
          const s = f.key !== 'todos' ? EST[f.key] : null
          return (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              style={{
                padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                border: active && s ? `1px solid ${s.border}` : active ? '1px solid #00E676' : '1px solid rgba(255,255,255,0.08)',
                background: active && s ? s.bg : active ? '#00E676' : '#16213e',
                color: active && s ? s.text : active ? '#000' : '#9E9E9E',
                transition: 'all 0.15s',
              }}
            >{f.label}</button>
          )
        })}
        <span style={{ marginLeft: 'auto', color: '#9E9E9E', fontSize: 13 }}>{total} reservas</span>
      </div>

      {/* Turno: Almuerzo */}
      {['almuerzo', 'cena'].map(turno => {
        const items = filtrar(reservas.filter(r => r.turno === turno))
        const conf  = items.filter(r => r.estado === 'confirmada').length
        return (
          <div key={turno} style={CARD}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>
                  {turno === 'almuerzo' ? '☀️ Almuerzo' : '🌙 Cena'}
                </div>
                <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 2 }}>
                  {turno === 'almuerzo' ? '12:00 – 16:00' : '19:00 – 23:00'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ color: '#9E9E9E', fontSize: 13 }}>{items.length} reservas</span>
                <span style={{ color: '#4CAF50', fontSize: 13, fontWeight: 500 }}>{conf} conf.</span>
              </div>
            </div>
            {items.length === 0 ? (
              <div style={{ padding: '32px 0', textAlign: 'center', color: '#9E9E9E', fontSize: 13 }}>
                No hay reservas para este filtro
              </div>
            ) : (
              items.map(r => <ReservaCard key={r.id} r={r} onCambiar={cambiarEstado} />)
            )}
          </div>
        )
      })}
    </div>
  )
}
