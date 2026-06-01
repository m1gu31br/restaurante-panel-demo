import { useState } from 'react'
import { Users, Info } from 'lucide-react'

const ESTADO = {
  ocupada:    { bg: '#4CAF50', border: '#4CAF50', text: '#fff',  label: 'Ocupada',    glow: 'rgba(76,175,80,0.4)'   },
  disponible: { bg: '#37474F', border: '#455A64', text: '#9E9E9E', label: 'Disponible', glow: 'transparent'           },
  reservada:  { bg: '#00E676', border: '#00E676', text: '#000',  label: 'Reservada',  glow: 'rgba(0,230,118,0.4)'   },
}

const AMBIENTES = [
  { key: 'salon',   label: 'Salón',     emoji: '🍽️' },
  { key: 'terraza', label: 'Terraza',   emoji: '🌿' },
  { key: 'vip',     label: 'Zona VIP',  emoji: '⭐' },
]

function getMesaSize(capacidad) {
  if (capacidad === 2) return { width: 56,  height: 56,  shape: '50%'  }
  if (capacidad === 4) return { width: 82,  height: 82,  shape: '14px' }
  if (capacidad === 6) return { width: 96,  height: 84,  shape: '14px' }
  if (capacidad === 8) return { width: 140, height: 70,  shape: '14px' }
  return { width: 82, height: 82, shape: '14px' }
}

function MesaItem({ mesa, reservas, isSelected, onClick }) {
  const s = ESTADO[mesa.estado]
  const { width, height, shape } = getMesaSize(mesa.capacidad)
  const reserva = mesa.reservaId ? reservas.find(r => r.id === mesa.reservaId) : null

  return (
    <div
      onClick={() => onClick(mesa, reserva)}
      title={`${mesa.id} · ${mesa.capacidad} pers. · ${s.label}`}
      style={{
        width, height, borderRadius: shape, background: s.bg,
        border: `2px solid ${s.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.2s ease',
        boxShadow: isSelected
          ? `0 0 0 3px #fff, 0 6px 20px ${s.glow}`
          : `0 4px 14px ${s.glow}`,
        transform: isSelected ? 'scale(1.08)' : 'scale(1)',
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.transform = 'scale(1.06)' }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.transform = 'scale(1)' }}
    >
      <span style={{ color: s.text, fontWeight: 700, fontSize: 12 }}>{mesa.id}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, opacity: 0.8 }}>
        <Users size={10} color={s.text} />
        <span style={{ color: s.text, fontSize: 10 }}>{mesa.capacidad}</span>
      </div>
    </div>
  )
}

function LeyendaItem({ color, label, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ width: 11, height: 11, borderRadius: 3, background: color }} />
      <span style={{ color: '#9E9E9E', fontSize: 12 }}>{label} ({count})</span>
    </div>
  )
}

export default function MapaMesas({ mesas, reservas }) {
  const [activeTab, setActiveTab]       = useState('salon')
  const [selected, setSelected]         = useState(null)
  const [selectedRes, setSelectedRes]   = useState(null)

  const handleClick = (mesa, reserva) => {
    if (selected?.id === mesa.id) { setSelected(null); setSelectedRes(null) }
    else { setSelected(mesa); setSelectedRes(reserva) }
  }

  const mesasActuales = mesas[activeTab]
  const occ   = mesasActuales.filter(m => m.estado === 'ocupada').length
  const res   = mesasActuales.filter(m => m.estado === 'reservada').length
  const avail = mesasActuales.filter(m => m.estado === 'disponible').length

  const ambInfo = AMBIENTES.find(a => a.key === activeTab)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {AMBIENTES.map(a => {
          const active = activeTab === a.key
          return (
            <button
              key={a.key}
              onClick={() => { setActiveTab(a.key); setSelected(null) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                background: active ? '#00E676' : '#16213e',
                color: active ? '#000' : '#9E9E9E',
                boxShadow: active ? '0 2px 12px rgba(0,230,118,0.25)' : 'none',
                outline: active ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span>{a.emoji}</span>
              {a.label}
              <span style={{
                background: active ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)',
                color: active ? '#000' : '#9E9E9E',
                fontSize: 11, fontWeight: 700, padding: '1px 6px', borderRadius: 999,
              }}>{mesas[a.key].length}</span>
            </button>
          )
        })}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <LeyendaItem color="#4CAF50" label="Ocupada"    count={occ}   />
          <LeyendaItem color="#00E676" label="Reservada"  count={res}   />
          <LeyendaItem color="#37474F" label="Disponible" count={avail} />
        </div>
      </div>

      {/* Map + Detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        {/* Floor plan */}
        <div style={{
          background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>
              {ambInfo.emoji} {ambInfo.label} — Plano de Planta
            </span>
            <span style={{ color: '#9E9E9E', fontSize: 12 }}>{mesasActuales.length} mesas en total</span>
          </div>

          {/* Grid dots background */}
          <div style={{
            position: 'relative', borderRadius: 12, padding: 24, minHeight: 280,
            background: 'rgba(255,255,255,0.015)',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              {mesasActuales.map(m => (
                <MesaItem
                  key={m.id} mesa={m} reservas={reservas}
                  isSelected={selected?.id === m.id}
                  onClick={handleClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Detalle de Mesa</span>
          </div>

          {!selected ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}>
                <Info size={22} color="#9E9E9E" />
              </div>
              <p style={{ color: '#9E9E9E', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                Selecciona una mesa en el plano para ver su información
              </p>
            </div>
          ) : (
            <div style={{ padding: 20 }}>
              {/* Mesa visual */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 14, flexShrink: 0,
                  background: ESTADO[selected.estado].bg,
                  border: `2px solid ${ESTADO[selected.estado].border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 14px ${ESTADO[selected.estado].glow}`,
                }}>
                  <span style={{ color: ESTADO[selected.estado].text, fontWeight: 700, fontSize: 12 }}>{selected.id}</span>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Mesa {selected.id}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: ESTADO[selected.estado].bg }} />
                    <span style={{ color: '#9E9E9E', fontSize: 13 }}>{ESTADO[selected.estado].label}</span>
                  </div>
                </div>
              </div>

              {/* Info table */}
              {[
                ['Capacidad', `${selected.capacidad} personas`],
                ['Ambiente',  ambInfo.label],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#9E9E9E', fontSize: 13 }}>{k}</span>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{v}</span>
                </div>
              ))}

              {/* Reservation info */}
              <div style={{ marginTop: 16 }}>
                {selectedRes ? (
                  <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ color: '#00E676', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Reserva Asignada
                    </div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{selectedRes.cliente}</div>
                    <div style={{ color: '#9E9E9E', fontSize: 12 }}>{selectedRes.hora} · {selectedRes.turno}</div>
                    <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 2 }}>{selectedRes.personas} personas · {selectedRes.telefono}</div>
                    {selectedRes.nota && (
                      <div style={{ color: '#FFB300', fontSize: 12, marginTop: 8, fontStyle: 'italic' }}>"{selectedRes.nota}"</div>
                    )}
                  </div>
                ) : (
                  <div style={{
                    padding: 14, borderRadius: 12, textAlign: 'center',
                    background: 'rgba(76,175,80,0.06)', border: '1px solid rgba(76,175,80,0.2)',
                  }}>
                    <div style={{ color: '#4CAF50', fontWeight: 600, fontSize: 14 }}>Mesa disponible</div>
                    <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 4 }}>Lista para asignar</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
